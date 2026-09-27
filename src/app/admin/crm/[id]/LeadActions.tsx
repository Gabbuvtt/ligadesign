"use client";

import { useState } from "react";
import { updateLeadStatus, convertLeadToProject } from "@/modules/crm/application/actions";

export default function LeadActions({ leadId, currentStatus, leadName }: { leadId: string, currentStatus: string, leadName: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    const result = await updateLeadStatus(leadId, newStatus);
    setIsUpdating(false);
    
    if (!result.success) {
      alert("Error: " + result.error);
    }
  };

  const handleConvertToProject = async () => {
    if (isUpdating) return;
    const confirmConvert = confirm(`¿Estás seguro de convertir a ${leadName} en un Proyecto de Taller?`);
    if (!confirmConvert) return;
    
    setIsUpdating(true);
    const result = await convertLeadToProject(leadId, `Proyecto: ${leadName}`);
    setIsUpdating(false);

    if (result.success) {
      alert("Convertido exitosamente!");
      window.location.href = `/admin/taller/${result.projectId}`;
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleConvertToProject}
        disabled={isUpdating || currentStatus === 'CERRADO'} 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-widest font-medium py-3 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
      >
        {currentStatus === 'CERRADO' ? 'Ya es Proyecto' : 'Convertir a Proyecto'}
      </button>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase tracking-widest text-slate-500">Actualizar Estado</label>
        <select 
          disabled={isUpdating}
          value={currentStatus}
          onChange={handleUpdateStatus}
          className="w-full bg-slate-800 text-slate-300 text-xs uppercase tracking-widest font-medium py-3 px-3 rounded-sm border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:border-blue-500"
        >
          <option value="NUEVO">NUEVO</option>
          <option value="CONTACTADO">CONTACTADO</option>
          <option value="PERDIDO">PERDIDO</option>
          <option value="CERRADO" disabled>CERRADO</option>
        </select>
      </div>
    </div>
  );
}
