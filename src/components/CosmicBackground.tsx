import React, { useMemo } from 'react';

export const CosmicBackground: React.FC = () => {
  // Generate random starry particles once
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: (i * 19.3) % 100,
      y: (i * 31.7) % 100,
      size: (i % 4 === 0) ? 3 : (i % 2 === 0) ? 2 : 1.2,
      opacity: 0.25 + ((i * 7) % 65) / 100,
      duration: 3 + (i % 5) * 1.5,
      delay: (i % 7) * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040714]">
      {/* Deep Cosmic Gradient Mesh */}
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-[#131138]/70 via-[#090D24]/90 to-[#040714]" />

      {/* Floating Aurora Gradients */}
      <div className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[35%] -right-[15%] w-[550px] h-[550px] rounded-full bg-sky-500/12 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Subtle Holographic Grid Horizon */}
      <div 
        className="absolute inset-x-0 bottom-0 h-72 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(129, 140, 248, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(400px) rotateX(60deg)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Concentric Subtle Hologram Ring in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-indigo-500/10 pointer-events-none animate-spin" style={{ animationDuration: '90s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400/40 blur-[1px]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-dashed border-sky-400/10 pointer-events-none animate-spin" style={{ animationDuration: '120s', animationDirection: 'reverse' }} />

      {/* Twinkling Starfield */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white transition-opacity duration-1000"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 2 ? '0 0 8px rgba(255,255,255,0.8)' : undefined,
            animation: `pulse-glow ${star.duration}s infinite ease-in-out ${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
