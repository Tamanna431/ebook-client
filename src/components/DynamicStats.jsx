'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBookOpen, FaUsers, FaFeatherAlt, FaStar, FaArrowUp } from 'react-icons/fa';

// Animated Counter component
function Counter({ target, duration = 2000, isDecimal = false, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * target;

      setCount(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    target: 10000,
    suffix: '+',
    label: 'Ebooks Available',
    description: 'Curated across 20+ genres',
    growth: '+18% this month',
    icon: <FaBookOpen className="text-2xl text-violet-400" />,
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    borderGlow: 'hover:border-violet-500/60 hover:shadow-violet-500/20',
    iconBg: 'bg-violet-500/15 border-violet-500/30',
  },
  {
    target: 50000,
    suffix: '+',
    label: 'Active Readers',
    description: 'Worldwide digital community',
    growth: '+32% year-on-year',
    icon: <FaUsers className="text-2xl text-cyan-400" />,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30',
  },
  {
    target: 500,
    suffix: '+',
    label: 'Talented Writers',
    description: 'Independent authors published',
    growth: '+45 new this week',
    icon: <FaFeatherAlt className="text-2xl text-pink-400" />,
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderGlow: 'hover:border-pink-500/60 hover:shadow-pink-500/20',
    iconBg: 'bg-pink-500/15 border-pink-500/30',
  },
  {
    target: 4.9,
    suffix: '★',
    isDecimal: true,
    label: 'Community Rating',
    description: 'Over 15,000 verified reviews',
    growth: '99.4% satisfaction',
    icon: <FaStar className="text-2xl text-amber-400" />,
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/20',
    iconBg: 'bg-amber-500/15 border-amber-500/30',
  },
];

export default function DynamicStats() {
  return (
    <div className="w-full">
      {/* Live Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/60 backdrop-blur-md text-xs font-medium text-gray-300 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold">Live Platform Metrics</span>
          <span className="text-gray-500">•</span>
          <span>Updated in real-time</span>
        </div>
      </motion.div>

      {/* Grid of Dynamic Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative group rounded-2xl p-6 bg-gradient-to-b ${stat.gradient} bg-gray-850/80 backdrop-blur-xl border border-gray-700/60 ${stat.borderGlow} transition-all duration-300 shadow-xl overflow-hidden`}
          >
            {/* Ambient Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-violet-400/80 transition-all duration-500" />

            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl border ${stat.iconBg} backdrop-blur-md group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {stat.icon}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-800/90 text-emerald-400 border border-emerald-500/20">
                <FaArrowUp className="text-[9px]" /> {stat.growth}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white mb-1.5 tracking-tight flex items-baseline">
              <Counter
                target={stat.target}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
              />
            </div>

            <h4 className="text-base font-semibold text-gray-200 mb-1">
              {stat.label}
            </h4>
            
            <p className="text-xs text-gray-400 font-normal">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
