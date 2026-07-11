import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const VolunteerLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter your volunteer credentials.');
      return;
    }

    localStorage.setItem('stadiummind-auth', 'true');
    localStorage.setItem('stadiummind-role', 'volunteer');
    navigate('/volunteer');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_rgba(0,164,153,0.18),_transparent_40%),linear-gradient(135deg,_rgba(7,12,26,1),_rgba(7,24,35,1))]">
      <div className="w-full max-w-3xl rounded-3xl glass-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-fifa-teal/10 flex items-center justify-center text-fifa-teal">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Volunteer Login</h1>
            <p className="text-sm text-gray-400">Access your volunteer mission dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="volunteer.username"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-fifa-red">{error}</div>}

          <div className="flex items-center justify-between">
            <button className="rounded-xl bg-fifa-teal px-5 py-3 text-white font-semibold">Sign In</button>
            <Link to="/" className="text-sm text-gray-300 hover:text-white">Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerLoginPage;
