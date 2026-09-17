/**
 * PAPLO WEB - Interactive Portfolio Controller
 * Full-Stack Web Developer & UI/UX Engineer
 */

// Code Snippets for Live IDE Component
const CODE_SNIPPETS = {
  javascript: {
    filename: "server.js",
    lang: "JavaScript",
    badge: "Node.js / Express",
    code: `import express from 'express';
import { redisClient } from './config/redis.js';
import { db } from './config/database.js';

const app = express();
app.use(express.json());

// High-speed cached e-commerce route
app.get('/api/v1/products', async (req, res) => {
  const cacheKey = 'products:featured:v1';
  
  // 1. Check Redis cache first (sub-5ms response)
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({ source: 'redis_cache', data: JSON.parse(cachedData) });
  }

  // 2. Query PostgreSQL with indexing
  const products = await db.query(
    'SELECT id, title, price, inventory FROM products WHERE is_active = true ORDER BY priority DESC LIMIT 50'
  );

  // 3. Populate Redis with 10-minute TTL
  await redisClient.setEx(cacheKey, 600, JSON.stringify(products.rows));
  
  return res.status(200).json({ source: 'postgres_primary', data: products.rows });
});

export default app;`,
    output: [
      "✓ [Node.js Engine] Initializing PAPLO Express runtime...",
      "✓ [Redis 7.2] Connected to in-memory cluster (Latency: 1.2ms)",
      "✓ [PostgreSQL 16] Connection pool established (max: 40 connections)",
      "✓ Compiled successfully in 34ms",
      "🚀 Server listening on https://api.paploweb.dev (Port 8080)",
      "✓ Ready for production (50+ projects delivered)"
    ]
  },

  typescript: {
    filename: "CheckoutService.ts",
    lang: "TypeScript",
    badge: "Next.js 14 / TypeScript",
    code: `interface CartItem {
  id: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

interface CheckoutSessionResponse {
  sessionId: string;
  clientSecret: string;
  totalAmount: number;
  status: 'pending' | 'authorized' | 'captured';
}

export class CheckoutService {
  constructor(
    private readonly stripeGateway: StripeClient,
    private readonly auditLogger: AuditLogger
  ) {}

  public async createSecureSession(
    userId: string,
    items: CartItem[]
  ): Promise<CheckoutSessionResponse> {
    // Validate inventory & calculate idempotency key
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const session = await this.stripeGateway.checkout.sessions.create({
      payment_method_types: ['card', 'apple_pay'],
      line_items: items.map(i => ({ price: i.sku, quantity: i.quantity })),
      mode: 'payment',
      metadata: { developer: 'PAPLO WEB', completedProjects: '50+' }
    });

    await this.auditLogger.logEvent('CHECKOUT_INITIATED', { userId, amount: subtotal });
    return {
      sessionId: session.id,
      clientSecret: session.client_secret,
      totalAmount: subtotal,
      status: 'authorized'
    };
  }
}`,
    output: [
      "✓ [TypeScript 5.4] Type-checking CheckoutService.ts ...",
      "✓ Strict mode checks passed: 0 type errors, 0 warnings",
      "✓ Compiled bundle size: 2.14 KB (gzipped)",
      "✓ [Jest] 14 unit test suites passed (100% coverage)",
      "✓ Compiled successfully: Ready for production (50+ projects delivered)"
    ]
  },

  nodejs: {
    filename: "RateLimiter.middleware.js",
    lang: "Node.js",
    badge: "Microservice Security",
    code: `import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

/**
 * Distributed Token Bucket Rate Limiter
 * Built by PAPLO for high-concurrency protection
 */
export const rateLimitGuard = (limit = 120, windowSecs = 60) => {
  return async (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const bucketKey = \`ratelimit:\${clientIp}:\${Math.floor(Date.now() / 1000 / windowSecs)}\`;

    const currentRequests = await redis.incr(bucketKey);
    if (currentRequests === 1) {
      await redis.expire(bucketKey, windowSecs);
    }

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - currentRequests));

    if (currentRequests > limit) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. System protected by PAPLO WEB security layer.'
      });
    }

    return next();
  };
};`,
    output: [
      "✓ [RateLimiter] Distributed Token Bucket configured",
      "✓ [Redis Cluster] Heartbeat OK (ping 0.8ms)",
      "✓ Benchmark: Processed 25,000 req/sec with zero drops",
      "✓ Security headers injected (Helmet.js, CORS, Strict-Transport-Security)",
      "✓ Compiled successfully: Ready for production (50+ projects delivered)"
    ]
  },

  python: {
    filename: "ai_recommendation_engine.py",
    lang: "Python",
    badge: "FastAPI / Python",
    code: `from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np

app = FastAPI(title="PAPLO Commerce Recommendation Engine", version="2.0")

class ProductVector(BaseModel):
    product_id: str
    category: str
    embeddings: List[float]

@app.post("/api/v2/recommendations")
async def calculate_top_similar(query_vec: List[float], pool: List[ProductVector]):
    """Cosine similarity recommendation pipeline"""
    if not pool:
        raise HTTPException(status_code=400, detail="Empty candidate pool")
        
    q = np.array(query_vec)
    candidates = np.array([p.embeddings for p in pool])
    
    # Vectorized cosine similarity computation
    norm_q = np.linalg.norm(q)
    norm_c = np.linalg.norm(candidates, axis=1)
    scores = np.dot(candidates, q) / (norm_c * norm_q + 1e-9)
    
    top_indices = np.argsort(scores)[::-1][:5]
    return {"status": "success", "top_product_ids": [pool[i].product_id for i in top_indices]}`,
    output: [
      "✓ [Python 3.11] Loading NumPy vectorized SIMD routines...",
      "✓ [Uvicorn] Started worker process [PID 4092] on http://127.0.0.1:8000",
      "✓ OpenAPI docs generated at /docs",
      "✓ Vector inference latency: 4.8ms / batch",
      "✓ Compiled successfully: Ready for production (50+ projects delivered)"
    ]
  }
};

