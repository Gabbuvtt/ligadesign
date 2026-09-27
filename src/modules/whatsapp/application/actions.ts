"use server";

import { createClient } from "@/modules/shared/infrastructure/supabase/server";

export async function sendWhatsAppMessage(to: string, message: string) {
  const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
  const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_ID) {
    console.error("Faltan las credenciales de WhatsApp en el archivo .env.local");
    return { success: false, error: "Credenciales de Meta no configuradas" };
  }

  // Formatting phone number to e.164 without '+' (Meta API format)
  // Assumes user sends something like 584121234567
  const formattedPhone = to.replace(/[^0-9]/g, '');

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: { 
          preview_url: false,
          body: message
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error enviando WhatsApp vía Meta API:", data);
      return { success: false, error: data.error?.message || "Error al enviar mensaje de WhatsApp" };
    }

    // Save message to database
    const supabase = await createClient();

    // Find or create contact
    let contactId = null;
    const { data: existingContact } = await supabase
      .from('whatsapp_contacts')
      .select('id')
      .eq('phone_number', formattedPhone)
      .single();

    if (existingContact) {
      contactId = existingContact.id;
    } else {
      const { data: newContact } = await supabase
        .from('whatsapp_contacts')
        .insert({ phone_number: formattedPhone })
        .select('id')
        .single();
      if (newContact) contactId = newContact.id;
    }

    if (contactId) {
      await supabase.from('whatsapp_messages').insert({
        contact_id: contactId,
        direction: 'outbound',
        content: message,
        status: 'sent',
        meta_message_id: data.messages?.[0]?.id
      });
      
      // Update last message time
      await supabase.from('whatsapp_contacts')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', contactId);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Fallo al ejecutar sendWhatsAppMessage:", error);
    return { success: false, error: "Error de red al conectar con Meta" };
  }
}
