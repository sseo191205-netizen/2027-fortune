// Web Audio API synthesized gentle cosmic chimes
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChime(type: 'select' | 'reveal' | 'confirm' | 'sparkle' | 'cancel'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'select') {
      // Gentle soft bell (E5 -> G#5)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(830.61, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'confirm') {
      // Harmonic arpeggio (C5 -> E5 -> G5 -> C6)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
        subGain.gain.setValueAtTime(0.08, now + i * 0.08);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
        subOsc.start(now + i * 0.08);
        subOsc.stop(now + i * 0.08 + 0.4);
      });
    } else if (type === 'reveal') {
      // Grand celebratory chime
      [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.09);
        subGain.gain.setValueAtTime(0.1, now + i * 0.09);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.8);
        subOsc.start(now + i * 0.09);
        subOsc.stop(now + i * 0.09 + 0.8);
      });
    } else if (type === 'sparkle') {
      // Tiny twinkle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'cancel') {
      // Subtle low blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.1);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Gracefully ignore audio errors if blocked by browser policy
  }
}
