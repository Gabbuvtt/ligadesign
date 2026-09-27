"use server";

import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { sendEmail } from "@/modules/notifications/infrastructure/resend";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("telefono") as string;
  const projectNotes = formData.get("proyecto") as string;

  if (!name || !email || !projectNotes || !phone) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }

  try {
    // Si tenemos la llave de administrador, saltamos RLS por completo. Si no, intentamos con la llave pública.
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY 
      ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
      : await createClient();

    // 1. Guardar el Lead en la base de datos de Supabase
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        notes: projectNotes,
        status: "NUEVO",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Error guardando lead:", dbError);
      return { success: false, error: dbError.message || "Ocurrió un error en la base de datos." };
    }



    // 3. Enviar email de notificación al Administrador
    // Se ejecuta en background para no bloquear la respuesta
    sendEmail({
      to: "liga.desing0708@gmail.com",
      subject: "🔔 NUEVO LEAD - LIGA DESIGN",
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 4px;">LIGA DESIGN - NUEVO LEAD</h1>
          </div>
          <div style="padding: 32px 24px;">
            <p>Tienes un nuevo prospecto interesado en tus servicios:</p>
            <ul>
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Teléfono:</strong> ${phone}</li>
            </ul>
            <p><strong>Detalles del proyecto:</strong></p>
            <blockquote style="background-color: #f8fafc; border-left: 4px solid #334155; padding: 16px; font-style: italic; color: #475569;">
              "${projectNotes}"
            </blockquote>
            <br/>
            <a href="https://ligadesign.online/admin/crm" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Ir al CRM</a>
          </div>
        </div>
      `,
    }).catch(console.error);

    return { success: true, message: "Mensaje enviado con éxito." };
  } catch (error) {
    console.error("Error en submitContactForm:", error);
    return { success: false, error: "Error inesperado del servidor." };
  }
}

export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) throw error;
    
    revalidatePath("/admin/crm");
    revalidatePath(`/admin/crm/${leadId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return { success: false, error: "No se pudo actualizar el estado" };
  }
}

export async function convertLeadToProject(leadId: string, projectName: string) {
  try {
    const supabase = await createClient();
    
    // Create the project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        lead_id: leadId,
        name: projectName,
        status: "PLANOS"
      })
      .select()
      .single();

    if (projectError) throw projectError;

    // Update lead status to CERRADO
    const { error: leadError } = await supabase
      .from("leads")
      .update({ status: "CERRADO" })
      .eq("id", leadId);

    if (leadError) throw leadError;

    revalidatePath("/admin/crm");
    revalidatePath(`/admin/crm/${leadId}`);
    revalidatePath("/admin/taller");
    
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("Error converting lead to project:", error);
    return { success: false, error: "No se pudo convertir el lead en proyecto" };
  }
}
