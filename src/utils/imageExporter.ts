import QRCode from 'qrcode';
import { Fortune } from '../data/fortunes';

/**
 * Renders a crisp 1080x1920 PNG of the fortune card with the official mascots and triggers download or Web Share.
 */
export async function exportFortuneCardImage(fortune: Fortune, shareUrl: string): Promise<boolean> {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  // 1. Deep Space Cosmic Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#040714');
  bgGrad.addColorStop(0.35, '#0B112C');
  bgGrad.addColorStop(0.7, '#110D2E');
  bgGrad.addColorStop(1, '#050716');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Cosmic Nebulae & Aurora Glows
  const glow1 = ctx.createRadialGradient(280, 420, 50, 280, 420, 520);
  glow1.addColorStop(0, 'rgba(129, 140, 248, 0.28)');
  glow1.addColorStop(0.5, 'rgba(168, 85, 247, 0.15)');
  glow1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(820, 1380, 60, 820, 1380, 560);
  glow2.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
  glow2.addColorStop(0.6, 'rgba(16, 185, 129, 0.12)');
  glow2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // 3. Shimmering Stars / Constellation dots
  const starSeed = parseInt(fortune.id, 10) * 17;
  for (let i = 0; i < 90; i++) {
    const sx = (starSeed + i * 137.5) % width;
    const sy = (starSeed * 3 + i * 219.3) % height;
    const sRad = i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2;
    const sAlpha = 0.3 + (i % 7) * 0.1;
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
    ctx.fill();
  }

  // 4. Central Holographic Card Plate
  const cardX = 70;
  const cardY = 120;
  const cardW = width - 140; // 940
  const cardH = height - 260; // 1660
  const cardR = 48;

  // Outer glowing aura for card
  ctx.save();
  ctx.shadowColor = fortune.luckyColorCode || 'rgba(168, 85, 247, 0.5)';
  ctx.shadowBlur = 40;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 4;
  roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.stroke();
  ctx.restore();

  // Card Inner Gradient Fill
  const cardBg = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  cardBg.addColorStop(0, 'rgba(18, 24, 52, 0.88)');
  cardBg.addColorStop(0.5, 'rgba(23, 17, 56, 0.82)');
  cardBg.addColorStop(1, 'rgba(11, 16, 42, 0.92)');
  ctx.fillStyle = cardBg;
  roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.fill();

  // Card Border with Holographic Sheen
  const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  borderGrad.addColorStop(0, '#A78BFA');
  borderGrad.addColorStop(0.25, '#38BDF8');
  borderGrad.addColorStop(0.5, '#34D399');
  borderGrad.addColorStop(0.75, '#F472B6');
  borderGrad.addColorStop(1, '#FBBF24');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 3.5;
  roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.stroke();

  // Subtle Circuit/Star Pattern Accent lines on card edges
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 90);
  ctx.lineTo(cardX + cardW - 40, cardY + 90);
  ctx.stroke();

  // 5. Header Section inside Card
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Institute English subtitle
  ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('GYEONGNAM FUTURE EDUCATION INSTITUTE', width / 2, cardY + 54);

  // 2027 MY FUTURE Pill Badge
  ctx.fillStyle = 'rgba(129, 140, 248, 0.15)';
  roundRect(ctx, width / 2 - 170, cardY + 120, 340, 50, 25);
  ctx.fill();
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, width / 2 - 170, cardY + 120, 340, 50, 25);
  ctx.stroke();

  ctx.fillStyle = '#C4B5FD';
  ctx.font = '800 24px "Outfit", sans-serif';
  ctx.fillText(`★  2027 MY FUTURE · NO.${fortune.id}  ★`, width / 2, cardY + 146);

  // Category Tag
  ctx.fillStyle = fortune.luckyColorCode || '#38BDF8';
  ctx.font = '700 30px "Noto Sans KR", sans-serif';
  ctx.fillText(`[ ${fortune.category} ]`, width / 2, cardY + 205);

  // 6. Central Mascot & Visual Area
  const centerY = cardY + 470;

  // Ambient radial glow behind character
  const charGlow = ctx.createRadialGradient(width / 2, centerY, 30, width / 2, centerY, 240);
  charGlow.addColorStop(0, `${fortune.luckyColorCode}44`);
  charGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = charGlow;
  ctx.beginPath();
  ctx.arc(width / 2, centerY, 240, 0, Math.PI * 2);
  ctx.fill();

  // Draw Official Mascot PNG to Canvas
  await drawMascotToCanvas(ctx, fortune.character, width / 2, centerY, 300);

  // 7. Fortune Title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 50px "Noto Sans KR", "Outfit", sans-serif';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 14;
  wrapText(ctx, `"${fortune.title}"`, width / 2, cardY + 770, 800, 68);
  ctx.shadowBlur = 0;

  // 8. Fortune Message Box
  const msgBoxY = cardY + 880;
  const msgBoxH = 250;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  roundRect(ctx, cardX + 50, msgBoxY, cardW - 100, msgBoxH, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, cardX + 50, msgBoxY, cardW - 100, msgBoxH, 28);
  ctx.stroke();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '500 32px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  wrapText(ctx, fortune.message, width / 2, msgBoxY + 65, cardW - 160, 48);

  // 9. Fortune Attributes (Stars, Lucky Color, Lucky Item, Keyword)
  const statsY = cardY + 1170;
  const statBoxW = (cardW - 120) / 2;
  const statBoxH = 100;

  // Box 1: Lucky Stars (행운 지수)
  drawStatBox(
    ctx,
    cardX + 50,
    statsY,
    statBoxW,
    statBoxH,
    '행운 지수',
    '★'.repeat(fortune.stars) + '☆'.repeat(5 - fortune.stars),
    '#FBBF24',
    true
  );
  // Box 2: Lucky Color (행운의 컬러)
  drawStatBox(
    ctx,
    cardX + 70 + statBoxW,
    statsY,
    statBoxW,
    statBoxH,
    '행운의 컬러',
    fortune.luckyColor,
    fortune.luckyColorCode
  );

  // Box 3: Lucky Item (행운의 아이템)
  drawStatBox(
    ctx,
    cardX + 50,
    statsY + 120,
    statBoxW,
    statBoxH,
    '행운의 아이템',
    fortune.luckyItem,
    '#38BDF8'
  );
  // Box 4: Lucky Keyword (행운 키워드)
  drawStatBox(
    ctx,
    cardX + 70 + statBoxW,
    statsY + 120,
    statBoxW,
    statBoxH,
    '행운 키워드',
    fortune.keyword,
    '#A855F7'
  );

  // 10. QR Code Section for Verification & Sharing
  const qrY = cardY + 1430;
  try {
    const qrDataUrl = await QRCode.toDataURL(shareUrl, {
      margin: 1,
      width: 140,
      color: {
        dark: '#0B1028',
        light: '#FFFFFF',
      },
    });
    const qrImg = await loadImage(qrDataUrl);
    // Draw white container for QR
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, width / 2 - 70, qrY, 140, 140, 16);
    ctx.fill();
    ctx.drawImage(qrImg, width / 2 - 64, qrY + 6, 128, 128);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 20px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('QR 스캔으로 동일한 운세 카드 열기', width / 2, qrY + 165);
  } catch {
    // If QR fails, omit
  }

  // 11. Footer Branding
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 26px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('경상남도교육청 미래교육원', width / 2, height - 75);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('© Gyeongnam Future Education Institute · 2027 Future Fortune', width / 2, height - 42);

  // 12. Convert Canvas to Blob & Trigger Save/Share
  return new Promise((resolve) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        const fileName = `2027_미래운세카드_${fortune.id}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Check if Web Share API with files is supported
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `2027 미래 운세 카드 - ${fortune.title}`,
              text: `경상남도교육청 미래교육원 2027 미래 운세 카드: "${fortune.title}"`,
            });
            resolve(true);
            return;
          } catch (err: unknown) {
            if ((err as Error)?.name === 'AbortError') {
              resolve(true);
              return;
            }
          }
        }

        // Fallback: standard PNG download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve(true);
      },
      'image/png',
      0.95
    );
  });
}

function drawStatBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  color: string,
  isStars = false
) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, 18);
  ctx.stroke();

  // Label
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 20px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w / 2, y + 32);

  // Value
  ctx.fillStyle = color;
  ctx.font = isStars ? '700 32px "Noto Sans KR", sans-serif' : '700 26px "Noto Sans KR", sans-serif';
  ctx.fillText(value, x + w / 2, y + 70);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function drawMascotToCanvas(
  ctx: CanvasRenderingContext2D,
  character: 'green' | 'blue' | 'navy',
  centerX: number,
  centerY: number,
  size: number
) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const imagePath = `${base}/characters/character_${character}.png`;
  try {
    const img = await loadImage(imagePath);
    ctx.save();
    ctx.shadowColor =
      character === 'green' ? '#84CC16' : character === 'blue' ? '#38BDF8' : '#818CF8';
    ctx.shadowBlur = 30;

    const aspect = img.width / img.height;
    let drawW = size;
    let drawH = size;
    if (aspect > 1) {
      drawH = size / aspect;
    } else {
      drawW = size * aspect;
    }
    ctx.drawImage(img, centerX - drawW / 2, centerY - drawH / 2, drawW, drawH);
    ctx.restore();
  } catch (err) {
    console.error('Failed to draw official mascot PNG onto canvas', err);
  }
}
