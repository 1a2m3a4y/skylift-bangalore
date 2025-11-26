import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_6px_30px_rgba(59,130,246,0.18)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M12 3v18" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-white font-semibold tracking-wider">Skylift</div>
            <div className="ml-3 text-sm text-white/60 hidden sm:block">Flying Cabs — Bangalore</div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/booking" className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-400 text-black shadow-md hover:shadow-[0_0_30px_rgba(59,130,246,0.22)] transition">Book Flight</a>
            <button className="px-3 py-2 rounded-lg border border-white/10 text-white/80 text-sm hover:text-white transition">Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
