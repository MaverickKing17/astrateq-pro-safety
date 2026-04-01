/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  RotateCcw, 
  MapPin, 
  Eye, 
  Battery, 
  Shield, 
  ChevronRight,
  AlertTriangle,
  Globe
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-cyan/30 selection:text-brand-cyan">
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

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full max-w-md px-4"
            >
              <div className="flex justify-between items-end mb-2">
                <div className="text-[10px] font-mono text-brand-cyan/40 uppercase">System Status: Active</div>
                <div className="text-[10px] font-mono text-brand-cyan/40 uppercase">Toronto, ON</div>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
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
              <span className="text-brand-cyan holographic-glow">Modern Canadian Driver.</span>
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
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-cyan/5 border border-brand-cyan/10 rounded-full text-brand-cyan text-xs font-medium">
              <AlertTriangle size={14} />
              <span>Astrateq gadgets are driver assistance tools only.</span>
            </div>

            <button className="group relative px-8 py-4 bg-brand-yellow text-brand-offwhite font-bold rounded-lg transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(250,204,21,0.2)] active:scale-95">
              JOIN THE FOUNDING BETA WAITLIST (100 SPOTS REMAINING)
            </button>

            <div className="flex flex-wrap justify-center gap-8 mt-12 text-brand-gray">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck size={18} className="text-brand-cyan" />
                <span>Transport Canada Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw size={18} className="text-brand-cyan" />
                <span>60-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={18} className="text-brand-cyan" />
                <span>Toronto Engineered & Shipped</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 bg-brand-slate">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-2xl border-white relative overflow-hidden shadow-xl shadow-slate-200/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl rounded-full" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-brand-offwhite">
              Vision Beyond the <span className="text-brand-cyan">Storm.</span>
            </h2>
            <div className="space-y-4 text-brand-gray text-lg leading-relaxed">
              <p>
                It started on a highway outside Toronto during a February whiteout... 
                Traditional sensors fail in the snow, and driver fatigue is a silent danger.
              </p>
              <p>
                We're engineering <span className="text-brand-cyan font-medium">'AI Co-pilots'</span> that see through the blizzard.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 px-4 bg-brand-navy relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-brand-offwhite">
              The <span className="text-brand-cyan">Solution</span>
            </h2>
            <p className="text-brand-gray">Three pillars of intelligent automotive protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard 
              icon={<Eye className="text-brand-cyan" />}
              title="AlTrak™"
              subtitle="PREDICTIVE SAFETY"
              description="Our AI system detects hazards before human reaction time, analyzing thousands of data points per second to keep you one step ahead on every road."
              features={["< 50MS REACTION TIME", "94% HAZARD PREDICTION", "360° COVERAGE"]}
            />
            <SolutionCard 
              icon={<Battery className="text-brand-cyan" />}
              title="EV Battery Intelligence"
              subtitle="RANGE CONFIDENCE"
              description="Drive from Toronto to Montreal with total peace of mind. Our AI optimizes thermal management to give you up to 500 miles of Range Confidence, even in Canadian winters."
              features={["500MI RANGE OPTIMIZED", "THERMAL AI MANAGEMENT", "WINTER-TESTED"]}
            />
            <SolutionCard 
              icon={<Shield className="text-brand-cyan" />}
              title="Guardian Mode"
              subtitle="24/7 ASSET MONITORING"
              description="Proactive around-the-clock asset monitoring and security. Your vehicle is always watched, always protected, always connected."
              features={["24/7 MONITORING", "INSTANT ALERTS", "GEO-FENCING"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 bg-brand-navy">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 text-sm font-medium text-brand-gray">
            <span className="text-brand-cyan">EN</span>
            <span className="text-slate-300">|</span>
            <button className="hover:text-brand-offwhite transition-colors">FR</button>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-[10px] text-brand-gray/60 max-w-2xl uppercase tracking-widest">
              To the maximum extent permitted by applicable law, Astrateq Gadgets Inc. total liability shall not exceed the purchase price. Driver remains primary safety controller.
            </p>
            <p className="text-[10px] text-brand-gray/40 uppercase tracking-[0.2em]">
              AlTrak, FleetGuard Pro, and EV Battery Intelligence Suite are trademarks of Astrateq Gadgets Inc. Trademark registration pending.
            </p>
            <p className="text-xs text-brand-gray/60 pt-4">
              © 2026 Astrateq Gadgets Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button (as seen in screenshot) */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-brand-cyan text-brand-navy rounded-full flex items-center justify-center shadow-lg shadow-brand-cyan/20 hover:scale-110 transition-transform z-50">
        <Globe size={24} />
      </button>
    </div>
  );
}

function SolutionCard({ icon, title, subtitle, description, features }: { 
  icon: ReactNode, 
  title: string, 
  subtitle: string, 
  description: string, 
  features: string[] 
}) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-panel p-8 rounded-2xl border-brand-cyan/5 hover:border-brand-cyan/30 transition-colors group"
    >
      <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-1">{title}</h3>
      <div className="text-[10px] font-mono text-brand-cyan tracking-[0.2em] mb-4">{subtitle}</div>
      <p className="text-brand-gray text-sm leading-relaxed mb-8">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-[10px] font-mono text-brand-cyan/80">
            <ChevronRight size={12} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
