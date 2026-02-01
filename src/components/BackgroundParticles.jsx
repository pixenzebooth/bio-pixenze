import React from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles = () => {
    // Generate random particles
    const particles = React.useMemo(() => {
        return [...Array(15)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            type: Math.random() > 0.5 ? 'circle' : 'square',
            color: Math.random() > 0.5 ? 'rgba(250, 206, 16, 0.1)' : 'rgba(255, 255, 246, 0.1)'
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: p.type === 'circle' ? '50%' : '4px',
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        rotate: [0, 360],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundParticles;
