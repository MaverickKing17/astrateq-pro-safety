/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { GoogleGenAI, Type } from "@google/genai";
import { LEGAL_CONTENT } from "./legalContent";
import { 
  ShieldCheck, 
  RotateCcw, 
  MapPin, 
  Eye, 
  Battery, 
  Shield, 
  ChevronRight,
  AlertTriangle,
  Activity,
  Globe,
  Gauge,
  Cpu,
  Clock,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Cookie,
  X,
  ExternalLink,
  Scale,
  ShieldAlert,
  ChevronDown,
  MessageSquare,
  Send,
  User,
  Bot,
  Zap,
  HelpCircle,
  Lock,
  Heart,
  ArrowUpRight,
  ArrowRight,
  Thermometer,
  Play,
  RefreshCw,
  Star,
  Navigation,
  Wind,
  CloudRain,
  Mic,
  MicOff,
  Leaf,
  TrendingUp,
  ArrowUp
} from "lucide-react";

const SocialIcon = ({ href, title, icon, hoverColor }: { href: string, title: string, icon: React.ReactNode, hoverColor: string }) => (
  <a 
    href={href} 
    title={title}
    className={`w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray/60 transition-all duration-300 group/social hover:scale-110 hover:shadow-xl ${hoverColor}`}
  >
    <div className="group-hover/social:scale-110 transition-transform">
      {icon}
    </div>
  </a>
);

const TikTokIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SnapchatIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.75c-3.17 0-5.75 2.58-5.75 5.75 0 1.1.31 2.12.85 3-.13.04-.26.08-.39.14-.84.34-1.46 1.1-1.46 2.01 0 .61.28 1.15.71 1.52-.1.25-.16.52-.16.8 0 1.1.9 2 2 2 .13 0 .25-.01.37-.04.42.59 1.1 1.02 1.88 1.17-.1.2-.16.42-.16.65 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.23-.06-.45-.16-.65.78-.15 1.46-.58 1.88-1.17.12.03.24.04.37.04 1.1 0 2-.9 2-2 0-.28-.06-.55-.16-.8.43-.37.71-.91.71-1.52 0-.91-.62-1.67-1.46-2.01-.13-.06-.26-.1-.39-.14.54-.88.85-1.9.85-3 0-3.17-2.58-5.75-5.75-5.75z" />
  </svg>
);

const PinterestIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 20c.5-1.1 1.1-2.3 1.1-2.3.3-.6.6-1.2.6-1.2s-.3-.6-.5-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.5-.2 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-2-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2 1 2.4.1.1.1.2.1.3-.1.4-.3 1.2-.3 1.3 0 .1-.1.2-.3.1-1.2-.6-1.9-2.4-1.9-3.8 0-3.1 2.3-6 6.5-6 3.4 0 6.1 2.4 6.1 5.7 0 3.4-2.1 6.1-5.1 6.1-1 0-1.9-.5-2.2-1.2l-.6 2.3c-.2.8-.8 1.8-1.2 2.4" />
  </svg>
);

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Animated Glow Background */}
        <div className="absolute inset-0 bg-brand-cyan/20 rounded-2xl blur-xl animate-pulse" />
        
        {/* Official Astrateq Logo */}
        <img 
          src="https://i.ibb.co/gMk7858w/Astrateq.png" 
          alt="Astrateq Logo" 
          className="relative z-10 w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex items-baseline gap-2 leading-none">
        <span className="text-2xl font-sans font-semibold text-brand-offwhite tracking-tight">Astrateq</span>
        <span className="text-2xl font-sans font-semibold text-brand-offwhite tracking-tight">Gadgets</span>
      </div>
    </div>
  );
}

function VehicleDashboard() {
  const [mode, setMode] = useState<'Eco' | 'Sport' | 'Auto'>('Auto');
  const [speed, setSpeed] = useState(0);
  const [battery] = useState(84);
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<null | any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState('Tesla Model Y');
  const recognitionRef = useRef<any>(null);

  const vehicles = [
    'Tesla Model Y',
    'Tesla Model 3',
    'Rivian R1S',
    'Ford F-150 Lightning',
    'Hyundai IONIQ 5',
    'Lucid Air'
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setScanProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsScanning(false);
        setScanResult({
          batteryHealth: "98.4% - Optimal Thermal Efficiency",
          sensorShield: "360° Neural Array: 100% Operational",
          maintenance: "Brake Pad Life: 14,200km Remaining",
          security: "Guardian Mode: Active - No Threats Detected",
          efficiency: "+12.4% Range Optimization via Astrateq AI"
        });
      }
    }, interval);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (transcript.includes('eco')) {
          setMode('Eco');
        } else if (transcript.includes('sport')) {
          setMode('Sport');
        } else if (transcript.includes('auto')) {
          setMode('Auto');
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  // Simulate speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const target = mode === 'Sport' ? 110 : mode === 'Eco' ? 85 : 100;
        const diff = target - prev;
        const next = Math.floor(prev + diff * 0.1 + (Math.random() * 2 - 1));
        return Math.max(0, Math.min(160, next));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const modes = [
    { 
      id: 'Eco', 
      icon: <Cpu size={18} />, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/20', 
      border: 'border-emerald-400/50',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)]',
      activeGlow: 'shadow-[0_0_40px_rgba(52,211,153,0.6)]'
    },
    { 
      id: 'Auto', 
      icon: <Activity size={18} />, 
      color: 'text-brand-cyan', 
      bg: 'bg-brand-cyan/20', 
      border: 'border-brand-cyan/50',
      glow: 'shadow-[0_0_20px_rgba(0,229,255,0.4)]',
      activeGlow: 'shadow-[0_0_40px_rgba(0,229,255,0.6)]'
    },
    { 
      id: 'Sport', 
      icon: <Zap size={18} />, 
      color: 'text-brand-ember', 
      bg: 'bg-brand-ember/20', 
      border: 'border-brand-ember/50',
      glow: 'shadow-[0_0_20px_rgba(255,184,0,0.4)]',
      activeGlow: 'shadow-[0_0_40px_rgba(255,184,0,0.6)]'
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Vehicle Selector HUD */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {vehicles.map(v => (
          <button
            key={v}
            onClick={() => setSelectedVehicle(v)}
            className={`px-4 py-2 rounded-xl border text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-300 ${
              selectedVehicle === v 
                ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'bg-white/5 border-white/10 text-brand-gray hover:border-white/30'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="w-full p-8 bg-brand-secondary/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
        {/* HUD Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-cyan/20 rounded-tl-[2.5rem]" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-cyan/20 rounded-br-[2.5rem]" />
        
        {/* Scanning Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-md flex flex-col items-center justify-center p-12"
            >
              <div className="relative w-full max-w-md">
                <div className="flex justify-between text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.4em] mb-4">
                  <span>Neural Scanning: {selectedVehicle}</span>
                  <span>{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
                  <motion.div 
                    className="h-full bg-brand-cyan shadow-[0_0_20px_#00E5FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                  />
                </div>
                
                {/* Scanning HUD Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-brand-cyan/20 animate-pulse" />
                    <div className="h-1 w-2/3 bg-brand-cyan/20 animate-pulse delay-75" />
                    <div className="h-1 w-1/2 bg-brand-cyan/20 animate-pulse delay-150" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-1 w-full bg-brand-cyan/20 animate-pulse" />
                    <div className="h-1 w-3/4 bg-brand-cyan/20 animate-pulse delay-100" />
                    <div className="h-1 w-1/3 bg-brand-cyan/20 animate-pulse delay-200" />
                  </div>
                </div>
              </div>
              
              {/* Scanning Beam */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-brand-cyan/40 shadow-[0_0_30px_#00E5FF] z-10"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          {/* Speedometer */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-white/5"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="440"
                  animate={{ strokeDashoffset: 440 - (speed / 160) * 440 }}
                  className="text-brand-cyan drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-display font-black text-brand-offwhite tracking-tighter">{speed}</span>
                <span className="text-[10px] font-mono text-brand-gray uppercase tracking-widest">km/h</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-brand-cyan/60">
              <Gauge size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Velocity</span>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-6 flex-1 w-full">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Battery className="text-emerald-400" size={20} />
                <span className="text-xs font-mono text-emerald-400 font-bold">{battery}%</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-brand-gray uppercase tracking-widest">Battery Level</div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${battery}%` }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Activity className="text-brand-cyan" size={20} />
                <span className="text-xs font-mono text-brand-cyan font-bold">32 PSI</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-brand-gray uppercase tracking-widest">Tire Pressure</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-1.5 flex-1 bg-brand-cyan/40 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="col-span-2 p-6 bg-white/5 border border-white/10 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] font-mono font-black text-brand-gray uppercase tracking-[0.3em]">Neural Driving Mode</div>
                <button 
                  onClick={toggleListening}
                  className={`group/voice flex items-center gap-3 px-5 py-2 rounded-full border transition-all duration-500 ${
                    isListening 
                      ? 'bg-brand-cyan/30 border-brand-cyan text-brand-cyan shadow-[0_0_30px_rgba(0,229,255,0.5)] animate-pulse' 
                      : 'bg-white/5 border-white/20 text-brand-gray hover:text-brand-offwhite hover:border-brand-cyan/50 hover:bg-brand-cyan/10'
                  }`}
                >
                  <div className="relative">
                    {isListening ? <Mic size={14} /> : <MicOff size={14} />}
                    {isListening && (
                      <div className="absolute -inset-1 bg-brand-cyan/40 rounded-full animate-ping" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {isListening ? 'System Listening...' : 'Voice Command'}
                  </span>
                </button>
              </div>
              <div className="flex gap-4">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id as any)}
                    className={`flex-1 relative group/mode flex items-center justify-center gap-3 py-5 px-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                      mode === m.id 
                        ? `${m.bg} ${m.border} ${m.color} ${m.activeGlow} scale-[1.02] z-10` 
                        : 'bg-transparent border-white/10 text-brand-gray hover:bg-white/5 hover:border-white/30'
                    }`}
                  >
                    {/* Active Background Glow */}
                    {mode === m.id && (
                      <motion.div 
                        layoutId="activeModeGlow"
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"
                      />
                    )}
                    
                    <div className={`relative z-10 transition-transform duration-500 ${mode === m.id ? 'scale-110' : 'group-hover/mode:scale-110'}`}>
                      {m.icon}
                    </div>
                    <span className={`relative z-10 text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 ${mode === m.id ? 'opacity-100' : 'opacity-60 group-hover/mode:opacity-100'}`}>
                      {m.id}
                    </span>

                    {/* Scanning Line for Active Mode */}
                    {mode === m.id && (
                      <div className="absolute inset-0 w-full h-[1px] bg-white/20 -translate-y-full animate-scan pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scan Results / CTA */}
        <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
          <AnimatePresence mode="wait">
            {scanResult ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <div className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.4em]">Diagnostic Report: {selectedVehicle}</div>
                  <div className="space-y-3">
                    {Object.entries(scanResult).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex items-center gap-3 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]" />
                        <span className="text-brand-gray font-medium uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-brand-offwhite font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <div className="p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/20">
                    <p className="text-[11px] text-brand-gray font-medium leading-relaxed">
                      The Astrateq Neural Engine has identified <span className="text-brand-cyan font-bold">3 critical optimizations</span> for your {selectedVehicle}. Secure your unit to activate real-time protection.
                    </p>
                  </div>
                  <button 
                    onClick={startScan}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono font-black text-brand-gray uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Re-Scan Vehicle
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-display font-black text-brand-offwhite uppercase tracking-tight">Neural Diagnostic Scanner</h4>
                  <p className="text-xs text-brand-gray font-medium">Select your vehicle above to simulate a deep-system neural scan.</p>
                </div>
                <button 
                  onClick={startScan}
                  className="group/scan relative px-12 py-5 bg-brand-cyan text-brand-charcoal font-black rounded-2xl overflow-hidden transition-all active:scale-95 shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/scan:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.3em] holographic-glow text-sm">
                    <Zap size={18} />
                    Initiate Neural Scan
                  </span>
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,229,255,0.05)_50%,transparent_100%)] animate-scanline opacity-20" />
        </div>
      </div>
    </div>
  );
}

function RouteOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        As the Astrateq AlTrak™ AI Navigation Engine, suggest 3 optimized driving routes for a vehicle in Toronto.
        Consider the following real-time data:
        - Weather: Heavy Snow, -12°C
        - Traffic: High congestion on Gardiner Expressway
        - Predictive Hazards: Black ice detected on Don Valley Parkway, 94% hazard probability.
        - Vehicle: EV with 84% battery.
        
        Provide 3 distinct options:
        1. "AlTrak™ Safety Path" (Maximum safety, avoiding all predicted hazards)
        2. "Efficiency Prime" (Minimum energy consumption for EV)
        3. "Rapid Response" (Fastest time, but may have higher risk)

        For each route, include a "hazards" array where each hazard is an object with:
        - "type": (e.g., 'Black Ice', 'Congestion', 'Pedestrian Alert')
        - "confidence": (a number between 0 and 1)
        - "location": (a brief description of where it is)
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                efficiency: { type: Type.NUMBER },
                safety: { type: Type.NUMBER },
                time: { type: Type.STRING },
                reasoning: { type: Type.STRING },
                hazards: { 
                  type: Type.ARRAY,
                  items: { 
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING },
                      confidence: { type: Type.NUMBER },
                      location: { type: Type.STRING }
                    },
                    required: ["type", "confidence", "location"]
                  }
                }
              },
              required: ["name", "efficiency", "safety", "time", "reasoning", "hazards"]
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setRoutes(data);
    } catch (err) {
      console.error("Route Optimization Error:", err);
      setError("Failed to connect to AlTrak™ Cloud. Please check your connection.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-brand-secondary/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] relative overflow-hidden">
      <div className="flex flex-col gap-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
              <Navigation className="text-brand-cyan" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-brand-offwhite">AlTrak™ AI Route Optimizer</h3>
              <p className="text-[10px] font-mono text-brand-gray uppercase tracking-widest">Predictive Navigation Engine</p>
            </div>
          </div>
          <button
            onClick={optimizeRoute}
            disabled={isOptimizing}
            className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
              isOptimizing 
                ? 'bg-white/5 text-brand-gray cursor-not-allowed' 
                : 'bg-brand-cyan text-brand-charcoal hover:bg-brand-cyan-hover shadow-lg shadow-brand-cyan/20'
            }`}
          >
            {isOptimizing ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap size={14} />
                Optimize Route
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-medium">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.length > 0 ? (
            routes.map((route, idx) => {
              const isSafety = route.name.toLowerCase().includes('safety');
              const isEfficiency = route.name.toLowerCase().includes('efficiency');
              const isRapid = route.name.toLowerCase().includes('rapid');
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 bg-brand-secondary/40 border rounded-[2rem] flex flex-col gap-5 group transition-all duration-500 relative overflow-hidden ${
                    isSafety 
                      ? 'border-emerald-500/30 hover:border-emerald-500/60 shadow-lg hover:shadow-emerald-500/10' 
                      : 'border-white/10 hover:border-brand-cyan/40 shadow-lg hover:shadow-brand-cyan/10'
                  }`}
                >
                  {/* Card Background HUD Grid */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.08] transition-opacity" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                  
                  {isSafety && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-[8px] font-black text-brand-charcoal uppercase tracking-[0.2em] rounded-bl-xl z-20 shadow-lg">
                      Recommended
                    </div>
                  )}

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {isSafety && <Shield size={14} className="text-emerald-400" />}
                        {isEfficiency && <Leaf size={14} className="text-brand-cyan" />}
                        {isRapid && <TrendingUp size={14} className="text-brand-ember" />}
                        <span className={`text-xs font-black uppercase tracking-widest ${isSafety ? 'text-emerald-400' : 'text-brand-offwhite'}`}>
                          {route.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-gray/60">
                        <Clock size={10} />
                        <span className="text-[10px] font-mono font-bold">{route.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-brand-offwhite/70 uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1.5">
                          <Shield size={10} className={route.safety > 80 ? 'text-emerald-400' : 'text-brand-ember'} />
                          Safety Score
                        </span>
                        <span className={route.safety > 80 ? 'text-emerald-400' : 'text-brand-ember'}>{route.safety}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${route.safety}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full relative ${route.safety > 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-brand-ember shadow-[0_0_10px_rgba(255,165,0,0.5)]'}`}
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-brand-offwhite/70 uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1.5">
                          <Zap size={10} className="text-brand-cyan" />
                          Efficiency
                        </span>
                        <span className="text-brand-cyan">{route.efficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${route.efficiency}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                          className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)] relative"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-[11px] text-brand-offwhite leading-relaxed font-medium border-l-2 border-brand-cyan/20 pl-4 group-hover:border-brand-cyan transition-colors">
                      {route.reasoning}
                    </p>
                  </div>

                  {/* Real-time Hazard Radar */}
                  <div className="space-y-3 relative z-10 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-black text-brand-ember uppercase tracking-[0.2em] flex items-center gap-2">
                        <Activity size={10} className="animate-pulse" />
                        Live Hazard Radar
                      </span>
                      <span className="text-[8px] font-mono text-brand-gray/60 uppercase">Scanning...</span>
                    </div>
                    
                    <div className="relative h-24 bg-brand-charcoal/40 rounded-2xl border border-white/5 overflow-hidden group/radar">
                      {/* Radar Sweep */}
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,229,255,0.05)_50%,transparent_100%)] animate-spin-slow origin-center" />
                      
                      {/* Mini-map Grid */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                      
                      {/* Hazard Icons */}
                      <div className="absolute inset-0 p-3">
                        {route.hazards?.map((hazard: any, hIdx: number) => {
                          // Random positions for visualization
                          const top = [20, 60, 40][hIdx % 3];
                          const left = [30, 70, 50][hIdx % 3];
                          
                          return (
                            <motion.div
                              key={hIdx}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.5 + (hIdx * 0.2) }}
                              className="absolute group/hazard"
                              style={{ top: `${top}%`, left: `${left}%` }}
                            >
                              <div className="relative">
                                <AlertTriangle size={14} className="text-brand-ember animate-pulse" />
                                <div className="absolute top-0 left-0 w-full h-full bg-brand-ember/20 rounded-full animate-ping" />
                                
                                {/* Hazard Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-brand-charcoal border border-brand-ember/30 rounded-lg opacity-0 group-hover/hazard:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-2xl">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[8px] font-black text-brand-offwhite uppercase tracking-wider">{hazard.type}</span>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-ember" style={{ width: `${hazard.confidence * 100}%` }} />
                                      </div>
                                      <span className="text-[7px] font-mono text-brand-ember">{(hazard.confidence * 100).toFixed(0)}% CONF</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                        
                        {/* Vehicle Position */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                          <div className="w-2 h-2 bg-brand-cyan rounded-full shadow-[0_0_10px_#00E5FF] relative">
                            <div className="absolute -inset-2 border border-brand-cyan/30 rounded-full animate-ping" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 py-12 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/5 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Globe className="text-brand-gray/20" size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm font-display font-medium text-brand-gray">No Active Route Optimization</p>
                <p className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-widest">Awaiting System Command</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background HUD Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00E5FF 1px, transparent 0)', backgroundSize: '20px 20px' }} />
    </div>
  );
}

const getCanadianEvent = () => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const day = now.getDate();

  // Canada Day: July 1
  if (month === 6 && day === 1) return { name: "Canada Day", icon: "🇨🇦", color: "text-red-600", accent: "bg-red-600" };
  
  // Remembrance Day: Nov 11
  if (month === 10 && day === 11) return { name: "Remembrance Day", icon: "🌺", color: "text-red-800", accent: "bg-red-800" };

  // Truth and Reconciliation: Sept 30
  if (month === 8 && day === 30) return { name: "National Day for Truth and Reconciliation", icon: "🧡", color: "text-orange-500", accent: "bg-orange-500" };

  // 2026 Specific Holidays (Approximate or Fixed)
  // Good Friday: April 3, 2026
  if (month === 3 && day === 3) return { name: "Good Friday", icon: "🐣", color: "text-emerald-500", accent: "bg-emerald-500" };
  // Easter Monday: April 6, 2026
  if (month === 3 && day === 6) return { name: "Easter Monday", icon: "🐣", color: "text-emerald-500", accent: "bg-emerald-500" };
  // Victoria Day: May 18, 2026
  if (month === 4 && day === 18) return { name: "Victoria Day", icon: "👑", color: "text-blue-600", accent: "bg-blue-600" };
  // Thanksgiving: Oct 12, 2026
  if (month === 9 && day === 12) return { name: "Thanksgiving", icon: "🍂", color: "text-orange-600", accent: "bg-orange-600" };

  // Seasonal
  if (month === 3) return { name: "Spring Season", icon: "🌱", color: "text-emerald-400", accent: "bg-emerald-400" };
  if (month === 11) return { name: "Holiday Season", icon: "❄️", color: "text-blue-400", accent: "bg-blue-400" };

  return null;
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState<string | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(73);
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentEvent = getCanadianEvent();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedSpots = localStorage.getItem('astrateq_spots');
    if (storedSpots) {
      setSpotsRemaining(parseInt(storedSpots));
    } else {
      localStorage.setItem('astrateq_spots', '73');
    }

    const interval = setInterval(() => {
      setSpotsRemaining(prev => {
        if (prev > 5) {
          const next = prev - (Math.random() > 0.8 ? 1 : 0);
          localStorage.setItem('astrateq_spots', next.toString());
          return next;
        }
        return prev;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mbdpkqrd", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsWaitlistOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-cyan/30 selection:text-brand-cyan">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-charcoal/80 backdrop-blur-md border-b border-white/10" role="banner">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-gray" aria-label="Main navigation">
            <button onClick={() => scrollToSection('vision')} className="hover:text-brand-cyan transition-all hover:tracking-widest duration-300 relative group">
              Vision
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-brand-cyan transition-all hover:tracking-widest duration-300 relative group">
              Solutions
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => setIsWaitlistOpen(true)}
              className="px-5 py-2.5 bg-brand-ember text-brand-charcoal rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-ember/90 transition-all shadow-lg shadow-brand-ember/30 hover:shadow-brand-ember/50 hover:-translate-y-0.5 active:scale-95 border border-white/10"
            >
              Beta Waitlist
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="main-content" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-32" role="region" aria-label="Hero section">
        {/* Background with Arctic Feel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-charcoal/80 z-10" />
          
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2560" 
            alt="Cinematic luxury vehicle driving through a high-tech city at twilight" 
            className="w-full h-full object-cover opacity-50 scale-110 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          
          {/* HUD Overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-brand-cyan/10 rounded-full flex items-center justify-center"
            >
              <div className="w-48 h-48 border-2 border-brand-cyan/5 rounded-full border-dashed animate-spin-slow" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-[10px] font-mono text-brand-cyan/40 tracking-widest uppercase py-2">
                Scanning Terrain
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/3 right-10 w-48 p-4 glass-panel rounded-lg border-brand-cyan/20"
            >
              <div className="text-[10px] font-mono text-brand-cyan mb-1 uppercase tracking-tighter">Hazard Detection</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
                <span className="text-xl font-display font-bold text-brand-offwhite">94% ACC</span>
              </div>
              <div className="mt-2 h-1 bg-brand-cyan/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-brand-cyan"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-30 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-black tracking-tight mb-6 leading-[0.95] text-brand-offwhite">
              The End of <br />
              <span className="text-brand-cyan holographic-glow">Driving Anxiety.</span>
            </h1>
            
            {/* Urgency Counter */}
            <div className="flex flex-col items-center gap-6 mb-12 relative">
              {/* Background Glow for Counter */}
              <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full -z-10" />
              
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="text-center relative group">
                  <div className="absolute -inset-4 bg-brand-cyan/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-7xl md:text-9xl font-display font-black text-brand-cyan tracking-tighter drop-shadow-[0_0_25px_rgba(0,229,255,0.6)] relative z-10"
                  >
                    {spotsRemaining}
                  </motion.div>
                  <div className="text-[11px] font-mono font-black text-brand-offwhite uppercase tracking-[0.4em] mt-2 relative z-10">Founding Spots Left</div>
                  
                  {/* HUD Accent */}
                  <div className="absolute -top-4 -left-6 w-5 h-5 border-t-2 border-l-2 border-brand-cyan/40" />
                  <div className="absolute -bottom-4 -right-6 w-5 h-5 border-b-2 border-r-2 border-brand-cyan/40" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="w-72 h-4 bg-brand-secondary/50 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${spotsRemaining}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-cyan/40 via-brand-cyan to-brand-cyan/40 shadow-[0_0_30px_#00E5FF] relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-black text-brand-offwhite uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                      Toronto Pilot: 100 Cap
                    </span>
                    <span className="text-brand-ember animate-pulse">High Demand</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-5 bg-white/[0.03] border border-white/10 rounded-[2rem] backdrop-blur-md shadow-2xl">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-brand-secondary/90 border border-brand-cyan/30 rounded-2xl flex items-center justify-center text-2xl font-display font-black text-brand-offwhite shadow-inner holographic-glow">{timeLeft.days}</div>
                    <span className="text-[10px] font-mono font-black text-brand-gray uppercase mt-2 tracking-widest">Days</span>
                  </div>
                  <div className="text-brand-cyan/40 font-black self-start mt-4 animate-pulse text-xl">:</div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-brand-secondary/90 border border-brand-cyan/30 rounded-2xl flex items-center justify-center text-2xl font-display font-black text-brand-offwhite shadow-inner holographic-glow">{timeLeft.hours}</div>
                    <span className="text-[10px] font-mono font-black text-brand-gray uppercase mt-2 tracking-widest">Hrs</span>
                  </div>
                  <div className="text-brand-cyan/40 font-black self-start mt-4 animate-pulse text-xl">:</div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-brand-secondary/90 border border-brand-cyan/30 rounded-2xl flex items-center justify-center text-2xl font-display font-black text-brand-offwhite shadow-inner holographic-glow">{timeLeft.minutes}</div>
                    <span className="text-[10px] font-mono font-black text-brand-gray uppercase mt-2 tracking-widest">Min</span>
                  </div>
                  <div className="text-brand-cyan/40 font-black self-start mt-4 animate-pulse text-xl">:</div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-brand-secondary/90 border border-brand-cyan/30 rounded-2xl flex items-center justify-center text-2xl font-display font-black text-brand-offwhite shadow-inner holographic-glow">{timeLeft.seconds}</div>
                    <span className="text-[10px] font-mono font-black text-brand-gray uppercase mt-2 tracking-widest">Sec</span>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-white/10 mx-2" />
                <div className="text-[11px] font-mono font-black text-brand-offwhite uppercase tracking-[0.25em] leading-tight max-w-[100px] text-left">
                  Until Founding Offer Expires
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Protect your family with <span className="text-brand-offwhite font-bold">94% predictive accuracy</span>. 
              Zero effort. Total peace of mind. Engineered in Toronto for the Great North.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <WaitlistForm spotsRemaining={spotsRemaining} onSubmit={handleWaitlistSubmit} />

            <TestimonialRow />

            <div className="w-full py-24">
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-mono font-black text-brand-cyan uppercase tracking-[0.3em]">
                  <Zap size={16} />
                  Neural Diagnostic Scanner
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-brand-offwhite tracking-tight">Scan your vehicle in real-time.</h2>
                <p className="text-brand-gray text-lg max-w-2xl mx-auto font-medium">Connect to the Astrateq Neural Network. Experience deep-system health monitoring and predictive diagnostics before you even hit the road.</p>
              </div>
              <VehicleDashboard />
            </div>

            <div className="w-full py-24">
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-mono font-black text-brand-cyan uppercase tracking-[0.3em]">
                  <Navigation size={16} />
                  AI Predictive Navigation
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-brand-offwhite tracking-tight">Navigate the unseen.</h2>
                <p className="text-brand-gray text-lg max-w-2xl mx-auto font-medium">Our AlTrak™ Cloud-Sync Engine predicts hazards before they enter your field of vision.</p>
              </div>
              <RouteOptimizer />
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-brand-cyan/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center gap-3 px-8 py-3 bg-brand-secondary/90 backdrop-blur-xl border border-brand-cyan/40 rounded-full text-brand-cyan text-xs font-bold tracking-[0.15em] shadow-2xl shadow-brand-cyan/20">
                  <AlertTriangle size={16} className="animate-pulse text-brand-cyan" />
                  <span className="uppercase">Astrateq Gadgets are driver assistance tools only.</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full flex flex-wrap items-center justify-between px-10 py-6 border-y border-brand-cyan/10 relative bg-brand-cyan/[0.03] backdrop-blur-md group/status overflow-hidden"
              >
                {/* HUD Brackets - Enhanced */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan/40 group-hover/status:border-brand-cyan transition-colors duration-500" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-cyan/40 group-hover/status:border-brand-cyan transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-cyan/40 group-hover/status:border-brand-cyan transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-cyan/40 group-hover/status:border-brand-cyan transition-colors duration-500" />

                {/* Scanning Line Effect */}
                <div className="absolute inset-0 w-full h-[1px] bg-brand-cyan/10 -translate-y-full group-hover/status:animate-scan pointer-events-none" />

                <div className="flex items-center gap-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono font-black text-brand-gray/40 uppercase tracking-[0.3em]">System Status</span>
                    <div className="flex items-center gap-2.5 px-3 py-1 bg-brand-cyan/5 rounded-lg border border-brand-cyan/10">
                      <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_#00E5FF]" />
                        <div className="absolute w-4 h-4 rounded-full border border-brand-cyan/30 animate-ping opacity-40" />
                      </div>
                      <span className="text-[11px] font-mono font-black text-brand-cyan uppercase tracking-[0.2em] holographic-glow">Active</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block w-[1px] h-8 bg-white/5" />

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 group/loc cursor-help">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/loc:border-brand-cyan/40 transition-colors">
                        <Globe size={14} className="text-brand-cyan/60 group-hover/loc:text-brand-cyan transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-brand-gray/40 uppercase tracking-widest">Location</span>
                        <span className="text-[10px] font-mono font-bold text-brand-offwhite uppercase tracking-widest">Toronto, ON</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group/time cursor-help">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/time:border-brand-cyan/40 transition-colors">
                        <Clock size={14} className="text-brand-cyan/60 group-hover/time:text-brand-cyan transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-brand-gray/40 uppercase tracking-widest">Timestamp</span>
                        <span className="text-[10px] font-mono font-bold text-brand-offwhite uppercase tracking-widest">
                          {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Telemetry */}
                <div className="hidden xl:flex items-center gap-6 relative z-10">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-brand-gray/40 uppercase tracking-widest">Network Latency</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-brand-cyan shadow-[0_0_4px_#00E5FF]' : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-brand-cyan">8ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-8 mt-12 text-brand-gray"
            >
              <HeroBadge icon={<ShieldCheck size={18} className="text-brand-cyan" />} text="Transport Canada Compliant" delay={1.3} />
              <HeroBadge icon={<RotateCcw size={18} className="text-brand-cyan" />} text="60-Day Returns" delay={1.4} />
              <HeroBadge icon={<MapPin size={18} className="text-brand-cyan" />} text="Toronto Engineered & Shipped" delay={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <VisionSection />

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-4 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00E5FF08,transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-mono font-bold text-brand-cyan uppercase tracking-[0.3em] mb-4"
            >
              <Shield size={14} />
              The Astrateq Ecosystem
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-offwhite tracking-tight">
              Precision <span className="text-brand-cyan">Hardware.</span> <br />
              Intelligent <span className="text-brand-cyan">Defense.</span>
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto font-medium">
              Astrateq's integrated ecosystem combines military-grade sensors with proprietary AI to create a 360° safety shield around your vehicle.
            </p>
          </div>

          <div className="space-y-32">
            <DramaticProductShowcase 
              index={0}
              title="AlTrak™"
              subtitle="PREDICTIVE NEURAL SHIELD"
              headline="See the unseen. <br />Predict the impossible."
              description="Human reaction time is 250ms. AlTrak™ reacts in 50ms. By the time you see the hazard, our AI has already calculated 1,000 escape vectors. It's not just a camera; it's a second set of eyes that never blinks."
              features={[
                { label: "94% Accuracy", desc: "Predicts black ice and collisions before they happen." },
                { label: "50ms Response", desc: "Faster than human biological capability." },
                { label: "360° Vision", desc: "Neural fusion of 8 multi-spectral sensors." }
              ]}
              image="https://i.ibb.co/DPz0TMCF/4-K-professional-product-202604021635.jpg"
              cta="Secure My Shield"
              onCta={() => setIsWaitlistOpen(true)}
            />

            <DramaticProductShowcase 
              index={1}
              title="EV Battery Intelligence"
              subtitle="THERMAL MASTERY"
              headline="Winter is no longer <br />the enemy of range."
              description="Range anxiety is a relic of the past. Our Thermal AI Management system optimizes every electron, extending your winter range by up to 24%. Drive from Toronto to Montreal with total confidence, even at -30°C."
              features={[
                { label: "+24% Range", desc: "Optimized thermal cycles for extreme cold." },
                { label: "Cell-Level AI", desc: "Real-time health monitoring for every cell." },
                { label: "Predictive Charging", desc: "Smart pre-conditioning based on your route." }
              ]}
              image="https://i.ibb.co/Qvh1LVns/Can-you-add-202604021625.jpg"
              cta="Extend My Range"
              onCta={() => setIsWaitlistOpen(true)}
              reversed
            />

            <DramaticProductShowcase 
              index={2}
              title="Guardian Mode"
              subtitle="INVISIBLE SENTINEL"
              headline="Your family's safety <br />is non-negotiable."
              description="The ultimate peace of mind. Guardian Mode provides 24/7 proactive monitoring, alerting you to threats before they reach your vehicle. It's like having a private security detail for your most precious cargo."
              features={[
                { label: "24/7 Active", desc: "Always watching, even when you're miles away." },
                { label: "Instant Alerts", desc: "Direct-to-phone threat notifications." },
                { label: "Mil-Spec Security", desc: "Encrypted data sharding for total privacy." }
              ]}
              image="https://i.ibb.co/Nn1hgkdL/To-implement-the-202604021814.jpg"
              cta="Activate Guardian"
              onCta={() => setIsWaitlistOpen(true)}
            />
          </div>

          {/* Product Spotlight: EV Battery Intelligence */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-32 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-cyan/5 rounded-[3rem] blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] border-white/5 overflow-hidden bg-brand-secondary/50 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold tracking-widest uppercase">
                    <Zap size={14} className="animate-pulse" />
                    Product Spotlight
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-display font-black text-brand-offwhite leading-tight">
                      EV Battery <br />
                      <span className="text-brand-cyan">Intelligence.</span>
                    </h3>
                    <p className="text-brand-gray text-lg leading-relaxed max-w-xl">
                      Proprietary thermal management AI that extends battery life and maximizes range in extreme conditions. Engineered for the Great North.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/30 transition-colors group/stat">
                      <div className="text-3xl font-display font-black text-brand-cyan mb-1 group-hover/stat:scale-110 transition-transform">+24%</div>
                      <div className="text-xs font-bold text-brand-gray uppercase tracking-widest">Winter Range</div>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/30 transition-colors group/stat">
                      <div className="text-3xl font-display font-black text-brand-cyan mb-1 group-hover/stat:scale-110 transition-transform">2.1x</div>
                      <div className="text-xs font-bold text-brand-gray uppercase tracking-widest">Cell Longevity</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="group flex items-center gap-3 text-brand-offwhite font-bold tracking-widest text-sm uppercase">
                      Explore the Technology
                      <ArrowRight size={18} className="text-brand-cyan group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-cyan/20 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
                  <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group/img">
                    <img 
                      src="https://i.ibb.co/Qvh1LVns/Can-you-add-202604021625.jpg" 
                      alt="EV Battery Intelligence" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Tech Badge */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-8 left-8 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                          <Thermometer size={20} className="text-brand-cyan" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-brand-gray uppercase tracking-wider">Thermal State</div>
                          <div className="text-sm font-bold text-brand-offwhite">OPTIMIZED</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Founding Member Offer Section (Alex Hormozi Style) */}
      <section id="offer" className="py-32 px-4 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/[0.02] -z-10" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-ember/10 border border-brand-ember/20 text-xs font-mono font-black text-brand-ember uppercase tracking-[0.4em]">
              <Star size={16} className="animate-pulse" />
              Exclusive Founding Offer
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-offwhite tracking-tight leading-none">
              The Astrateq <br />
              <span className="text-brand-ember holographic-glow">Founding Member Protocol.</span>
            </h2>
            <p className="text-brand-gray text-xl max-w-2xl mx-auto font-medium">
              We're looking for 100 early adopters in the GTA to help us refine the future of Canadian driving. 
              This is a one-time opportunity to secure the ultimate safety bundle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* The Bundle Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 rounded-[3rem] border-brand-ember/30 bg-brand-secondary/40 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 px-6 py-2 bg-brand-ember text-brand-charcoal font-black text-[10px] uppercase tracking-[0.3em] rounded-bl-2xl shadow-xl z-20">
                Most Valuable Offer
              </div>
              
              <div className="space-y-8 flex-1">
                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-black text-brand-offwhite">The Safety Protocol Bundle</h3>
                  <p className="text-brand-gray text-sm font-medium">Everything you need for total vehicle intelligence.</p>
                </div>

                <div className="space-y-4">
                  <OfferItem text="Astrateq AlTrak™ AI Hardware Unit" value="$1,299" />
                  <OfferItem text="EV Battery Intelligence Suite (Lifetime)" value="$499" />
                  <OfferItem text="Guardian Mode 24/7 Monitoring (1 Year)" value="$240" />
                  <OfferItem text="Founding Member Priority AI Updates" value="PRICELESS" />
                  <OfferItem text="Direct Access to Toronto Engineering Team" value="PRICELESS" />
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-brand-gray text-lg line-through opacity-50">$2,038+</span>
                    <span className="text-5xl font-display font-black text-brand-ember tracking-tighter">$329</span>
                    <span className="text-brand-gray text-sm font-bold uppercase tracking-widest">/ Founding Member</span>
                  </div>
                  <p className="text-[10px] font-mono text-brand-gray/60 uppercase tracking-widest">One-time payment. No hidden fees. Lifetime AI Core access.</p>
                </div>
              </div>

              <div className="mt-10">
                <button 
                  onClick={() => setIsWaitlistOpen(true)}
                  className="w-full py-5 bg-brand-ember text-brand-charcoal font-black text-base rounded-2xl uppercase tracking-[0.3em] hover:bg-brand-ember/90 transition-all shadow-2xl shadow-brand-ember/30 active:scale-95 holographic-glow"
                >
                  Secure My Founding Spot
                </button>
                <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-mono text-brand-gray uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-cyan" /> 60-Day Guarantee</span>
                  <span className="flex items-center gap-1.5"><Lock size={12} className="text-brand-cyan" /> Secure Processing</span>
                </div>
              </div>
            </motion.div>

            {/* The "Why Now" Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 bg-brand-secondary/20 space-y-6">
                <h4 className="text-xl font-display font-bold text-brand-offwhite flex items-center gap-3">
                  <Clock className="text-brand-cyan" size={20} />
                  Why the Founding Offer?
                </h4>
                <div className="space-y-4">
                  <p className="text-brand-gray text-sm leading-relaxed">
                    We are scaling our neural network across the GTA. By joining as a Founding Member, you provide the critical real-world data our AI needs to achieve 99.9% accuracy.
                  </p>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    In exchange, you get our <span className="text-brand-offwhite font-bold">hardware at cost</span> and <span className="text-brand-offwhite font-bold">lifetime software access</span>. Once the 100 spots are gone, the price reverts to $1,299 + subscription.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 bg-brand-secondary/20 space-y-6">
                <h4 className="text-xl font-display font-bold text-brand-offwhite flex items-center gap-3">
                  <ShieldCheck className="text-brand-cyan" size={20} />
                  The Astrateq Guarantee
                </h4>
                <p className="text-brand-gray text-sm leading-relaxed">
                  If you don't feel safer within 60 days of installation, we'll buy the hardware back from you. No questions asked. We're that confident in the Astrateq Neural Engine.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-brand-cyan/5 border border-brand-cyan/20 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-cyan" size={32} />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.3em] mb-1">Toronto Pilot Program</div>
                  <p className="text-xs text-brand-gray font-medium leading-relaxed">
                    Optimized for GTA density and Canadian winters. Local support, local engineering, global safety standards.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection onContactSupport={() => setIsChatOpen(true)} />

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-32 px-4 relative overflow-hidden bg-brand-charcoal text-brand-offwhite border-t border-white/5"
      >
        {/* Technical Background Detail */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00E5FF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-20">
          {/* Brand & Lead Gen & Utilities */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-white/10 items-start">
            {/* Column 1: Brand */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Logo />
              <p className="text-sm text-brand-gray font-medium max-w-[280px] text-center lg:text-left leading-relaxed">
                Empowering Canadian drivers with the world's most advanced AI safety systems. Engineered for the Great North.
              </p>
            </div>

            {/* Column 2: Lead Generation (CRO Focus) */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
              <div className="w-full space-y-4 relative group/form">
                {/* Decorative Glow */}
                <div className="absolute -inset-4 bg-brand-cyan/5 rounded-[2rem] blur-2xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative space-y-3">
                  <div className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-[0.3em] text-center">Stay in the Loop</div>
                  <form 
                    className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl shadow-sm focus-within:border-brand-cyan/50 focus-within:shadow-lg focus-within:shadow-brand-cyan/5 transition-all duration-300" 
                    onSubmit={async (e) => { 
                      e.preventDefault(); 
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const submitBtn = form.querySelector('button');
                      if (submitBtn) submitBtn.disabled = true;
                      
                      try {
                        const response = await fetch("https://formspree.io/f/mbdpkqrd", {
                          method: "POST",
                          body: formData,
                          headers: { 'Accept': 'application/json' }
                        });
                        if (response.ok) {
                          setShowSuccess(true);
                          setTimeout(() => setShowSuccess(false), 5000);
                          form.reset();
                        }
                      } catch (error) {
                        console.error("Newsletter submission error", error);
                      } finally {
                        if (submitBtn) submitBtn.disabled = false;
                      }
                    }}
                  >
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-2.5 bg-transparent text-sm focus:outline-none placeholder:text-brand-gray/40 text-brand-offwhite"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-brand-cyan text-brand-charcoal text-xs font-bold rounded-xl hover:bg-brand-cyan-hover transition-all shadow-md hover:shadow-brand-cyan/30 uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Join
                    </button>
                  </form>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex -space-x-1.5">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-5 h-5 rounded-full border-2 border-brand-charcoal bg-brand-secondary overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="User" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-brand-gray/70 font-bold uppercase tracking-wider">
                        Join <span className="text-brand-cyan">2,400+</span> drivers receiving updates
                      </p>
                    </div>
                    <p className="text-[10px] text-brand-gray/50 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Shield size={12} className="text-brand-cyan/50" />
                      Privacy Guaranteed • No Spam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Status & Utilities */}
            <div className="flex flex-col items-center lg:items-end gap-8">
              {/* System Status - Enhanced with Radar Effect */}
              <div className="space-y-3 text-center lg:text-right group/status">
                <div className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-[0.4em] group-hover/status:text-brand-cyan-hover transition-all duration-500">System Status</div>
                <div className="relative">
                  {/* Radar Pulse Rings */}
                  <div className="absolute -inset-2 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover/status:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative flex items-center gap-4 px-6 py-3 bg-brand-secondary/50 border border-emerald-500/20 rounded-2xl shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.2)] transition-all duration-500 backdrop-blur-md group-hover/status:border-emerald-500/40">
                    <div className="relative flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse" />
                      <div className="absolute w-6 h-6 rounded-full border border-emerald-500/40 animate-ping opacity-40" />
                      <div className="absolute w-8 h-8 rounded-full border border-emerald-500/20 animate-ping [animation-delay:0.5s] opacity-20" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[13px] font-black text-emerald-500 uppercase tracking-tighter">All Systems Nominal</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-emerald-500/60 font-bold">LATENCY: 8MS</span>
                        <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
                        <span className="text-[9px] font-mono text-emerald-500/60 font-bold">UPTIME: 99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-8">
                {/* Trust Badges - Enhanced Glassmorphism */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-8 p-5 bg-brand-secondary/50 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group/badges relative overflow-hidden">
                    {/* Subtle Background Glow */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-cyan/5 rounded-full blur-2xl group-hover/badges:bg-brand-cyan/10 transition-colors duration-700" />
                    
                    <div title="Transport Canada Compliant" className="flex flex-col items-center gap-2 group/badge cursor-help">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 shadow-sm flex items-center justify-center border border-white/10 group-hover/badge:border-brand-cyan/40 group-hover/badge:shadow-lg group-hover/badge:shadow-brand-cyan/5 transition-all duration-300">
                        <ShieldCheck size={20} className="text-brand-gray/40 group-hover/badge:text-brand-cyan transition-colors duration-300" />
                      </div>
                      <span className="text-[9px] font-black text-brand-gray/40 group-hover/badge:text-brand-cyan uppercase tracking-[0.15em] transition-colors duration-300">TC Compliant</span>
                    </div>
                    
                    <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    
                    <div title="ISO 9001 Certified" className="flex flex-col items-center gap-2 group/badge cursor-help">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 shadow-sm flex items-center justify-center border border-white/10 group-hover/badge:border-brand-cyan/40 group-hover/badge:shadow-lg group-hover/badge:shadow-brand-cyan/5 transition-all duration-300">
                        <Scale size={20} className="text-brand-gray/40 group-hover/badge:text-brand-cyan transition-colors duration-300" />
                      </div>
                      <span className="text-[9px] font-black text-brand-gray/40 group-hover/badge:text-brand-cyan uppercase tracking-[0.15em] transition-colors duration-300">ISO 9001</span>
                    </div>
                  </div>
                </div>

                {/* Utilities & Socials - Enhanced Interactivity */}
                <div className="flex flex-col items-center lg:items-end gap-5">
                  <div className="flex items-center gap-8">
                    {/* Language Toggle - Refined */}
                    <div className="flex items-center gap-5 text-[11px] font-black tracking-[0.2em] text-brand-gray" role="navigation" aria-label="Language selection">
                      <button className="text-brand-cyan relative group/lang">
                        EN
                        <motion.div 
                          layoutId="footer-lang-active"
                          className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-cyan rounded-full shadow-[0_0_8px_#00E5FF]" 
                        />
                      </button>
                      <div className="w-[1px] h-4 bg-white/10" />
                      <button className="hover:text-brand-cyan transition-colors duration-300">FR</button>
                    </div>
                    
                    <div className="w-[1px] h-8 bg-white/10" />
                    
                    {/* Social Icons - Brand Specific Colors & Enhanced Visuals */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                      <SocialIcon href="#" title="LinkedIn" icon={<Linkedin size={18} />} hoverColor="hover:text-[#0077B5] hover:border-[#0077B5]/30 hover:shadow-[#0077B5]/20" />
                      <SocialIcon href="#" title="Twitter" icon={<Twitter size={18} />} hoverColor="hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:shadow-[#1DA1F2]/20" />
                      <SocialIcon href="#" title="Facebook" icon={<Facebook size={18} />} hoverColor="hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:shadow-[#1877F2]/20" />
                      <SocialIcon href="#" title="Instagram" icon={<Instagram size={18} />} hoverColor="hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:shadow-[#E4405F]/20" />
                      <SocialIcon href="#" title="TikTok" icon={<TikTokIcon size={18} />} hoverColor="hover:text-[#000000] hover:border-white/30 hover:shadow-white/10" />
                      <SocialIcon href="#" title="Snapchat" icon={<SnapchatIcon size={18} />} hoverColor="hover:text-[#FFFC00] hover:border-[#FFFC00]/30 hover:shadow-[#FFFC00]/20" />
                      <SocialIcon href="#" title="Pinterest" icon={<PinterestIcon size={18} />} hoverColor="hover:text-[#BD081C] hover:border-[#BD081C]/30 hover:shadow-[#BD081C]/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Fleet & Family (Full Width) */}
          <div className="py-20 space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Family Card: Refined Tech-Luxury */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative p-10 rounded-[3rem] overflow-hidden border border-white/5 bg-brand-secondary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,229,255,0.1)] hover:border-brand-cyan/20"
              >
                {/* Subtle Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/[0.02] via-transparent to-brand-cyan/[0.05] opacity-100" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] group-hover:bg-brand-cyan/10 transition-colors duration-1000" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00E5FF 1.5px, transparent 0)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-brand-cyan/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-cyan-hover flex items-center justify-center shadow-xl shadow-brand-cyan/20 group-hover:scale-105 transition-transform duration-500">
                        <Shield className="text-brand-charcoal" size={32} />
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-[0.2em] shadow-sm group-hover:bg-brand-cyan/5 group-hover:border-brand-cyan/10 transition-all">
                      Family Protection Suite
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-3xl font-display font-black text-brand-offwhite tracking-tight group-hover:text-brand-cyan transition-colors duration-500">
                      For Canadian Families
                    </h4>
                    <p className="text-base text-brand-gray leading-relaxed font-medium">
                      Protect your "Golden Assets." Our AI is specifically trained for the unique hazards of Canadian school zones and dark rural stretches.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <button 
                      onClick={() => setIsWaitlistOpen(true)}
                      className="group/btn flex items-center gap-4 text-xs font-black text-brand-cyan uppercase tracking-[0.3em]"
                    >
                      <span className="relative">
                        Get the 2026 Safety Blueprint
                        <div className="absolute -bottom-1.5 left-0 w-0 h-1 bg-brand-cyan group-hover/btn:w-full transition-all duration-500 rounded-full" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-brand-cyan/5 flex items-center justify-center group-hover/btn:bg-brand-cyan group-hover/btn:text-brand-charcoal group-hover/btn:shadow-lg group-hover/btn:shadow-brand-cyan/30 transition-all duration-500">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Fleet Card: Professional Cyber-Tech */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative p-10 rounded-[3rem] overflow-hidden border border-white/5 bg-brand-secondary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,229,255,0.1)] hover:border-brand-cyan/20"
              >
                {/* Subtle Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/[0.02] via-transparent to-brand-cyan/[0.05] opacity-100" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] group-hover:bg-brand-cyan/10 transition-colors duration-1000" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-700" 
                     style={{ backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-brand-cyan/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 rounded-2xl bg-brand-secondary flex items-center justify-center shadow-xl shadow-white/5 group-hover:bg-brand-cyan group-hover:scale-105 transition-all duration-500">
                        <Globe className="text-brand-cyan group-hover:text-brand-charcoal" size={32} />
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-brand-gray uppercase tracking-[0.2em] shadow-sm group-hover:bg-brand-cyan/5 group-hover:border-brand-cyan/10 group-hover:text-brand-cyan transition-all duration-500">
                      Enterprise Telemetry
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-3xl font-display font-black text-brand-offwhite tracking-tight group-hover:text-brand-cyan transition-colors duration-500">
                      For Fleet Operations
                    </h4>
                    <p className="text-base text-brand-gray leading-relaxed font-medium">
                      Maximize ROI & Minimize Liability. Real-time predictive maintenance and driver scoring for fleets of 10 to 500+ vehicles.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <button 
                      onClick={() => setIsWaitlistOpen(true)}
                      className="group/btn flex items-center gap-4 text-xs font-black text-brand-cyan uppercase tracking-[0.3em]"
                    >
                      <span className="relative">
                        Request Fleet Demo
                        <div className="absolute -bottom-1.5 left-0 w-0 h-1 bg-brand-cyan group-hover/btn:w-full transition-all duration-500 rounded-full" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-brand-cyan/5 flex items-center justify-center group-hover/btn:bg-brand-cyan group-hover/btn:text-brand-charcoal group-hover/btn:shadow-lg group-hover/btn:shadow-brand-cyan/30 transition-all duration-500">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI System Disclaimer & Trust Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-brand-secondary/50 rounded-[2.5rem] border border-white/5 shadow-xl">
                <div title="Transport Canada Compliant" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <ShieldCheck size={28} className="text-brand-cyan" />
                  </div>
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest text-center group-hover:text-brand-cyan transition-colors">TC Compliant</span>
                </div>
                
                <div title="ISO 9001 Certified" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-ember/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Scale size={28} className="text-brand-ember" />
                  </div>
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest text-center group-hover:text-brand-ember transition-colors">ISO 9001</span>
                </div>

                <div title="PIPEDA Compliant (Data Privacy)" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Lock size={28} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest text-center group-hover:text-emerald-500 transition-colors">PIPEDA Ready</span>
                </div>

                <div title="Proudly Engineered in Canada" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Heart size={28} className="text-rose-500" />
                  </div>
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest text-center group-hover:text-rose-500 transition-colors">Proudly Canadian</span>
                </div>
              </div>

              <div className="lg:col-span-2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 via-brand-ember/10 to-brand-cyan/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative h-full px-8 py-6 bg-brand-secondary border border-white/10 rounded-[2.5rem] flex items-center gap-6 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-cyan" />
                  <ShieldAlert className="text-brand-cyan shrink-0 animate-pulse" size={32} />
                  <p className="text-xs text-brand-gray leading-relaxed font-medium">
                    <span className="text-brand-offwhite font-black uppercase tracking-widest mr-2">Safety Protocol:</span>
                    Astrateq Gadgets are Advanced Driver Assistance Systems (ADAS). They augment, not replace, human judgment. Maintain 100% situational awareness at all times.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-12 border-t border-slate-100">
            <FooterAccordion 
              title="Core Legal"
              description="Foundational agreements governing your use of Astrateq Gadgets services."
              onLinkClick={setActiveLegalPage}
              links={[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
                { label: "DMCA / IP Policy", href: "#" },
              ]}
            />
            <FooterAccordion 
              title="AI & Ethics"
              description="Our commitment to responsible and transparent AI development."
              onLinkClick={setActiveLegalPage}
              links={[
                { label: "AI Ethics Statement", href: "#" },
                { label: "Algorithmic Transparency", href: "#" },
                { label: "Data Processing Addendum", href: "#" },
                { label: "Model Safety Card", href: "#" },
              ]}
            />
            <FooterAccordion 
              title="Compliance"
              description="Adherence to Canadian and international regulatory standards."
              onLinkClick={setActiveLegalPage}
              links={[
                { label: "PIPEDA Compliance", href: "#" },
                { label: "CASL (Anti-Spam)", href: "#" },
                { label: "Transport Canada Standards", href: "#" },
                { label: "Accessibility Statement", href: "#" },
              ]}
            />
            <FooterAccordion 
              title="Safety"
              description="Critical safety information and hardware performance standards."
              onLinkClick={setActiveLegalPage}
              links={[
                { label: "Driver Responsibility", href: "#" },
                { label: "Hardware Warranty", href: "#" },
                { label: "Recall Information", href: "#" },
                { label: "Safety Certifications", href: "#" },
              ]}
            />
          </div>

          {/* Legal & Copyright */}
          <div className="text-center space-y-8 w-full">
            <div className="space-y-4">
              <p className="text-[10px] text-brand-gray font-bold leading-relaxed uppercase tracking-[0.2em] max-w-4xl mx-auto">
                To the maximum extent permitted by applicable law, Astrateq Gadgets total liability shall not exceed the purchase price. Driver remains primary safety controller. AlTrak, FleetGuard Pro, and EV Battery Intelligence Suite are trademarks of Astrateq Gadgets.
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-brand-gray font-semibold uppercase tracking-widest">
                © 2026 Astrateq Gadgets. Engineered in Toronto.
              </p>
              <div className="flex items-center gap-8">
                <span className="text-[10px] font-mono text-brand-cyan font-bold uppercase tracking-widest">v2.4.0-STABLE</span>
                <div className="flex items-center gap-2 text-xs text-brand-gray font-bold uppercase tracking-widest">
                  <MapPin size={14} className={currentEvent ? currentEvent.color : "text-brand-cyan"} />
                  Canada
                  <span className={currentEvent ? currentEvent.color + " ml-1" : "text-brand-cyan ml-1"} role="img" aria-label={currentEvent ? currentEvent.name : "Canada"}>
                    {currentEvent ? currentEvent.icon : "🍁"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Floating Chat Button & Status Pill */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-brand-secondary/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-brand-ember/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-1 hidden md:block group/pill overflow-hidden"
            >
              {/* Pill HUD Accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-ember/0 via-brand-ember/5 to-brand-ember/0 -translate-x-full group-hover/pill:translate-x-full transition-transform duration-1000" />
              
              <p className="text-[10px] font-mono font-black text-brand-ember uppercase tracking-[0.25em] flex items-center gap-2.5 relative z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-ember opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-ember shadow-[0_0_8px_#FFB800]"></span>
                </span>
                AI Safety Assistant Online
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          onClick={() => setIsChatOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 bg-brand-ember text-brand-charcoal rounded-2xl flex items-center justify-center shadow-[0_12px_40px_-10px_rgba(255,184,0,0.3)] hover:shadow-[0_20px_50px_-12px_rgba(255,184,0,0.5)] transition-all group overflow-hidden border border-white/20"
          aria-label="Open AI Live Chat"
        >
          {/* Dynamic Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ember via-brand-ember to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Rings - More Subtle */}
          <div className="absolute inset-0 border border-brand-ember/20 rounded-2xl animate-ping opacity-10" />
          
          {/* Notification Dot */}
          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-cyan rounded-full border-2 border-brand-ember z-20 shadow-[0_0_8px_#00E5FF]" />
          
          <div className="relative z-10 flex flex-col items-center gap-0.5">
            <MessageSquare size={24} className="group-hover:rotate-6 transition-transform duration-500" />
            <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">Chat</span>
          </div>

          {/* Inner Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Scroll to Top Button - Repositioned to avoid crowding */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-28 z-50 w-12 h-12 bg-brand-secondary/60 backdrop-blur-xl border border-brand-ember/20 rounded-xl flex items-center justify-center text-brand-ember shadow-xl shadow-black/20 hover:bg-brand-secondary/80 hover:border-brand-ember/40 transition-all group"
            aria-label="Scroll to Top"
          >
            <div className="absolute inset-0 bg-brand-ember/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowUp size={20} className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      <LegalModal 
        isOpen={!!activeLegalPage} 
        content={activeLegalPage ? LEGAL_CONTENT[activeLegalPage] : ""} 
        onClose={() => setActiveLegalPage(null)} 
      />

      <CookieBanner onOpenPolicy={() => setActiveLegalPage('Privacy Policy')} />
      
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
        onSubmit={handleWaitlistSubmit} 
      />
      
      <SuccessToast isVisible={showSuccess} />
    </div>
  );
}

function OfferItem({ text, value }: { text: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 group/item">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan group-hover/item:scale-150 transition-transform" />
        <span className="text-sm font-medium text-brand-gray group-hover/item:text-brand-offwhite transition-colors">{text}</span>
      </div>
      <span className={`text-xs font-mono font-black tracking-widest ${value === 'PRICELESS' ? 'text-brand-cyan' : 'text-brand-offwhite'}`}>{value}</span>
    </div>
  );
}

function VisionSection() {
  const [isStormMode, setIsStormMode] = useState(false);

  return (
    <section id="vision" className="py-32 px-4 bg-brand-charcoal relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">
                  <Eye size={14} className="text-brand-cyan" />
                  Vision Intelligence
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-[10px] font-mono font-bold text-brand-gray uppercase tracking-widest">Live Feed</span>
                </div>
              </div>
              
              {/* Storm Mode Toggle */}
              <button 
                onClick={() => setIsStormMode(!isStormMode)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-500 ${
                  isStormMode 
                    ? 'bg-brand-ember/20 border-brand-ember text-brand-ember shadow-[0_0_20px_rgba(255,184,0,0.3)]' 
                    : 'bg-white/5 border-white/10 text-brand-gray hover:border-white/30'
                }`}
              >
                <div className="relative">
                  <Wind size={14} className={isStormMode ? 'animate-bounce' : ''} />
                  {isStormMode && <div className="absolute -inset-1 bg-brand-ember/40 rounded-full animate-ping" />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isStormMode ? 'Storm Mode: Active' : 'Simulate Storm'}
                </span>
              </button>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-offwhite leading-tight">
              Vision Beyond <br />
              <span className="text-brand-cyan relative inline-block">
                the Storm.
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-1 bg-brand-cyan/30 rounded-full"
                />
              </span>
            </h2>
            
            <div className="space-y-6 text-brand-gray text-lg leading-relaxed max-w-xl">
              <p className="border-l-2 border-brand-cyan/20 pl-6 italic bg-brand-cyan/5 py-4 rounded-r-xl">
                "Standard cameras fail when visibility drops. Our multi-spectral sensor array cuts through whiteouts, heavy rain, and fog by detecting thermal signatures in real-time."
              </p>
              <p className="text-base">
                The ASTRA-AI Multi-Spectral Lidar is the backbone of our 94% accuracy. While standard systems are blinded by GTA whiteouts, our array uses non-visible light to "see" heat signatures through solid fog.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-brand-cyan to-brand-cyan-hover shadow-xl shadow-brand-cyan/20 border border-white/20 relative overflow-hidden group/stat"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover/stat:bg-white/20 transition-colors" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Zap className="text-brand-charcoal" size={20} />
                  </div>
                  <div className="text-3xl font-display font-black text-brand-charcoal tracking-tighter">500ms</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-charcoal uppercase tracking-widest font-bold">Predictive Window</span>
                  <span className="text-[9px] text-brand-charcoal/70 font-mono mt-1 font-bold">LATENCY: ULTRA-LOW</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-3xl bg-brand-secondary shadow-xl shadow-brand-secondary/20 border border-white/10 relative overflow-hidden group/stat"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-cyan/10 rounded-full blur-2xl group-hover/stat:bg-brand-cyan/20 transition-colors" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 backdrop-blur-md flex items-center justify-center border border-brand-cyan/20">
                    <Eye className="text-brand-cyan" size={20} />
                  </div>
                  <div className="text-3xl font-display font-black text-white tracking-tighter">4K</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">Sensor Fusion</span>
                  <span className="text-[9px] text-brand-cyan/60 font-mono mt-1 font-bold">RESOLUTION: NATIVE</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-brand-charcoal"
          >
            {/* Base Image */}
            <img 
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury vehicle navigating a snowy Canadian road" 
              className={`w-full h-full object-cover transition-all duration-[2s] ease-out ${isStormMode ? 'blur-sm brightness-50 contrast-125' : 'brightness-90 group-hover:scale-105'}`}
              referrerPolicy="no-referrer"
            />
            
            {/* Storm Overlay (Snow/Fog) */}
            <AnimatePresence>
              {isStormMode && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
                  {/* Simulated Snow Particles */}
                  <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Astrateq Neural Overlay (Always active, but more prominent in Storm Mode) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isStormMode ? 'opacity-100' : 'opacity-40'}`}>
              {/* Thermal / Night Vision Overlay */}
              <div className={`absolute inset-0 mix-blend-color transition-colors duration-1000 ${isStormMode ? 'bg-brand-cyan/40' : 'bg-brand-cyan/15'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-brand-charcoal/20" />
              
              {/* Terrain Analysis Grid */}
              <div className="absolute inset-0 [perspective:500px] pointer-events-none opacity-30">
                <motion.div 
                  animate={{ 
                    backgroundPosition: ["0px 0px", "0px 40px"] 
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom bg-[linear-gradient(to_right,#00E5FF33_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF33_1px,transparent_1px)] bg-[size:40px_40px]"
                />
              </div>
              
              {/* HUD Elements */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border transition-all duration-500 ${isStormMode ? 'text-brand-ember border-brand-ember shadow-[0_0_15px_rgba(255,184,0,0.4)]' : 'text-brand-cyan border-brand-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${isStormMode ? 'bg-brand-ember' : 'bg-brand-cyan'}`} />
                      {isStormMode ? 'Neural Override: Multi-Spectral Active' : 'Live Feed: Multi-Spectral Lidar'}
                    </div>
                    {isStormMode && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 font-mono text-[9px] text-brand-cyan font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-brand-cyan/40"
                      >
                        <Shield size={10} />
                        94% Hazard Confidence
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Scanning HUD brackets */}
                <div className="flex justify-between items-end">
                  <div className="w-12 h-12 border-b-2 border-l-2 border-brand-cyan/40 rounded-bl-xl" />
                  <div className="w-12 h-12 border-b-2 border-r-2 border-brand-cyan/40 rounded-br-xl" />
                </div>
              </div>

              {/* Neural Heat Signature Effect in Storm Mode */}
              {isStormMode && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#FFB800_0%,transparent_40%)] mix-blend-overlay"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WaitlistForm({ spotsRemaining, onSubmit }: { spotsRemaining: number, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="w-full max-w-5xl p-[2px] bg-gradient-to-br from-brand-cyan/40 via-brand-cyan/10 to-brand-cyan/40 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,229,255,0.4)] backdrop-blur-3xl group/form relative overflow-hidden transition-all duration-700 hover:shadow-[0_0_100px_-10px_rgba(0,229,255,0.6)]">
      {/* Animated Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,229,255,0.15)_50%,transparent_100%)] h-[200%] w-full animate-scanline pointer-events-none" />
      
      {/* Background Radar Pulse */}
      <div className="absolute -inset-40 bg-brand-cyan/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative glass-panel p-4 rounded-[2.4rem] border-brand-cyan/30 bg-brand-secondary/70 backdrop-blur-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
                <ShieldCheck className="text-brand-cyan" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.3em]">Founding Beta Access</span>
                <span className="text-xs text-brand-gray font-medium">Toronto Pilot Program</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-brand-ember/10 px-4 py-2 rounded-xl border border-brand-ember/20">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono font-black text-brand-ember uppercase tracking-widest">Limited Scarcity</span>
                <span className="text-sm font-display font-black text-brand-ember tracking-tighter">{spotsRemaining} SPOTS REMAINING</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand-ember animate-ping" />
            </div>
          </div>

          <form 
            className="flex flex-col md:flex-row gap-4 relative z-10"
            onSubmit={onSubmit}
          >
            <div className="flex-[3] relative group/input">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-cyan/60 group-focus-within/input:text-brand-cyan transition-colors z-20">
                <Mail size={24} />
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email for priority founding access" 
                className="w-full pl-16 pr-8 py-8 bg-brand-charcoal/60 border border-white/10 rounded-3xl text-xl focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-charcoal/80 placeholder:text-brand-gray/30 text-brand-offwhite font-medium transition-all shadow-inner"
                required
              />
              {/* Input HUD Accent */}
              <div className="absolute bottom-0 left-16 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
            </div>
            <button 
              type="submit"
              className="flex-1 py-8 bg-brand-cyan text-brand-charcoal font-display font-black text-lg rounded-3xl hover:bg-brand-cyan-hover transition-all shadow-xl shadow-brand-cyan/20 active:scale-[0.98] uppercase tracking-[0.2em] holographic-glow border border-white/20 group/btn"
            >
              <span className="flex items-center justify-center gap-3">
                SECURE ACCESS
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div className="flex items-center justify-center gap-8 px-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/40" />
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/40" />
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/40" />
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">Priority Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialRow() {
  const testimonials = [
    { name: "Alex M.", role: "EV Enthusiast", text: "The predictive accuracy is uncanny. It detected black ice on the 401 before I could even see it." },
    { name: "Sarah K.", role: "Fleet Manager", text: "Our insurance premiums dropped by 18% within three months. The ROI is undeniable." },
    { name: "David L.", role: "Family Safety", text: "Guardian Mode is like having a private security detail for my family. Total peace of mind." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-7xl mx-auto px-4">
      {testimonials.map((t, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
          className="glass-panel p-10 rounded-[3rem] border-white/5 bg-brand-secondary/40 relative overflow-hidden group hover:border-brand-cyan/30 transition-all duration-500"
        >
          {/* HUD Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-brand-cyan/20 rounded-tl-[3rem]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-brand-cyan/20 rounded-br-[3rem]" />
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={14} className="text-brand-ember fill-brand-ember drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
                ))}
              </div>
              <div className="px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[8px] font-mono font-black text-brand-cyan uppercase tracking-widest">
                Verified Driver
              </div>
            </div>

            <blockquote className="text-xl font-display font-medium text-brand-offwhite leading-relaxed italic">
              "{t.text}"
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-white/10 flex items-center justify-center text-brand-cyan font-display font-black text-xl shadow-inner">
                {t.name[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-brand-offwhite uppercase tracking-widest">{t.name}</span>
                <span className="text-[10px] font-mono text-brand-gray/60 uppercase tracking-widest">{t.role}</span>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_#00E5FF]" />
              </div>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-cyan/5 rounded-full blur-[60px] group-hover:bg-brand-cyan/10 transition-all duration-700" />
        </motion.div>
      ))}
    </div>
  );
}

function LegalModal({ isOpen, content, onClose }: { isOpen: boolean, content: string, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-navy/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] bg-brand-secondary rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                  <ShieldAlert className="text-brand-cyan" size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-offwhite tracking-tight">Legal Documentation</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-brand-gray"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
              <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-brand-offwhite prose-p:text-brand-gray prose-strong:text-brand-offwhite prose-a:text-brand-cyan">
                <div className="markdown-body">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-brand-secondary/50 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-cyan text-brand-charcoal text-sm font-bold rounded-xl hover:bg-brand-cyan-hover transition-colors uppercase tracking-widest"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChatWidget({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Welcome to Astrateq Gadgets Support. I am your AI Safety Assistant. How can I help you optimize your journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Reliable Local AI Logic (24/7 Availability)
    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let botResponse = "";

      if (lowerMsg.includes("altrak")) {
        botResponse = "AlTrak™ is our flagship 4K sensor suite. It uses multi-spectral thermal imaging and LiDAR-lite depth sensing to predict hazards up to 2 seconds before they occur. It's specifically engineered for Canadian visibility challenges like heavy snow and fog.";
      } else if (lowerMsg.includes("fleet")) {
        botResponse = "FleetGuard Pro is our enterprise solution. It provides real-time telemetry, driver behavior scoring, and predictive maintenance alerts. It's designed to maximize ROI for fleets of all sizes while ensuring driver safety.";
      } else if (lowerMsg.includes("ev") || lowerMsg.includes("battery")) {
        botResponse = "Our EV Battery Intelligence Suite provides cell-level thermal monitoring. It's optimized for major EVs like Tesla and Rivian, helping to extend battery life and safety in extreme Canadian temperatures.";
      } else if (lowerMsg.includes("privacy") || lowerMsg.includes("data")) {
        botResponse = "Privacy is core to Astrateq. We use an 'Edge-First' philosophy, meaning 99.9% of processing happens locally on your hardware. We are fully PIPEDA and CASL compliant.";
      } else if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
        botResponse = "Pricing varies based on vehicle integration and fleet size. For individual units, AlTrak™ starts at $1,299 CAD. For enterprise fleet pricing, please request a demo via our Support Center.";
      } else if (lowerMsg.includes("winter") || lowerMsg.includes("cold")) {
        botResponse = "Astrateq hardware is MIL-SPEC rated for operation down to -45°C. Our sensors feature integrated nano-heating elements to melt ice and prevent fogging automatically.";
      } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
        botResponse = "Hello! I'm the Astrateq Safety Assistant. How can I help you with our AI automotive safety systems today?";
      } else {
        botResponse = "That's an interesting question. While I'm specialized in Astrateq's AlTrak™, FleetGuard Pro, and EV Battery systems, I recommend checking our FAQ section for more technical details or contacting our Toronto-based support team directly.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.9,
        y: isOpen ? 0 : 20,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
      className="fixed bottom-24 right-6 w-[350px] md:w-[450px] h-[600px] z-[70] flex flex-col"
    >
      <div className="glass-panel flex-1 rounded-3xl border-brand-cyan/30 shadow-2xl overflow-hidden flex flex-col bg-brand-secondary/95 backdrop-blur-2xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy text-white flex items-center justify-between relative overflow-hidden">
          {/* Animated Background Detail */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              <Bot className="text-brand-charcoal" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base tracking-tight text-white leading-none mb-1.5">Astrateq Gadgets AI Support</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em]">System Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all hover:scale-110 active:scale-95 relative z-10 group"
            aria-label="Close Chat"
          >
            <X size={24} className="text-white/60 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-amber-400 text-brand-charcoal font-medium rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-brand-gray font-medium rounded-tl-none'
              }`}>
                <div className="prose prose-sm prose-invert max-w-none">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                <div className="w-1.5 h-1.5 bg-brand-cyan/30 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-brand-cyan/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-brand-cyan/30 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-brand-navy/50">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Astrateq Gadgets systems..."
              className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-shadow focus:shadow-[0_0_15px_rgba(251,191,36,0.15)] placeholder:text-brand-gray/40 text-brand-offwhite"
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                isTyping ? 'text-brand-gray/20 cursor-not-allowed' : 'text-amber-400 hover:bg-amber-400/10'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-3 text-[9px] text-center text-brand-gray/40 font-bold uppercase tracking-widest">
            AI Assistance • Driver Responsibility Required
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CookieBanner({ onOpenPolicy }: { onOpenPolicy: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[420px] z-[60]"
    >
      <div className="relative group">
        {/* Outer Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/20 via-blue-400/10 to-brand-cyan/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
        
        <div className="relative glass-panel p-6 rounded-2xl border-brand-cyan/30 shadow-2xl bg-brand-secondary/95 backdrop-blur-xl overflow-hidden">
          {/* Animated Top Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent animate-shimmer" />
          
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 shadow-inner">
                  <Cookie className="text-brand-cyan" size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-brand-offwhite text-base tracking-tight leading-none mb-1">
                    Optimizing Your AI Experience
                  </h4>
                  <p className="text-[10px] font-mono font-bold text-brand-cyan/60 uppercase tracking-widest">
                    Astrateq Gadgets <span className="opacity-40">SYSTEM v2.4</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-brand-gray/40 hover:text-brand-cyan transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-brand-gray leading-relaxed font-medium">
              <span className="text-brand-offwhite font-bold">Astrateq Gadgets</span> uses advanced cookies to analyze terrain data patterns and improve our predictive safety algorithms. By continuing, you agree to our <button onClick={onOpenPolicy} className="text-brand-cyan hover:underline font-bold">AI Data Policy</button>.
            </p>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsVisible(false)}
                className="flex-1 px-6 py-3 bg-brand-cyan text-brand-charcoal text-[11px] font-bold rounded-xl hover:bg-brand-cyan-hover transition-all hover:shadow-lg hover:shadow-brand-cyan/20 uppercase tracking-widest active:scale-95"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 border border-white/10 text-brand-gray text-[11px] font-bold rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest active:scale-95"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Subtle Background Detail */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

function FooterAccordion({ title, description, onLinkClick, links }: { 
  title: string, 
  description: string, 
  onLinkClick: (label: string) => void,
  links: { label: string, href: string }[] 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 md:border-none py-4 md:py-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:cursor-default md:pointer-events-none py-2 md:py-0 mb-0 md:mb-6 group"
      >
        <div className="text-left">
          <h5 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-[0.25em] transition-colors mb-2">
            {title}
          </h5>
          <p className="hidden md:block text-[11px] text-brand-gray/60 font-medium uppercase tracking-wider max-w-[200px] leading-relaxed">
            {description}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="md:hidden text-brand-gray/40"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden md:!h-auto md:!opacity-100"
      >
        <ul className="pb-6 md:pb-0 space-y-3 text-sm text-brand-gray font-medium">
          {links.map((link, i) => (
            <li key={i}>
              <button 
                onClick={() => onLinkClick(link.label)}
                className="hover:text-brand-cyan transition-all block py-1.5 md:py-0 border-l-2 border-transparent hover:border-brand-cyan hover:pl-3 md:hover:pl-4 relative group/link text-left w-full"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-cyan rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity hidden md:block"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function HeroBadge({ icon, text, delay }: { icon: ReactNode, text: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="flex items-center gap-4 px-7 py-3.5 bg-brand-secondary/30 backdrop-blur-2xl border border-brand-cyan/20 rounded-2xl text-[10px] font-black text-brand-offwhite shadow-2xl shadow-brand-cyan/5 hover:border-brand-cyan/60 hover:bg-brand-secondary/50 transition-all group relative overflow-hidden"
    >
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 w-full h-[1px] bg-brand-cyan/20 -translate-y-full group-hover:animate-scan pointer-events-none" />
      
      {/* Background Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 text-brand-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="uppercase tracking-[0.3em] whitespace-nowrap holographic-glow">{text}</span>
          <div className="h-[1px] w-0 group-hover:w-full bg-brand-cyan/30 transition-all duration-500 mt-1" />
        </div>
        
        {/* Status Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <div className="absolute w-3 h-3 rounded-full border border-brand-cyan/40 animate-ping opacity-40" />
        </div>
      </div>
    </motion.div>
  );
}

function DramaticProductShowcase({ 
  index, 
  title, 
  subtitle, 
  headline, 
  description, 
  features, 
  image, 
  cta, 
  onCta,
  reversed = false 
}: { 
  index: number, 
  title: string, 
  subtitle: string, 
  headline: string, 
  description: string, 
  features: { label: string, desc: string }[], 
  image: string, 
  cta: string, 
  onCta: () => void,
  reversed?: boolean 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
    >
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.3em]">
            {subtitle}
          </div>
          <h3 className="text-4xl md:text-6xl font-display font-black text-brand-offwhite tracking-tight leading-[1.1]" dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="text-brand-gray text-lg md:text-xl leading-relaxed font-medium max-w-xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="space-y-1">
              <div className="text-brand-offwhite font-display font-black text-lg uppercase tracking-tight">{f.label}</div>
              <div className="text-brand-gray text-xs font-medium leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={onCta}
          className="group/btn relative px-8 py-4 bg-brand-ember text-brand-charcoal text-sm font-black rounded-xl overflow-hidden transition-all active:scale-95 shadow-2xl shadow-brand-ember/20 hover:shadow-brand-ember/40 border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
          <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] holographic-glow">
            {cta}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      <div className="flex-1 relative group">
        <div className="absolute -inset-4 bg-brand-cyan/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={image} 
            alt={title} 
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" />
          
          {/* HUD Overlay Elements */}
          <div className="absolute top-6 left-6 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-brand-charcoal/60 backdrop-blur-md border border-white/10">
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-[10px] font-mono font-black text-brand-offwhite uppercase tracking-widest">Neural Link: Active</span>
          </div>
          
          <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-brand-cyan/40 opacity-40" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-brand-cyan/40 opacity-40" />
        </div>
      </div>
    </motion.div>
  );
}

function SolutionCard({ icon, title, subtitle, description, features, index, image }: { 
  icon: ReactNode, 
  title: string, 
  subtitle: string, 
  description: string, 
  features: string[],
  index: number,
  image?: string
}) {
  const gradients = [
    "from-brand-cyan/20 via-brand-cyan/5 to-transparent",
    "from-blue-400/20 via-blue-400/5 to-transparent",
    "from-brand-cyan/20 via-brand-cyan/5 to-transparent"
  ];

  const iconBgs = [
    "bg-brand-cyan/10 border-brand-cyan/20",
    "bg-blue-400/10 border-blue-400/20",
    "bg-brand-cyan/10 border-brand-cyan/20"
  ];

  const iconColors = [
    "text-brand-cyan",
    "text-blue-400",
    "text-brand-cyan"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-panel hover-glow p-10 rounded-[2.5rem] border-white/5 group relative overflow-hidden bg-brand-secondary/40"
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Technical Background Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-cyan/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-brand-cyan/10 transition-all duration-500 rotate-12" />
      
      {image && (
        <div className="mb-8 -mx-10 -mt-10 overflow-hidden h-48 relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
        </div>
      )}

      <div className={`w-20 h-20 rounded-3xl ${iconBgs[index % iconBgs.length]} border flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 relative shadow-inner`}>
        <div className={`absolute inset-0 border border-current rounded-3xl animate-pulse opacity-20 ${iconColors[index % iconColors.length]}`} />
        {/* Clone the icon to apply dynamic color */}
        {index === 0 ? <Eye className={iconColors[0]} size={36} /> : 
         index === 1 ? <Battery className={iconColors[1]} size={36} /> : 
         <ShieldCheck className={iconColors[2]} size={36} />}
      </div>

      <div className="space-y-6 relative z-10">
        <div>
          <div className={`text-[10px] font-mono font-black tracking-[0.3em] mb-3 uppercase ${iconColors[index % iconColors.length]}`}>
            {subtitle}
          </div>
          <h3 className="text-3xl font-display font-bold text-brand-offwhite group-hover:text-brand-offwhite transition-colors duration-300 leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-brand-gray text-lg leading-relaxed font-medium opacity-80">
          {description}
        </p>

        <div className="pt-8 grid gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 text-xs font-mono text-brand-gray font-bold group-hover:text-brand-offwhite transition-colors">
              <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-brand-cyan' : index === 1 ? 'bg-blue-400' : 'bg-brand-cyan'} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
              <span className="tracking-widest uppercase">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${index === 0 ? 'from-brand-cyan' : index === 1 ? 'from-blue-400' : 'from-brand-cyan'} to-transparent w-0 group-hover:w-full transition-all duration-700`} />
    </motion.div>
  );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-white/5 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-start gap-4 text-left transition-all"
      >
        <span className="text-[10px] font-mono font-bold text-brand-cyan/40 mt-1.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <span className="text-lg font-display font-bold text-brand-offwhite group-hover:text-brand-cyan transition-colors block mb-1">
            {question}
          </span>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-6">
                  <div className="pl-4 border-l-2 border-brand-cyan/20">
                    <p className="text-brand-offwhite text-sm leading-relaxed">
                      {answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          className={`mt-1 transition-colors ${isOpen ? 'text-brand-cyan' : 'text-brand-gray/30'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
    </div>
  );
}

function FAQSection({ onContactSupport }: { onContactSupport: () => void }) {
  const faqs = [
    {
      category: "Installation & Setup",
      icon: <RotateCcw size={20} />,
      questions: [
        {
          q: "Do I need professional installation?",
          a: "While our 'Plug-and-Play' kit is designed for basic functionality via the OBD-II port, the full AlTrak™ experience requires professional sensor mounting and calibration. Our certified technicians ensure that the multi-spectral cameras are perfectly aligned to your vehicle's specific geometry, which is critical for 500ms predictive accuracy. We have 150+ certified installation hubs across Canada, from Vancouver to Halifax."
        },
        {
          q: "How long does the installation take?",
          a: "A standard professional installation takes approximately 3.5 hours. This includes physical mounting of the front and rear sensor arrays, routing of the high-speed data cables, and a 45-minute software calibration drive where the system 'learns' your vehicle's dynamic profile and blind-spot zones."
        },
        {
          q: "Can I transfer the system to a new vehicle?",
          a: "Yes. Astrateq Gadgets systems are designed to be modular. If you trade in your vehicle, our technicians can decommission the hardware and reinstall it in your new vehicle. A recalibration service is required to ensure the AI models are tuned to the new vehicle's height, wheelbase, and sensor positioning. This process typically takes 2 hours."
        }
      ]
    },
    {
      category: "Vehicle Compatibility",
      icon: <Battery size={20} />,
      questions: [
        {
          q: "Is my vehicle compatible?",
          a: "Astrateq Gadgets are compatible with 98% of passenger vehicles manufactured after 2015. We offer native CAN-bus integration for major manufacturers. For EV owners, our Battery Intelligence Suite is specifically optimized for Tesla (Model 3/Y), Rivian (R1T/R1S), and the Ford F-150 Lightning, providing deep-level thermal monitoring that standard software misses."
        },
        {
          q: "Does it support trailers or heavy-duty towing?",
          a: "Absolutely. Our 'Tow-Link' module extends the AI's predictive capabilities to include trailer sway detection and blind-spot monitoring for loads up to 30 feet. The system automatically adjusts braking pressure and steering assistance algorithms when it detects a connected trailer, accounting for the increased mass and different center of gravity."
        },
        {
          q: "Does it work with older vehicles?",
          a: "Vehicles manufactured between 2008 and 2014 are supported via our 'Legacy Link' adapter, though some advanced predictive features may be limited by the vehicle's slower data bus. For vehicles older than 2008, we offer a standalone safety suite that provides visual and audible alerts without direct vehicle control integration."
        }
      ]
    },
    {
      category: "Fleet & ROI Optimization",
      icon: <Activity size={20} />,
      questions: [
        {
          q: "How does FleetGuard Pro improve my bottom line?",
          a: "FleetGuard Pro delivers a measurable ROI within 6-9 months by reducing fuel consumption by up to 15% through AI-optimized routing and idling reduction. Additionally, our predictive maintenance alerts reduce unscheduled downtime by 30%, and our safety suite can lower insurance premiums by up to 20% through verified safe-driving telemetry."
        },
        {
          q: "How does the system handle multi-driver authentication?",
          a: "For fleets, we offer biometric and NFC-based driver identification. This ensures that safety scores and driving logs are accurately attributed to the correct operator. The system can automatically adjust seat positions, mirror angles, and even speed governors based on the specific driver's profile and authorization level."
        },
        {
          q: "Does Astrateq Gadgets help with ELD compliance in Canada?",
          a: "Yes. Our systems are fully certified for Canadian ELD (Electronic Logging Device) mandates. We provide seamless integration with major dispatch software, ensuring your drivers remain compliant with Hours of Service (HOS) regulations while automating the reporting process to save your administrative team hours of manual work."
        }
      ]
    },
    {
      category: "Family Safety & AI Ethics",
      icon: <ShieldCheck size={20} />,
      questions: [
        {
          q: "Is the AI safe for my children? How does it interact with safety features?",
          a: "Safety is our core mission. Astrateq Gadgets AI is designed to augment your vehicle's existing safety systems (like ABS and ESC), not override them. For families, our 'Guardian Mode' provides enhanced child-presence detection and cabin climate monitoring. The AI acts as a 'second set of eyes' that never gets tired, specifically tuned to detect unpredictable movements like a child or pet darting into the road."
        },
        {
          q: "How does the AI handle ethical dilemmas in split-second decisions?",
          a: "Astrateq Gadgets follows a 'Human-in-the-Loop' philosophy. Our AI is programmed to prioritize the safety of all road users by maximizing braking force and identifying the path of least resistance (e.g., steering toward an empty shoulder rather than another vehicle). We do not use 'trolley problem' logic; instead, our algorithms focus on physics-based collision avoidance and mitigation of force."
        },
        {
          q: "What kind of ongoing support do you provide?",
          a: "Every Astrateq Gadgets installation includes a lifetime subscription to our 'Safety Cloud' updates, ensuring your AI models are always learning from the latest road data. We provide 24/7 technical support via our Toronto-based command center, and every hardware unit is backed by a 24-month comprehensive warranty with on-site service available for fleet customers."
        }
      ]
    },
    {
      category: "Data Privacy & Security",
      icon: <Shield size={20} />,
      questions: [
        {
          q: "How is my data protected?",
          a: "We employ a 'Zero-Cloud' default policy. 99.9% of all video and sensor processing happens locally on the Astrateq Gadgets Edge Processor. We are fully PIPEDA and GDPR compliant. Your driving data is encrypted with AES-256 at rest. If you choose to use our 'Incident Cloud Backup', your data is sharded and stored across multiple secure Canadian data centers, accessible only via your biometric-linked Astrateq Gadgets ID."
        },
        {
          q: "Is my data shared with law enforcement?",
          a: "We do not provide law enforcement with a 'backdoor' to your data. We will only release specific incident data if compelled by a valid Canadian court order or warrant. Because we prioritize local storage, in many cases, we do not even possess the data required to fulfill such requests unless you have explicitly enabled cloud backups."
        },
        {
          q: "Who owns the data collected by the sensors?",
          a: "You are the sole owner of your data. Astrateq Gadgets does not sell, rent, or trade user data to insurance companies or third parties. We only use anonymized, telemetry-only data (no video, no location) to improve our global safety models if you explicitly opt-in to our 'Community Safety Network'."
        }
      ]
    },
    {
      category: "Connectivity & Updates",
      icon: <Globe size={20} />,
      questions: [
        {
          q: "Does the system require a constant cellular connection?",
          a: "No. The core safety and predictive algorithms run entirely offline on the internal Edge Processor. A cellular connection (via the integrated 5G eSIM) is only required for real-time traffic updates, cloud backups, and receiving over-the-air (OTA) software improvements. The system remains 100% functional even in remote areas with zero reception."
        },
        {
          q: "How are software updates delivered?",
          a: "Updates are delivered Over-the-Air (OTA) during periods of inactivity (e.g., while the vehicle is parked at night). We use a dual-partition 'A/B' update system, meaning the new software is verified before it is activated. If an update fails, the system automatically rolls back to the previous stable version, ensuring your vehicle is never 'bricked' or unsafe."
        }
      ]
    },
    {
      category: "Extreme Performance",
      icon: <Zap size={20} />,
      questions: [
        {
          q: "Does it work in extreme cold?",
          a: "Absolutely. Engineered in Toronto, our hardware is MIL-SPEC rated for operation down to -45°C. The sensor lenses feature integrated nano-heating elements that automatically activate to melt ice and prevent fogging. Our AI models are trained on over 2 million kilometers of Canadian winter driving data, specifically optimized for detecting lane markings under snow and identifying black ice patches."
        },
        {
          q: "How does the system perform in heavy rain or fog?",
          a: "While optical cameras can be limited by low visibility, our AlTrak™ suite uses multi-spectral thermal imaging and LiDAR-lite depth sensing to 'see' through fog and heavy downpours. These sensors detect heat signatures and physical distances that are invisible to the human eye, providing reliable safety alerts even when visibility is near zero."
        },
        {
          q: "What is AlTrak™ Predictive Safety?",
          a: "AlTrak™ is our proprietary sensor fusion engine. It combines 4K optical data, LiDAR-lite depth sensing, and multi-spectral thermal imaging. By processing 120 frames per second, it can predict potential collisions up to 2 seconds before they occur—providing a 500ms 'Safety Window' that is often the difference between a close call and a serious accident."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-32 px-4 bg-brand-secondary relative overflow-hidden" role="region" aria-label="Frequently asked questions">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Header */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
                <HelpCircle className="text-brand-cyan" size={14} />
                <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">Support Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-offwhite mb-6 leading-tight">
                Got <span className="text-brand-cyan">Questions?</span><br />
                We've Got Answers.
              </h2>
              <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                Explore our detailed documentation or reach out to our Toronto-based support team for specialized inquiries.
              </p>
              
              <div className="p-8 rounded-3xl bg-brand-charcoal text-white shadow-xl relative overflow-hidden group/card border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:bg-brand-cyan/30 transition-colors" />
                
                <div className="relative z-10">
                  <h4 className="text-xl font-display font-bold mb-3">Still need help?</h4>
                  <p className="text-sm text-brand-gray mb-6 leading-relaxed">
                    Our technical specialists are available 24/7 for emergency assistance and specialized vehicle integration support.
                  </p>
                  <button 
                    onClick={onContactSupport}
                    className="w-full py-4 bg-brand-cyan text-brand-charcoal text-xs font-bold rounded-xl hover:bg-brand-cyan-hover transition-all uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-[0.98]"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: FAQ Groups */}
          <div className="lg:w-2/3 space-y-12">
            {faqs.map((group, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-charcoal rounded-3xl p-8 border border-white/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-offwhite">
                    {group.category}
                  </h3>
                </div>
                
                <div className="divide-y divide-white/5">
                  {group.questions.map((faq, fIdx) => (
                    <FAQItem key={fIdx} index={fIdx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.flatMap(g => g.questions.map(q => ({
          "@type": "Question",
          "name": q.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.a
          }
        })))
      })}
      </script>
    </section>
  );
}

function WaitlistModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-panel bg-brand-secondary p-8 rounded-3xl border-brand-cyan/30 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-lg text-brand-gray transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-brand-cyan" size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-offwhite mb-2">Join the Waitlist</h3>
              <p className="text-brand-gray">Be the first to experience the future of Canadian road safety.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-brand-navy/50 border border-brand-cyan/20 rounded-xl focus:outline-none focus:border-brand-cyan transition-colors text-brand-offwhite placeholder:text-brand-gray/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-brand-navy/50 border border-brand-cyan/20 rounded-xl focus:outline-none focus:border-brand-cyan transition-colors text-brand-offwhite placeholder:text-brand-gray/30"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-brand-ember text-brand-charcoal font-bold rounded-xl hover:bg-brand-ember/90 transition-all shadow-lg shadow-brand-ember/30 active:scale-[0.98] uppercase tracking-widest holographic-glow border border-white/20"
              >
                SECURE MY SPOT
              </button>
            </form>

            <p className="mt-6 text-[10px] text-center text-brand-gray/60 font-medium uppercase tracking-wider">
              Limited to 100 founding members • No credit card required
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SuccessToast({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-[110] px-6 py-4 bg-brand-secondary border border-brand-cyan/30 rounded-2xl shadow-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <ShieldCheck className="text-brand-cyan" size={24} />
          </div>
          <div>
            <h4 className="text-brand-offwhite font-bold text-sm">Success!</h4>
            <p className="text-brand-gray text-xs">You've been added to the founding beta waitlist.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
