import { Project } from '../Project';

export interface Board {
  id: string;
  material: string;
  width: number; // in mm
  height: number; // in mm
  thickness: number; // in mm
}

export interface Part {
  id: string;
  width: number;
  height: number;
  quantity: number;
  material: string;
}

export interface CuttingResult {
  totalBoardsNeeded: number;
  wastePercentage: number;
  partsAllocated: number;
  partsUnallocated: number;
}

export class CuttingCalculatorService {
  /**
   * Dummy implementation for calculating cutting optimization.
   * A real implementation would use a 2D bin packing algorithm (e.g. Guillotine cut algorithm).
   */
  public calculateOptimization(project: Project, parts: Part[], boards: Board[]): CuttingResult {
    // Basic logic: Calculate total area of parts and total area of boards to estimate
    let totalPartsArea = 0;
    let partsCount = 0;

    parts.forEach(part => {
      totalPartsArea += (part.width * part.height * part.quantity);
      partsCount += part.quantity;
    });

    if (boards.length === 0) {
      throw new Error('No boards available for calculation');
    }

    // Assume all available boards are of the same size for this simplified example
    const boardArea = boards[0].width * boards[0].height;

    // Add a 15% arbitrary waste factor for the dummy calculation
    const areaWithWaste = totalPartsArea * 1.15;
    
    const boardsNeeded = Math.ceil(areaWithWaste / boardArea);

    const actualWasteArea = (boardsNeeded * boardArea) - totalPartsArea;
    const wastePercentage = (actualWasteArea / (boardsNeeded * boardArea)) * 100;

    return {
      totalBoardsNeeded: boardsNeeded,
      wastePercentage: Number(wastePercentage.toFixed(2)),
      partsAllocated: partsCount,
      partsUnallocated: 0, // In a perfect dummy scenario, all fit
    };
  }
}
