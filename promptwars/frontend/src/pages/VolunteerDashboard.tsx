import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '../hooks/useLiveData';
import { Users, ShieldCheck, MapPin, MessageCircle } from 'lucide-react';

const VolunteerDashboard = () => {
  const data = useLiveData();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    setTasks([
      { id: 1, title: 'Guide fans to Gate B', status: 'In progress' },
      { id: 2, title: 'Check accessibility row 12', status: 'Pending' },
      { id: 3, title: 'Report maintenance at East Plaza', status: 'Assigned' },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('stadiummind-auth');
    localStorage.removeItem('stadiummind-role');
    navigate('/');
  };

  if (!data) {
    return <div className="flex h-screen items-center justify-center text-white">Loading volunteer hub...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Volunteer Hub</h1>
          <p className="text-gray-400">Your mission control for guest support and stadium operations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass px-4 py-2 rounded-md">Assigned Tasks: {tasks.length}</div>
          <div className="glass px-4 py-2 rounded-md">Crowd Load: {data.crowdDensity.toFixed(0)}%</div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 hover:bg-white/10">
            <ShieldCheck size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Current Volunteer Tasks</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{task.title}</div>
                    <div className="text-sm text-gray-400">Status: <span className="text-fifa-teal">{task.status}</span></div>
                  </div>
                  <button className="rounded-xl bg-fifa-blue px-4 py-2 text-sm font-semibold text-white">Update</button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Nearby Support Zones</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ZoneCard icon={MapPin} title="Gate Area" subtitle="Help queueers to their section." />
              <ZoneCard icon={Users} title="Fan Plaza" subtitle="Assist with directions and seating." />
              <ZoneCard icon={MessageCircle} title="Guest Support" subtitle="Answer accessibility and wayfinding questions." />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-fifa-teal px-4 py-3 text-white">Mark Availability</button>
              <button className="w-full rounded-xl bg-fifa-blue px-4 py-3 text-white">Log Incident</button>
              <button className="w-full rounded-xl bg-white/10 px-4 py-3 text-white">Request Assistance</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Live Fan Alerts</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Gate B queue times are low.</li>
              <li>Restrooms open on North concourse.</li>
              <li>Food court service increased by 20%.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ZoneCard = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
    <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-fifa-blue/10 p-3 text-fifa-teal">
      <Icon size={20} />
    </div>
    <div className="font-semibold">{title}</div>
    <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
  </div>
);

export default VolunteerDashboard;
