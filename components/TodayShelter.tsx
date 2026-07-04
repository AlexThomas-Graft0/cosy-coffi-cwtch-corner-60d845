'use client';

import React, { useEffect, useState } from 'react';

export function TodayShelter() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Safely check hours on client-side to prevent hydration mismatch
    // Cardiff timezone assumption for a real experience, or generic hours
    const now = new Date();
    const currentHour = now.getHours();
    
    // Open 08:00 - 18:00 weekdays, 09:00 - 17:00 weekends
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = day === 0 || day === 6;
    
    if (isWeekend) {
      if (currentHour >= 9 && currentHour < 17) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      if (currentHour >= 8 && currentHour < 18) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, []);

  return (
    <section className="py-16 bg-[#18191C] border-y border-[#2D3A2E]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Header & Status */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider block">Today&apos;s Shelter</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F7F4EF] font-medium">the hearth is warm.</h2>
            <p className="text-sm sm:text-base text-[#F7F4EF]/70 font-light leading-relaxed max-w-md">
              You can find us tucked away on a quiet side street in Cardiff. Our doors are open, the kettle is hot, and the wood-burner is lit.
            </p>

            {/* Live Indicator */}
            <div className="pt-2">
              {isOpen ? (
                <div className="inline-flex items-center space-x-2 bg-[#2D3A2E]/30 border border-[#2D3A2E] px-4 py-2 rounded-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-sm font-mono text-[#F7F4EF]">● burning bright — come on in</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 bg-neutral-800/50 border border-neutral-700/40 px-4 py-2 rounded-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span className="text-sm font-mono text-[#F7F4EF]/60">○ quiet for the evening</span>
                </div>
              )}
            </div>
          </div>

          {/* Opening Hours Details */}
          <div className="lg:col-span-4 bg-[#121315] p-6 sm:p-8 border border-[#2D3A2E]/30 rounded-sm">
            <h3 className="text-lg font-serif text-[#E5A93C] mb-4">opening hours</h3>
            
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-[#2D3A2E]/20">
                <span className="text-[#F7F4EF]/70">Monday – Friday</span>
                <span className="text-[#F7F4EF] font-semibold">08:00 – 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#F7F4EF]/70">Saturday – Sunday</span>
                <span className="text-[#F7F4EF] font-semibold">09:00 – 17:00</span>
              </div>
            </div>
          </div>

          {/* Address and Micro-Copy */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#E5A93C]/5 p-6 border-l-2 border-[#E5A93C]">
              <span className="block text-xs font-mono text-[#E5A93C] uppercase mb-1">Our Location</span>
              <p className="font-serif text-[#F7F4EF] text-lg leading-snug">
                12 Heol y Gelli, Caerdydd, CF10 2BY
              </p>
              <p className="text-xs text-[#F7F4EF]/60 font-mono mt-3 italic">
                Just a five-minute walk from the city centre, yet a world away.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}