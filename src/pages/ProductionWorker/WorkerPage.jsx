import React, { useState, useRef, useEffect } from 'react';
import {
  PRODUCTION_STATIONS,
  STATION_STORAGE_KEY
} from '../../constants';

const sampleProjects = [
  { id: 'p1', name: 'Battery Pack A' },
  { id: 'p2', name: 'Battery Pack B' }
];

export default function WorkerPage() {
  const [station, setStation] = useState(
    () => localStorage.getItem(STATION_STORAGE_KEY) || ''
  );
  const [project, setProject] = useState('');
  const [serial, setSerial] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [project]);

  const handleStationSelect = (e) => {
    const value = e.target.value;
    setStation(value);
    localStorage.setItem(STATION_STORAGE_KEY, value);
  };

  const handleProjectSelect = (e) => {
    setProject(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSerial(e.target.value.trim());
      e.target.value = '';
    }
  };

  if (!station) {
    return (
      <div className="space-y-4">
        <h2 className="text-brand-349 text-xl font-semibold">Select Station</h2>
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={station}
          onChange={handleStationSelect}
        >
          <option value="">Choose…</option>
          {Object.entries(PRODUCTION_STATIONS).map(([key, label]) => (
            <option key={key} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-4">
        <h2 className="text-brand-349 text-xl font-semibold">Select Project</h2>
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={project}
          onChange={handleProjectSelect}
        >
          <option value="">Choose…</option>
          {sampleProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-brand-349 text-xl font-semibold">Scan Item</h2>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-lg p-2 w-0 h-0 opacity-0"
        aria-hidden
      />
      {serial && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div>Project: {project}</div>
          <div>Serial: {serial}</div>
        </div>
      )}
    </div>
  );
}
