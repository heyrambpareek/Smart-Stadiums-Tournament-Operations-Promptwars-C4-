import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const OrganizerLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // In a real app you'd verify credentials. For dev, set organizer role.
    localStorage.setItem('stadiummind-auth', 'true');
    localStorage.setItem('stadiummind-role', 'organizer');
    navigate('/organizer');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl glass-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-fifa-teal/10 flex items-center justify-center">
            <LayoutDashboard className="text-fifa-teal" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Organizer Sign In</h1>
            <p className="text-sm text-gray-400">Secure organizer access to the command center.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="organizer"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-fifa-red">{error}</div>}

          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-fifa-blue text-white rounded-md font-semibold">Sign In</button>
            <Link to="/" className="text-sm text-gray-300 hover:underline">Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerLoginPage;
