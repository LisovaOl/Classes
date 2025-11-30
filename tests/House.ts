class House {
  // властивості
  roomCount: number;
  roomHeight: number;
  roomWeight: number;
  floorCount: number;
  heatingType: string;
  wallMaterial: string;
  isElevator: boolean;
  hallwayCount: number;
  buildType: string;
  address: string;

  // констуктор
  constructor() {}

  // методи
  isLightningAvailable() {
    return true;
  }
  isGasAvailable() {
    return true;
  }
  getWaterPumpStatus() {}
  requestCleaning() {}
}

const house = new House();
