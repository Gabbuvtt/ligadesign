import { NextResponse } from 'next/server';
import { createClient } from '@/modules/shared/infrastructure/supabase/server';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'liga_design_webhook_token';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return new NextResponse('Bad Request', { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (value?.messages) {
        // Handle incoming message
        const message = value.messages[0];
        const contact = value.contacts[0];
        
        const phoneNumber = message.from; // Sender's phone number
        const messageText = message.text?.body;
        const messageId = message.id;

        if (messageText) {
          const supabase = await createClient();

          // Upsert contact
          let contactId;
          const { data: existingContact } = await supabase
            .from('whatsapp_contacts')
            .select('id')
            .eq('phone_number', phoneNumber)
            .single();

          if (existingContact) {
            contactId = existingContact.id;
            await supabase.from('whatsapp_contacts')
              .update({ 
                last_message_at: new Date().toISOString(),
                name: contact.profile?.name || undefined
              })
              .eq('id', contactId);
          } else {
            const { data: newContact } = await supabase
              .from('whatsapp_contacts')
              .insert({ 
                phone_number: phoneNumber,
                name: contact.profile?.name
              })
              .select('id')
              .single();
            if (newContact) contactId = newContact.id;
          }

          // Insert message
          if (contactId) {
            await supabase.from('whatsapp_messages').insert({
              contact_id: contactId,
              direction: 'inbound',
              content: messageText,
              status: 'received',
              meta_message_id: messageId
            });
          }
        }
      } else if (value?.statuses) {
        // Handle message status updates (sent, delivered, read)
        const status = value.statuses[0];
        const supabase = await createClient();
        await supabase.from('whatsapp_messages')
          .update({ status: status.status })
          .eq('meta_message_id', status.id);
      }
    }

    return new NextResponse('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}
