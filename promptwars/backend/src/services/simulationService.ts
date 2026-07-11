// @ts-nocheck
export let liveData = {
  crowdDensity: 45, // percentage
  temperature: 24, // celsius
  parkingAvailability: 320,
  activeEmergencies: 0,
  activeVolunteers: 150,
  queues: {
    gateA: 15, // minutes
    gateB: 5,
    gateC: 22,
    foodCourt1: 8,
    restroomNorth: 2,
  },
  traffic: 'Moderate',
  sustainability: {
    carbonSaved: 1240, // kg
    bottlesRefilled: 4500,
  }
};

export const startSimulation = () => {
  setInterval(() => {
    // Simulate changing conditions
    liveData.crowdDensity = Math.max(10, Math.min(100, liveData.crowdDensity + (Math.random() * 6 - 3)));
    liveData.temperature += (Math.random() * 0.4 - 0.2);
    liveData.parkingAvailability = Math.max(0, liveData.parkingAvailability + Math.floor(Math.random() * 20 - 15));
    
    // Simulate queues
    liveData.queues.gateA = Math.max(0, liveData.queues.gateA + Math.floor(Math.random() * 4 - 2));
    liveData.queues.gateB = Math.max(0, liveData.queues.gateB + Math.floor(Math.random() * 4 - 2));
    liveData.queues.gateC = Math.max(0, liveData.queues.gateC + Math.floor(Math.random() * 4 - 2));
    
    // Random emergency event (1% chance every tick)
    if (Math.random() < 0.01) {
      liveData.activeEmergencies += 1;
      setTimeout(() => { liveData.activeEmergencies -= 1; }, 60000); // Clear after 1 min
    }

    liveData.sustainability.carbonSaved += Math.floor(Math.random() * 5);
    liveData.sustainability.bottlesRefilled += Math.floor(Math.random() * 10);
    
  }, 3000); // Update every 3 seconds
};

export const getLiveData = () => {
  return liveData;
};
