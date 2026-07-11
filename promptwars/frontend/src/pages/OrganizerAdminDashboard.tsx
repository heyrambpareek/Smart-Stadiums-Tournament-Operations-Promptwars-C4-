import { useState, useEffect } from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLiveData } from '../hooks/useLiveData';
import { useNavigate } from 'react-router-dom';

const markerIcon = new L.Icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const stadiumBounds: [number, number][][] = [[
  [40.7505, -73.9934],
  [40.7505, -73.9888],
  [40.7473, -73.9888],
  [40.7473, -73.9934],
]];

const points: { id: string; label: string; position: [number, number]; color: string }[] = [
  { id: 'A', label: 'Gate A', position: [40.7499, -73.9928], color: '#38bdf8' },
  { id: 'B', label: 'Gate B', position: [40.7499, -73.9892], color: '#22c55e' },
  { id: 'C', label: 'Medical HQ', position: [40.7488, -73.9913], color: '#fbbf24' },
  { id: 'D', label: 'Concessions', position: [40.7480, -73.9902], color: '#f43f5e' },
];

const OrganizerAdminDashboard = () => {
  const data = useLiveData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('stadiummind-auth');
    localStorage.removeItem('stadiummind-role');
    navigate('/');
  };
  const [incidents, setIncidents] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    // seed mocked incidents and teams for dev
    setIncidents([
      { id: 1, title: 'Minor medical', location: 'Section 112', status: 'responding' },
      { id: 2, title: 'Queue overflow', location: 'Gate B', status: 'monitor' },
    ]);

    setTeams([
      { id: 'T1', name: 'Medical Team A', available: true },
      { id: 'T2', name: 'Volunteer Squad 4', available: false },
    ]);
  }, []);

  const dispatchTeam = (teamId: string, incidentId: number) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, available: false } : t));
    setIncidents(prev => prev.map(i => i.id === incidentId ? { ...i, status: 'responding' } : i));
  };

  return (
    <div className="p-6 max-w-8xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><LayoutDashboard className="text-fifa-teal"/> Organizer Command Center</h1>
          <p className="text-gray-400">Operations overview and quick actions</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="glass px-4 py-2 rounded-md">Live: {data ? `${data.crowdDensity.toFixed(0)}% load` : '—'}</div>
          <div className="glass px-4 py-2 rounded-md">Volunteers: {data ? data.activeVolunteers : '—'}</div>
          <div>
            <button onClick={handleLogout} className="ml-4 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Incident Feed</h2>
            <div className="space-y-3">
              {incidents.map(it => (
                <div key={it.id} className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-gray-400">{it.location} — <span className={it.status === 'responding' ? 'text-fifa-red' : 'text-fifa-yellow'}>{it.status}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-fifa-teal text-black font-semibold">View</button>
                    <button
                      className="px-3 py-1 rounded bg-fifa-blue text-white"
                      onClick={() => dispatchTeam('T1', it.id)}
                    >Dispatch Team</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Operations Map</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <MapContainer center={[40.7495, -73.9916]} zoom={17} scrollWheelZoom={false} className="h-64 w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon positions={stadiumBounds} pathOptions={{ color: '#38bdf8', fillColor: '#0e7490', fillOpacity: 0.12 }} />
                {points.map(point => (
                  <Marker key={point.id} position={point.position} icon={markerIcon}>
                    <Popup>
                      <div className="text-sm font-semibold">{point.label}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-3">Team Roster</h3>
            <div className="space-y-2">
              {teams.map(t => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.available ? 'Available' : 'On Task'}</div>
                  </div>
                  <div>
                    <button className="px-3 py-1 rounded bg-fifa-teal text-black font-semibold" disabled={!t.available}>Assign</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="px-3 py-2 rounded bg-fifa-blue text-white">Broadcast Alert</button>
              <button className="px-3 py-2 rounded bg-fifa-yellow text-black">Open Extra Concession</button>
              <button className="px-3 py-2 rounded bg-fifa-red text-white">Trigger Emergency Protocol</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrganizerAdminDashboard;
