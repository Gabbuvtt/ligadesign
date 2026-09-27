"use client";

import { useState, useRef, useEffect } from "react";
import { sendWhatsAppMessage } from "@/modules/whatsapp/application/actions";

type Contact = {
  id: string;
  phone_number: string;
  name: string;
  last_message_at: string;
};

type Message = {
  id: string;
  contact_id: string;
  direction: string;
  content: string;
  status: string;
  created_at: string;
};

export function ChatUI({ initialContacts, initialMessages }: { initialContacts: Contact[], initialMessages: Message[] }) {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeContactId, setActiveContactId] = useState<string | null>(initialContacts[0]?.id || null);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find(c => c.id === activeContactId);
  const activeMessages = messages.filter(m => m.contact_id === activeContactId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeContact || isSending) return;

    const messageText = inputMessage;
    setInputMessage("");
    setIsSending(true);

    // Optimistic UI update
    const tempMessage: Message = {
      id: Math.random().toString(),
      contact_id: activeContact.id,
      direction: 'outbound',
      content: messageText,
      status: 'sending',
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, tempMessage]);

    const result = await sendWhatsAppMessage(activeContact.phone_number, messageText);
    
    if (result.success) {
      // Refresh or update message status to 'sent'
      setMessages(prev => prev.map(m => m.id === tempMessage.id ? { ...m, status: 'sent' } : m));
    } else {
      alert("Error enviando mensaje: " + result.error);
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
    }

    setIsSending(false);
  };

  return (
    <div className="flex w-full h-full border-t border-slate-800">
      {/* Left Sidebar - Contact List */}
      <div className="w-1/3 min-w-[300px] border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Chats Activos</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs uppercase tracking-widest">No hay chats activos</div>
          ) : (
            contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`w-full text-left p-4 border-b border-slate-800/50 hover:bg-slate-800/80 transition-colors ${activeContactId === contact.id ? 'bg-slate-800/80 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium text-slate-200">{contact.name}</h3>
                  <span className="text-[10px] text-slate-500">
                    {new Date(contact.last_message_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono truncate">{contact.phone_number}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Area - Chat Window */}
      <div className="flex-1 flex flex-col bg-[#0b141a]">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-[#202c33] flex items-center border-b border-slate-800/50">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                <span className="text-emerald-500 font-bold uppercase">{activeContact.name.substring(0, 2)}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-200">{activeContact.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{activeContact.phone_number}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('/bg-chat-dark.png')] bg-repeat bg-opacity-5 relative">
              <div className="absolute inset-0 bg-[#0b141a]/90 pointer-events-none"></div>
              
              {activeMessages.length === 0 ? (
                <div className="relative z-10 text-center py-10">
                  <span className="bg-[#111b21] text-slate-400 text-xs py-2 px-4 rounded-lg">Este es el inicio de tu conversación con {activeContact.name}</span>
                </div>
              ) : (
                activeMessages.map(msg => (
                  <div key={msg.id} className={`relative z-10 flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${msg.direction === 'outbound' ? 'bg-[#005c4b] text-slate-100 rounded-tr-none' : 'bg-[#202c33] text-slate-200 rounded-tl-none'} shadow-sm relative`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className="flex justify-end items-center mt-1 space-x-1">
                        <span className="text-[9px] text-white/60">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.direction === 'outbound' && (
                          <svg className={`w-3 h-3 ${msg.status === 'read' ? 'text-blue-400' : 'text-white/60'}`} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.01 3.316L5.8 12.526L1.8 8.526" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            {msg.status !== 'sending' && (
                               <path d="M11.01 3.316L5.8 8.526" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-[#202c33] border-t border-slate-800/50">
              <form onSubmit={handleSend} className="flex items-center gap-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-[#2a3942] text-slate-200 placeholder-slate-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="w-12 h-12 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-[#0b141a]">
            <svg className="w-24 h-24 mb-6 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.005 2.001a10.005 10.005 0 0110.005 10.005c0 5.525-4.48 10.005-10.005 10.005h-1.637l-3.364 2.222a1 1 0 01-1.554-.832v-2.736A10.001 10.001 0 012.001 12.006c0-5.525 4.48-10.005 10.004-10.005zM12 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            <p className="text-sm font-medium uppercase tracking-widest">LIGA Design CRM</p>
            <p className="text-xs mt-2 opacity-50">Selecciona un chat para ver los mensajes</p>
          </div>
        )}
      </div>
    </div>
  );
}
