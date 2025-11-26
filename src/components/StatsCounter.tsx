import { useEffect, useState } from 'react';
import { Download, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatItem {
  icon: typeof Download;
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

export default function StatsCounter() {
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [animatedDownloads, setAnimatedDownloads] = useState(0);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-download`,
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );
        const data = await response.json();
        setTotalDownloads(data.downloads || 0);
      } catch (error) {
        console.error('Error fetching downloads:', error);
        setTotalDownloads(0);
      }
    };

    fetchDownloads();
    const interval = setInterval(fetchDownloads, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (totalDownloads === 0) return;

    const duration = 2000;
    const steps = 60;
    const increment = totalDownloads / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalDownloads) {
        setAnimatedDownloads(totalDownloads);
        clearInterval(timer);
      } else {
        setAnimatedDownloads(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalDownloads]);

  const stats: StatItem[] = [
    {
      icon: Download,
      value: animatedDownloads,
      label: 'Total Downloads',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      value: Math.floor(animatedDownloads * 0.85),
      label: 'Active Users',
      suffix: '+',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:border-purple-500/30 transition-all"
            >
              <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="text-white" size={16} />
              </div>

              <div className="text-left">
                <div className="text-lg sm:text-xl font-bold text-white">
                  {stat.value.toLocaleString()}
                  {stat.suffix && <span className="text-purple-400">{stat.suffix}</span>}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
