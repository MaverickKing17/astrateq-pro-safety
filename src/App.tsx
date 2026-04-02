/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
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
  Linkedin,
  Twitter,
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
  Minimize2,
  Zap,
  HelpCircle,
  Lock,
  Heart
} from "lucide-react";

function Logo({ className = "", event }: { className?: string, event?: any }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Animated Glow Background */}
        <div className={`absolute inset-0 ${event ? event.accent + '/20' : 'bg-brand-purple/20'} rounded-2xl blur-xl animate-pulse`} />
        
        {/* Official Astrateq Icon (Recreated with SVG) */}
        <div className="relative z-10 w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
            <defs>
              <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={event ? (event.color.includes('red') ? '#ef4444' : event.color.includes('orange') ? '#f97316' : event.color.includes('emerald') ? '#10b981' : '#D946EF') : '#D946EF'} />
                <stop offset="50%" stopColor={event ? (event.color.includes('red') ? '#dc2626' : event.color.includes('orange') ? '#ea580c' : event.color.includes('emerald') ? '#059669' : '#A21CAF') : '#A21CAF'} />
                <stop offset="100%" stopColor={event ? (event.color.includes('red') ? '#b91c1c' : event.color.includes('orange') ? '#c2410c' : event.color.includes('emerald') ? '#047857' : '#701A75') : '#701A75'} />
              </linearGradient>
            </defs>
            {/* Stylized Ribbon 'A' */}
            <path 
              d="M50 15 L25 85 L35 85 L45 55 Q55 55 65 85 L75 85 L50 15 Z" 
              fill="url(#ribbonGradient)"
            />
            <path 
              d="M35 65 Q20 65 20 45 Q20 25 40 25 Q60 25 60 45 Q60 65 45 65" 
              fill="none" 
              stroke="url(#ribbonGradient)" 
              strokeWidth="10" 
              strokeLinecap="round"
              className="opacity-80"
            />
            {/* Fluid accent */}
            <path 
              d="M60 40 Q75 30 85 50" 
              fill="none" 
              stroke="url(#ribbonGradient)" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-display font-black text-brand-offwhite tracking-tighter">ASTRATEQ</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono font-bold ${event ? event.color : 'text-brand-purple'} tracking-[0.5em] uppercase mt-0.5`}>Gadgets</span>
          {event && (
            <span className="text-[10px] animate-bounce" title={event.name}>{event.icon}</span>
          )}
        </div>
      </div>
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
  const currentEvent = getCanadianEvent();

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
    <div className="min-h-screen flex flex-col selection:bg-brand-purple/30 selection:text-brand-purple">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo event={currentEvent} />
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-gray">
            <button onClick={() => scrollToSection('vision')} className="hover:text-brand-purple transition-colors">Vision</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-brand-purple transition-colors">Solutions</button>
            <button 
              onClick={() => setIsWaitlistOpen(true)}
              className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/90 transition-colors shadow-lg shadow-brand-purple/20"
            >
              Beta Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-32">
        {/* Background with Arctic Feel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/90 to-brand-navy z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=2000" 
            alt="Car Cockpit" 
            className="w-full h-full object-cover grayscale opacity-20"
            referrerPolicy="no-referrer"
          />
          
          {/* HUD Overlays (Adjusted for Light Mode) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-brand-purple/10 rounded-full flex items-center justify-center"
            >
              <div className="w-48 h-48 border-2 border-brand-purple/5 rounded-full border-dashed animate-spin-slow" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-[10px] font-mono text-brand-purple/40 tracking-widest uppercase py-2">
                Scanning Terrain
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/3 right-10 w-48 p-4 glass-panel rounded-lg border-brand-purple/20"
            >
              <div className="text-[10px] font-mono text-brand-purple mb-1 uppercase tracking-tighter">Hazard Detection</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                <span className="text-xl font-display font-bold text-brand-offwhite">94% ACC</span>
              </div>
              <div className="mt-2 h-1 bg-brand-purple/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-brand-purple"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full max-w-md px-4"
            >
              <div className="flex justify-between items-end mb-2">
                <div className="text-[10px] font-mono text-brand-purple/40 uppercase">System Status: Active</div>
                <div className="text-[10px] font-mono text-brand-purple/40 uppercase">Toronto, ON</div>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1] text-brand-offwhite">
              Predictive AI for the <br />
              <span className="text-brand-purple holographic-glow">Modern Canadian Driver.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed">
              Anticipate road hazards and optimize battery health with 94% accuracy. 
              Engineered in Toronto for the Great North.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 px-4 py-2 bg-brand-purple/5 border border-brand-purple/10 rounded-full text-brand-purple text-xs font-medium"
            >
              <AlertTriangle size={14} />
              <span>Astrateq Gadgets are driver assistance tools only.</span>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => setIsWaitlistOpen(true)}
              className="group relative px-8 py-4 bg-brand-yellow text-brand-offwhite font-bold rounded-lg transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(250,204,21,0.2)] active:scale-95"
            >
              JOIN THE FOUNDING BETA WAITLIST (100 SPOTS REMAINING)
            </motion.button>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-8 mt-12 text-brand-gray"
            >
              <HeroBadge icon={<ShieldCheck size={18} className="text-brand-purple" />} text="Transport Canada Compliant" delay={1.3} />
              <HeroBadge icon={<RotateCcw size={18} className="text-brand-purple" />} text="60-Day Returns" delay={1.4} />
              <HeroBadge icon={<MapPin size={18} className="text-brand-purple" />} text="Toronto Engineered & Shipped" delay={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest">
                  <Eye size={14} className="text-brand-purple" />
                  Vision Intelligence
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-[10px] font-mono font-bold text-brand-gray/60 uppercase tracking-widest">Live Feed</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-offwhite leading-tight">
                Vision Beyond <br />
                <span className="text-brand-purple relative inline-block">
                  the Storm.
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 h-1 bg-brand-purple/30 rounded-full"
                  />
                </span>
              </h2>
              
              <div className="space-y-6 text-brand-gray text-lg leading-relaxed max-w-xl">
                <p className="border-l-2 border-brand-purple/20 pl-6 italic bg-brand-purple/5 py-4 rounded-r-xl">
                  "Standard cameras fail when visibility drops. Our multi-spectral sensor array cuts through whiteouts, heavy rain, and fog by detecting thermal signatures in real-time."
                </p>
                <p className="text-base">
                  We're engineering <span className="text-brand-offwhite font-bold">AI Co-pilots</span> that see through the blizzard using multi-spectral sensor fusion and real-time terrain analysis.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-purple-glow shadow-xl shadow-brand-purple/20 border border-white/20 relative overflow-hidden group/stat"
                >
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover/stat:bg-white/20 transition-colors" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Zap className="text-white" size={20} />
                    </div>
                    <div className="text-3xl font-display font-black text-white tracking-tighter">500ms</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white uppercase tracking-widest font-bold">Predictive Window</span>
                    <span className="text-[9px] text-white/70 font-mono mt-1 font-bold">LATENCY: ULTRA-LOW</span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-brand-offwhite shadow-xl shadow-brand-offwhite/20 border border-white/10 relative overflow-hidden group/stat"
                >
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-purple/10 rounded-full blur-2xl group-hover/stat:bg-brand-purple/20 transition-colors" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/10 backdrop-blur-md flex items-center justify-center border border-brand-purple/20">
                      <Eye className="text-brand-purple" size={20} />
                    </div>
                    <div className="text-3xl font-display font-black text-white tracking-tighter">4K</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Sensor Fusion</span>
                    <span className="text-[9px] text-brand-purple/60 font-mono mt-1 font-bold">RESOLUTION: NATIVE</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group bg-brand-navy"
            >
              {/* Base Image (Luxury Vehicle on Sunny Snowy Road) */}
              <img 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Vehicle on Sunny Snowy Road" 
                className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-[3s] ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Thermal / Night Vision Overlay */}
              <div className="absolute inset-0 bg-brand-purple/15 mix-blend-color opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-brand-navy/20" />
              
              {/* Terrain Analysis Grid (Perspective) */}
              <div className="absolute inset-0 [perspective:500px] pointer-events-none opacity-30">
                <motion.div 
                  animate={{ 
                    backgroundPosition: ["0px 0px", "0px 40px"] 
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom bg-[linear-gradient(to_right,#D946EF33_1px,transparent_1px),linear-gradient(to_bottom,#D946EF33_1px,transparent_1px)] bg-[size:40px_40px]"
                />
              </div>
              
              {/* HUD Elements */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-brand-purple font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-purple/40 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse shadow-[0_0_8px_#D946EF]" />
                      Live Feed: Multi-Spectral Lidar
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-brand-purple/80 font-bold uppercase tracking-widest bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-brand-purple/20">
                      Heading: 342° NW | Uptime: 14:22:09
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="font-mono text-[10px] text-brand-purple font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-purple/40">
                      Lat: 43.6532° N | Lon: 79.3832° W
                    </div>
                    <div className="font-mono text-[14px] text-brand-purple font-bold bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-brand-purple/20 flex items-center gap-2 justify-end">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >104</motion.span>
                      <span className="text-[8px] opacity-60">KM/H</span>
                    </div>
                  </div>
                </div>

                {/* Central Target Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px]">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.01, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative aspect-[4/3] border-2 border-brand-purple/30 rounded-2xl flex items-center justify-center overflow-hidden backdrop-blur-[1px]"
                  >
                    {/* Traffic Data Layer Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Traffic Flow Nodes (Perspective) */}
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={`traffic-${i}`}
                          initial={{ opacity: 0, scale: 0.5, y: 100 }}
                          animate={{ 
                            opacity: [0, 0.4, 0],
                            scale: [0.5, 1.2, 1.5],
                            y: [-20, -100, -200],
                            x: [i * 20 - 40, i * 30 - 45]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            delay: i * 1.2,
                            ease: "linear"
                          }}
                          className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent blur-sm"
                        />
                      ))}
                    </div>

                    {/* Scanning Line */}
                    <motion.div 
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-brand-purple shadow-[0_0_20px_#D946EF] z-10"
                    />
                    
                    {/* Target Box */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        scale: [0.99, 1, 0.99]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-4/5 h-1/2 border border-brand-purple/50 rounded flex flex-col items-center justify-center bg-brand-purple/10 backdrop-blur-sm relative"
                    >
                      <div className="absolute -top-7 left-0 flex items-center gap-2 text-[10px] font-mono font-bold text-brand-purple bg-black/90 px-3 py-1 rounded-t-md border-t border-x border-brand-purple/40">
                        <AlertTriangle size={12} className="text-red-500 animate-pulse" />
                        <span className="text-red-500">HAZARD DETECTED: 12.4m</span>
                      </div>
                      
                      {/* Traffic Congestion Alert */}
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-7 right-0 flex items-center gap-2 text-[9px] font-mono font-bold text-orange-400 bg-black/90 px-3 py-1 rounded-b-md border-b border-x border-orange-400/30"
                      >
                        <Activity size={10} />
                        CONGESTION AHEAD: 1.2km
                      </motion.div>

                      <div className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-[0.2em] animate-pulse">Analyzing Surface Friction...</div>
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                            className="w-1 bg-brand-purple/60 rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-brand-purple shadow-[-2px_-2px_10px_rgba(217,70,239,0.3)]" />
                    <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-brand-purple shadow-[2px_-2px_10px_rgba(217,70,239,0.3)]" />
                    <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-brand-purple shadow-[-2px_2px_10px_rgba(217,70,239,0.3)]" />
                    <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-brand-purple shadow-[2px_2px_10px_rgba(217,70,239,0.3)]" />
                  </motion.div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-40 bg-brand-purple/20 rounded-full overflow-hidden border border-brand-purple/20 p-[1px]">
                        <motion.div 
                          animate={{ width: ["10%", "95%", "40%", "85%", "60%"] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-glow rounded-full shadow-[0_0_15px_#D946EF]"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-brand-purple font-bold tracking-widest bg-black/40 px-2 py-0.5 rounded">BUFF: ACTIVE</span>
                    </div>
                    <div className="text-[9px] font-mono text-brand-purple/80 uppercase tracking-widest flex items-center gap-2 font-bold">
                      <div className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-ping" />
                      Processing Real-Time Stream...
                    </div>
                  </div>
                  <div className="text-right bg-black/40 backdrop-blur-md p-3 rounded-xl border border-brand-purple/20">
                    <motion.div 
                      animate={{ 
                        color: ["#D946EF", "#F0ABFC", "#D946EF"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-display font-black tracking-tighter"
                    >
                      98.<motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                      >2</motion.span>%
                    </motion.div>
                    <div className="text-[9px] font-mono text-brand-purple/60 uppercase tracking-widest font-bold">Confidence Score</div>
                  </div>
                </div>
              </div>

              {/* Scanning Line Overlay (Global) */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(217,70,239,0.08)_50%,transparent_100%)] bg-[length:100%_15px] animate-scan-lines pointer-events-none opacity-40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-brand-offwhite">
              The <span className="text-brand-purple">Solution</span>
            </h2>
            <p className="text-brand-gray">Three pillars of intelligent automotive protection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard 
              index={0}
              icon={<Eye className="text-brand-purple" />}
              title="AlTrak™"
              subtitle="PREDICTIVE SAFETY"
              description="Our AI system detects hazards before human reaction time, analyzing thousands of data points per second to keep you one step ahead on every road."
              features={["< 50MS REACTION TIME", "94% HAZARD PREDICTION", "360° COVERAGE"]}
            />
            <SolutionCard 
              index={1}
              icon={<Battery className="text-brand-purple" />}
              title="EV Battery Intelligence"
              subtitle="RANGE CONFIDENCE"
              description="Drive from Toronto to Montreal with total peace of mind. Our AI optimizes thermal management to give you up to 500 miles of Range Confidence, even in Canadian winters."
              features={["500MI RANGE OPTIMIZED", "THERMAL AI MANAGEMENT", "WINTER-TESTED"]}
            />
            <SolutionCard 
              index={2}
              icon={<Shield className="text-brand-purple" />}
              title="Guardian Mode"
              subtitle="24/7 ASSET MONITORING"
              description="Proactive around-the-clock asset monitoring and security. Your vehicle is always watched, always protected, always connected."
              features={["24/7 MONITORING", "INSTANT ALERTS", "GEO-FENCING"]}
            />
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
        className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/50 text-brand-offwhite border-t border-slate-100"
      >
        {/* Technical Background Detail */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D946EF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[120px] -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-20">
          {/* Brand & Lead Gen & Utilities */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-slate-100/50 items-start">
            {/* Column 1: Brand */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Logo event={currentEvent} />
              <p className="text-sm text-brand-gray font-medium max-w-[280px] text-center lg:text-left leading-relaxed">
                Empowering Canadian drivers with the world's most advanced AI safety systems. Engineered for the Great North.
              </p>
            </div>

            {/* Column 2: Lead Generation (CRO Focus) */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
              <div className="w-full space-y-4 relative group/form">
                {/* Decorative Glow */}
                <div className="absolute -inset-4 bg-brand-purple/5 rounded-[2rem] blur-2xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative space-y-3">
                  <div className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-[0.3em] text-center">Stay in the Loop</div>
                  <form 
                    className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-brand-purple/50 focus-within:shadow-lg focus-within:shadow-brand-purple/5 transition-all duration-300" 
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
                      className="flex-1 px-4 py-2.5 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-brand-purple text-white text-xs font-bold rounded-xl hover:bg-brand-purple-glow transition-all shadow-md hover:shadow-brand-purple/30 uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Join
                    </button>
                  </form>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex -space-x-1.5">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="User" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-brand-gray/70 font-bold uppercase tracking-wider">
                        Join <span className="text-brand-purple">2,400+</span> drivers receiving updates
                      </p>
                    </div>
                    <p className="text-[10px] text-brand-gray/50 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Shield size={12} className="text-brand-purple/50" />
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
                <div className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-[0.4em] group-hover/status:text-brand-purple-glow transition-all duration-500">System Status</div>
                <div className="relative">
                  {/* Radar Pulse Rings */}
                  <div className="absolute -inset-2 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover/status:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative flex items-center gap-4 px-6 py-3 bg-white border border-emerald-500/20 rounded-2xl shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.2)] transition-all duration-500 backdrop-blur-md group-hover/status:border-emerald-500/40">
                    <div className="relative flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse" />
                      <div className="absolute w-6 h-6 rounded-full border border-emerald-500/40 animate-ping opacity-40" />
                      <div className="absolute w-8 h-8 rounded-full border border-emerald-500/20 animate-ping [animation-delay:0.5s] opacity-20" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[13px] font-black text-emerald-600 uppercase tracking-tighter">All Systems Nominal</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-emerald-600/60 font-bold">LATENCY: 8MS</span>
                        <div className="w-1 h-1 rounded-full bg-emerald-600/30" />
                        <span className="text-[9px] font-mono text-emerald-600/60 font-bold">UPTIME: 99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-8">
                {/* Trust Badges - Enhanced Glassmorphism */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-8 p-5 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group/badges relative overflow-hidden">
                    {/* Subtle Background Glow */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-purple/5 rounded-full blur-2xl group-hover/badges:bg-brand-purple/10 transition-colors duration-700" />
                    
                    <div title="Transport Canada Compliant" className="flex flex-col items-center gap-2 group/badge cursor-help">
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover/badge:border-brand-purple/40 group-hover/badge:shadow-lg group-hover/badge:shadow-brand-purple/5 transition-all duration-300">
                        <ShieldCheck size={20} className="text-brand-purple/40 group-hover/badge:text-brand-purple transition-colors duration-300" />
                      </div>
                      <span className="text-[9px] font-black text-brand-gray/40 group-hover/badge:text-brand-purple uppercase tracking-[0.15em] transition-colors duration-300">TC Compliant</span>
                    </div>
                    
                    <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                    
                    <div title="ISO 9001 Certified" className="flex flex-col items-center gap-2 group/badge cursor-help">
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover/badge:border-brand-purple/40 group-hover/badge:shadow-lg group-hover/badge:shadow-brand-purple/5 transition-all duration-300">
                        <Scale size={20} className="text-brand-purple/40 group-hover/badge:text-brand-purple transition-colors duration-300" />
                      </div>
                      <span className="text-[9px] font-black text-brand-gray/40 group-hover/badge:text-brand-purple uppercase tracking-[0.15em] transition-colors duration-300">ISO 9001</span>
                    </div>
                  </div>
                </div>

                {/* Utilities & Socials - Enhanced Interactivity */}
                <div className="flex flex-col items-center lg:items-end gap-5">
                  <div className="flex items-center gap-8">
                    {/* Language Toggle - Refined */}
                    <div className="flex items-center gap-5 text-[11px] font-black tracking-[0.2em] text-brand-gray" role="navigation" aria-label="Language selection">
                      <button className="text-brand-purple relative group/lang">
                        EN
                        <motion.div 
                          layoutId="footer-lang-active"
                          className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-purple rounded-full shadow-[0_0_8px_#D946EF]" 
                        />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-200" />
                      <button className="hover:text-brand-purple transition-colors duration-300">FR</button>
                    </div>
                    
                    <div className="w-[1px] h-8 bg-slate-200" />
                    
                    {/* Social Icons - Brand Specific Colors */}
                    <div className="flex items-center gap-4">
                      <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-gray/60 hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:shadow-xl hover:shadow-[#0077b5]/10 transition-all duration-300 group/social" title="LinkedIn">
                        <Linkedin size={18} className="group-hover/social:scale-110 transition-transform" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-gray/60 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:shadow-xl hover:shadow-[#1DA1F2]/10 transition-all duration-300 group/social" title="Twitter">
                        <Twitter size={18} className="group-hover/social:scale-110 transition-transform" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-gray/60 hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:shadow-xl hover:shadow-[#E4405F]/10 transition-all duration-300 group/social" title="Instagram">
                        <motion.div whileHover={{ rotate: 15 }}><Activity size={18} className="group-hover/social:scale-110 transition-transform" /></motion.div>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-gray/60 hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:shadow-xl hover:shadow-[#FF0000]/10 transition-all duration-300 group/social" title="YouTube">
                        <Zap size={18} className="group-hover/social:scale-110 transition-transform" />
                      </a>
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
                className="group relative p-10 rounded-[3rem] overflow-hidden border border-slate-200 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(217,70,239,0.1)] hover:border-brand-purple/20"
              >
                {/* Subtle Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/[0.02] via-white to-brand-purple/[0.05] opacity-100" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] group-hover:bg-brand-purple/10 transition-colors duration-1000" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D946EF 1.5px, transparent 0)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-brand-purple/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-glow flex items-center justify-center shadow-xl shadow-brand-purple/20 group-hover:scale-105 transition-transform duration-500">
                        <Shield className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-brand-purple uppercase tracking-[0.2em] shadow-sm group-hover:bg-brand-purple/5 group-hover:border-brand-purple/10 transition-all">
                      Family Protection Suite
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-3xl font-display font-black text-brand-offwhite tracking-tight group-hover:text-brand-purple transition-colors duration-500">
                      For Canadian Families
                    </h4>
                    <p className="text-base text-brand-gray leading-relaxed font-medium">
                      Protect your "Golden Assets." Our AI is specifically trained for the unique hazards of Canadian school zones and dark rural stretches.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <button 
                      onClick={() => setIsWaitlistOpen(true)}
                      className="group/btn flex items-center gap-4 text-xs font-black text-brand-purple uppercase tracking-[0.3em]"
                    >
                      <span className="relative">
                        Get the 2026 Safety Blueprint
                        <div className="absolute -bottom-1.5 left-0 w-0 h-1 bg-brand-purple group-hover/btn:w-full transition-all duration-500 rounded-full" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-brand-purple/5 flex items-center justify-center group-hover/btn:bg-brand-purple group-hover/btn:text-white group-hover/btn:shadow-lg group-hover/btn:shadow-brand-purple/30 transition-all duration-500">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Fleet Card: Professional Cyber-Tech */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative p-10 rounded-[3rem] overflow-hidden border border-slate-200 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] hover:border-brand-purple/20"
              >
                {/* Subtle Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-brand-purple/[0.02] opacity-100" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-[100px] group-hover:bg-brand-purple/10 transition-colors duration-1000" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-700" 
                     style={{ backgroundImage: 'linear-gradient(#D946EF 1px, transparent 1px), linear-gradient(90deg, #D946EF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-brand-purple/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 rounded-2xl bg-brand-offwhite flex items-center justify-center shadow-xl shadow-brand-offwhite/10 group-hover:bg-brand-purple group-hover:scale-105 transition-all duration-500">
                        <Globe className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-brand-gray uppercase tracking-[0.2em] shadow-sm group-hover:bg-brand-purple/5 group-hover:border-brand-purple/10 group-hover:text-brand-purple transition-all duration-500">
                      Enterprise Telemetry
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-3xl font-display font-black text-brand-offwhite tracking-tight group-hover:text-brand-purple transition-colors duration-500">
                      For Fleet Operations
                    </h4>
                    <p className="text-base text-brand-gray leading-relaxed font-medium">
                      Maximize ROI & Minimize Liability. Real-time predictive maintenance and driver scoring for fleets of 10 to 500+ vehicles.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <button 
                      onClick={() => setIsWaitlistOpen(true)}
                      className="group/btn flex items-center gap-4 text-xs font-black text-brand-offwhite group-hover:text-brand-purple uppercase tracking-[0.3em] transition-colors duration-500"
                    >
                      <span className="relative">
                        Request ROI Analysis Case Study
                        <div className="absolute -bottom-1.5 left-0 w-0 h-1 bg-brand-purple group-hover/btn:w-full transition-all duration-500 rounded-full" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-brand-purple group-hover/btn:text-white group-hover/btn:shadow-lg group-hover/btn:shadow-brand-purple/30 transition-all duration-500">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI System Disclaimer & Trust Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-brand-purple/10 via-white to-brand-yellow/10 rounded-[2.5rem] border border-brand-purple/20 shadow-xl shadow-brand-purple/5">
                <div title="Transport Canada Compliant" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <ShieldCheck size={28} className="text-brand-purple" />
                  </div>
                  <span className="text-[10px] font-black text-brand-offwhite uppercase tracking-widest text-center">TC Compliant</span>
                </div>
                
                <div title="ISO 9001 Certified" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Scale size={28} className="text-brand-yellow-darker" style={{ color: '#854d0e' }} />
                  </div>
                  <span className="text-[10px] font-black text-brand-offwhite uppercase tracking-widest text-center">ISO 9001</span>
                </div>

                <div title="PIPEDA Compliant (Data Privacy)" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Lock size={28} className="text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-black text-brand-offwhite uppercase tracking-widest text-center">PIPEDA Ready</span>
                </div>

                <div title="Proudly Engineered in Canada" className="flex flex-col items-center justify-center gap-3 group/badge cursor-help p-3 rounded-2xl hover:bg-white/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-500">
                    <Heart size={28} className="text-rose-600" />
                  </div>
                  <span className="text-[10px] font-black text-brand-offwhite uppercase tracking-widest text-center">Proudly Canadian</span>
                </div>
              </div>

              <div className="lg:col-span-2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/20 via-brand-yellow/10 to-brand-purple/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative h-full px-8 py-6 bg-white border border-slate-200 rounded-[2.5rem] flex items-center gap-6 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-purple" />
                  <ShieldAlert className="text-brand-purple shrink-0 animate-pulse" size={32} />
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
            
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-brand-gray font-semibold uppercase tracking-widest">
                © 2026 Astrateq Gadgets. Engineered in Toronto.
              </p>
              <div className="flex items-center gap-8">
                <span className="text-[10px] font-mono text-brand-purple font-bold uppercase tracking-widest">v2.4.0-STABLE</span>
                <div className="flex items-center gap-2 text-xs text-brand-gray font-bold uppercase tracking-widest">
                  <MapPin size={14} className={currentEvent ? currentEvent.color : "text-brand-purple"} />
                  Canada
                  <span className={currentEvent ? currentEvent.color + " ml-1" : "text-brand-purple ml-1"} role="img" aria-label={currentEvent ? currentEvent.name : "Canada"}>
                    {currentEvent ? currentEvent.icon : "🍁"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-purple/30 shadow-xl mb-2 hidden md:block"
            >
              <p className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse" />
                AI Safety Assistant Online
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          onClick={() => setIsChatOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-20 h-20 bg-brand-offwhite text-white rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(217,70,239,0.4)] transition-all group overflow-hidden border border-white/10"
          aria-label="Open AI Live Chat"
        >
          {/* Dynamic Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-purple-glow to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Rings */}
          <div className="absolute inset-0 border-2 border-brand-purple/20 rounded-[2.5rem] animate-ping opacity-20" />
          <div className="absolute inset-0 border border-brand-purple/40 rounded-[2.5rem] animate-spin-slow opacity-30" />
          
          {/* Notification Dot */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-brand-purple rounded-full border-2 border-brand-offwhite z-20 shadow-[0_0_10px_#D946EF]" />
          
          <div className="relative z-10 flex flex-col items-center gap-1">
            <Globe size={28} className="group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Chat</span>
          </div>

          {/* Inner Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

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
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                  <ShieldAlert className="text-brand-purple" size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-offwhite tracking-tight">Legal Documentation</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-brand-gray"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
              <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-brand-offwhite prose-p:text-brand-gray prose-strong:text-brand-offwhite prose-a:text-brand-purple">
                <div className="markdown-body">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-navy text-white text-sm font-bold rounded-xl hover:bg-brand-navy/90 transition-colors uppercase tracking-widest"
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

  const knowledgeBase = [
    {
      keywords: ["altrak", "terrain", "sensor", "4k"],
      response: "AlTrak is our flagship 4K sensor suite. It provides real-time terrain analysis and predictive safety alerts with sub-10ms latency, ensuring maximum reaction time for drivers."
    },
    {
      keywords: ["fleetguard", "fleet", "enterprise", "management"],
      response: "FleetGuard Pro is designed for enterprise fleet management. It features advanced driver behavior monitoring, route optimization, and comprehensive efficiency analytics."
    },
    {
      keywords: ["battery", "ev", "range", "thermal", "intelligence"],
      response: "The EV Battery Intelligence Suite offers cell-level monitoring and thermal management. It predicts range more accurately by accounting for terrain and ambient temperature."
    },
    {
      keywords: ["pipeda", "privacy", "data", "protection"],
      response: "Astrateq Gadgets is fully PIPEDA compliant. We prioritize edge-processing, meaning most sensitive data never leaves your vehicle, ensuring your privacy is protected by design."
    },
    {
      keywords: ["transport canada", "regulation", "standard", "safety"],
      response: "Our hardware meets or exceeds all Transport Canada safety standards. We work closely with regulators to ensure our AI assistance tools are safe for Canadian roads."
    },
    {
      keywords: ["aoda", "accessibility", "ontario"],
      response: "We are committed to AODA standards. Our interfaces are designed with high contrast and intuitive layouts to be accessible to all drivers, regardless of ability."
    },
    {
      keywords: ["spec", "technical", "resolution", "latency", "temperature", "weather"],
      response: "Technical Specifications: 4K HDR optics, <10ms processing latency, IP67 weather sealing, and a wide operating range of -40°C to +85°C for Canadian winters."
    },
    {
      keywords: ["casl", "spam", "email", "consent"],
      response: "Astrateq Gadgets strictly adheres to CASL (Canada's Anti-Spam Legislation). We only send communications to users who have provided explicit consent."
    },
    {
      keywords: ["warranty", "repair", "guarantee"],
      response: "Astrateq Gadgets come with a 24-month limited hardware warranty. For repair requests, please visit our support portal or contact a certified installer."
    }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let botResponse = "";

      // Find the best match in the knowledge base
      const match = knowledgeBase.find(item => 
        item.keywords.some(keyword => lowerMsg.includes(keyword))
      );

      if (match) {
        botResponse = match.response;
      } else {
        botResponse = "I'm sorry, I don't have specific information on that topic in my current knowledge base. Would you like to contact a human specialist? You can reach us at support@astrateq.com or call 1-800-ASTRATEQ.";
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
      className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] z-[70] flex flex-col"
    >
      <div className="glass-panel flex-1 rounded-3xl border-brand-purple/30 shadow-2xl overflow-hidden flex flex-col bg-white/95 backdrop-blur-2xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy text-white flex items-center justify-between relative overflow-hidden">
          {/* Animated Background Detail */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base tracking-tight text-white leading-none mb-1.5">Astrateq Gadgets AI Support</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse shadow-[0_0_8px_#D946EF]" />
                <span className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-[0.2em]">System Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all hover:scale-110 active:scale-95 relative z-10"
          >
            <Minimize2 size={20} className="text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-brand-purple text-brand-navy font-medium rounded-tr-none' 
                  : 'bg-slate-100 text-brand-gray font-medium rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-brand-gray/30 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-brand-gray/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-brand-gray/30 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Astrateq Gadgets systems..."
              className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-purple transition-colors placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-purple hover:bg-brand-purple/10 rounded-lg transition-colors"
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple/20 via-brand-yellow/10 to-brand-purple/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
        
        <div className="relative glass-panel p-6 rounded-2xl border-brand-purple/30 shadow-2xl bg-white/90 backdrop-blur-xl overflow-hidden">
          {/* Animated Top Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent animate-shimmer" />
          
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 shadow-inner">
                  <Cookie className="text-brand-purple" size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-brand-offwhite text-base tracking-tight leading-none mb-1">
                    Optimizing Your AI Experience
                  </h4>
                  <p className="text-[10px] font-mono font-bold text-brand-purple/60 uppercase tracking-widest">
                    Astrateq Gadgets <span className="opacity-40">SYSTEM v2.4</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-brand-gray/40 hover:text-brand-purple transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-brand-gray leading-relaxed font-medium">
              <span className="text-brand-offwhite font-bold">Astrateq Gadgets</span> uses advanced cookies to analyze terrain data patterns and improve our predictive safety algorithms. By continuing, you agree to our <button onClick={onOpenPolicy} className="text-brand-purple hover:underline font-bold">AI Data Policy</button>.
            </p>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsVisible(false)}
                className="flex-1 px-6 py-3 bg-brand-offwhite text-white text-[11px] font-bold rounded-xl hover:bg-brand-offwhite/90 transition-all hover:shadow-lg hover:shadow-brand-offwhite/20 uppercase tracking-widest active:scale-95"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 border border-slate-200 text-brand-gray text-[11px] font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest active:scale-95"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Subtle Background Detail */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
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
          <h5 className="text-xs font-mono font-bold text-brand-purple uppercase tracking-[0.25em] group-hover:text-brand-purple-glow transition-colors mb-2">
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
                className="hover:text-brand-purple transition-all block py-1.5 md:py-0 border-l-2 border-transparent hover:border-brand-purple hover:pl-3 md:hover:pl-4 relative group/link text-left w-full"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-purple rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity hidden md:block"
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
      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-brand-gray shadow-sm hover:border-brand-purple/30 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  );
}

function SolutionCard({ icon, title, subtitle, description, features, index }: { 
  icon: ReactNode, 
  title: string, 
  subtitle: string, 
  description: string, 
  features: string[],
  index: number
}) {
  const gradients = [
    "from-brand-purple/20 via-brand-purple/5 to-transparent",
    "from-blue-500/20 via-blue-500/5 to-transparent",
    "from-emerald-500/20 via-emerald-500/5 to-transparent"
  ];

  const iconBgs = [
    "bg-brand-purple/10 border-brand-purple/20",
    "bg-blue-500/10 border-blue-500/20",
    "bg-emerald-500/10 border-emerald-500/20"
  ];

  const iconColors = [
    "text-brand-purple",
    "text-blue-500",
    "text-emerald-500"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-panel hover-glow p-10 rounded-[2.5rem] border-slate-200 group relative overflow-hidden bg-white"
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Technical Background Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-brand-purple/10 transition-all duration-500 rotate-12" />
      
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
              <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-brand-purple' : index === 1 ? 'bg-blue-500' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
              <span className="tracking-widest uppercase">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${index === 0 ? 'from-brand-purple' : index === 1 ? 'from-blue-500' : 'from-emerald-500'} to-transparent w-0 group-hover:w-full transition-all duration-700`} />
    </motion.div>
  );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-slate-100 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-start gap-4 text-left transition-all"
      >
        <span className="text-[10px] font-mono font-bold text-brand-purple/40 mt-1.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <span className="text-lg font-display font-bold text-brand-offwhite group-hover:text-brand-purple transition-colors block mb-1">
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
                  <div className="pl-4 border-l-2 border-brand-purple/20">
                    <p className="text-brand-gray text-sm leading-relaxed">
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
          className={`mt-1 transition-colors ${isOpen ? 'text-brand-purple' : 'text-brand-gray/30'}`}
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
    <section id="faq" className="py-32 px-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
                <HelpCircle className="text-brand-purple" size={14} />
                <span className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest">Support Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-offwhite mb-6 leading-tight">
                Got <span className="text-brand-purple">Questions?</span><br />
                We've Got Answers.
              </h2>
              <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                Explore our detailed documentation or reach out to our Toronto-based support team for specialized inquiries.
              </p>
              
              <div className="p-8 rounded-3xl bg-brand-offwhite text-white shadow-xl relative overflow-hidden group/card">
                {/* Decorative Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:bg-brand-purple/30 transition-colors" />
                
                <div className="relative z-10">
                  <h4 className="text-xl font-display font-bold mb-3">Still need help?</h4>
                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    Our technical specialists are available 24/7 for emergency assistance and specialized vehicle integration support.
                  </p>
                  <button 
                    onClick={onContactSupport}
                    className="w-full py-4 bg-brand-purple text-white text-xs font-bold rounded-xl hover:bg-brand-purple-glow transition-all uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] active:scale-[0.98]"
                  >
                    Contact Support
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border border-brand-offwhite bg-slate-800 overflow-hidden">
                          <img src={`https://i.pravatar.cc/60?img=${i+20}`} alt="Support Agent" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">3 Agents Online</span>
                  </div>
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
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-offwhite">
                    {group.category}
                  </h3>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {group.questions.map((faq, fIdx) => (
                    <FAQItem key={fIdx} index={fIdx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
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
            className="relative w-full max-w-lg glass-panel bg-white p-8 rounded-3xl border-brand-purple/30 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg text-brand-gray transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-brand-purple" size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-offwhite mb-2">Join the Waitlist</h3>
              <p className="text-brand-gray">Be the first to experience the future of Canadian road safety.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple/90 transition-all shadow-lg shadow-brand-purple/20 active:scale-[0.98]"
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
          className="fixed bottom-10 left-1/2 z-[110] px-6 py-4 bg-brand-navy border border-brand-purple/30 rounded-2xl shadow-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center">
            <ShieldCheck className="text-brand-purple" size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Success!</h4>
            <p className="text-brand-gray text-xs">You've been added to the founding beta waitlist.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
