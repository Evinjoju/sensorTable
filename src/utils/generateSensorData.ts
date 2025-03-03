const NUM_SENSORS = 15;
const SECONDS_IN_2_MONTHS = 5184000; 


export const generateSensorRow = (rowIndex: number, numSensors: number = 1000): string[] => {
  if (rowIndex >= SECONDS_IN_2_MONTHS) {
    return [];
  }

  return Array.from({ length: NUM_SENSORS }, () => (Math.random() * 10).toFixed(2));
};