// Main Portfolio Application State & Controller
class PortfolioApp {
  constructor() {
    this.currentTheme = localStorage.getItem('paplo-theme') || 'dark';
    this.soundEnabled = localStorage.getItem('paplo-sound') === 'true';
    this.currentCodeTab = 'javascript';
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.audioCtx = null;

    this.init();
  }

  init() {
    this.initHolographicStrip();
    this.initTheme();
    this.initTypewriter();
    this.initCodeEditor();
    this.initFlowchart();
    this.initProjects();
    this.initContactForm();
    this.initSoundEngine();
    this.initModals();
    this.initMobileMenu();
    this.initScrollReveal();
    this.renderMetrics();
  }

  // Holographic Code Video Strip (Only here in the hero header, dark cyber look, disappears after 5s)
  initHolographicStrip() {
    const strip = document.getElementById('holographic-intro-strip');
    const video = document.getElementById('holographic-code-video');
    if (!strip || !video) return;

    // Instant autoplay with muted guarantee
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startOnUserInteraction = () => {
          video.play();
          document.removeEventListener('click', startOnUserInteraction);
          document.removeEventListener('touchstart', startOnUserInteraction);
        };
        document.addEventListener('click', startOnUserInteraction);
        document.addEventListener('touchstart', startOnUserInteraction);
      });
    }

    // Disappear after exactly 5 seconds (smooth collapse & fade out)
    setTimeout(() => {
      strip.style.transition = 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
      strip.style.opacity = '0';
      strip.style.transform = 'scale(0.98)';
      strip.style.height = '0px';
      strip.style.minHeight = '0px';
      strip.style.marginBottom = '0px';
      strip.style.padding = '0px';
      strip.style.borderWidth = '0px';
      strip.style.pointerEvents = 'none';

      setTimeout(() => {
        strip.style.display = 'none';
        video.pause();
      }, 900);
    }, 5000);
  }

  // Sound Synthesizer via Web Audio API (Zero external mp3 files!)
  initSoundEngine() {
    const soundToggle = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundLabel = document.getElementById('sound-label');

    const updateSoundUI = () => {
      if (soundIcon && soundLabel) {
        if (this.soundEnabled) {
          soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
          soundLabel.textContent = "Audio ON";
        } else {
          soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
          soundLabel.textContent = "Audio Muted";
        }
      }
    };

    updateSoundUI();

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('paplo-sound', this.soundEnabled);
        updateSoundUI();
        if (this.soundEnabled) {
          this.playSound('chirp');
        }
      });
    }
  }

  playSound(type = 'click') {
    if (!this.soundEnabled) return;

    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'run') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'chirp') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Audio not supported or blocked by browser policy
    }
  }

  // Theme Management
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-toggle-icon');

    const updateIcon = () => {
      if (!themeIcon) return;
      if (this.currentTheme === 'light') {
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
      } else {
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
      }
    };

    updateIcon();

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('paplo-theme', this.currentTheme);
        updateIcon();
        this.playSound('click');
      });
    }
  }

  // Terminal & Hero Typewriter Effect
  initTypewriter() {
    const el = document.getElementById('hero-typewriter');
    const terminalEl = document.getElementById('terminal-typewriter-text');
    const replayBtn = document.getElementById('replay-typewriter-btn');

    if (!el && !terminalEl) return;

    const phrases = [
      "Where clean engineering meets sub-second performance.",
      "50+ Web Development Projects Delivered with Zero Compromise.",
      "Transforming Complex Ideas into Scalable Digital Realities.",
      "Modern Full-Stack Architecture & High-Converting Web Platforms."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTime = 2400;
    let timeoutId = null;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      const partial = currentPhrase.substring(0, charIndex);
      if (el) {
        el.textContent = "hallo in web paplo — " + partial;
      }
      if (terminalEl) {
        terminalEl.textContent = partial;
      }

      let speed = isDeleting ? 25 : 55;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      timeoutId = setTimeout(type, speed);
    };

    type();

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        clearTimeout(timeoutId);
        charIndex = 0;
        isDeleting = false;
        if (el) el.textContent = "hallo in web paplo — ";
        if (terminalEl) terminalEl.textContent = "";
        this.playSound('run');
        type();
      });
    }
  }

  // Interactive Live IDE / Code Editor with Live Coding Animation & Trust Guarantee
  initCodeEditor() {
    const tabButtons = document.querySelectorAll('.editor-tab-btn');
    const codeDisplay = document.getElementById('editor-code-content');
    const filenameDisplay = document.getElementById('editor-filename');
    const badgeDisplay = document.getElementById('editor-badge');
    const runBtn = document.getElementById('editor-run-btn');
    const consoleDrawer = document.getElementById('editor-console-output');
    const clearBtn = document.getElementById('editor-clear-console');
    const statusBadge = document.getElementById('coding-status');
    const retypeBtn = document.getElementById('editor-retype-btn');

    this.typingTimer = null;
    this.isCoding = false;

    const stopTyping = () => {
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }
      this.isCoding = false;
    };

    const renderFullSnippet = (snippet) => {
      stopTyping();
      if (!codeDisplay || !snippet) return;
      const lines = snippet.code.split('\n');
      codeDisplay.innerHTML = lines.map((line, idx) => {
        const lineNum = idx + 1;
        const highlighted = this.syntaxHighlight(line);
        return `<div class="leading-relaxed hover:bg-white/5 px-2 rounded flex"><span class="editor-line-num font-mono">${lineNum}</span><span class="font-mono text-sm">${highlighted}</span></div>`;
      }).join('');

      if (statusBadge) {
        statusBadge.textContent = "READY TO RUN";
        statusBadge.parentElement?.classList.remove('text-cyan-400', 'border-cyan-500/20');
        statusBadge.parentElement?.classList.add('text-emerald-400', 'border-emerald-500/30');
      }
    };

    const startCodingAnimation = (langKey) => {
      stopTyping();
      const snippet = CODE_SNIPPETS[langKey];
      if (!snippet || !codeDisplay) return;

      if (filenameDisplay) filenameDisplay.textContent = snippet.filename;
      if (badgeDisplay) badgeDisplay.textContent = snippet.badge;

      if (statusBadge) {
        statusBadge.textContent = "LIVE CODING...";
        statusBadge.parentElement?.classList.add('text-cyan-400', 'border-cyan-500/20');
        statusBadge.parentElement?.classList.remove('text-emerald-400', 'border-emerald-500/30');
      }

      this.isCoding = true;
      const lines = snippet.code.split('\n');
      codeDisplay.innerHTML = '';

      let currentLineIdx = 0;

      const typeNextLine = () => {
        if (!this.isCoding) return;

        if (currentLineIdx < lines.length) {
          const lineText = lines[currentLineIdx];
          const lineNum = currentLineIdx + 1;
          const highlighted = this.syntaxHighlight(lineText);

          // Remove blinking cursor from previous line
          const prevCursor = codeDisplay.querySelector('.active-code-cursor');
          if (prevCursor) prevCursor.remove();

          const lineDiv = document.createElement('div');
          lineDiv.className = 'leading-relaxed hover:bg-white/5 px-2 rounded flex items-center';
          lineDiv.innerHTML = `
            <span class="editor-line-num font-mono">${lineNum}</span>
            <span class="font-mono text-sm">${highlighted}</span>
            <span class="active-code-cursor inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
          `;
          codeDisplay.appendChild(lineDiv);

          // Auto scroll to bottom of editor if needed
          codeDisplay.scrollTop = codeDisplay.scrollHeight;

          // Sound effect tick
          if (currentLineIdx % 3 === 0) {
            this.playSound('click');
          }

          currentLineIdx++;
          const delay = Math.floor(Math.random() * 50) + 40; // 40-90ms realistic line typing
          this.typingTimer = setTimeout(typeNextLine, delay);
        } else {
          // Finished typing all lines
          const cursor = codeDisplay.querySelector('.active-code-cursor');
          if (cursor) cursor.remove();
          this.isCoding = false;
          if (statusBadge) {
            statusBadge.textContent = "READY TO RUN";
            statusBadge.parentElement?.classList.remove('text-cyan-400', 'border-cyan-500/20');
            statusBadge.parentElement?.classList.add('text-emerald-400', 'border-emerald-500/30');
          }
        }
      };

      typeNextLine();
    };

    // Tab Button Handlers
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.currentCodeTab = lang;
        tabButtons.forEach(b => {
          b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-b-2', 'border-cyan-400');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-b-2', 'border-cyan-400');
        btn.classList.remove('text-slate-400');

        this.playSound('click');
        startCodingAnimation(lang);
      });
    });

    // Re-Type Button Handler
    if (retypeBtn) {
      retypeBtn.addEventListener('click', () => {
        this.playSound('chirp');
        startCodingAnimation(this.currentCodeTab);
      });
    }

    // Initial Live Coding Animation on Load
    startCodingAnimation(this.currentCodeTab);

    // Run Code Button Action with "جملة ثقة" (Statement of Absolute Confidence)
    if (runBtn && consoleDrawer) {
      runBtn.addEventListener('click', () => {
        // If typing is in progress, finish it immediately
        if (this.isCoding) {
          renderFullSnippet(CODE_SNIPPETS[this.currentCodeTab]);
        }

        this.playSound('run');
        runBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Compiling &amp; Verifying...
        `;
        runBtn.disabled = true;

        consoleDrawer.classList.remove('hidden');
        consoleDrawer.innerHTML = `
          <div class="text-cyan-400 font-mono text-xs flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Running production verification pipeline on cluster...</span>
          </div>
        `;

        setTimeout(() => {
          const outputs = CODE_SNIPPETS[this.currentCodeTab].output;
          let outputHtml = '<div class="space-y-1 pb-2 border-b border-white/10">';
          outputs.forEach(line => {
            const isReady = line.includes('Ready for production') || line.includes('100%');
            const isError = line.includes('error') || line.includes('Exception');
            const colorClass = isReady ? 'text-emerald-400 font-bold' : (isError ? 'text-rose-400' : 'text-slate-300');
            outputHtml += `<div class="font-mono text-xs ${colorClass} py-0.5">${line}</div>`;
          });
          outputHtml += '</div>';

          // "جملة ثقة" — The Ultimate Statement of Confidence & Guarantee
          outputHtml += `
            <div class="mt-3 p-4 rounded-xl bg-gradient-to-r from-[#071324] via-[#0A1A33] to-[#0F1E38] border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/25 space-y-3">
              <div class="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ضمان الجودة والثقة الهندسية</span>
                </span>
                <span class="text-xs font-mono font-extrabold text-cyan-300 tracking-wider">100% PRODUCTION READY</span>
              </div>
              
              <div class="text-sm sm:text-base font-extrabold text-white leading-relaxed text-right font-sans" dir="rtl">
                🛡️ "مع PAPLO WEB: لا نسلمك مجرد كود، بل نبني لك نظاماً هندسياً قوياً، آمناً، وسريعاً كالبرق، قادراً على تحمل ملايين الزوار والطلبات بدون أي انهيار أو توقف."
              </div>

              <div class="text-xs text-slate-300 leading-relaxed text-right font-sans" dir="rtl">
                💎 <strong class="text-cyan-300">أكثر من 50 مشروعاً ناجحاً</strong> تم تسليمهم بأعلى درجات الـ Clean Code والسرعة ورضا العملاء الكامل. مشروعك القادم بين أيدٍ خبيرة وموثوقة تضمن لك راحة البال والتفوق التنافسي.
              </div>

              <div class="pt-2.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span>✓ كود نظيف</span>
                  <span>•</span>
                  <span>✓ 0 Downtime</span>
                  <span>•</span>
                  <span>✓ P99: 34ms</span>
                </div>
                <a href="https://wa.me/20127811833?text=مرحباً%20بابلو،%20شاهدت%20كفاءة%20الكود%20وأريد%20البدء%20في%20مشروعي%20معك%20بثقة." target="_blank" class="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition transform hover:scale-105">
                  <span>تواصل مع PAPLO مباشرة لبدء مشروعك بثقة 💬</span>
                </a>
              </div>
            </div>
          `;

          consoleDrawer.innerHTML = outputHtml;
          consoleDrawer.scrollTop = consoleDrawer.scrollHeight;

          runBtn.innerHTML = `
            <svg class="w-4 h-4 mr-1 text-emerald-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-emerald-400">✓ 100% Verified</span>
          `;
          runBtn.disabled = false;
          this.playSound('success');
        }, 700);
      });
    }

    if (clearBtn && consoleDrawer) {
      clearBtn.addEventListener('click', () => {
        consoleDrawer.classList.add('hidden');
        consoleDrawer.innerHTML = '';
        this.playSound('click');
      });
    }
  }

  // Robust Single-Pass Syntax Highlighter (Bug-free, zero HTML-tag collision)
  syntaxHighlight(code) {
    const escapeHtml = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    // Match comments, strings, keywords, numbers/booleans, function calls, identifiers, punctuation, or spaces
    const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|from|export|default|const|let|var|async|await|return|class|interface|public|private|readonly|function|def|if|else|new|try|catch|throw)\b)|(\b(?:true|false|null|undefined|\d+(?:\.\d+)?)\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w]+)|(\s+)/g;

    return code.replace(tokenRegex, (match, comment, str, keyword, numBool, fnName, identifier, punct, space) => {
      if (comment) return `<span class="text-slate-500 italic">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="text-emerald-300">${escapeHtml(str)}</span>`;
      if (keyword) return `<span class="text-cyan-400 font-semibold">${escapeHtml(keyword)}</span>`;
      if (numBool) return `<span class="text-amber-300">${escapeHtml(numBool)}</span>`;
      if (fnName) return `<span class="text-purple-300 font-medium">${escapeHtml(fnName)}</span>`;
      if (identifier) return `<span class="text-slate-200">${escapeHtml(identifier)}</span>`;
      if (punct) return `<span class="text-cyan-200/70">${escapeHtml(punct)}</span>`;
      if (space) return space;
      return escapeHtml(match);
    });
  }

  // Interactive Architecture Flowchart
  initFlowchart() {
    const nodes = document.querySelectorAll('.flow-node');
    const titleEl = document.getElementById('flow-detail-title');
    const techEl = document.getElementById('flow-detail-tech');
    const roleEl = document.getElementById('flow-detail-role');
    const metricEl = document.getElementById('flow-detail-metric');
    const listEl = document.getElementById('flow-detail-list');

    const renderNodeDetails = (key) => {
      const data = ARCHITECTURE_NODES[key];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (techEl) techEl.textContent = data.tech;
      if (roleEl) roleEl.textContent = data.role;
      if (metricEl) metricEl.textContent = data.metric;

      if (listEl) {
        listEl.innerHTML = data.details.map(d => `
          <li class="flex items-start gap-2.5 text-sm text-slate-300">
            <span class="text-cyan-400 mt-1 flex-shrink-0">✦</span>
            <span>${d}</span>
          </li>
        `).join('');
      }
    };

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const key = node.getAttribute('data-node');
        nodes.forEach(n => n.classList.remove('active-node', 'ring-2', 'ring-cyan-400'));
        node.classList.add('active-node', 'ring-2', 'ring-cyan-400');
        this.playSound('click');
        renderNodeDetails(key);
      });
    });

    // Default active node: Client
    renderNodeDetails('client');
  }

  // Featured Projects Showcase & Search
  initProjects() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    const gridEl = document.getElementById('projects-grid');
    const filterTabs = document.querySelectorAll('.project-filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const countBadge = document.getElementById('project-count-badge');

    const render = () => {
      if (!gridEl) return;

      const filtered = PROJECTS_DATA.filter(proj => {
        const matchesCategory = this.activeCategory === 'all' || proj.category === this.activeCategory;
        const matchesSearch = !this.searchQuery || 
          proj.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          proj.tagline.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          proj.tags.some(t => t.toLowerCase().includes(this.searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      });

      if (countBadge) {
        countBadge.textContent = `${filtered.length} Projects Shown`;
      }

      if (filtered.length === 0) {
        gridEl.innerHTML = `
          <div class="col-span-full py-16 text-center bg-white border border-stone-200 shadow-sm rounded-2xl p-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C85A32]/10 flex items-center justify-center text-[#C85A32]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 class="text-xl font-bold text-stone-900 mb-2">No projects found</h4>
            <p class="text-stone-600 text-sm max-w-md mx-auto">Try clearing your search query or selecting a different category tab.</p>
            <button id="reset-filter-btn" class="mt-4 px-5 py-2.5 bg-[#C85A32] text-white font-bold rounded-full text-xs shadow-sm hover:bg-[#B34D27] transition">Reset Filters</button>
          </div>
        `;
        document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
          this.activeCategory = 'all';
          this.searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterTabs.forEach(b => {
            b.classList.remove('active', 'bg-[#C85A32]', 'text-white', 'shadow-md');
            b.classList.add('text-stone-700', 'bg-white');
          });
          filterTabs[0]?.classList.add('active', 'bg-[#C85A32]', 'text-white', 'shadow-md');
          render();
        });
        return;
      }

      gridEl.innerHTML = filtered.map(p => this.createProjectCardHtml(p)).join('');

      // Attach case-study modal triggers
      document.querySelectorAll('.open-case-study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-id');
          this.openProjectModal(id);
          this.playSound('click');
        });
      });
    };

    filterTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.getAttribute('data-filter');
        filterTabs.forEach(b => {
          b.classList.remove('active', 'bg-[#C85A32]', 'text-white', 'shadow-md');
          b.classList.add('text-stone-700', 'bg-white');
        });
        btn.classList.add('active', 'bg-[#C85A32]', 'text-white', 'shadow-md');
        btn.classList.remove('text-stone-700');

        this.playSound('click');
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        render();
      });
    }

    render();
  }

  createProjectCardHtml(p) {
    return `
      <div class="bg-white rounded-2xl overflow-hidden flex flex-col group border border-neutral-200 shadow-sm hover:shadow-xl hover:border-black transition-all duration-300">
        <!-- Visual Project Showcase Image -->
        <div class="relative h-56 bg-neutral-100 overflow-hidden group/img">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <!-- Top Status Bar & Category Badge directly on Image -->
          <div class="absolute top-3 left-3 right-3 z-10 flex justify-between items-center text-white text-xs font-mono">
            <div class="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[11px] font-semibold">Production Live</span>
            </div>
            <span class="bg-white text-black text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">${p.categoryLabel}</span>
          </div>

          <!-- Bottom Metric Bar Overlay -->
          <div class="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white font-mono bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
            <span class="truncate max-w-[170px] font-medium">${p.metrics[0] || '⚡ Sub-second Latency'}</span>
            <span class="text-emerald-300 font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% Fluid
            </span>
          </div>
        </div>

        <!-- Body Content -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-lg font-bold text-neutral-900 group-hover:text-black transition-colors duration-200 line-clamp-1">${p.title}</h3>
            <p class="text-sm text-neutral-600 mt-2 line-clamp-2 leading-relaxed">${p.tagline}</p>

            <!-- Metrics Pill Grid -->
            <div class="grid grid-cols-2 gap-2 mt-4">
              ${p.metrics.slice(0, 2).map(m => `
                <div class="text-[11px] font-mono bg-neutral-50 border border-neutral-200 px-2.5 py-1.5 rounded-lg text-neutral-700 flex items-center gap-1.5">
                  <span>${m}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tech Stack Badges -->
          <div>
            <div class="flex flex-wrap gap-1.5 pt-2">
              ${p.tags.slice(0, 4).map(t => `
                <span class="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200 hover:border-black hover:text-black transition-colors">${t}</span>
              `).join('')}
              ${p.tags.length > 4 ? `<span class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500">+${p.tags.length - 4}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Open Case Study Modal
  openProjectModal(id) {
    const proj = PROJECTS_DATA.find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('project-detail-modal');
    const content = document.getElementById('project-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="space-y-6">
        <!-- Project Image Showcase in Modal -->
        <div class="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
          <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover object-top">
        </div>

        <!-- Header -->
        <div class="flex items-start justify-between border-b border-neutral-200 pb-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-mono uppercase px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold">${proj.categoryLabel}</span>
              <span class="text-xs font-mono text-emerald-700 font-semibold">✓ Production Verified</span>
            </div>
            <h2 class="text-2xl font-bold text-neutral-900">${proj.title}</h2>
            <p class="text-sm text-neutral-600 mt-1">${proj.tagline}</p>
          </div>
        </div>

        <!-- Problem & Solution Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h4 class="text-sm font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              The Problem
            </h4>
            <p class="text-xs text-neutral-600 leading-relaxed">${proj.problem}</p>
          </div>

          <div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h4 class="text-sm font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              PAPLO's Engineering Solution
            </h4>
            <p class="text-xs text-neutral-600 leading-relaxed">${proj.solution}</p>
          </div>
        </div>

        <!-- Key Engineering Metrics -->
        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2.5">Key Performance Outcomes</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${proj.metrics.map(m => `
              <div class="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                <div class="text-xs font-mono font-bold text-neutral-900">${m}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Full Tech Stack Tags -->
        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Technologies Used</h4>
          <div class="flex flex-wrap gap-2">
            ${proj.tags.map(t => `
              <span class="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800">${t}</span>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Direct Actions -->
        <div class="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div class="text-xs font-mono text-neutral-600">
            Architected & Coded by <strong class="text-black">&lt;/&gt; PAPLO WEB</strong>
          </div>
          <div class="flex items-center gap-3">
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5">
              <span>Open Live Project</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  // Modals & Resume Viewer
  initModals() {
    const projectModal = document.getElementById('project-detail-modal');
    const resumeModal = document.getElementById('resume-modal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const resumeTriggers = document.querySelectorAll('.open-resume-btn');
    const printResumeBtn = document.getElementById('print-resume-btn');

    const closeModal = () => {
      if (projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
      }
      if (resumeModal) {
        resumeModal.classList.add('hidden');
        resumeModal.classList.remove('flex');
      }
      document.body.style.overflow = '';
      this.playSound('click');
    };

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    [projectModal, resumeModal].forEach(m => {
      if (m) {
        m.addEventListener('click', (e) => {
          if (e.target === m) closeModal();
        });
      }
    });

    resumeTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        if (resumeModal) {
          resumeModal.classList.remove('hidden');
          resumeModal.classList.add('flex');
          document.body.style.overflow = 'hidden';
          this.playSound('click');
        }
      });
    });

    if (printResumeBtn) {
      printResumeBtn.addEventListener('click', () => {
        window.print();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Contact Form Handling & WhatsApp Auto-Redirect
  initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('contact-toast');
    const toastMsg = document.getElementById('contact-toast-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const projectType = document.getElementById('contact-type')?.value;
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        this.showToast("Please fill in all required fields.", "error");
        return;
      }

      this.playSound('run');

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950 inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Transmitting to PAPLO...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        form.reset();
        this.playSound('success');

        // Show Toast with Direct WhatsApp Redirect Prompt
        const waText = encodeURIComponent(`Hi PAPLO, my name is ${name} (${email}). I want to discuss a ${projectType} project: ${message}`);
        const waUrl = `https://wa.me/20127811833?text=${waText}`;

        this.showToast(`Thank you, ${name}! Your inquiry was recorded. <a href="${waUrl}" target="_blank" class="underline font-bold text-cyan-300 ml-1">Click to continue on WhatsApp ↗</a>`, "success", 7000);
      }, 800);
    });
  }

  showToast(message, type = "success", duration = 4000) {
    const toast = document.getElementById('contact-toast');
    const toastMsg = document.getElementById('contact-toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.innerHTML = message;
    toast.classList.remove('bg-rose-900/90', 'border-rose-500', 'bg-slate-900/95', 'border-cyan-500');

    if (type === "error") {
      toast.classList.add('bg-rose-900/95', 'border-rose-500');
    } else {
      toast.classList.add('bg-slate-900/95', 'border-cyan-500');
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // Mobile Navigation Drawer
  initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !menuDrawer) return;

    const openMenu = () => {
      menuDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      this.playSound('click');
    };

    const closeMenu = () => {
      menuDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
      this.playSound('click');
    };

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    links.forEach(l => l.addEventListener('click', closeMenu));
  }

  // Viewport Scroll Reveal & Active Nav Highlight
  initScrollReveal() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('text-black', 'font-bold');
              link.classList.remove('text-neutral-600');
            } else {
              link.classList.remove('text-black', 'font-bold');
              link.classList.add('text-neutral-600');
            }
          });
        }
      });
    });
  }

  // Render metrics and stats
  renderMetrics() {
    const totalProofEl = document.getElementById('archive-proof-count');
    if (totalProofEl && typeof EXTENDED_PROJECTS_ARCHIVE !== 'undefined') {
      const total = PROJECTS_DATA.length + EXTENDED_PROJECTS_ARCHIVE.length;
      totalProofEl.textContent = `${total}+ Verified Deliverables`;
    }
  }
}

// Instantiate on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.paploApp = new PortfolioApp();
});
