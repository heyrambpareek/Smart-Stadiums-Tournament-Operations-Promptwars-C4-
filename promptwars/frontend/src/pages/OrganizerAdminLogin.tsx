import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, UserCheck } from 'lucide-react';

const OrganizerAdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }
    // Simulate an organizer-level login with optional OTP
    if (otp && otp !== '0000') {
      setError('Invalid OTP (try 0000 in dev).');
      return;
    }

    localStorage.setItem('stadiummind-auth', 'true');
    localStorage.setItem('stadiummind-role', 'organizer');
    navigate('/organizer');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-gradient-to-tr from-black via-fifa-blue/10 to-fifa-teal/5">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 glass-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-md bg-fifa-teal/10 flex items-center justify-center">
              <ShieldCheck className="text-fifa-teal" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Organizer Portal</h2>
              <p className="text-sm text-gray-400">Secure access to operations and incident management.</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <UserCheck className="text-fifa-blue mt-1" />
              Manage volunteers, assignments and shifts.
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="text-fifa-blue mt-1" />
              Dispatch teams and handle incidents in real-time.
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="text-fifa-blue mt-1" />
              View crowd heatmaps and KPI trends.
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="p-8 glass-card">
          <h3 className="text-xl font-semibold mb-4">Sign in to Organizer Dashboard</h3>

          <label className="block text-sm text-gray-300">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 mb-3 text-white" placeholder="organizer" />

          <label className="block text-sm text-gray-300">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 mb-3 text-white" placeholder="••••••••" />

          <label className="block text-sm text-gray-300">OTP (dev)</label>
          <input value={otp} onChange={e => setOtp(e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 mb-4 text-white" placeholder="0000" />

          {error && <div className="text-sm text-fifa-red mb-2">{error}</div>}

          <div className="flex items-center justify-between gap-4">
            <button className="px-4 py-2 bg-fifa-blue text-white rounded-md font-semibold">Sign in</button>
            <Link to="/" className="text-sm text-gray-300 hover:underline">Back to public site</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerAdminLogin;
