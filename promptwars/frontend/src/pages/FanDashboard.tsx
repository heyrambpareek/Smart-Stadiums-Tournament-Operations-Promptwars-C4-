import { useLiveData } from '../hooks/useLiveData';
import { Users, Clock, Coffee, ShieldAlert, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FanDashboard = () => {
  const data = useLiveData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('stadiummind-auth');
    localStorage.removeItem('stadiummind-role');
    navigate('/');
  };

  if (!data) {
    return <div className="flex h-screen items-center justify-center text-white">Loading Live Data...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome to the Stadium</h1>
            <p className="text-gray-400">Your live command center for an optimal matchday experience.</p>
          </div>
          <div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={Users} 
          title="Crowd Density" 
          value={`${data.crowdDensity.toFixed(0)}%`} 
          color="text-fifa-blue"
        />
        <MetricCard 
          icon={Clock} 
          title="Gate B Wait" 
          value={`${data.queues.gateB} min`} 
          color="text-fifa-teal"
        />
        <MetricCard 
          icon={Coffee} 
          title="Food Wait" 
          value={`${data.queues.foodCourt1} min`} 
          color="text-fifa-yellow"
        />
        <MetricCard 
          icon={ShieldAlert} 
          title="Security" 
          value={data.activeEmergencies > 0 ? "Alerts Active" : "All Clear"} 
          color={data.activeEmergencies > 0 ? "text-fifa-red" : "text-green-500"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 h-[500px] glass-card rounded-2xl overflow-hidden relative">
          {/* Simulated Map Placeholder */}
          <div className="absolute inset-0 bg-fifa-card/50 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-full h-full border border-white/10 rounded-xl relative overflow-hidden bg-black/40">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-96 border-4 border-green-500/30 rounded-[100px]" />
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-fifa-teal rounded-full animate-pulse flex items-center justify-center"><span className="text-xs">You</span></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-fifa-red rounded-full" title="Gate A"/>
              <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-fifa-yellow rounded-full" title="Food Court"/>
            </div>
            <p className="mt-4 text-sm text-gray-400">Interactive Map Visualization (Simulated)</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Live Queues</h2>
          <QueueItem name="Gate A" time={data.queues.gateA} />
          <QueueItem name="Gate B" time={data.queues.gateB} />
          <QueueItem name="Gate C" time={data.queues.gateC} />
          <QueueItem name="North Restroom" time={data.queues.restroomNorth} />
          <QueueItem name="Food Court 1" time={data.queues.foodCourt1} />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, color }: { icon: any, title: string, value: string | number, color: string }) => (
  <div className="glass-card p-6 flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const QueueItem = ({ name, time }: { name: string, time: number }) => {
  const getStatus = () => {
    if (time < 5) return 'bg-green-500';
    if (time < 15) return 'bg-fifa-yellow';
    return 'bg-fifa-red';
  };

  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{time}m</span>
        <div className={`w-3 h-3 rounded-full ${getStatus()}`} />
      </div>
    </div>
  );
};

export default FanDashboard;
