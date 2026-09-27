import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { InventoryHeaderButtons } from "./AddInventoryForms";

export default async function InventarioPage() {
  const supabase = await createClient();
  
  const { data: boards } = await supabase.from("boards_inventory").select("*").order("material");
  const { data: hardware } = await supabase.from("hardware_inventory").select("*").order("type");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Inventario General</h2>
          <p className="text-slate-400 mt-1 text-sm tracking-wide">Control de tableros melamínicos y herrajes premium.</p>
        </div>
        <InventoryHeaderButtons />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TABLEROS */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-widest text-slate-300 font-semibold border-l-2 border-emerald-500 pl-3">
            Tableros (Melamina / MDF)
          </h3>
          
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-sm overflow-hidden shadow-2xl backdrop-blur-sm">
            {boards?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 text-sm">No hay tableros registrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-800">
                      <th className="p-4 font-semibold">Material</th>
                      <th className="p-4 font-semibold text-center">Formato (mm)</th>
                      <th className="p-4 font-semibold text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-sm">
                    {boards?.map((board) => (
                      <tr key={board.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-slate-200">{board.material}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">{board.color} - {board.thickness}mm</p>
                        </td>
                        <td className="p-4 text-slate-400 text-center">
                          {board.width} x {board.height}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-sm text-xs font-bold ${
                            board.available_quantity > 5 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                          }`}>
                            {board.available_quantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* HERRAJES */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-widest text-slate-300 font-semibold border-l-2 border-amber-500 pl-3">
            Herrajes Premium
          </h3>
          
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-sm overflow-hidden shadow-2xl backdrop-blur-sm">
            {hardware?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 text-sm">No hay herrajes registrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-800">
                      <th className="p-4 font-semibold">Tipo</th>
                      <th className="p-4 font-semibold text-center">Marca / Modelo</th>
                      <th className="p-4 font-semibold text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-sm">
                    {hardware?.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-slate-200">{item.type}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="text-slate-300 text-xs">{item.brand}</p>
                          <p className="text-[10px] text-slate-500">{item.model}</p>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-sm text-xs font-bold ${
                            item.available_quantity > 10 ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                          }`}>
                            {item.available_quantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
