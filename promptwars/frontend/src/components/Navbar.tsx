import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Navigation, Bus, Settings, Leaf, LogIn, LogOut, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('stadiummind-auth') === 'true');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('stadiummind-auth');
    localStorage.removeItem('stadiummind-role');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navItems = [
    { name: 'Fan', path: '/fan', icon: Navigation },
    { name: 'Volunteer', path: '/volunteer', icon: Users },
    { name: 'Admin', path: '/admin', icon: ShieldCheck },
    { name: 'Assistant', path: '/assistant', icon: MessageSquare },
    { name: 'Transport', path: '/transport', icon: Bus },
    { name: 'Eco', path: '/sustainability', icon: Leaf },
    { name: 'Organizer', path: '/organizer', icon: LayoutDashboard },
    { name: 'AI Decision', path: '/decision-center', icon: Settings },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fifa-teal to-fifa-blue flex items-center justify-center">
                <span className="font-bold text-white text-sm">SM</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Stadium<span className="text-fifa-teal">Mind</span> AI
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <span className={`flex items-center gap-2 relative z-10 ${active ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                      <item.icon size={16} />
                      {item.name}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-md"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="ml-2 flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="ml-2 flex items-center gap-2 rounded-md bg-gradient-to-r from-fifa-teal to-fifa-blue px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
