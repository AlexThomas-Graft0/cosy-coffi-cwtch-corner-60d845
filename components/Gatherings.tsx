'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function Gatherings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Book Club');
  const [guestCount, setGuestCount] = useState('');
  const [details, setDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleEnquiry(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const fullMessage = `Event Type: ${eventType}\nExpected Guests: ${guestCount}\n\nDetails:\n${details}`;
      
      const { error } = await supabase
        .from('enquiries')
        .insert({
          name,
          email,
          subject: `Gathering Enquiry: ${eventType}`,
          message: fullMessage,
          is_resolved: false
        });

      if (error) throw error;

      setSuccess(true);
      setName('');
      setEmail('');
      setGuestCount('');
      setDetails('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="gatherings" className="py-24 bg-[#121315] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest block">cyfarfodydd | gatherings</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#F7F4EF] font-medium">gather by the hearth.</h2>
          <p className="text-sm sm:text-base text-[#F7F4EF]/70 font-light">
            Our space is available for quiet community gatherings, acoustic circles, and literary circles after twilight.
          </p>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Gatherings list & details */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-[#E5A93C] font-medium">Event Formats We Welcome</h3>
              
              <div className="space-y-4">
                <div className="border-l-2 border-[#2D3A2E] pl-4 py-1">
                  <h4 className="text-lg font-serif text-[#F7F4EF]">Llenyddiaeth (Literature & Book Clubs)</h4>
                  <p className="text-sm text-[#F7F4EF]/70 font-light mt-1">
                    Gather your reading circle around the fireplace. We can provide continuous pots of tea and warm Welsh cakes.
                  </p>
                </div>

                <div className="border-l-2 border-[#2D3A2E] pl-4 py-1">
                  <h4 className="text-lg font-serif text-[#F7F4EF]">Cerddoriaeth (Acoustic Sessions)</h4>
                  <p className="text-sm text-[#F7F4EF]/70 font-light mt-1">
                    Soft, unplugged acoustic music, poetry readings, or spoken word performances.
                  </p>
                </div>

                <div className="border-l-2 border-[#2D3A2E] pl-4 py-1">
                  <h4 className="text-lg font-serif text-[#F7F4EF]">Cymuned (Community Meetups)</h4>
                  <p className="text-sm text-[#F7F4EF]/70 font-light mt-1">
                    Language meetups (especially Welsh learners!), craft circles, and slow-living workshops.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-[#18191C] border border-[#2D3A2E]/30 p-6 rounded-sm space-y-6">
              <h4 className="text-lg font-serif text-[#E5A93C] font-medium">Gatherings FAQ</h4>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h5 className="font-serif text-[#F7F4EF] font-medium">Can we bring our own food and drink?</h5>
                  <p className="text-[#F7F4EF]/70 font-light mt-1">
                    We do not permit outside food or drink, but we are happy to customize a menu of our local coffees, teas, seasonal lattes, and artisan Welsh bakes specifically for your event.
                  </p>
                </div>

                <div>
                  <h5 className="font-serif text-[#F7F4EF] font-medium">Is there a fee to book the space?</h5>
                  <p className="text-[#F7F4EF]/70 font-light mt-1">
                    For community groups, book clubs, and Welsh language meetups, we offer sliding-scale rates or simple minimum-spend options. For private bookings, please fill out our enquiry form.
                  </p>
                </div>

                <div>
                  <h5 className="font-serif text-[#F7F4EF] font-medium">What is the maximum capacity of the cafe?</h5>
                  <p className="text-[#F7F4EF]/70 font-light mt-1">
                    To keep the space comfortable and intimate, we cap evening gatherings at 20 guests.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Enquiry Form */}
          <div className="lg:col-span-6 bg-[#18191C] border border-[#2D3A2E]/40 p-8 rounded-sm">
            
            {success ? (
              <div className="space-y-6 text-center py-12">
                <div className="w-16 h-16 bg-[#2D3A2E] border border-[#E5A93C] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-[#E5A93C]">✓</span>
                </div>
                
                <h3 className="text-2xl font-serif text-[#E5A93C]">your message has reached the hearth.</h3>
                
                <p className="text-sm text-[#F7F4EF]/80 max-w-md mx-auto leading-relaxed">
                  Diolch yn fawr! We’ve received your gathering enquiry. Our team reads every message carefully and will reach back out to you within two days to help plan your event.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-[#E5A93C] text-[#121315] font-serif hover:bg-[#F7F4EF] transition-colors duration-300"
                >
                  send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="space-y-6">
                <h3 className="text-2xl font-serif text-[#F7F4EF] font-medium">tell us about your gathering</h3>
                
                <div>
                  <label className="block text-xs font-mono uppercase text-[#E5A93C] mb-1">Your name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dylan Thomas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#E5A93C] mb-1">Your email address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., dylan@hearth.wales"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E5A93C] mb-1">Event Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                    >
                      <option value="Book Club">Book Club</option>
                      <option value="Acoustic Performance">Acoustic Performance</option>
                      <option value="Language Meetup">Language Meetup</option>
                      <option value="Private Celebration">Private Celebration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E5A93C] mb-1">Expected Guests (Max 20)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 12"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#E5A93C] mb-1">Details & Requirements</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="e.g., We are a local Welsh-learning group looking to meet on a Tuesday evening for conversation and tea..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-3 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                {errorMsg && (
                  <div className="bg-red-900/20 border border-red-500/40 p-3 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#E5A93C] text-[#121315] font-serif tracking-wide hover:bg-[#F7F4EF] transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'sending your request...' : 'send my gathering request'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}