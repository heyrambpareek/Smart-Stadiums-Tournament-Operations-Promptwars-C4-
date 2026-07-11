import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '../hooks/useLiveData';
import { Activity, ShieldCheck, LayoutDashboard, BarChart3, Users } from 'lucide-react';

const AdminDashboard = () => {
  const data = useLiveData();
  const navigate = useNavigate();
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    setPendingApprovals(7);
    setAlerts([
      'Vendor permit review pending for East Plaza concession.',
      'Communication system update required in Zone C.',
      'Staff shift swap requested for 21:00.',
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('stadiummind-auth');
    localStorage.removeItem('stadiummind-role');
    navigate('/');
  };

  if (!data) {
    return <div className="flex h-screen items-center justify-center text-white">Loading admin view...</div>;
  }

  return (
    <div className="p-6 max-w-8xl mx-auto space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><LayoutDashboard className="text-fifa-teal" /> Administrative HQ</h1>
          <p className="text-gray-400">Executive operational control for stadium-wide coordination.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass px-4 py-2 rounded-md">Pending Approvals: {pendingApprovals}</div>
          <div className="glass px-4 py-2 rounded-md">Avg Crowd Density: {data.crowdDensity.toFixed(0)}%</div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 hover:bg-white/10">
            <ShieldCheck size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Operations Summary</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryCard title="Total Capacity" value="82,400" icon={Users} />
              <SummaryCard title="Active Volunteers" value={data.activeVolunteers.toString()} icon={ShieldCheck} />
              <SummaryCard title="Queue Stability" value={`${Math.round((data.queues.gateA + data.queues.gateB + data.queues.gateC) / 3)}m`} icon={BarChart3} />
              <SummaryCard title="Emergencies" value={data.activeEmergencies.toString()} icon={Activity} warning={data.activeEmergencies > 0} />
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Leadership Alerts</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              {alerts.map((alert, index) => (
                <li key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">{alert}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Executive Actions</h3>
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-fifa-blue px-4 py-3 text-white">Approve Resource Requests</button>
              <button className="w-full rounded-xl bg-fifa-teal px-4 py-3 text-white">Review Security Briefing</button>
              <button className="w-full rounded-xl bg-white/10 px-4 py-3 text-white">Authorize Emergency Response</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Staff Insights</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between"><span>Shift rotas due</span><span className="font-semibold text-white">15 min</span></div>
              <div className="flex items-center justify-between"><span>Vendor approvals</span><span className="font-semibold text-white">7 pending</span></div>
              <div className="flex items-center justify-between"><span>System uptime</span><span className="font-semibold text-white">99.99%</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, warning = false }: { title: string; value: string; icon: any; warning?: boolean }) => (
  <div className={`rounded-3xl border border-white/10 bg-white/5 p-5 ${warning ? 'ring-2 ring-fifa-red/30' : ''}`}>
    <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-fifa-blue/10 p-3 text-fifa-teal">
      <Icon size={20} />
    </div>
    <p className="text-sm text-gray-400">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
  </div>
);

export default AdminDashboard;
