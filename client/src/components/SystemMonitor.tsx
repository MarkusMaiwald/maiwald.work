import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText, CyberpunkPanel } from './CyberpunkEffects';

interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  disk: number;
  temperature: number;
  uptime: number;
  processes: number;
}

interface ProcessInfo {
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'idle' | 'critical';
}

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    disk: 0,
    temperature: 0,
    uptime: 0,
    processes: 0
  });

  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'processes' | 'network'>('overview');

  // Handle ESC key to close monitor
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Simulate real-time system metrics
  useEffect(() => {
    const updateMetrics = () => {
      // Generate realistic but simulated system metrics
      const newMetrics: SystemMetrics = {
        cpu: Math.max(5, Math.min(95, metrics.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(90, metrics.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, Math.random() * 60 + 10)),
        disk: Math.max(30, Math.min(85, metrics.disk + (Math.random() - 0.5) * 2)),
        temperature: Math.max(35, Math.min(75, metrics.temperature + (Math.random() - 0.5) * 3)),
        uptime: metrics.uptime + 1,
        processes: Math.floor(Math.random() * 10) + 145
      };
      setMetrics(newMetrics);

      // Update process list occasionally
      if (Math.random() < 0.3) {
        const processNames = [
          'nexus.core', 'neural.link', 'crypto.daemon', 'matrix.engine',
          'cyber.protocol', 'quantum.sync', 'shadow.net', 'data.stream',
          'ghost.shell', 'digital.soul', 'void.walker', 'nano.agent'
        ];

        const newProcesses = Array.from({ length: 8 }, (_, i) => ({
          name: processNames[Math.floor(Math.random() * processNames.length)],
          cpu: Math.random() * 25,
          memory: Math.random() * 40 + 5,
          status: Math.random() > 0.9 ? 'critical' : Math.random() > 0.7 ? 'idle' : 'running'
        } as ProcessInfo));

        setProcesses(newProcesses);
      }
    };

    // Initialize with base values
    setMetrics({
      cpu: 15 + Math.random() * 20,
      memory: 45 + Math.random() * 20,
      network: Math.random() * 30,
      disk: 55 + Math.random() * 15,
      temperature: 42 + Math.random() * 8,
      uptime: Math.floor(Date.now() / 1000),
      processes: 152 + Math.floor(Math.random() * 20)
    });

    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value > thresholds[1]) return 'text-red-400';
    if (value > thresholds[0]) return 'text-yellow-400';
    return 'text-cyberpunk-acid-green';
  };

  const renderMetricBar = (label: string, value: number, color: string, unit = '%') => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-cyberpunk-text text-sm font-mono">{label}</span>
        <span className={`text-sm font-mono font-bold ${color}`}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            value > 80 ? 'bg-red-500' : 
            value > 60 ? 'bg-yellow-500' : 
            'bg-cyberpunk-acid-green'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            boxShadow: `0 0 10px ${
              value > 80 ? '#ef4444' : 
              value > 60 ? '#eab308' : 
              'var(--cyberpunk-acid-green)'
            }`
          }}
        />
      </div>
    </div>
  );

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 left-4 cyberpunk-button p-3 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </svg>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
        className="fixed bottom-4 left-4 z-50 w-96"
      >
        <CyberpunkPanel className="p-4 max-h-[70vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-cyberpunk-border pb-2">
            <GlitchText className="text-lg font-bold cyberpunk-heading">
              SYSTEM MONITOR
            </GlitchText>
            <button
              onClick={() => setIsVisible(false)}
              className="text-cyberpunk-text-dim hover:text-red-400 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-4">
            {(['overview', 'processes', 'network'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                  activeTab === tab
                    ? 'bg-cyberpunk-electric-blue text-black'
                    : 'bg-gray-800 text-cyberpunk-text hover:bg-gray-700'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {renderMetricBar('CPU', metrics.cpu, getStatusColor(metrics.cpu, [50, 80]))}
                {renderMetricBar('MEMORY', metrics.memory, getStatusColor(metrics.memory, [60, 85]))}
                {renderMetricBar('DISK I/O', metrics.disk, getStatusColor(metrics.disk, [70, 90]))}
                {renderMetricBar('TEMP', metrics.temperature, getStatusColor(metrics.temperature, [55, 70]), '°C')}
                
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-cyberpunk-border">
                  <div className="text-center">
                    <div className="text-cyberpunk-text-dim text-xs font-mono">UPTIME</div>
                    <div className="text-cyberpunk-electric-blue font-mono font-bold">
                      {formatUptime(metrics.uptime)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyberpunk-text-dim text-xs font-mono">PROCESSES</div>
                    <div className="text-cyberpunk-acid-green font-mono font-bold">
                      {metrics.processes}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'processes' && (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 text-xs font-mono text-cyberpunk-text-dim border-b border-cyberpunk-border pb-2">
                  <div>PROCESS</div>
                  <div>CPU%</div>
                  <div>MEM%</div>
                  <div>STATUS</div>
                </div>
                {processes.map((process, index) => (
                  <motion.div
                    key={`${process.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-4 gap-2 text-xs font-mono items-center py-1"
                  >
                    <div className="text-cyberpunk-text truncate">{process.name}</div>
                    <div className={getStatusColor(process.cpu, [10, 20])}>
                      {process.cpu.toFixed(1)}
                    </div>
                    <div className={getStatusColor(process.memory, [20, 40])}>
                      {process.memory.toFixed(1)}
                    </div>
                    <div className={
                      process.status === 'critical' ? 'text-red-400' :
                      process.status === 'idle' ? 'text-yellow-400' :
                      'text-cyberpunk-acid-green'
                    }>
                      {process.status.toUpperCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-4">
                {renderMetricBar('BANDWIDTH', metrics.network, getStatusColor(metrics.network, [40, 70]))}
                
                <div className="space-y-2 pt-4 border-t border-cyberpunk-border">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyberpunk-text-dim">CONNECTIONS</span>
                    <span className="text-cyberpunk-acid-green">
                      {Math.floor(Math.random() * 50) + 23} ACTIVE
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyberpunk-text-dim">THROUGHPUT</span>
                    <span className="text-cyberpunk-electric-blue">
                      {(Math.random() * 1.5 + 0.5).toFixed(1)} MB/s
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyberpunk-text-dim">LATENCY</span>
                    <span className="text-yellow-400">
                      {Math.floor(Math.random() * 30) + 12}ms
                    </span>
                  </div>
                </div>

                {/* Network Activity Visualization */}
                <div className="mt-4">
                  <div className="text-xs font-mono text-cyberpunk-text-dim mb-2">ACTIVITY</div>
                  <div className="flex items-end space-x-1 h-16">
                    {Array.from({ length: 20 }, (_, i) => {
                      const height = Math.random() * 60 + 10;
                      return (
                        <motion.div
                          key={i}
                          className="bg-cyberpunk-electric-blue opacity-70 w-2"
                          style={{ height: `${height}%` }}
                          animate={{ height: `${Math.random() * 60 + 10}%` }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CyberpunkPanel>
      </motion.div>
    </AnimatePresence>
  );
}