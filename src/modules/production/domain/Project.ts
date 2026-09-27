export type ProjectStatus = 'PLANOS' | 'COTIZANDO' | 'APROBADO' | 'PRODUCCION' | 'INSTALACION' | 'ENTREGADO';

export interface QuotationParams {
  type: 'METRAJE' | 'LAMINAS' | 'GLOBAL';
  value: number;
  complexityFactor?: number;
}

export interface IProject {
  id: string;
  leadId: string;
  name: string;
  status: ProjectStatus;
  budget: number;
  quotationParams: QuotationParams;
  createdAt: Date;
  updatedAt: Date;
}

export class Project implements IProject {
  id: string;
  leadId: string;
  name: string;
  status: ProjectStatus;
  budget: number;
  quotationParams: QuotationParams;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IProject) {
    this.id = data.id;
    this.leadId = data.leadId;
    this.name = data.name;
    this.status = data.status;
    this.budget = data.budget;
    this.quotationParams = data.quotationParams;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  updateStatus(newStatus: ProjectStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updateQuotationParams(params: QuotationParams): void {
    this.quotationParams = params;
    this.updatedAt = new Date();
  }

  calculateBaseQuotation(): number {
    switch (this.quotationParams.type) {
      case 'METRAJE':
        // Assuming value is square meters and base price per sq meter is some constant, e.g. $150
        return this.quotationParams.value * 150 * (this.quotationParams.complexityFactor || 1);
      case 'LAMINAS':
        // Assuming value is number of boards, e.g. $80 per board processing + material
        return this.quotationParams.value * 80 * (this.quotationParams.complexityFactor || 1);
      case 'GLOBAL':
        return this.quotationParams.value;
      default:
        return 0;
    }
  }
}
