"use client";

import { useState } from "react";
import { addBoardInventory, addHardwareInventory } from "@/modules/inventory/application/actions";

export function AddBoardForm({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm w-full max-w-md shadow-2xl">
        <h3 className="text-lg font-serif text-white mb-4">Añadir Nuevo Tablero</h3>
        <form 
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const formData = new FormData(e.currentTarget);
            const res = await addBoardInventory(formData);
            setIsSubmitting(false);
            if (res.success) onClose();
            else alert(res.error);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Material</label>
              <input name="material" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="Ej: Melamina RH" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Color/Diseño</label>
              <input name="color" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="Ej: Blanco Frost" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ancho (mm)</label>
              <input name="width" type="number" step="0.1" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" defaultValue="1220" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Alto (mm)</label>
              <input name="height" type="number" step="0.1" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" defaultValue="2440" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Espesor (mm)</label>
              <input name="thickness" type="number" step="0.1" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" defaultValue="18" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Costo Unit. ($)</label>
              <input name="cost" type="number" step="0.01" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="0.00" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Cantidad Inicial</label>
              <input name="quantity" type="number" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" defaultValue="0" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-medium transition-colors disabled:opacity-50">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddHardwareForm({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm w-full max-w-md shadow-2xl">
        <h3 className="text-lg font-serif text-white mb-4">Añadir Nuevo Herraje</h3>
        <form 
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const formData = new FormData(e.currentTarget);
            const res = await addHardwareInventory(formData);
            setIsSubmitting(false);
            if (res.success) onClose();
            else alert(res.error);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Tipo de Herraje</label>
              <input name="type" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="Ej: Bisagra Cierre Lento" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Marca</label>
              <input name="brand" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="Ej: Blum" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Modelo</label>
              <input name="model" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="Ej: CLIP top" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Costo Unit. ($)</label>
              <input name="cost" type="number" step="0.01" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Cantidad Inicial</label>
              <input name="quantity" type="number" required className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-sm text-white" defaultValue="0" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-medium transition-colors disabled:opacity-50">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function InventoryHeaderButtons() {
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showHardwareForm, setShowHardwareForm] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button onClick={() => setShowBoardForm(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-sm text-[10px] md:text-xs uppercase tracking-widest font-medium transition-colors shadow-lg shadow-emerald-900/20">
          + Tablero
        </button>
        <button onClick={() => setShowHardwareForm(true)} className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-sm text-[10px] md:text-xs uppercase tracking-widest font-medium transition-colors shadow-lg shadow-amber-900/20">
          + Herraje
        </button>
      </div>
      {showBoardForm && <AddBoardForm onClose={() => setShowBoardForm(false)} />}
      {showHardwareForm && <AddHardwareForm onClose={() => setShowHardwareForm(false)} />}
    </>
  );
}
