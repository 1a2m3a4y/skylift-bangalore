import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-white/60 text-sm">© {new Date().getFullYear()} Skylift — All rights reserved.</div>
        <div className="mt-3 text-xs text-white/40">Built for the future of urban mobility • Bangalore</div>
      </div>
    </footer>
  );
}
