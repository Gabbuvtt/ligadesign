"use server";

import { createClient } from "@/modules/shared/infrastructure/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveProjectQuotationParams(projectId: string, type: string, budget: number) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("projects")
      .update({
        budget,
        quotation_params: { type }
      })
      .eq("id", projectId);

    if (error) throw error;
    revalidatePath(`/admin/taller/${projectId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error saving quotation params:", error);
    return { success: false, error: "No se pudieron guardar los parámetros" };
  }
}

export type CuttingPiece = {
  id: string;
  description: string;
  quantity: number;
  width: number;
  height: number;
};

export async function saveCuttingList(projectId: string, pieces: CuttingPiece[]) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("projects")
      .update({
        cutting_list: pieces
      })
      .eq("id", projectId);

    if (error) throw error;
    revalidatePath(`/admin/taller/${projectId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error saving cutting list:", error);
    return { success: false, error: "No se pudo guardar la lista de corte" };
  }
}

export async function updateProjectStatus(projectId: string, status: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", projectId);

    if (error) throw error;
    revalidatePath(`/admin/taller/${projectId}`);
    revalidatePath(`/admin/taller`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating project status:", error);
    return { success: false, error: "No se pudo actualizar el estado" };
  }
}
