import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/hero';
import { TodayShelter } from '@/components/TodayShelter';
import { Philosophy } from '@/components/Philosophy';
import { OurStory } from '@/components/OurStory';
import { MenuSection } from '@/components/MenuSection';
import { ReserveNook } from '@/components/ReserveNook';
import { Gatherings } from '@/components/Gatherings';

// Safe suspense loading placeholder
function ComponentLoader() {
  return (
    <div className="py-20 text-center text-[#F7F4EF]/50 font-mono text-xs">
      Loading cozy corner elements...
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121315]">
      
      {/* Global Navigation & Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Today's Shelter Hours & Live Status */}
      <TodayShelter />

      {/* The Sanctuary Philosophy */}
      <Philosophy />

      {/* Our Story & The Space */}
      <OurStory />

      {/* The Coffi & Bakes Menu */}
      <Suspense fallback={<ComponentLoader />}>
        <MenuSection />
      </Suspense>

      {/* Reserve a Nook Booking Flow */}
      <Suspense fallback={<ComponentLoader />}>
        <ReserveNook />
      </Suspense>

      {/* Gatherings & Enquiries */}
      <Suspense fallback={<ComponentLoader />}>
        <Gatherings />
      </Suspense>

      {/* Cozy Footer */}
      <footer className="bg-[#0E0F11] border-t border-[#2D3A2E]/40 py-12 text-center text-xs text-[#F7F4EF]/40 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="font-serif lowercase text-base text-[#F7F4EF]/70">
            cosy coffi cwtch corner
          </p>
          <p>
            12 Heol y Gelli, Caerdydd, CF10 2BY — a sanctuary from the South Wales rain.
          </p>
          <p className="text-[#E5A93C]/50">
            © 2026 Cosy Coffi Cwtch Corner. All rights reserved. Built with love in Wales.
          </p>
        </div>
      </footer>

    </div>
  );
}