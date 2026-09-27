import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { ChatUI } from "./ChatUI";

export const revalidate = 0; // Disable caching for realtime updates

export default async function WhatsAppPage() {
  const supabase = await createClient();

  // Fetch all WhatsApp contacts, left join with Leads to get name
  const { data: contacts, error: contactsError } = await supabase
    .from('whatsapp_contacts')
    .select(`
      id,
      phone_number,
      name,
      last_message_at,
      leads (
        id,
        name
      )
    `)
    .order('last_message_at', { ascending: false });

  // Fetch all messages (for simplicity we load them all, in production we would paginate per chat)
  const { data: messages, error: messagesError } = await supabase
    .from('whatsapp_messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (contactsError) {
    // Si la tabla no existe, devolveremos un array vacío silenciosamente
    // console.warn("Aviso: No se pudo cargar los contactos", contactsError);
  }

  // Format data
  const formattedContacts = contacts?.map((c: any) => {
    let leadName = null;
    if (c.leads) {
      if (Array.isArray(c.leads)) {
        leadName = c.leads[0]?.name;
      } else {
        leadName = c.leads.name;
      }
    }
    
    return {
      id: c.id,
      phone_number: c.phone_number,
      name: c.name || leadName || c.phone_number,
      last_message_at: c.last_message_at
    };
  }) || [];

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-slate-950 overflow-hidden">
      <ChatUI initialContacts={formattedContacts} initialMessages={messages || []} />
    </div>
  );
}
