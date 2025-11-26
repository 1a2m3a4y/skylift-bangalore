import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block text-sm">
      <div className="text-white/70 text-xs mb-2">{label}</div>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/4 backdrop-blur-md border border-white/6 placeholder-white/30 focus:outline-none focus:border-blue-400 transition"
      />
    </label>
  );
}

function FlightPreview({ state }) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 backdrop-blur-lg border border-white/7 shadow-[0_10px_40px_rgba(2,6,23,0.6)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-white/60">Flight ID</div>
          <div className="text-lg font-semibold">SKY-{Math.floor(Math.random() * 9000) + 1000}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60">ETA</div>
          <div className="text-lg font-semibold">{state.time || "—"}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60">Route</div>
        <div className="mt-2 text-sm font-medium">
          {state.pickup || "Pickup"} → {state.drop || "Drop"}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="px-3 py-1 bg-white/4 rounded-full text-xs">Vertical Takeoff</div>
        <div className="px-3 py-1 bg-white/4 rounded-full text-xs">Autonomous Assist</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60">Estimate</div>
          <div className="text-2xl font-bold">₹{state.estimate || "399"}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Passengers</div>
          <div className="text-sm">{state.passengers || 1}</div>
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [estimate, setEstimate] = useState("399");
  const [passengers, setPassengers] = useState(1);
  const [flightMode, setFlightMode] = useState("Standard");

  function handleBook() {
    alert(`Booking requested:\n${pickup} → ${drop}\nMode: ${flightMode}\n${date} ${time}`);
  }

  const state = { pickup, drop, time, estimate, passengers };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
      <Navbar />
      <main className="pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/4 backdrop-blur-lg border border-white/7">
              <h2 className="text-2xl font-semibold">Book a Flight</h2>
              <p className="text-sm text-white/60 mt-1">
                Enter pickup, landing zone and time to get a live estimate.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Koramangala" />
                <Input label="Drop" value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="MG Road" />
                <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>

              <div className="mt-6">
                <div className="text-xs text-white/60 mb-2">Flight Mode</div>
                <div className="flex items-center gap-3">
                  {["Standard", "Executive", "HyperJet"].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setFlightMode(m);
                        setEstimate(m === "HyperJet" ? "999" : m === "Executive" ? "599" : "399");
                      }}
                      className={`px-4 py-2 rounded-full text-sm border ${
                        flightMode === m
                          ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-black border-transparent shadow-md"
                          : "bg-white/3 border-white/6 text-white/80"
                      } transition`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-white/60">Passengers</div>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-16 px-3 py-2 rounded-xl bg-white/4 border border-white/6"
                  />
                </div>

                <button
                  onClick={handleBook}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:scale-[1.02] transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div>
              <FlightPreview state={{ pickup, drop, time, estimate, passengers }} />

              <div className="mt-5 p-4 rounded-2xl bg-white/3 backdrop-blur-lg border border-white/7 text-sm">
                <div className="font-medium">Safety & Guarantee</div>
                <div className="text-xs text-white/60 mt-2">
                  All flights include certified pilots, pre-flight checks and redundancy systems. ETA and estimate are indicative.
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
