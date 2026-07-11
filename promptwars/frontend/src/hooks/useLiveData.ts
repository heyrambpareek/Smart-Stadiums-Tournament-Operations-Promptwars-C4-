import { useState, useEffect } from 'react';
import { fetchLiveData } from '../utils/api';

export interface LiveData {
  crowdDensity: number;
  temperature: number;
  parkingAvailability: number;
  activeEmergencies: number;
  activeVolunteers: number;
  queues: {
    gateA: number;
    gateB: number;
    gateC: number;
    foodCourt1: number;
    restroomNorth: number;
  };
  traffic: string;
  sustainability: {
    carbonSaved: number;
    bottlesRefilled: number;
  };
}

export const useLiveData = () => {
  const createMock = (): LiveData => ({
    crowdDensity: 45 + Math.random() * 25,
    temperature: 20 + Math.random() * 8,
    parkingAvailability: Math.floor(500 + Math.random() * 4500),
    activeEmergencies: Math.random() > 0.95 ? 1 : 0,
    activeVolunteers: Math.floor(30 + Math.random() * 200),
    queues: {
      gateA: Math.floor(1 + Math.random() * 20),
      gateB: Math.floor(1 + Math.random() * 25),
      gateC: Math.floor(1 + Math.random() * 30),
      foodCourt1: Math.floor(1 + Math.random() * 30),
      restroomNorth: Math.floor(1 + Math.random() * 15),
    },
    traffic: Math.random() > 0.85 ? 'Heavy' : 'Normal',
    sustainability: {
      carbonSaved: Math.floor(1000 + Math.random() * 20000),
      bottlesRefilled: Math.floor(100 + Math.random() * 2000),
    }
  });

  const [data, setData] = useState<LiveData | null>(createMock());

  useEffect(() => {
    const getData = async () => {
      const liveData = await fetchLiveData();
      if (liveData) setData(liveData);
      else setData(prev => prev ?? createMock());
    };
    
    getData();
    const interval = setInterval(getData, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return data;
};
