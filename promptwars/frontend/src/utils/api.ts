export const fetchLiveData = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching live data', error);
    return null;
  }
};

export const fetchAiChat = async (message: string) => {
  try {
    const res = await fetch('http://localhost:5000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error('Error in AI chat', error);
    // Local fallback AI for development when backend is unavailable
    const msg = message.toLowerCase();
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(400 + Math.random() * 400);

    if (msg.includes('gate') || msg.includes('seat')) return 'Gate C is to your right; follow the blue signs and the shortest route avoids stairs.';
    if (msg.includes('restroom')) return 'The North restroom currently has the shortest queue — about 3 minutes.';
    if (msg.includes('vegetarian') || msg.includes('vegan')) return 'Try the Green Kiosk near Section 112 — they have great vegetarian options.';
    if (msg.includes('exit') || msg.includes('leave')) return 'After the match, exits A and C are least crowded; consider heading to Exit C.';
    if (msg.includes('parking')) return 'Parking Lot B has the most availability — it is a 7 minute walk from the stadium.';
    if (msg.includes('traffic')) return 'Traffic is light on main routes; shuttles are recommended if you prefer to avoid driving.';
    if (msg.includes('hello') || msg.includes('hi')) return 'Hi there — how can I help you find things around the stadium today?';

    return "I'm here to help — try asking where Gate C is, or which restroom has the shortest queue.";
  }
};

export const fetchAiSummary = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/ai/summary');
    const data = await res.json();
    return data.summary;
  } catch (error) {
    console.error('Error fetching AI summary', error);
    // Local fallback summary for development
    return [
      '• Monitor Gate B queues — load rising, consider redeploying two volunteers.',
      '• Recommend opening additional food points near North Wing to reduce wait times.',
      '• Traffic: normal; advise buses to use dedicated shuttle lane after match.'
    ].join('\n');
  }
};
