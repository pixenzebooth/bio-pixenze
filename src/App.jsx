
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './supabase';
import * as Icons from 'lucide-react';
import BackgroundParticles from './components/BackgroundParticles';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.Link className={className} />;
  return <IconComponent className={className} />;
};

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pixenze_links')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 relative overflow-hidden">
      <BackgroundParticles />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">

        {/* Profile Section */}
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 20 },
            opacity: { duration: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex flex-col items-center mb-10"
        >
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-white shadow-game mb-4 cursor-pointer"
          >
            <img src="/logo.jpg" alt="Pixenze Booth" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="font-titan text-4xl text-white text-stroke-sm drop-shadow-lg tracking-wider text-center">
            PixenzeBooth
          </h1>
          <p className="font-nunito text-[var(--color-game-surface)] mt-2 font-bold text-lg opacity-90 text-center">
            Capture Memories, Create Fun!
          </p>
        </motion.div>

        {/* Links Container */}
        <div className="w-full max-w-md space-y-4">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-full rounded-xl bg-white/20 animate-pulse border-2 border-black/10"></div>
            ))
          ) : (
            links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
                className={`
                group flex items-center p-4 w-full rounded-xl
                border-4 border-black font-titan text-xl relative overflow-hidden
                transition-all duration-200 hover:-translate-y-1 active:translate-y-1
                ${index % 2 === 0 ? 'bg-[var(--color-game-surface)] text-[var(--color-game-bg)]' : 'bg-[var(--color-game-secondary)] text-[var(--color-game-bg)]'}
                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]
                hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)]
                active:shadow-none
              `}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

                <div className="relative z-10 flex items-center w-full justify-between">
                  <div className="flex items-center gap-4">
                    {link.icon && (
                      <div className="p-2 bg-black/5 rounded-lg">
                        <DynamicIcon name={link.icon} className="w-6 h-6" />
                      </div>
                    )}
                    <span>{link.title}</span>
                  </div>
                  <Icons.ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </motion.a>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-white/50 font-nunito text-sm font-bold">
          © {new Date().getFullYear()} PixenzeBooth
        </footer>

      </div>
    </div>
  );
}

export default App;
