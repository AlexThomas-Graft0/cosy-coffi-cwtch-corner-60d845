'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function ReserveNook() {
  const [selectedNook, setSelectedNook] = useState('The Hearthside Cwtch');
  const [date, setDate] = useState('2026-03-01');
  const [timeSlot, setTimeSlot] = useState('10:30 – 12:00');
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nooksList = [
    {
      name: 'The Hearthside Cwtch',
      capacity: '1 – 2 guests',
      atmosphere: 'Deeply warm, close to the wood-burner, soft leather seating.',
      bestFor: 'Deep conversations or quiet contemplation by the fire.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'The Bookshelf Corner',
      capacity: '1 – 3 guests',
      atmosphere: 'Surrounded by old books, cozy velvet armchairs, warm reading lamps.',
      bestFor: 'Losing yourself in a novel or penning your own thoughts.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'The Window Bay',
      capacity: '1 – 2 guests',
      atmosphere: 'Bright yet private, linen curtains, views of the historic cobblestone lane.',
      bestFor: 'Watching the rain fall over Cardiff while remaining perfectly snug.',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const timeSlots = [
    '08:30 – 10:00',
    '10:30 – 12:00',
    '12:30 – 14:00',
    '14:30 – 16:00',
    '16:30 – 18:00'
  ];

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      // 1. Fetch nook ID from database based on selected name, or assign a default
      let nookId = null;
      const { data: nooksData } = await supabase
        .from('nooks')
        .select('id')
        .ilike('name', `%${selectedNook}%`)
        .limit(1);

      if (nooksData && nooksData.length > 0) {
        nookId = nooksData[0].id;
      }

      // 2. Insert reservation
      const { error } = await supabase
        .from('reservations')
        .insert({
          nook_id: nookId,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          reservation_date: date,
          time_slot: timeSlot,
          status: 'confirmed'
        });

      if (error) throw error;

      setSuccess(true);
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while securing your quiet corner.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reserve" className="py-24 bg-[#18191C] border-y border-[#2D3A2E]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest block">archebu cwtch | reserve a nook</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#F7F4EF] font-medium">claim your corner of warmth.</h2>
          <p className="text-sm sm:text-base text-[#F7F4EF]/70 font-light">
            We reserve our fireside nooks for those who wish to read, write, sketch, or share quiet conversations. No pressure, no rush.
          </p>
        </div>

        {/* Nooks Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {nooksList.map((nook, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedNook(nook.name)}
              className={`text-left border transition-all duration-300 rounded-sm overflow-hidden flex flex-col ${
                selectedNook === nook.name
                  ? 'border-[#E5A93C] bg-[#E5A93C]/5 ring-1 ring-[#E5A93C]'
                  : 'border-[#2D3A2E]/40 bg-[#121315]/90 hover:border-[#E5A93C]/40'
              }`}
            >
              <div className="h-44 w-full relative">
                <img 
                  src={nook.image} 
                  alt={nook.name} 
                  className="w-full h-full object-cover filter brightness-[0.85]"
                />
                <div className="absolute top-3 right-3 bg-[#121315]/90 text-xs text-[#E5A93C] font-mono px-2.5 py-1 rounded-sm border border-[#2D3A2E]">
                  {nook.capacity}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#F7F4EF] mb-2">{nook.name}</h4>
                  <p className="text-xs text-[#F7F4EF]/70 font-light mb-3">{nook.atmosphere}</p>
                </div>
                <div className="pt-3 border-t border-[#2D3A2E]/20 text-xs italic text-[#E5A93C]">
                  <strong>Best For:</strong> {nook.bestFor}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Booking & Rules Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Booking Form */}
          <div className="lg:col-span-7 bg-[#121315] border border-[#2D3A2E]/40 p-8 rounded-sm">
            
            {success ? (
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 bg-[#2D3A2E] border border-[#E5A93C] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-[#E5A93C]">✓</span>
                </div>
                
                <h3 className="text-2xl font-serif text-[#E5A93C]">croeso i&apos;r cwtch.</h3>
                
                <div className="text-sm text-[#F7F4EF]/80 space-y-3 max-w-md mx-auto leading-relaxed">
                  <p className="font-serif text-lg">We have saved a seat for you.</p>
                  <p>Your reservation for <strong className="text-[#E5A93C]">{selectedNook}</strong> on <strong className="text-[#E5A93C]">{date}</strong> during the <strong className="text-[#E5A93C]">{timeSlot}</strong> session is confirmed.</p>
                  <p className="text-xs text-[#F7F4EF]/60 italic mt-4">
                    A confirmation email has been dispatched to your inbox. We look forward to welcoming you out of the rain at 12 Heol y Gelli.
                  </p>
                </div>

                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-[#E5A93C] text-[#121315] font-serif hover:bg-[#F7F4EF] transition-colors duration-300"
                >
                  book another session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-6">
                
                {/* Step 1 Choice display */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-2">
                    1. Selected Sanctuary
                  </label>
                  <div className="p-3 bg-[#18191C] border border-[#2D3A2E]/60 text-sm text-[#F7F4EF] font-serif flex justify-between items-center">
                    <span>{selectedNook}</span>
                    <span className="text-xs text-[#E5A93C] font-mono">chosen</span>
                  </div>
                </div>

                {/* Step 2 Calendar Date selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-2">
                    2. Choose a Date
                  </label>
                  <p className="text-xs text-[#F7F4EF]/50 mb-2 font-light">Nooks can be booked up to 14 days in advance.</p>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min="2026-01-01"
                    max="2026-12-31"
                    className="w-full bg-[#18191C] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C] font-mono"
                  />
                </div>

                {/* Step 3 Time slots */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-2">
                    3. Choose an Available Time Slot
                  </label>
                  <p className="text-xs text-[#F7F4EF]/50 mb-3 font-light">Each booking lasts for a generous 90-minute session.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-3 text-xs font-mono rounded-sm border transition-all duration-200 ${
                          timeSlot === slot
                            ? 'bg-[#E5A93C] text-[#121315] border-[#E5A93C]'
                            : 'bg-[#18191C] text-[#F7F4EF]/80 border-[#2D3A2E]/40 hover:border-[#E5A93C]/40'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4 Details */}
                <div className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-1">
                    4. Your Details
                  </label>

                  <div>
                    <span className="block text-xs text-[#F7F4EF]/70 mb-1">Your full name</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Elen Evans"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#18191C] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-[#F7F4EF]/70 mb-1">Your email address</span>
                      <input
                        type="email"
                        required
                        placeholder="e.g., elen@cwtch.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#18191C] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <span className="block text-xs text-[#F7F4EF]/70 mb-1">Your phone number</span>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., 07700 900077"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#18191C] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Box */}
                {errorMsg && (
                  <div className="bg-red-900/20 border border-red-500/40 p-3 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#E5A93C] text-[#121315] font-serif tracking-wide text-center hover:bg-[#F7F4EF] transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Securing your space...' : 'secure my quiet corner'}
                </button>

              </form>
            )}

          </div>

          {/* Right Side: The Rules of the Snug */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121315] border border-[#2D3A2E]/30 p-8 rounded-sm">
              <h3 className="text-xl font-serif text-[#E5A93C] mb-4">keeping the space quiet.</h3>
              <p className="text-sm text-[#F7F4EF]/80 font-light leading-relaxed mb-6">
                To maintain our atmospheric peace, we ask all booking holders to respect our simple guidelines:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-[#E5A93C] mt-1 text-sm">✦</span>
                  <div>
                    <strong className="block text-sm font-serif text-[#F7F4EF]">Keep voices soft</strong>
                    <span className="text-xs text-[#F7F4EF]/75 font-light">Our space is small and sound travels easily. Please speak in quiet tones.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="text-[#E5A93C] mt-1 text-sm">✦</span>
                  <div>
                    <strong className="block text-sm font-serif text-[#F7F4EF]">Silent devices</strong>
                    <span className="text-xs text-[#F7F4EF]/75 font-light">We ask that phones and laptops be kept on silent. No Zoom calls or loud typing.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="text-[#E5A93C] mt-1 text-sm">✦</span>
                  <div>
                    <strong className="block text-sm font-serif text-[#F7F4EF]">Be mindful of the time</strong>
                    <span className="text-xs text-[#F7F4EF]/75 font-light">Your nook is reserved for 90 minutes. We allow a 15-minute transition period between slots to clean and reset the space.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[#2D3A2E]/10 border border-[#2D3A2E]/40 rounded-sm">
              <span className="text-xs font-mono text-[#E5A93C] block uppercase mb-1">Cancellations</span>
              <p className="text-xs text-[#F7F4EF]/70 font-light leading-relaxed">
                If your plans change, please let us know as early as possible so we can offer your nook to another weary traveler looking for warmth from the Welsh elements.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}