export type VehicleStatus = 'active' | 'archived' | 'service-needed';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  image?: string; // URL placeholder
  status: VehicleStatus;
  nextServiceDate: string;
}

export type InterventionType = 'Oil Change' | 'Tire Rotation' | 'Brakes' | 'Inspection' | 'General Repair';
export type InterventionStatus = 'planned' | 'completed' | 'overdue';

export interface Intervention {
  id: string;
  vehicleId: string;
  type: InterventionType;
  date: string;
  cost: number;
  status: InterventionStatus;
  notes?: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  trend?: number; // percentage
  trendUp?: boolean;
}