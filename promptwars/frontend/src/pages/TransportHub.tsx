import { useLiveData } from '../hooks/useLiveData';
import { Bus, Train, Car, Navigation, MapPin } from 'lucide-react';

const TransportHub = () => {
  const data = useLiveData();

  if (!data) return <div className="p-8">Loading transport data...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Transportation Hub</h1>
        <p className="text-gray-400">Live travel intelligence for your journey home.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 flex flex-col justify-center text-center">
          <Car className="mx-auto text-fifa-teal mb-4" size={32} />
          <h3 className="text-gray-400 mb-2">Parking Availability</h3>
          <p className="text-4xl font-bold">{data.parkingAvailability} <span className="text-xl text-gray-500 font-normal">spots</span></p>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-center text-center">
          <MapPin className="mx-auto text-fifa-yellow mb-4" size={32} />
          <h3 className="text-gray-400 mb-2">Surrounding Traffic</h3>
          <p className="text-4xl font-bold capitalize text-fifa-yellow">{data.traffic}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-0 overflow-hidden">
          <div className="p-6 bg-fifa-blue/10 border-b border-white/10 flex items-center gap-3">
            <Train className="text-fifa-blue" />
            <h2 className="text-xl font-bold">Metro & Rail</h2>
          </div>
          <div className="p-6 space-y-4">
            <TransportRoute line="Red Line - City Center" time="3 mins" status="On Time" />
            <TransportRoute line="Blue Line - Airport" time="7 mins" status="On Time" />
            <TransportRoute line="Green Line - North Suburbs" time="12 mins" status="Delayed" />
          </div>
        </div>

        <div className="glass-card p-0 overflow-hidden">
          <div className="p-6 bg-fifa-teal/10 border-b border-white/10 flex items-center gap-3">
            <Bus className="text-fifa-teal" />
            <h2 className="text-xl font-bold">Shuttle Buses</h2>
          </div>
          <div className="p-6 space-y-4">
            <TransportRoute line="Shuttle A (Downtown)" time="Boarding Now" status="Active" />
            <TransportRoute line="Shuttle B (Central Station)" time="5 mins" status="Active" />
            <TransportRoute line="Shuttle C (West Parking)" time="10 mins" status="Active" />
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 border-l-4 border-l-fifa-blue bg-fifa-blue/5">
        <div className="flex items-start gap-4">
          <Navigation className="text-fifa-blue mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-1">AI Recommendation</h3>
            <p className="text-gray-300">
              {data.traffic === 'Heavy' 
                ? "Traffic is heavy around the stadium. We recommend taking the Metro Red Line for the fastest journey to the City Center."
                : "Traffic is flowing normally. Shuttle buses and taxis are good options for your journey."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransportRoute = ({ line, time, status }: { line: string, time: string, status: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    <span className="font-medium">{line}</span>
    <div className="flex items-center gap-4">
      <span className={status === 'Delayed' ? 'text-fifa-red font-bold' : 'text-gray-300'}>{time}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${status === 'On Time' || status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-fifa-red/20 text-fifa-red'}`}>
        {status}
      </span>
    </div>
  </div>
);

export default TransportHub;
