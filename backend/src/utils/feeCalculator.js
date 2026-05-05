const FEE_BY_VEHICLE = {
  Car: 5,
  Motorcycle: 2,
  Truck: 10,
};

const calculateTollFee = ({ vehicleType, isOfficial }) => {
  if (isOfficial) {
    return 0;
  }

  return FEE_BY_VEHICLE[vehicleType] ?? 0;
};

module.exports = {
  calculateTollFee,
};
