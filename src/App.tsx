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
  HelpCircle
} from "lucide-react";

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Animated Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-purple-glow rounded-xl rotate-45 opacity-20 animate-pulse" />
        
        {/* Stylized 'A' SVG inspired by the provided logo */}
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-brand-purple drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D946EF" />
              <stop offset="100%" stopColor="#F0ABFC" />
            </linearGradient>
          </defs>
          <path 
            d="M50 10 L15 85 L25 85 L35 65 L65 65 L75 85 L85 85 L50 10 Z M40 55 L50 35 L60 55 L40 55 Z" 
            fill="url(#logoGradient)" 
          />
          <path 
            d="M30 75 Q50 60 70 75" 
            fill="none" 
            stroke="url(#logoGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="animate-pulse"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-display font-black text-brand-offwhite tracking-tighter">ASTRATEQ</span>
        <span className="text-[9px] font-mono font-bold text-brand-purple tracking-[0.4em] uppercase">Gadgets</span>
      </div>
    </div>
  );
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState<string | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-purple/30 selection:text-brand-purple">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
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
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-purple/20 transition-all group/stat">
                  <div className="text-3xl font-display font-bold text-brand-offwhite group-hover/stat:text-brand-purple transition-colors">500ms</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">Predictive Window</span>
                    <span className="text-[9px] text-brand-gray/40 font-mono mt-1">LATENCY: ULTRA-LOW</span>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-purple/20 transition-all group/stat">
                  <div className="text-3xl font-display font-bold text-brand-offwhite group-hover/stat:text-brand-purple transition-colors">4K</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">Sensor Fusion</span>
                    <span className="text-[9px] text-brand-gray/40 font-mono mt-1">RESOLUTION: NATIVE</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group bg-brand-navy"
            >
              {/* Base Image (Snowy Road) - Fixed URL */}
              <img 
                src="https://images.unsplash.com/photo-1517231939912-d66c8a86584a?auto=format&fit=crop&q=80&w=1200" 
                alt="Snowy Arctic Road" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-[3s] ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Thermal / Night Vision Overlay */}
              <div className="absolute inset-0 bg-brand-purple/10 mix-blend-color opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
              
              {/* Terrain Analysis Grid (Perspective) */}
              <div className="absolute inset-0 [perspective:500px] pointer-events-none opacity-20">
                <motion.div 
                  animate={{ 
                    backgroundPosition: ["0px 0px", "0px 40px"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom bg-[linear-gradient(to_right,#D946EF22_1px,transparent_1px),linear-gradient(to_bottom,#D946EF22_1px,transparent_1px)] bg-[size:40px_40px]"
                />
              </div>
              
              {/* HUD Elements */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-brand-purple font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-purple/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                      Sensor: Multi-Spectral Lidar
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-brand-purple/70 font-bold uppercase tracking-widest bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-brand-purple/10">
                      Heading: 342° NW
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="font-mono text-[10px] text-brand-purple font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-purple/30">
                      Lat: 43.6532° N
                    </div>
                    <div className="font-mono text-[14px] text-brand-purple font-bold bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-brand-purple/10">
                      104 <span className="text-[8px]">KM/H</span>
                    </div>
                  </div>
                </div>

                {/* Central Target Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px]">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative aspect-[4/3] border-2 border-brand-purple/40 rounded-2xl flex items-center justify-center overflow-hidden"
                  >
                    {/* Scanning Line */}
                    <motion.div 
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-brand-purple shadow-[0_0_15px_#D946EF] z-10"
                    />
                    
                    {/* Target Box */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [0.98, 1, 0.98]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4/5 h-1/2 border border-brand-purple rounded flex flex-col items-center justify-center bg-brand-purple/5 backdrop-blur-[2px]"
                    >
                      <div className="absolute -top-7 left-0 flex items-center gap-2 text-[10px] font-mono font-bold text-brand-purple bg-black/80 px-3 py-1 rounded-t-md border-t border-x border-brand-purple/30">
                        <AlertTriangle size={12} className="animate-pulse" />
                        HAZARD DETECTED: 12.4m
                      </div>
                      <div className="text-[8px] font-mono text-brand-purple/60 uppercase tracking-[0.2em]">Analyzing Surface Friction...</div>
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-purple" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-purple" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-purple" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-purple" />
                  </motion.div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 bg-brand-purple/20 rounded-full overflow-hidden border border-brand-purple/10">
                        <motion.div 
                          animate={{ width: ["10%", "90%", "40%", "70%"] }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="h-full bg-brand-purple shadow-[0_0_10px_#D946EF]"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-brand-purple font-bold tracking-widest">BUFF: ACTIVE</span>
                    </div>
                    <div className="text-[8px] font-mono text-brand-purple/60 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-purple rounded-full animate-ping" />
                      Processing Real-Time Stream...
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-bold text-brand-purple drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">98.2%</div>
                    <div className="text-[9px] font-mono text-brand-purple/60 uppercase tracking-widest font-bold">Confidence Score</div>
                  </div>
                </div>
              </div>

              {/* Scanning Line Overlay (Global) */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(217,70,239,0.05)_50%,transparent_100%)] bg-[length:100%_10px] animate-scan-lines pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-4 bg-brand-navy relative">
        <div className="max-w-6xl mx-auto">
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

      <FAQSection />

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 px-4 border-t border-slate-200 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          {/* Brand & Language */}
          <div className="flex flex-col items-center gap-6">
            <Logo />
            <div className="flex items-center gap-6 text-sm font-bold tracking-widest text-brand-gray" role="navigation" aria-label="Language selection">
              <button 
                className="text-brand-purple cursor-default" 
                aria-label="English" 
                aria-current="true"
              >
                EN
              </button>
              <div className="w-[1px] h-4 bg-slate-300" aria-hidden="true" />
              <button 
                className="hover:text-brand-purple transition-colors" 
                aria-label="Switch to French"
              >
                FR
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6" role="list" aria-label="Social media links">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-gray hover:text-brand-purple hover:border-brand-purple transition-all"
              aria-label="Follow Astrateq Gadgets on LinkedIn"
              role="listitem"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-gray hover:text-brand-purple hover:border-brand-purple transition-all"
              aria-label="Follow Astrateq Gadgets on Twitter"
              role="listitem"
            >
              <Twitter size={20} />
            </a>
          </div>
          
          {/* AI System Disclaimer */}
          <div className="max-w-2xl mx-auto px-6 py-4 bg-brand-purple/5 border border-brand-purple/10 rounded-xl flex items-start gap-4 text-left">
            <AlertTriangle className="text-brand-purple shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-brand-gray leading-relaxed">
              <span className="font-bold text-brand-offwhite">Safety Notice:</span> Astrateq Gadgets are driver assistance tools only and do not replace the driver's responsibility. Always maintain full control of your vehicle and stay alert to road conditions.
            </p>
          </div>

          {/* Legal Links Grid */}
          <div className="flex flex-col md:grid md:grid-cols-4 gap-0 md:gap-12 text-left w-full max-w-6xl pt-12 border-t border-slate-200">
            <FooterAccordion 
              title="Core Legal"
              description="Foundational agreements governing your use of Astrateq services."
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
                { label: "AODA Accessibility", href: "#" },
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
          <div className="text-center space-y-6 max-w-3xl">
            <div className="space-y-4">
              <p className="text-xs md:text-sm text-brand-gray font-medium leading-relaxed uppercase tracking-wider">
                To the maximum extent permitted by applicable law, Astrateq Gadgets Inc. total liability shall not exceed the purchase price. Driver remains primary safety controller.
              </p>
              <p className="text-[11px] md:text-xs text-brand-gray/70 font-medium uppercase tracking-[0.15em]">
                AlTrak, FleetGuard Pro, and EV Battery Intelligence Suite are trademarks of Astrateq Gadgets Inc. Trademark registration pending.
              </p>
            </div>
            
            <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-brand-gray font-semibold">
                © 2026 Astrateq Gadgets Inc. All rights reserved. Engineered in Toronto.
              </p>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-purple text-brand-navy rounded-full flex items-center justify-center shadow-lg shadow-brand-purple/20 hover:scale-110 transition-transform z-50"
        aria-label="Open AI Live Chat"
      >
        <Globe size={24} />
      </button>

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
    { role: 'bot', text: "Welcome to Astrateq Support. I am your AI Safety Assistant. How can I help you optimize your journey today?" }
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
      response: "Astrateq is fully PIPEDA compliant. We prioritize edge-processing, meaning most sensitive data never leaves your vehicle, ensuring your privacy is protected by design."
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
      response: "Astrateq strictly adheres to CASL (Canada's Anti-Spam Legislation). We only send communications to users who have provided explicit consent."
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
        <div className="p-5 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
              <Bot className="text-brand-purple" size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm tracking-tight">Astrateq AI Support</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-brand-purple/80 uppercase tracking-widest">System Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 size={18} />
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
              placeholder="Ask about Astrateq systems..."
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
                className="hover:text-brand-purple transition-colors block py-1.5 md:py-0 border-l-2 border-transparent hover:border-brand-purple hover:pl-3 md:hover:pl-0 md:border-none transition-all duration-300 text-left w-full"
              >
                {link.label}
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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-panel hover-glow p-10 rounded-3xl border-slate-200 group relative overflow-hidden"
    >
      {/* Technical Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-brand-purple/8 transition-colors" />
      
      <div className="w-16 h-16 rounded-2xl bg-brand-purple/5 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500 relative">
        <div className="absolute inset-0 border border-brand-purple/10 rounded-2xl animate-pulse" />
        {icon}
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-[10px] font-mono text-brand-purple font-bold tracking-[0.25em] mb-2 uppercase opacity-80">
            {subtitle}
          </div>
          <h3 className="text-2xl font-display font-bold text-brand-offwhite group-hover:text-brand-purple transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-brand-gray text-base leading-relaxed">
          {description}
        </p>

        <div className="pt-6 space-y-3">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-[11px] font-mono text-brand-gray/80 group-hover:text-brand-purple/80 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/30" />
              <span className="tracking-wider">{feature}</span>
            </div>
          ))}
        </div>
      </div>
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

function FAQSection() {
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
          q: "Does it work with older vehicles?",
          a: "Vehicles manufactured between 2008 and 2014 are supported via our 'Legacy Link' adapter, though some advanced predictive features may be limited by the vehicle's slower data bus. For vehicles older than 2008, we offer a standalone safety suite that provides visual and audible alerts without direct vehicle control integration."
        }
      ]
    },
    {
      category: "Data Privacy & Security",
      icon: <Shield size={20} />,
      questions: [
        {
          q: "How is my data protected?",
          a: "We employ a 'Zero-Cloud' default policy. 99.9% of all video and sensor processing happens locally on the Astrateq Edge Processor. We are fully PIPEDA and GDPR compliant. Your driving data is encrypted with AES-256 at rest. If you choose to use our 'Incident Cloud Backup', your data is sharded and stored across multiple secure Canadian data centers, accessible only via your biometric-linked Astrateq ID."
        },
        {
          q: "Who owns the data collected by the sensors?",
          a: "You are the sole owner of your data. Astrateq Gadgets Inc. does not sell, rent, or trade user data to insurance companies or third parties. We only use anonymized, telemetry-only data (no video, no location) to improve our global safety models if you explicitly opt-in to our 'Community Safety Network'."
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
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="font-bold text-brand-offwhite mb-2">Still need help?</h4>
                <p className="text-sm text-brand-gray mb-4">Our technical specialists are available 24/7 for emergency assistance.</p>
                <button className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-navy/90 transition-all uppercase tracking-widest">
                  Contact Support
                </button>
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

function WaitlistModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (e: React.FormEvent) => void }) {
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
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  required
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
