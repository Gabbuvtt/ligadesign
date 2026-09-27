import { createClient } from "@/modules/shared/infrastructure/supabase/server";

export default async function TallerPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, leads(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Control de Taller</h2>
          <p className="text-slate-400 mt-1 text-sm tracking-wide">Gestión de proyectos en producción y despiece.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold bg-slate-900 px-3 py-1.5 rounded-sm border border-slate-800">
            En Producción: {projects?.filter(p => p.status === 'PRODUCCION').length || 0}
          </span>
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-medium transition-colors">
            + Nuevo Proyecto
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 rounded-sm overflow-hidden shadow-2xl backdrop-blur-sm">
        {error ? (
          <div className="p-8 text-center text-rose-400 text-sm">Error cargando los proyectos.</div>
        ) : projects?.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <p className="text-slate-400 mb-4">No hay proyectos activos en el taller.</p>
            <p className="text-xs text-slate-500">Convierte un Lead del CRM a Proyecto para comenzar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {projects?.map((project) => (
              <a 
                href={`/admin/taller/${project.id}`} 
                key={project.id}
                className="group block bg-slate-800/40 border border-slate-700/50 p-6 rounded-sm hover:border-amber-500/50 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${
                    project.status === 'PLANOS' ? 'bg-slate-700/50 text-slate-300 border-slate-600/50' :
                    project.status === 'PRODUCCION' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(project.created_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-white mb-1 group-hover:text-amber-400 transition-colors">{project.name}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-1">
                  Cliente: {project.leads?.name || 'Interno'}
                </p>

                <div className="flex items-center text-xs uppercase tracking-widest text-slate-500 group-hover:text-amber-300 transition-colors">
                  Ver planos y despiece <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
