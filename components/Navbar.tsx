'use client';

import React from 'react';
import Link from 'next/link';

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121315]/90 backdrop-blur-md border-b border-[#2D3A2E]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Branding */}
        <Link href="/" className="flex flex-col group">
          <span className="text-xl sm:text-2xl font-serif lowercase tracking-tight text-[#F7F4EF] group-hover:text-[#E5A93C] transition-colors duration-300">
            cosy coffi cwtch corner
          </span>
          <span className="text-[10px] sm:text-xs font-mono text-[#E5A93C]/80 tracking-wider">
            a sanctuary from the South Wales rain.
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-sm font-medium tracking-wide text-[#F7F4EF]/80 hover:text-[#E5A93C] transition-colors duration-200 lowercase"
          >
            hafan <span className="text-[10px] text-[#2D3A2E] block text-center">home</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('story')} 
            className="text-sm font-medium tracking-wide text-[#F7F4EF]/80 hover:text-[#E5A93C] transition-colors duration-200 lowercase"
          >
            our story <span className="text-[10px] text-[#2D3A2E] block text-center">ein stori</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('menu')} 
            className="text-sm font-medium tracking-wide text-[#F7F4EF]/80 hover:text-[#E5A93C] transition-colors duration-200 lowercase"
          >
            menu <span className="text-[10px] text-[#2D3A2E] block text-center">bwydlen</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('reserve')} 
            className="text-sm font-medium tracking-wide text-[#F7F4EF]/80 hover:text-[#E5A93C] transition-colors duration-200 lowercase"
          >
            reserve a nook <span className="text-[10px] text-[#2D3A2E] block text-center">archebu cwtch</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('gatherings')} 
            className="text-sm font-medium tracking-wide text-[#F7F4EF]/80 hover:text-[#E5A93C] transition-colors duration-200 lowercase"
          >
            gatherings <span className="text-[10px] text-[#2D3A2E] block text-center">cyfarfodydd</span>
          </button>
        </nav>

        {/* Global Action Button */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard"
            className="text-xs font-mono text-[#F7F4EF]/60 hover:text-[#E5A93C] transition-colors duration-200 hidden sm:inline-block"
          >
            dashboard
          </Link>
          <button
            onClick={() => scrollToSection('reserve')}
            className="px-5 py-2.5 rounded-none border border-[#E5A93C] text-[#E5A93C] bg-transparent hover:bg-[#E5A93C] hover:text-[#121315] font-serif tracking-wide transition-all duration-500 ease-out text-sm"
          >
            pull up a chair
          </button>
        </div>

      </div>
    </header>
  );
}