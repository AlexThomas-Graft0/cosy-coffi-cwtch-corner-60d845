'use client';

import React from 'react';

export function Hero() {
  const scrollToReserve = () => {
    const element = document.getElementById('reserve');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden">
      {/* Visual Background Accent representing fireplace glow */}
      <div className="absolute right-0 top-1/4 w-[40vw] h-[40vw] rounded-full bg-[#E5A93C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-[30vw] h-[30vw] rounded-full bg-[#2D3A2E]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#E5A93C] uppercase block">
              croeso i&apos;r cwtch | welcome to the snug
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F7F4EF] leading-tight font-medium">
              find your quiet corner in the heart of <span className="italic text-[#E5A93C]">Caerdydd.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#F7F4EF]/80 font-light max-w-xl leading-relaxed">
              Step out of the Cardiff drizzle and into the soft glow of candlelight. We grind locally roasted beans, bake fresh bara brith daily, and keep the hearth burning. This is not a place to rush. It is a place to linger, read, and breathe.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToReserve}
                className="px-6 py-3.5 bg-[#E5A93C] text-[#121315] font-serif tracking-wide hover:bg-[#F7F4EF] transition-colors duration-300 shadow-lg shadow-[#E5A93C]/10"
              >
                reserve a fireside nook
              </button>
              <button
                onClick={scrollToMenu}
                className="px-6 py-3.5 border border-[#F7F4EF]/30 text-[#F7F4EF] font-serif tracking-wide hover:border-[#E5A93C] hover:text-[#E5A93C] transition-all duration-300"
              >
                explore today’s bakes
              </button>
            </div>

            {/* Atmospheric Trust Indicators (Stats Row) */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-[#2D3A2E]/40 max-w-lg">
              <div>
                <span className="block text-3xl font-serif text-[#E5A93C] font-semibold">4</span>
                <span className="block text-xs text-[#F7F4EF]/70 font-mono mt-1">fireside nooks crafted for slow afternoons</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-[#E5A93C] font-semibold">100%</span>
                <span className="block text-xs text-[#F7F4EF]/70 font-mono mt-1">welsh-roasted beans sourced from local growers</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-[#E5A93C] font-semibold">0</span>
                <span className="block text-xs text-[#F7F4EF]/70 font-mono mt-1">reasons to rush your cup</span>
              </div>
            </div>

          </div>

          {/* Off-center Hero Visual with Steam & Fireplace vibe */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#2D3A2E]/40 group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-transparent z-10" />
              
              {/* Image representing the cozy coffee fireplace scene */}
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80" 
                alt="Crackling fireplace with steaming hand-thrown ceramic mug" 
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Glowing candle indicator */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-3 bg-[#121315]/90 px-4 py-2 border border-[#E5A93C]/30 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
                <span className="text-xs font-mono text-[#F7F4EF]/90">The hearth is burning bright</span>
              </div>
            </div>

            {/* Floating absolute background card */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2D3A2E]/20 border border-[#2D3A2E]/40 -z-10 rounded-sm" />
          </div>

        </div>
      </div>
    </section>
  );
}