"use server";

import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { sendEmail } from "@/modules/notifications/infrastructure/resend";
import { revalidatePath } from "next/cache";
import { sendWhatsAppMessage } from "@/modules/whatsapp/application/actions";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("telefono") as string;
  const projectNotes = formData.get("proyecto") as string;

  if (!name || !email || !projectNotes || !phone) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }

  try {
    const supabase = await createClient();

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

    // 2. Enviar notificación por WhatsApp si el usuario proporcionó teléfono
    // Se ejecuta en background
    if (phone) {
      const whatsappMsg = `¡Hola ${name}! Hemos recibido correctamente tu solicitud de contacto sobre tu proyecto en LIGA Design. Nuestro equipo técnico evaluará la información y te contactaremos por aquí a la brevedad posible.\n\n*Tu solicitud:* ${projectNotes}\n\nGracias por confiar en nosotros.`;
      sendWhatsAppMessage(phone, whatsappMsg).catch(console.error);
    }

    // 3. Enviar email de confirmación al cliente (Opcional, depende de Resend)
    // Se ejecuta en background para no bloquear la respuesta
    sendEmail({
      to: email,
      subject: "LIGA DESIGN - Hemos recibido tu mensaje",
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 4px;">LIGA DESIGN</h1>
          </div>
          <div style="padding: 32px 24px;">
            <p>Hola <strong>${name}</strong>,</p>
            <p>Hemos recibido correctamente tu solicitud de contacto sobre tu proyecto. Nuestro equipo técnico evaluará la información y te contactaremos a la brevedad posible para agendar una reunión o solicitar los planos detallados.</p>
            <p>Tu mensaje:</p>
            <blockquote style="background-color: #f8fafc; border-left: 4px solid #334155; padding: 16px; font-style: italic; color: #475569;">
              "${projectNotes}"
            </blockquote>
            <br/>
            <p>Gracias por confiar en el taller de LIGA Design.</p>
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
