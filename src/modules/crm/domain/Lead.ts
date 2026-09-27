export type LeadStatus = 'NUEVO' | 'CONTACTADO' | 'COTIZANDO' | 'CERRADO' | 'PERDIDO';

export interface ILead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Lead implements ILead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ILead) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.status = data.status;
    this.notes = data.notes;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  updateStatus(newStatus: LeadStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  addNote(note: string): void {
    this.notes += `\n[${new Date().toISOString()}] ${note}`;
    this.updatedAt = new Date();
  }
}
