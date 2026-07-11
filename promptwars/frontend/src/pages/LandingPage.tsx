import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, Navigation, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fifa-teal/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fifa-blue/20 blur-[120px] rounded-full" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Future of <br/>
            <span className="text-gradient">Stadium Operations</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience the FIFA World Cup 2026 with an AI-powered command center. Real-time intelligence for fans, organizers, and volunteers.
          </p>
          
          <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/fan" className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-fifa-teal to-fifa-blue text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Fan Experience <ArrowRight size={20} />
            </Link>
            <Link to="/organizer" className="w-full px-8 py-4 rounded-full glass border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              Organizer Dashboard
            </Link>
            <Link to="/volunteer-login" className="w-full px-8 py-4 rounded-full bg-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
              Volunteer Login
            </Link>
            <Link to="/admin-login" className="w-full px-8 py-4 rounded-full bg-fifa-blue/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-fifa-blue/20 transition-colors">
              Admin Login
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeatureCard 
            icon={Navigation}
            title="AI Navigation"
            description="Find seats, restrooms, and food with intelligent, real-time routing."
          />
          <FeatureCard 
            icon={ShieldAlert}
            title="Live Crowd Intelligence"
            description="Predict queues, manage density, and prevent overcrowding instantly."
          />
          <FeatureCard 
            icon={Settings}
            title="Decision Support"
            description="AI-generated actionable insights for stadium organizers."
          />
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-6 text-left hover:scale-[1.02] transition-transform">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-4">
      <Icon className="text-fifa-teal" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default LandingPage;
