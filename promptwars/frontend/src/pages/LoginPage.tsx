import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    localStorage.setItem('stadiummind-auth', 'true');
    localStorage.setItem('stadiummind-role', 'fan');
    navigate('/fan');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_rgba(0,164,153,0.22),_transparent_40%),linear-gradient(135deg,_rgba(8,12,26,1),_rgba(7,24,35,1))] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl lg:flex-row">
        <div className="flex-1 bg-gradient-to-br from-fifa-blue/20 via-black/20 to-fifa-teal/20 p-8 md:p-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200">
            <Sparkles size={16} className="text-fifa-teal" />
            Smart stadium access
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white">Welcome back to your matchday command center.</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-300">
            Sign in to unlock live fan guidance, accessibility support, transport alerts, and AI-powered operations.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-fifa-teal" />
              Secure access for fans, staff, and organizers.
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-fifa-teal" />
              Instant alerts for queues, routes, and sustainability perks.
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-fifa-teal" />
              Personalized recommendations based on your journey.
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-white">Login</h2>
          <p className="mt-2 text-gray-400">Use your event credentials to continue.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-gray-300" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-0 placeholder:text-gray-500"
                placeholder="fan@stadium.ai"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-300" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-0 placeholder:text-gray-500"
                placeholder="••••••••"
              />
            </div>

            {error ? <p className="text-sm text-fifa-red">{error}</p> : null}

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fifa-teal to-fifa-blue px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Need access? <Link to="/" className="text-fifa-teal hover:underline">Return to the homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
