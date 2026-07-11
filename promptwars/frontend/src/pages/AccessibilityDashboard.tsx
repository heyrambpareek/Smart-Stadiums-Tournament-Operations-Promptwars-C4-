import { Eye, Volume2, Maximize, Navigation, Heart, ShieldPlus } from 'lucide-react';
import { useState } from 'react';

const AccessibilityDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  return (
    <div className={`p-6 max-w-7xl mx-auto space-y-6 ${highContrast ? 'grayscale contrast-125' : ''} ${largeText ? 'text-lg' : ''}`}>
      <header className="mb-8">
        <h1 className={`${largeText ? 'text-4xl' : 'text-3xl'} font-bold flex items-center gap-3`}>
          <Heart className="text-fifa-red" /> Inclusive Experience
        </h1>
        <p className="text-gray-400 mt-2">Tools and services to make your visit comfortable and accessible.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button 
          onClick={() => setVoiceMode(!voiceMode)}
          className={`glass-card p-6 flex flex-col items-center justify-center gap-3 border-2 transition-colors ${voiceMode ? 'border-fifa-blue bg-fifa-blue/10' : 'border-transparent'}`}
        >
          <Volume2 size={32} className={voiceMode ? 'text-fifa-blue' : 'text-gray-400'} />
          <span className="font-semibold">Voice Assistance</span>
          <span className="text-xs text-gray-400">{voiceMode ? 'Active' : 'Tap to enable'}</span>
        </button>

        <button 
          onClick={() => setLargeText(!largeText)}
          className={`glass-card p-6 flex flex-col items-center justify-center gap-3 border-2 transition-colors ${largeText ? 'border-fifa-teal bg-fifa-teal/10' : 'border-transparent'}`}
        >
          <Maximize size={32} className={largeText ? 'text-fifa-teal' : 'text-gray-400'} />
          <span className="font-semibold">Large Text</span>
          <span className="text-xs text-gray-400">{largeText ? 'Active' : 'Tap to enable'}</span>
        </button>

        <button 
          onClick={() => setHighContrast(!highContrast)}
          className={`glass-card p-6 flex flex-col items-center justify-center gap-3 border-2 transition-colors ${highContrast ? 'border-white bg-white/10' : 'border-transparent'}`}
        >
          <Eye size={32} className={highContrast ? 'text-white' : 'text-gray-400'} />
          <span className="font-semibold">High Contrast</span>
          <span className="text-xs text-gray-400">{highContrast ? 'Active' : 'Tap to enable'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Navigation className="text-fifa-teal" /> Wheelchair Accessible Routes
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-bold">Gate A to Section 112</h3>
              <p className="text-sm text-gray-400 mt-1">Elevator access via Concourse B. Avoid stairs near Gate B.</p>
              <button className="mt-3 text-sm text-fifa-teal font-semibold hover:underline">Start Route Guidance</button>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-bold">Nearest Accessible Restroom</h3>
              <p className="text-sm text-gray-400 mt-1">Located in North Wing, next to Food Court 1.</p>
              <button className="mt-3 text-sm text-fifa-teal font-semibold hover:underline">Start Route Guidance</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-0 overflow-hidden relative min-h-[250px] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-fifa-blue/30 to-fifa-teal/10" />
             <div className="text-center relative z-10 p-6">
               <ShieldPlus size={48} className="mx-auto mb-4 text-fifa-blue" />
               <h3 className="text-xl font-bold mb-2">Sign Language Interpretation</h3>
               <p className="text-gray-300 text-sm mb-4">Connect instantly with a live interpreter for assistance.</p>
               <button className="px-6 py-3 bg-fifa-blue text-white font-semibold rounded-full hover:opacity-90 transition-opacity">
                 Connect Video Call
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityDashboard;
