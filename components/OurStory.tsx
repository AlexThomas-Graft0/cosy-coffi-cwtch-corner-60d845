'use client';

import React from 'react';

export function OurStory() {
  return (
    <section id="story" className="py-24 bg-[#18191C] border-t border-[#2D3A2E]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest block">ein stori | our story</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#F7F4EF] font-medium">slow down and linger.</h2>
          <p className="text-[#E5A93C] font-serif italic text-lg sm:text-xl font-light">
            &ldquo;A love letter to Welsh rain, poetry, and perfect roasts.&rdquo;
          </p>
        </div>

        {/* Narrative Split Column with beautiful typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6 text-[#F7F4EF]/80 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Cosy Coffi Cwtch Corner was born out of a simple need: a desire to escape the frantic pace of modern life. We watched Cardiff speed up around us—commuters rushing through downpours, laptops glowing in sterile offices, coffee treated as fuel rather than a ritual.
            </p>
            <p className="font-serif italic text-[#E5A93C] text-xl pl-4 border-l-2 border-[#E5A93C]">
              We wanted to build an antidote.
            </p>
            <p>
              Working with local artisans, we reclaimed old oak timbers, gathered hundreds of well-loved books, and installed a wood-burning stove at the heart of our space. We partnered with roasters who treat coffee bean sourcing as an art form and local bakers who still make Welsh cakes the way our grandmothers did.
            </p>
            <p>
              We don’t have loud music. We don&apos;t have bright lights. We simply have warmth, quiet conversation, and the comforting aroma of fresh espresso.
            </p>
          </div>

          {/* Grainy imagery grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-sm overflow-hidden border border-[#2D3A2E]/40">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80" 
                alt="Stacked books and vintage reading lamp" 
                className="object-cover w-full h-full filter grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="aspect-square rounded-sm overflow-hidden border border-[#2D3A2E]/40 translate-y-6">
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80" 
                alt="Tactile warm ceramic mug" 
                className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-500"
              />
            </div>
          </div>

        </div>

        {/* Deep Dive: The Anatomy of Our Space */}
        <div className="mt-28">
          <div className="border-b border-[#2D3A2E]/30 pb-4 mb-10">
            <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider block">the anatomy of our space</span>
            <h3 className="text-3xl font-serif text-[#F7F4EF] font-medium mt-1">our physical corners</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Nook 1 */}
            <div className="bg-[#121315] border border-[#2D3A2E]/30 p-6 sm:p-8 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors duration-300">
              <div>
                <span className="text-xs font-mono text-[#E5A93C] block mb-2">Corner 01</span>
                <h4 className="text-xl font-serif text-[#F7F4EF] mb-3">The Hearthside Cwtch</h4>
                <p className="text-sm text-[#F7F4EF]/70 font-light leading-relaxed">
                  Positioned directly beside our cast-iron wood burner. Featuring two deep leather armchairs, a low oak table, and the gentle crackle of burning birch. Perfect for deep conversations or staring into the flames.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2D3A2E]/20 text-xs font-mono text-[#E5A93C]/80">
                Capacity: 1 – 2 guests
              </div>
            </div>

            {/* Nook 2 */}
            <div className="bg-[#121315] border border-[#2D3A2E]/30 p-6 sm:p-8 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors duration-300">
              <div>
                <span className="text-xs font-mono text-[#E5A93C] block mb-2">Corner 02</span>
                <h4 className="text-xl font-serif text-[#F7F4EF] mb-3">The Bookshelf Corner</h4>
                <p className="text-sm text-[#F7F4EF]/70 font-light leading-relaxed">
                  Tucked behind our collection of classic Welsh literature and poetry. Lit by a single, warm library lamp, this corner features a wide velvet armchair and a writing desk.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2D3A2E]/20 text-xs font-mono text-[#E5A93C]/80">
                Capacity: 1 – 3 guests
              </div>
            </div>

            {/* Nook 3 */}
            <div className="bg-[#121315] border border-[#2D3A2E]/30 p-6 sm:p-8 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors duration-300">
              <div>
                <span className="text-xs font-mono text-[#E5A93C] block mb-2">Corner 03</span>
                <h4 className="text-xl font-serif text-[#F7F4EF] mb-3">The Window Bay</h4>
                <p className="text-sm text-[#F7F4EF]/70 font-light leading-relaxed">
                  Watch the rain run down the glass while staying perfectly dry. This nook offers a soft cushioned bench, linen privacy curtains, and a perfect view of the quiet cobblestone passage outside.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2D3A2E]/20 text-xs font-mono text-[#E5A93C]/80">
                Capacity: 1 – 2 guests
              </div>
            </div>

          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F4EF] font-medium">rooted in our community.</h3>
            <p className="text-sm sm:text-base text-[#F7F4EF]/70 font-light mt-2">
              We believe in keeping our footprint small and our community strong. Every cup we pour and plate we serve supports a local Welsh business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Partner 1 */}
            <div className="p-6 bg-[#121315]/80 border border-[#2D3A2E]/30 rounded-sm">
              <span className="text-xs font-mono text-[#E5A93C] block mb-1">Coffee Beans</span>
              <h4 className="text-lg font-serif text-[#F7F4EF] mb-2 font-medium">Coed Duon Roastery</h4>
              <p className="text-xs sm:text-sm text-[#F7F4EF]/75 font-light">
                Sourcing single-origin, ethically grown beans roasted by hand in the Welsh valleys.
              </p>
            </div>

            {/* Partner 2 */}
            <div className="p-6 bg-[#121315]/80 border border-[#2D3A2E]/30 rounded-sm">
              <span className="text-xs font-mono text-[#E5A93C] block mb-1">Traditional Pastries</span>
              <h4 className="text-lg font-serif text-[#F7F4EF] mb-2 font-medium">Gwen’s Artisan Bakery</h4>
              <p className="text-xs sm:text-sm text-[#F7F4EF]/75 font-light">
                Hand-rolling traditional Welsh cakes and sourdough pastries in Cardiff every morning.
              </p>
            </div>

            {/* Partner 3 */}
            <div className="p-6 bg-[#121315]/80 border border-[#2D3A2E]/30 rounded-sm">
              <span className="text-xs font-mono text-[#E5A93C] block mb-1">Craft Ceramics</span>
              <h4 className="text-lg font-serif text-[#F7F4EF] mb-2 font-medium">Cymru Clay</h4>
              <p className="text-xs sm:text-sm text-[#F7F4EF]/75 font-light">
                Hand-throwing the tactile, heavy ceramic mugs you hold in our space.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}