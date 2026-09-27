import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { notFound } from "next/navigation";
import LeadActions from "./LeadActions";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <a href="/admin/crm" className="text-xs text-blue-400 hover:text-blue-300 uppercase tracking-widest mb-2 inline-block">← Volver al CRM</a>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">{lead.name}</h2>
          <p className="text-slate-400 mt-1 text-sm tracking-wide">
            Registrado el {new Date(lead.created_at).toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border ${
            lead.status === 'NUEVO' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
            lead.status === 'CONTACTADO' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            Estado: {lead.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-sm backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">Información del Proyecto</h3>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
              <p className="whitespace-pre-wrap">{lead.notes}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-sm backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">Contacto</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Correo Electrónico</p>
                <a href={`mailto:${lead.email}`} className="text-sm text-blue-400 hover:underline">{lead.email}</a>
              </div>
              {lead.phone && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Teléfono</p>
                  <a href={`tel:${lead.phone}`} className="text-sm text-blue-400 hover:underline">{lead.phone}</a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-sm backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">Acciones</h3>
            <LeadActions leadId={lead.id} currentStatus={lead.status} leadName={lead.name} phone={lead.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}
