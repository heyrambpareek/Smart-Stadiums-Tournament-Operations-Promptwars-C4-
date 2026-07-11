import { useState, useEffect } from 'react';
import { fetchAiSummary } from '../utils/api';
import { useLiveData } from '../hooks/useLiveData';
import { BrainCircuit, RefreshCw, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const AiDecisionCenter = () => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const data = useLiveData();

  const getSummary = async () => {
    setIsLoading(true);
    const result = await fetchAiSummary();
    setSummary(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getSummary();
    // Auto-refresh every 30 seconds
    const interval = setInterval(getSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  const lines = summary.split('\\n').filter(l => l.trim() !== '');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BrainCircuit className="text-fifa-teal" /> AI Decision Center
          </h1>
          <p className="text-gray-400">Automated operational intelligence & recommendations</p>
        </div>
        <button 
          onClick={getSummary}
          disabled={isLoading}
          className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          Refresh Insights
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-fifa-teal">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="text-fifa-teal" /> Recommended Actions
            </h2>
            
            {isLoading && lines.length === 0 ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                <div className="h-12 bg-white/5 rounded-lg w-3/4"></div>
                <div className="h-12 bg-white/5 rounded-lg w-5/6"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {lines.map((line, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4"
                  >
                    <div className="mt-1">
                      {line.toLowerCase().includes('emergency') || line.toLowerCase().includes('overcrowded') ? (
                        <AlertTriangle className="text-fifa-red" size={20} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-fifa-teal mt-2" />
                      )}
                    </div>
                    <p className="text-lg leading-relaxed text-gray-200">{line.replace('• ', '')}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-300">Live Context Matrix</h3>
            {data ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">Threat Level</span>
                  <span className={data.activeEmergencies > 0 ? "text-fifa-red font-bold" : "text-green-500 font-bold"}>
                    {data.activeEmergencies > 0 ? "ELEVATED" : "NORMAL"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">Crowd Load</span>
                  <span className="font-bold text-white">{data.crowdDensity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">Traffic Status</span>
                  <span className="font-bold text-fifa-yellow">{data.traffic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Volunteers</span>
                  <span className="font-bold text-fifa-teal">{data.activeVolunteers}</span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse h-32 bg-white/5 rounded-lg"></div>
            )}
          </div>
          
          <div className="glass-card p-6 bg-gradient-to-br from-fifa-blue/20 to-transparent">
            <h3 className="font-bold text-lg mb-2">Automated Dispatch</h3>
            <p className="text-sm text-gray-400 mb-4">AI can automatically dispatch volunteers based on these recommendations.</p>
            <button className="w-full py-3 rounded-xl bg-fifa-blue text-white font-semibold hover:opacity-90 transition-opacity">
              Enable Auto-Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDecisionCenter;
