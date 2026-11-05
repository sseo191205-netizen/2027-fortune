import React from 'react';

interface ThemeEmblemProps {
  theme: 'clover_star' | 'sprout_stairs' | 'rocket_planet' | 'heart_star' | 'trophy_gem' | 'bulb_brush' | 'airplane_rainbow' | 'sun_smile' | 'compass_map' | 'key_portal';
  size?: number;
  className?: string;
}

export const ThemeEmblem: React.FC<ThemeEmblemProps> = ({ theme, size = 120, className = '' }) => {
  switch (theme) {
    case 'clover_star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
          {/* Clover Leaves */}
          <circle cx="40" cy="42" r="14" fill="#34D399" />
          <circle cx="60" cy="42" r="14" fill="#10B981" />
          <circle cx="40" cy="62" r="14" fill="#059669" />
          <circle cx="60" cy="62" r="14" fill="#34D399" />
          <path d="M50 56 Q50 82 42 85" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
          {/* Stars */}
          <polygon points="50,22 52,28 58,29 53,33 55,39 50,35 45,39 47,33 42,29 48,28" fill="#FDE047" filter="drop-shadow(0 0 5px #FBBF24)" />
          <polygon points="76,68 77,72 81,73 78,76 79,80 76,77 73,80 74,76 71,73 75,72" fill="#FDE047" />
          <polygon points="24,30 25,33 28,34 26,36 27,39 24,37 21,39 22,36 20,34 23,33" fill="#FDE047" />
        </svg>
      );

    case 'sprout_stairs':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#064E3B" fillOpacity="0.3" stroke="#84CC16" strokeWidth="2" />
          {/* Luminous Stairs */}
          <rect x="22" y="68" width="18" height="14" rx="3" fill="#15803D" opacity="0.8" />
          <rect x="36" y="54" width="18" height="28" rx="3" fill="#16A34A" opacity="0.85" />
          <rect x="50" y="40" width="18" height="42" rx="3" fill="#22C55E" opacity="0.9" />
          <rect x="64" y="26" width="18" height="56" rx="3" fill="#84CC16" filter="drop-shadow(0 0 8px #84CC16)" />
          {/* Sprout on top stair */}
          <path d="M73 26 C73 14 65 10 59 12 C64 16 69 18 73 26 Z" fill="#4ADE80" />
          <path d="M73 26 C75 12 85 8 91 10 C86 15 80 17 73 26 Z" fill="#A3E635" />
          <circle cx="73" cy="26" r="3" fill="#FFFFFF" />
          {/* Floating Sparkles */}
          <circle cx="30" cy="30" r="2.5" fill="#FACC15" />
          <circle cx="85" cy="55" r="2" fill="#FACC15" />
        </svg>
      );

    case 'rocket_planet':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#1E1B4B" fillOpacity="0.4" stroke="#F97316" strokeWidth="2" />
          {/* Saturn-like Planet */}
          <circle cx="34" cy="62" r="16" fill="#EA580C" />
          <ellipse cx="34" cy="62" rx="26" ry="8" stroke="#FDBA74" strokeWidth="3" fill="none" transform="rotate(-25 34 62)" />
          {/* Rocket */}
          <g transform="translate(45, 15) rotate(35 25 30)">
            {/* Flames */}
            <polygon points="12,42 16,55 20,42" fill="#F97316" />
            <polygon points="14,42 16,50 18,42" fill="#FDE047" />
            {/* Fins */}
            <polygon points="8,34 4,44 14,40" fill="#DC2626" />
            <polygon points="24,34 28,44 18,40" fill="#DC2626" />
            {/* Body */}
            <path d="M16 8 C10 16 10 38 10 40 L22 40 C22 38 22 16 16 8 Z" fill="#F8FAFC" />
            {/* Window */}
            <circle cx="16" cy="22" r="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <path d="M16 8 L16 14" stroke="#DC2626" strokeWidth="2" />
          </g>
          {/* Little Stars */}
          <polygon points="76,20 77,23 80,24 78,26 79,29 76,27 73,29 74,26 72,24 75,23" fill="#FDE047" />
        </svg>
      );

    case 'heart_star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#4C0519" fillOpacity="0.3" stroke="#FB7185" strokeWidth="2" strokeDasharray="4 2" />
          {/* Twin Hearts */}
          <path
            d="M44 32 C38 24 24 26 24 38 C24 52 44 66 44 66 C44 66 64 52 64 38 C64 26 50 24 44 32 Z"
            fill="#F43F5E"
            opacity="0.85"
            transform="scale(0.85) translate(8, 12)"
          />
          <path
            d="M56 38 C52 30 40 32 40 42 C40 54 56 65 56 65 C56 65 72 54 72 42 C72 32 60 30 56 38 Z"
            fill="#FB7185"
            filter="drop-shadow(0 0 6px #F43F5E)"
          />
          {/* Constellation lines and Stars */}
          <circle cx="25" cy="28" r="3" fill="#FDE047" />
          <circle cx="78" cy="32" r="3.5" fill="#FDE047" />
          <circle cx="70" cy="74" r="2.5" fill="#FDE047" />
          <polygon points="50,14 52,18 57,19 53,22 54,26 50,23 46,26 47,22 43,19 48,18" fill="#FDE047" />
        </svg>
      );

    case 'trophy_gem':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#451A03" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />
          {/* Trophy Cup */}
          <path d="M34 26 L66 26 L62 50 C62 58 50 62 50 62 C50 62 38 58 38 50 Z" fill="#FBBF24" filter="drop-shadow(0 0 8px #F59E0B)" />
          {/* Handles */}
          <path d="M34 32 C26 32 26 44 36 44" stroke="#F59E0B" strokeWidth="3" fill="none" />
          <path d="M66 32 C74 32 74 44 64 44" stroke="#F59E0B" strokeWidth="3" fill="none" />
          {/* Stem & Base */}
          <rect x="47" y="62" width="6" height="12" fill="#D97706" />
          <rect x="36" y="74" width="28" height="8" rx="2" fill="#B45309" />
          {/* Glowing Gem on Trophy */}
          <polygon points="50,34 56,40 50,46 44,40" fill="#38BDF8" filter="drop-shadow(0 0 4px #FFFFFF)" />
          {/* Sparkles */}
          <polygon points="26,18 28,22 32,23 29,26 30,30 26,27 22,30 23,26 20,23 24,22" fill="#FDE047" />
          <polygon points="74,60 75,63 78,64 76,66 77,69 74,67 71,69 72,66 70,64 73,63" fill="#FDE047" />
        </svg>
      );

    case 'bulb_brush':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0C4A6E" fillOpacity="0.3" stroke="#22D3EE" strokeWidth="2" />
          {/* Glowing Lightbulb */}
          <path d="M50 18 C38 18 32 28 32 38 C32 46 38 50 40 56 L60 56 C62 50 68 46 68 38 C68 28 62 18 50 18 Z" fill="#FEF08A" filter="drop-shadow(0 0 10px #FACC15)" />
          <rect x="42" y="56" width="16" height="4" fill="#94A3B8" />
          <rect x="44" y="60" width="12" height="4" fill="#64748B" />
          {/* Filament */}
          <path d="M46 38 L48 30 L52 30 L54 38" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Magic Paintbrush Crossing */}
          <g transform="translate(18, 55) rotate(-35 30 10)">
            <rect x="10" y="8" width="42" height="6" rx="3" fill="#8B5CF6" />
            <path d="M52 6 L64 11 L52 16 Z" fill="#EC4899" />
          </g>
          {/* Stardust Drops */}
          <circle cx="75" cy="30" r="3" fill="#22D3EE" />
          <circle cx="22" cy="40" r="2.5" fill="#F472B6" />
        </svg>
      );

    case 'airplane_rainbow':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#172554" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="2" />
          {/* Rainbow Trails */}
          <path d="M16 75 C30 50 55 45 84 55" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M18 78 C32 54 56 49 86 59" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M20 81 C34 58 57 53 88 63" stroke="#34D399" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M22 84 C36 62 58 57 90 67" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          {/* Paper Airplane */}
          <g transform="translate(36, 18) rotate(15)">
            <polygon points="26,6 4,24 16,28" fill="#F8FAFC" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.3))" />
            <polygon points="26,6 16,28 14,36 10,24" fill="#E2E8F0" />
            <polygon points="26,6 16,28 32,24" fill="#FFFFFF" />
          </g>
          <polygon points="24,26 25,29 28,30 26,32 27,35 24,33 21,35 22,32 20,30 23,29" fill="#FDE047" />
        </svg>
      );

    case 'sun_smile':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#713F12" fillOpacity="0.25" stroke="#FBBF24" strokeWidth="2" />
          {/* Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="50"
              y1="16"
              x2="50"
              y2="22"
              stroke="#FBBF24"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          {/* Sun Body */}
          <circle cx="50" cy="50" r="22" fill="#FBBF24" filter="drop-shadow(0 0 10px #F59E0B)" />
          {/* Cheerful Eyes & Smile */}
          <circle cx="43" cy="46" r="3" fill="#78350F" />
          <circle cx="57" cy="46" r="3" fill="#78350F" />
          <ellipse cx="38" cy="52" rx="3" ry="2" fill="#FB7185" />
          <ellipse cx="62" cy="52" rx="3" ry="2" fill="#FB7185" />
          <path d="M44 54 Q50 60 56 54" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Fluffy Smiling Cloud underneath */}
          <path
            d="M30 76 C26 76 22 72 22 68 C22 64 25 61 29 61 C30 55 36 51 43 53 C46 49 52 49 56 52 C60 48 68 49 71 55 C76 56 79 60 79 64 C79 69 75 74 70 75 C68 76 32 76 30 76 Z"
            fill="#FFFFFF"
            fillOpacity="0.9"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
          />
        </svg>
      );

    case 'compass_map':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#312E81" fillOpacity="0.3" stroke="#818CF8" strokeWidth="2" />
          {/* Holographic Concentric Grid Circles */}
          <circle cx="50" cy="50" r="34" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="#818CF8" strokeWidth="1.2" fill="none" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          {/* Compass Needle */}
          <g transform="rotate(35 50 50)">
            <polygon points="50,18 56,50 44,50" fill="#EF4444" filter="drop-shadow(0 0 6px #EF4444)" />
            <polygon points="50,82 56,50 44,50" fill="#E2E8F0" />
            <circle cx="50" cy="50" r="5" fill="#FDE047" stroke="#4F46E5" strokeWidth="2" />
          </g>
          {/* Cardinal Directions */}
          <text x="50" y="22" fill="#F8FAFC" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
          <text x="82" y="52" fill="#F8FAFC" fontSize="7" fontWeight="bold" textAnchor="middle">E</text>
          <text x="50" y="84" fill="#F8FAFC" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
          <text x="18" y="52" fill="#F8FAFC" fontSize="7" fontWeight="bold" textAnchor="middle">W</text>
        </svg>
      );

    case 'key_portal':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#1E1B4B" fillOpacity="0.3" stroke="#C084FC" strokeWidth="2" strokeDasharray="4 2" />
          {/* Cosmic Portal Arch */}
          <path
            d="M26 78 L26 44 C26 28 36 18 50 18 C64 18 74 28 74 44 L74 78"
            stroke="#A855F7"
            strokeWidth="4"
            fill="none"
            filter="drop-shadow(0 0 8px #A855F7)"
          />
          {/* Star Portal Inside */}
          <ellipse cx="50" cy="48" rx="16" ry="24" fill="#581C87" fillOpacity="0.6" />
          {/* Golden Key */}
          <g transform="translate(18, 18) rotate(45 32 32)">
            <circle cx="28" cy="20" r="10" stroke="#FDE047" strokeWidth="3" fill="none" filter="drop-shadow(0 0 6px #F59E0B)" />
            <polygon points="28,15 30,19 34,20 31,23 32,27 28,24 24,27 25,23 22,20 26,19" fill="#FDE047" />
            <line x1="28" y1="30" x2="28" y2="58" stroke="#FDE047" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="28" y1="46" x2="35" y2="46" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            <line x1="28" y1="52" x2="37" y2="52" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Sparkles */}
          <polygon points="76,26 77,29 80,30 78,32 79,35 76,33 73,35 74,32 72,30 75,29" fill="#FDE047" />
        </svg>
      );

    default:
      return null;
  }
};
