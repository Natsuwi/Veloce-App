import { Vehicle, Intervention } from './types';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Company Audi',
    model: 'Audi A4 Avant',
    year: 2021,
    licensePlate: 'AB-123-CD',
    mileage: 45200,
    status: 'active',
    nextServiceDate: '2023-11-15',
    image: 'https://picsum.photos/id/111/400/300'
  },
  {
    id: 'v2',
    name: 'Delivery Van',
    model: 'Peugeot Expert',
    year: 2019,
    licensePlate: 'XY-987-ZZ',
    mileage: 120500,
    status: 'service-needed',
    nextServiceDate: '2023-10-28',
    image: 'https://picsum.photos/id/183/400/300'
  },
  {
    id: 'v3',
    name: 'Manager Sedan',
    model: 'Tesla Model 3',
    year: 2022,
    licensePlate: 'EL-001-ON',
    mileage: 28000,
    status: 'active',
    nextServiceDate: '2024-02-10',
    image: 'https://picsum.photos/id/133/400/300'
  }
];

export const MOCK_INTERVENTIONS: Intervention[] = [
  { id: 'i1', vehicleId: 'v1', type: 'Oil Change', date: '2023-11-15', cost: 150, status: 'planned' },
  { id: 'i2', vehicleId: 'v2', type: 'Brakes', date: '2023-10-28', cost: 450, status: 'overdue' },
  { id: 'i3', vehicleId: 'v3', type: 'Inspection', date: '2023-09-10', cost: 0, status: 'completed' },
  { id: 'i4', vehicleId: 'v1', type: 'Tire Rotation', date: '2023-06-20', cost: 80, status: 'completed' },
  { id: 'i5', vehicleId: 'v2', type: 'General Repair', date: '2023-05-15', cost: 1200, status: 'completed' },
  { id: 'i6', vehicleId: 'v2', type: 'Oil Change', date: '2023-12-05', cost: 150, status: 'planned' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
  { id: 'calendar', label: 'Calendar', iconName: 'Calendar' },
  { id: 'vehicles', label: 'Vehicles', iconName: 'Car' },
  { id: 'interventions', label: 'Maintenance', iconName: 'Wrench' },
  { id: 'stats', label: 'Statistics', iconName: 'BarChart3' },
  { id: 'settings', label: 'Settings', iconName: 'Settings' },
];