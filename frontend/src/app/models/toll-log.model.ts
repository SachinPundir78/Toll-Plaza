export type VehicleType = 'Car' | 'Truck' | 'Motorcycle';
export type TollStatus = 'Paid' | 'Pending' | 'Violation';

export interface TollLog {
  _id?: string;
  licensePlate: string;
  vehicleType: VehicleType;
  isOfficial: boolean;
  timestamp: string;
  tollFee: number;
  status: TollStatus;
}

export interface CreateTollLogRequest {
  licensePlate: string;
  vehicleType: VehicleType;
  isOfficial: boolean;
  status: TollStatus;
}

export interface UpdateTollLogRequest {
  licensePlate: string;
  vehicleType: VehicleType;
  isOfficial: boolean;
  status: TollStatus;
}
