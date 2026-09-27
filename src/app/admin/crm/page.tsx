import { createClient } from "@/modules/shared/infrastructure/supabase/server";

export default async function CRMPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Leads B2B</h2>
          <p className="text-slate-400 mt-1 text-sm tracking-wide">Gestión de contactos de la landing page.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold bg-slate-900 px-3 py-1.5 rounded-sm border border-slate-800">
            Total: {leads?.length || 0}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 rounded-sm overflow-hidden shadow-2xl backdrop-blur-sm">
        {error ? (
          <div className="p-8 text-center text-rose-400 text-sm">Error cargando los leads.</div>
        ) : leads?.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <p className="text-slate-400">No hay leads registrados aún.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-800">
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Contacto</th>
                  <th className="p-4 font-semibold">Estado</th>
                  <th className="p-4 font-semibold">Fecha</th>
                  <th className="p-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {leads?.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <p className="font-medium text-slate-200">{lead.name}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-300">{lead.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium uppercase tracking-wider border ${
                        lead.status === 'NUEVO' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        lead.status === 'CONTACTADO' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(lead.created_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`/admin/crm/${lead.id}`}
                        className="inline-flex items-center text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                      >
                        Ver detalles <span className="ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">→</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
