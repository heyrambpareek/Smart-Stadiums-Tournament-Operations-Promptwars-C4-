import { useLiveData } from '../hooks/useLiveData';
import { Leaf, Droplets, Recycle, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const SustainabilityDashboard = () => {
  const data = useLiveData();

  if (!data) return <div className="p-8">Loading eco data...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
          <Leaf size={32} />
        </div>
        <h1 className="text-3xl font-bold">Green Stadium Initiative</h1>
        <p className="text-gray-400 mt-2">Track our collective environmental impact during the match.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 flex flex-col items-center justify-center text-center border-t-4 border-t-green-500"
        >
          <Wind className="text-green-500 mb-4" size={40} />
          <h3 className="text-xl text-gray-400 mb-2">Carbon Footprint Saved</h3>
          <p className="text-5xl font-bold text-white mb-2">
            {data.sustainability.carbonSaved.toLocaleString()} <span className="text-2xl text-gray-500 font-normal">kg</span>
          </p>
          <p className="text-sm text-green-400">Equivalent to planting 52 trees today.</p>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col items-center justify-center text-center border-t-4 border-t-blue-500"
        >
          <Droplets className="text-blue-500 mb-4" size={40} />
          <h3 className="text-xl text-gray-400 mb-2">Plastic Bottles Avoided</h3>
          <p className="text-5xl font-bold text-white mb-2">
            {data.sustainability.bottlesRefilled.toLocaleString()}
          </p>
          <p className="text-sm text-blue-400">via smart water refill stations.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Recycle size={20} className="text-green-400"/> Waste Segregation Guide</h2>
          <div className="space-y-4">
            <GuideItem color="bg-blue-500" title="Recyclables" desc="Plastic cups, clean paper, aluminum cans." />
            <GuideItem color="bg-yellow-500" title="Compost" desc="Food scraps, biodegradable containers." />
            <GuideItem color="bg-gray-500" title="Landfill" desc="Wrappers, heavily soiled paper." />
          </div>
        </div>

        <div className="glass-card p-6 bg-gradient-to-br from-green-900/30 to-transparent">
          <h2 className="text-xl font-bold mb-4">Eco Rewards</h2>
          <p className="text-gray-300 mb-6">Earn points by using digital tickets, public transport, and refillable water bottles. Redeem points for exclusive merchandise!</p>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/10">
            <div>
              <p className="text-sm text-gray-400">Your Current Points</p>
              <p className="text-2xl font-bold text-fifa-yellow">450 pts</p>
            </div>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors">
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideItem = ({ color, title, desc }: { color: string, title: string, desc: string }) => (
  <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
    <div className={`w-4 h-4 mt-1 rounded-full ${color}`} />
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  </div>
);

export default SustainabilityDashboard;
