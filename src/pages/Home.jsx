import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HeroIllustration() {
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx="20" fill="url(#g1)" opacity="0.06" />
        <g transform="translate(30,40)">
          <ellipse cx="180" cy="200" rx="110" ry="18" fill="#0f172a" opacity="0.35" />
          <g transform="translate(60,30)">
            <rect x="20" y="60" rx="14" ry="14" width="200" height="60" fill="#081227" stroke="#3B82F6" strokeOpacity="0.14" />
            <circle cx="40" cy="120" r="6" fill="#3B82F6" />
            <circle cx="180" cy="120" r="6" fill="#06B6D4" />
            <path d="M0 60 Q40 20 140 40 Q220 60 240 40" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
      <Navbar />
      <main className="relative pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="space-y-6">
              
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight" style={{ letterSpacing: "0.6px" }}>
                Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Future</span> of Flying Mobility
              </h1>

              <p className="text-white/70 max-w-xl">
                Book AI-optimized vertical takeoffs across Bangalore. Seamless micro-routes, real-time telemetry and carbon-aware routing — all in a single tap.
              </p>

              <div className="flex gap-4">
                <a href="/booking" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:scale-[1.02] transition">
                  Book Your Flight
                </a>

                <a href="#how" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:text-white transition">
                  Explore Routes
                </a>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-white/70">
                {[
                  { label: "3 min", sub: "Avg Pickup" },
                  { label: "AI", sub: "Optimized" },
                  { label: "24/7", sub: "Sky coverage" }
                ].map((box, idx) => (
                  <div key={idx} className="bg-white/3 backdrop-blur-md border border-white/6 rounded-2xl p-3 text-center">
                    <div className="text-sm font-semibold">{box.label}</div>
                    <div className="text-[11px]">{box.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-white/3 backdrop-blur-xl border border-white/8 shadow-[0_20px_60px_rgba(2,6,23,0.6)]">
                <HeroIllustration />
              </div>
            </div>
          </section>

          
          <section id="how" className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "AI Optimized Paths", desc: "Smarter, safer, faster vertical routes." },
              { title: "Zero Traffic", desc: "Bypass surface congestion entirely." },
              { title: "Certified Pilots", desc: "Best-in-class safety standards." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/3 backdrop-blur-lg border border-white/6 hover:border-blue-500/40 transition">
                <div className="text-sm font-semibold mb-2">{f.title}</div>
                <div className="text-xs text-white/70">{f.desc}</div>
              </div>
            ))}
          </section>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </main>
    </div>
  );
}
