import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { notFound } from "next/navigation";
import { QuotationParamsForm, CuttingCalculator, UpdateProjectStatusButton } from "./TallerForms";

export default async function TallerProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*, leads(name)")
    .eq("id", id)
    .single();

  if (error || !project) {
    return notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <a href="/admin/taller" className="text-xs text-amber-400 hover:text-amber-300 uppercase tracking-widest mb-2 inline-block">← Volver al Taller</a>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">{project.name}</h2>
          <p className="text-slate-400 mt-1 text-sm tracking-wide">
            Cliente: {project.leads?.name || 'Interno'}
          </p>
        </div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border ${
            project.status === 'PLANOS' ? 'bg-slate-700/50 text-slate-300 border-slate-600/50' :
            project.status === 'PRODUCCION' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            Estado: {project.status}
          </span>
          <UpdateProjectStatusButton projectId={project.id} currentStatus={project.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Parámetros del Proyecto */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-sm backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Parámetros de Cotización
            </h3>
            
            <QuotationParamsForm 
              projectId={project.id} 
              initialBudget={project.budget} 
              initialType={project.quotation_params?.type} 
            />
          </div>
        </div>

        {/* Calculadora de Despiece */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-sm backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <CuttingCalculator projectId={project.id} initialPieces={project.cutting_list || []} />

          </div>
        </div>

      </div>
    </div>
  );
}
