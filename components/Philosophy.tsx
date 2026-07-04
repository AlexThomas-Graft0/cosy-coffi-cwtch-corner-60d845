'use client';

import React from 'react';

export function Philosophy() {
  return (
    <section className="py-24 bg-[#121315] relative overflow-hidden">
      {/* Subtle organic background vector overlay effect */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#2D3A2E]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Editorial Image with Caption */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#2D3A2E]/40">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80" 
                  alt="Cozy warm steam in coffee shop window" 
                  className="object-cover w-full h-full filter sepia-[15%] contrast-[1.05] brightness-[0.9]"
                />
              </div>
              <p className="mt-4 text-xs font-mono text-[#E5A93C]/80 italic text-right">
                A sanctuary built to withstand the South Wales rain.
              </p>
            </div>
          </div>

          {/* Right Side: Philosophy Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 lg:pl-8">
            <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest">
              The Sanctuary Philosophy
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-serif text-[#F7F4EF] font-medium leading-tight">
              what is a <span className="italic text-[#E5A93C]">cwtch?</span>
            </h2>
            
            <div className="space-y-4 text-[#F7F4EF]/80 font-light text-base sm:text-lg leading-relaxed">
              <p>
                It is more than a corner, and more than a simple hug. In Wales, a <strong className="font-semibold text-[#E5A93C]">cwtch</strong> is a safe place, a pocket of absolute comfort where the cold world cannot touch you.
              </p>
              <p>
                We built this corner of Cardiff to be exactly that—a physical sanctuary where your coffee is hot, your chair is soft, and your mind is at ease.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="border border-[#2D3A2E]/30 p-4 bg-[#18191C]">
                <span className="text-xs text-[#E5A93C] font-mono block uppercase mb-1">Cymraeg</span>
                <p className="text-sm italic text-[#F7F4EF]/70">
                  Lle saff, cynnes lle gallwch ddianc rhag y glaw a phrysurdeb y ddinas.
                </p>
              </div>
              <div className="border border-[#2D3A2E]/30 p-4 bg-[#18191C]">
                <span className="text-xs text-[#E5A93C] font-mono block uppercase mb-1">English</span>
                <p className="text-sm italic text-[#F7F4EF]/70">
                  A safe, warm place where you can escape the rain and the city rush.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}