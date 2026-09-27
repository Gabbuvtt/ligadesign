"use server";

import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { revalidatePath } from "next/cache";

export async function addBoardInventory(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const material = formData.get("material") as string;
    const color = formData.get("color") as string;
    const width = parseFloat(formData.get("width") as string);
    const height = parseFloat(formData.get("height") as string);
    const thickness = parseFloat(formData.get("thickness") as string);
    const cost = parseFloat(formData.get("cost") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);

    const { error } = await supabase
      .from("boards_inventory")
      .insert({
        material,
        color,
        width,
        height,
        thickness,
        cost,
        available_quantity: quantity
      });

    if (error) throw error;

    revalidatePath("/admin/inventario");
    return { success: true };
  } catch (error: any) {
    console.error("Error adding board:", error);
    return { success: false, error: error.message || "Error al agregar tablero" };
  }
}

export async function addHardwareInventory(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const type = formData.get("type") as string;
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const cost = parseFloat(formData.get("cost") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);

    const { error } = await supabase
      .from("hardware_inventory")
      .insert({
        type,
        brand,
        model,
        unit_cost: cost,
        available_quantity: quantity
      });

    if (error) throw error;

    revalidatePath("/admin/inventario");
    return { success: true };
  } catch (error: any) {
    console.error("Error adding hardware:", error);
    return { success: false, error: error.message || "Error al agregar herraje" };
  }
}
