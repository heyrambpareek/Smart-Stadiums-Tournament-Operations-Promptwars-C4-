import { useLiveData } from '../hooks/useLiveData';
import { Activity, Users, AlertTriangle, Battery, Navigation, Bus, Ticket } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

const mockChartData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  density: 40 + Math.random() * 40
}));

const OrganizerDashboard = () => {
  const data = useLiveData();
  const [chartData, setChartData] = useState(mockChartData);

  useEffect(() => {
    if (data) {
      setChartData(prev => {
        const next = [...prev.slice(1), { time: new Date().toLocaleTimeString().slice(0, 5), density: data.crowdDensity }];
        return next;
      });
    }
  }, [data]);

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Organizer Command Center</h1>
          <p className="text-gray-400">Live operational overview</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${data.activeEmergencies > 0 ? 'bg-fifa-red' : 'bg-green-500'}`} />
            <span className="font-semibold text-sm">System Status</span>
          </div>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Total Capacity" value="82,400" icon={Ticket} />
        <KpiCard title="Active Volunteers" value={data.activeVolunteers} icon={Users} highlight />
        <KpiCard title="Avg Queue Time" value={`${Math.round((data.queues.gateA + data.queues.gateB + data.queues.gateC) / 3)}m`} icon={Activity} />
        <KpiCard title="Emergencies" value={data.activeEmergencies} icon={AlertTriangle} alert={data.activeEmergencies > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">Crowd Density Trends</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A499" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A499" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#444" fontSize={12} />
                <YAxis stroke="#444" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="density" stroke="#00A499" strokeWidth={3} fillOpacity={1} fill="url(#colorDensity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Navigation className="text-fifa-teal" size={20} />
                <span className="font-semibold">Update Signage Routing</span>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-fifa-blue" size={20} />
                <span className="font-semibold">Deploy Volunteer Team</span>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-xl bg-fifa-red/20 border border-fifa-red/50 hover:bg-fifa-red/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-fifa-red" size={20} />
                <span className="font-semibold text-fifa-red">Trigger Emergency Protocol</span>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Infrastructure Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 flex items-center gap-2"><Bus size={16}/> Transport</span>
                <span className="text-fifa-yellow">{data.traffic}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 flex items-center gap-2"><Battery size={16}/> Power</span>
                <span className="text-green-500">Stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon: Icon, highlight = false, alert = false }: any) => (
  <div className={`glass-card p-4 flex items-center gap-4 border-l-4 ${highlight ? 'border-l-fifa-blue' : alert ? 'border-l-fifa-red' : 'border-l-fifa-teal'}`}>
    <div className={`p-3 rounded-xl bg-white/5 ${alert ? 'text-fifa-red animate-pulse' : 'text-gray-300'}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default OrganizerDashboard;
