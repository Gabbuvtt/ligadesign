"use client";

import { useState } from "react";
import { saveProjectQuotationParams, saveCuttingList, updateProjectStatus, CuttingPiece } from "@/modules/taller/application/actions";

export function QuotationParamsForm({ projectId, initialBudget, initialType }: { projectId: string, initialBudget: number | null, initialType: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form 
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const type = formData.get("type") as string;
        const budget = parseFloat(formData.get("budget") as string);
        const res = await saveProjectQuotationParams(projectId, type, budget);
        setIsSubmitting(false);
        if (res.success) alert("Parámetros guardados.");
        else alert(res.error);
      }}
    >
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Tipo de Cobro</label>
        <select name="type" defaultValue={initialType || "Por Láminas"} className="w-full bg-slate-950/50 border border-slate-800 rounded-sm px-3 py-2 text-sm text-slate-300 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none">
          <option value="Por Láminas">Por Láminas</option>
          <option value="Metraje Cuadrado">Metraje Cuadrado</option>
          <option value="Global">Global</option>
        </select>
      </div>
      
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Presupuesto Estimado ($)</label>
        <input name="budget" type="number" step="0.01" defaultValue={initialBudget || ''} required className="w-full bg-slate-950/50 border border-slate-800 rounded-sm px-3 py-2 text-sm text-slate-300 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none" placeholder="Ej: 1500" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs uppercase tracking-widest font-medium py-2.5 rounded-sm border border-slate-700 transition-colors disabled:opacity-50">
        Guardar Cambios
      </button>
    </form>
  );
}

export function CuttingCalculator({ projectId, initialPieces }: { projectId: string, initialPieces: CuttingPiece[] }) {
  const [pieces, setPieces] = useState<CuttingPiece[]>(initialPieces || []);
  const [results, setResults] = useState<{ boards: number, waste: number, totalPieces: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const addPiece = () => {
    setPieces([...pieces, { id: Date.now().toString(), description: "Nueva Pieza", quantity: 1, width: 500, height: 500 }]);
  };

  const removePiece = (id: string) => {
    setPieces(pieces.filter(p => p.id !== id));
  };

  const updatePiece = (id: string, field: keyof CuttingPiece, value: any) => {
    setPieces(pieces.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const saveList = async () => {
    setIsSaving(true);
    const res = await saveCuttingList(projectId, pieces);
    setIsSaving(false);
    if (!res.success) alert(res.error);
    else alert("Lista de despiece guardada.");
  };

  const calculateOptimization = () => {
    if (pieces.length === 0) return setResults(null);

    // Sum of areas in square meters (width and height are in mm)
    const totalAreaM2 = pieces.reduce((sum, piece) => {
      const area = (piece.width / 1000) * (piece.height / 1000);
      return sum + (area * piece.quantity);
    }, 0);

    const wasteFactor = 1.15; // 15% waste
    const totalAreaWithWaste = totalAreaM2 * wasteFactor;
    
    // Standard board is 1.22m x 2.44m (approx 2.9768 m2)
    const boardArea = 1.22 * 2.44; 
    
    const requiredBoards = Math.ceil(totalAreaWithWaste / boardArea);
    const totalPieces = pieces.reduce((sum, p) => sum + p.quantity, 0);

    setResults({
      boards: requiredBoards,
      waste: 15,
      totalPieces
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center">
          <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
          Calculadora de Despiece (Cutting)
        </h3>
        <div className="flex gap-4">
          <button onClick={saveList} disabled={isSaving} className="text-xs text-slate-400 hover:text-slate-300 disabled:opacity-50">
            Guardar Lista
          </button>
          <button onClick={addPiece} className="text-xs text-amber-500 hover:text-amber-400 font-medium">
            + Agregar Pieza
          </button>
        </div>
      </div>

      <div className="bg-slate-950/50 border border-slate-800/80 rounded-sm overflow-hidden mb-6 relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="p-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium min-w-[150px]">Descripción</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium text-center">Cant.</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium text-center">Ancho (mm)</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium text-center">Alto (mm)</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {pieces.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500 text-xs">No hay piezas agregadas.</td>
                </tr>
              )}
              {pieces.map((piece) => (
                <tr key={piece.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3">
                    <input type="text" value={piece.description} onChange={(e) => updatePiece(piece.id, "description", e.target.value)} className="bg-transparent border-b border-slate-700 focus:border-amber-500 outline-none w-full px-1 py-0.5 text-xs text-slate-200"/>
                  </td>
                  <td className="p-3 text-center">
                    <input type="number" min="1" value={piece.quantity} onChange={(e) => updatePiece(piece.id, "quantity", parseInt(e.target.value) || 1)} className="bg-transparent border-b border-slate-700 focus:border-amber-500 outline-none w-12 text-center px-1 py-0.5 text-xs text-slate-200"/>
                  </td>
                  <td className="p-3 text-center">
                    <input type="number" min="1" value={piece.width} onChange={(e) => updatePiece(piece.id, "width", parseFloat(e.target.value) || 0)} className="bg-transparent border-b border-slate-700 focus:border-amber-500 outline-none w-16 text-center px-1 py-0.5 text-xs text-slate-200"/>
                  </td>
                  <td className="p-3 text-center">
                    <input type="number" min="1" value={piece.height} onChange={(e) => updatePiece(piece.id, "height", parseFloat(e.target.value) || 0)} className="bg-transparent border-b border-slate-700 focus:border-amber-500 outline-none w-16 text-center px-1 py-0.5 text-xs text-slate-200"/>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => removePiece(piece.id)} className="text-slate-500 hover:text-rose-400 transition-colors">
                      <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end relative z-10">
        <button onClick={calculateOptimization} className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-medium transition-colors shadow-lg shadow-amber-900/20">
          Calcular Optimización
        </button>
      </div>

      {results && (
        <div className="mt-8 pt-6 border-t border-slate-800/80 relative z-10 animate-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-4">Resultados de Corte</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-sm text-center">
              <p className="text-2xl font-serif text-white mb-1">{results.boards}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Tableros Req.</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-sm text-center">
              <p className="text-2xl font-serif text-amber-400 mb-1">{results.waste}%</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Desperdicio Mín.</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-sm text-center">
              <p className="text-2xl font-serif text-white mb-1">{results.totalPieces}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Piezas Totales</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function UpdateProjectStatusButton({ projectId, currentStatus }: { projectId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    const result = await updateProjectStatus(projectId, newStatus);
    setIsUpdating(false);
    
    if (!result.success) {
      alert("Error: " + result.error);
    }
  };

  return (
    <select 
      disabled={isUpdating}
      value={currentStatus}
      onChange={handleUpdate}
      className="ml-4 bg-transparent text-[10px] text-slate-400 hover:text-white uppercase tracking-widest outline-none cursor-pointer disabled:opacity-50 border-b border-slate-600 focus:border-amber-500 pb-1"
    >
      <option value="PLANOS">PLANOS</option>
      <option value="COTIZANDO">COTIZANDO</option>
      <option value="APROBADO">APROBADO</option>
      <option value="PRODUCCION">PRODUCCION</option>
      <option value="INSTALACION">INSTALACION</option>
      <option value="ENTREGADO">ENTREGADO</option>
    </select>
  );
}
