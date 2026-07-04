'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Types matching database schema
interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  time_slot: string;
  status: string;
  nook_id: string;
}

interface MenuItem {
  id: string;
  name_en: string;
  name_cy: string;
  category: string;
  description_en: string;
  description_cy: string;
  price: number;
  is_available: boolean;
  is_seasonal: boolean;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_resolved: boolean;
  created_at: string;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'enquiries'>('reservations');

  // New Menu Item form fields
  const [newItemEn, setNewItemEn] = useState('');
  const [newItemCy, setNewItemCy] = useState('');
  const [newCategory, setNewCategory] = useState('drinks');
  const [newPrice, setNewPrice] = useState('3.50');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescCy, setNewDescCy] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSeasonal, setIsSeasonal] = useState(false);

  const [menuMsg, setMenuMsg] = useState('');

  // Fetch all data
  async function loadAllData() {
    setLoading(true);
    try {
      // Load Reservations
      const { data: resData } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true });
      if (resData) setReservations(resData);

      // Load Menu Items
      const { data: menuData } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: false });
      if (menuData) setMenuItems(menuData);

      // Load Enquiries
      const { data: enqData } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (enqData) setEnquiries(enqData);

    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle Cancel Reservation
  async function cancelReservation(id: string) {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id);
      if (error) throw error;
      loadAllData();
    } catch (err) {
      alert('Error cancelling reservation');
    }
  }

  // Handle Toggle Enquiry Resolution
  async function toggleEnquiry(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ is_resolved: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      loadAllData();
    } catch (err) {
      alert('Error updating enquiry');
    }
  }

  // Handle Add Menu Item
  async function handleAddMenuItem(e: React.FormEvent) {
    e.preventDefault();
    setMenuMsg('');
    try {
      const { error } = await supabase
        .from('menu_items')
        .insert({
          name_en: newItemEn,
          name_cy: newItemCy,
          category: newCategory,
          price: parseFloat(newPrice),
          description_en: newDescEn,
          description_cy: newDescCy,
          is_available: isAvailable,
          is_seasonal: isSeasonal
        });

      if (error) throw error;

      setMenuMsg('Item published successfully!');
      // Reset form
      setNewItemEn('');
      setNewItemCy('');
      setNewDescEn('');
      setNewDescCy('');
      loadAllData();
    } catch (err: any) {
      setMenuMsg(`Error: ${err.message}`);
    }
  }

  // Handle Delete Menu Item
  async function deleteMenuItem(id: string) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      loadAllData();
    } catch (err) {
      alert('Error deleting menu item');
    }
  }

  return (
    <div className="min-h-screen bg-[#121315] text-[#F7F4EF]">
      {/* Dashboard Top Navigation */}
      <div className="bg-[#18191C] border-b border-[#2D3A2E]/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-[#E5A93C]">croeso adref, host.</h1>
            <p className="text-xs font-mono text-[#F7F4EF]/60">Manage your sanctuary&apos;s bookings, menu, and incoming messages.</p>
          </div>
          <a
            href="/"
            className="text-xs font-mono px-4 py-2 border border-[#E5A93C]/40 text-[#E5A93C] hover:bg-[#E5A93C] hover:text-[#121315] transition-all duration-300"
          >
            ← View Site
          </a>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          
          <div className="bg-[#18191C] p-5 border border-[#2D3A2E]/30 rounded-sm">
            <span className="text-xs font-mono text-[#E5A93C] uppercase">Bookings Count</span>
            <span className="block text-3xl font-serif text-[#F7F4EF] mt-1">{reservations.length}</span>
            <span className="text-[10px] text-[#F7F4EF]/50 block mt-1">total active reservations</span>
          </div>

          <div className="bg-[#18191C] p-5 border border-[#2D3A2E]/30 rounded-sm">
            <span className="text-xs font-mono text-[#E5A93C] uppercase">Pending Enquiries</span>
            <span className="block text-3xl font-serif text-[#F7F4EF] mt-1">
              {enquiries.filter(e => !e.is_resolved).length}
            </span>
            <span className="text-[10px] text-[#F7F4EF]/50 block mt-1">unresolved community messages</span>
          </div>

          <div className="bg-[#18191C] p-5 border border-[#2D3A2E]/30 rounded-sm">
            <span className="text-xs font-mono text-[#E5A93C] uppercase">Menu Items</span>
            <span className="block text-3xl font-serif text-[#F7F4EF] mt-1">{menuItems.length}</span>
            <span className="text-[10px] text-[#F7F4EF]/50 block mt-1">active dishes and drinks</span>
          </div>

          <div className="bg-[#18191C] p-5 border border-[#2D3A2E]/30 rounded-sm">
            <span className="text-xs font-mono text-[#E5A93C] uppercase">Hearth Flame</span>
            <span className="block text-lg font-mono text-emerald-500 mt-2 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Active Snug
            </span>
            <span className="text-[10px] text-[#F7F4EF]/50 block mt-1">Status: Burning Bright</span>
          </div>

        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#2D3A2E]/40 mb-8 space-x-2">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3 px-6 text-sm font-serif transition-colors duration-200 ${
              activeTab === 'reservations'
                ? 'border-b-2 border-[#E5A93C] text-[#E5A93C] font-semibold'
                : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
            }`}
          >
            Reservations
          </button>
          
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-6 text-sm font-serif transition-colors duration-200 ${
              activeTab === 'menu'
                ? 'border-b-2 border-[#E5A93C] text-[#E5A93C] font-semibold'
                : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
            }`}
          >
            Bwydlen (Menu Manager)
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 px-6 text-sm font-serif transition-colors duration-200 ${
              activeTab === 'enquiries'
                ? 'border-b-2 border-[#E5A93C] text-[#E5A93C] font-semibold'
                : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
            }`}
          >
            Enquiry Hub
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-20 text-sm font-mono text-[#F7F4EF]/60">
            Refreshing sanctuary files...
          </div>
        ) : (
          <div>
            
            {/* RESERVATIONS TAB */}
            {activeTab === 'reservations' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-serif text-[#F7F4EF]">upcoming reservations</h3>
                  <button 
                    onClick={loadAllData}
                    className="text-xs font-mono text-[#E5A93C] hover:underline"
                  >
                    [Refresh Bookings]
                  </button>
                </div>

                <div className="overflow-x-auto border border-[#2D3A2E]/30 rounded-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#18191C] border-b border-[#2D3A2E]/40 font-mono text-xs text-[#E5A93C] uppercase">
                        <th className="p-4">Date</th>
                        <th className="p-4">Time Slot</th>
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D3A2E]/20 text-sm">
                      {reservations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-[#F7F4EF]/50 font-mono italic">
                            No reservations found yet.
                          </td>
                        </tr>
                      ) : (
                        reservations.map((res) => (
                          <tr key={res.id} className="hover:bg-[#18191C]/50">
                            <td className="p-4 font-mono font-medium text-[#F7F4EF]">{res.reservation_date}</td>
                            <td className="p-4 font-mono text-xs text-[#E5A93C]">{res.time_slot}</td>
                            <td className="p-4 font-serif text-base">{res.customer_name}</td>
                            <td className="p-4 text-xs">
                              <div className="text-[#F7F4EF]">{res.customer_email}</div>
                              <div className="text-[#F7F4EF]/60 font-mono mt-0.5">{res.customer_phone}</div>
                            </td>
                            <td className="p-4 text-xs">
                              <span className="inline-block px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] uppercase">
                                ● Confirmed
                              </span>
                            </td>
                            <td className="p-4 text-right text-xs">
                              <button
                                onClick={() => cancelReservation(res.id)}
                                className="px-3 py-1 bg-red-950/80 border border-red-500/40 text-red-200 hover:bg-red-900/60 transition-colors"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MENU TAB */}
            {activeTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Add New Item Form */}
                <div className="lg:col-span-5 bg-[#18191C] border border-[#2D3A2E]/30 p-6 rounded-sm">
                  <h4 className="text-lg font-serif text-[#E5A93C] mb-6 border-b border-[#2D3A2E]/30 pb-2">
                    + Add New Menu Item
                  </h4>

                  <form onSubmit={handleAddMenuItem} className="space-y-4 text-sm">
                    <div>
                      <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Item Name (English)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Classic Sourdough Toast"
                        value={newItemEn}
                        onChange={(e) => setNewItemEn(e.target.value)}
                        className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Item Name (Welsh)</label>
                      <input
                        type="text"
                        placeholder="e.g., Tost Sourdough Clasurol"
                        value={newItemCy}
                        onChange={(e) => setNewItemCy(e.target.value)}
                        className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                        >
                          <option value="drinks">Drinks</option>
                          <option value="bakes">Bakes</option>
                          <option value="specials">Specials</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Price (£)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Description (English)</label>
                      <textarea
                        rows={2}
                        placeholder="Toasted daily, served with salted butter"
                        value={newDescEn}
                        onChange={(e) => setNewDescEn(e.target.value)}
                        className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F7F4EF]/70 mb-1">Description (Welsh)</label>
                      <textarea
                        rows={2}
                        placeholder="Wedi'i dostio'n ddyddiol, wedi'i weini â menyn hallt"
                        value={newDescCy}
                        onChange={(e) => setNewDescCy(e.target.value)}
                        className="w-full bg-[#121315] border border-[#2D3A2E]/60 rounded-sm p-2.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div className="flex items-center space-x-6 pt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAvailable}
                          onChange={(e) => setIsAvailable(e.target.checked)}
                          className="rounded bg-[#121315] border-[#2D3A2E] text-[#E5A93C] focus:ring-0"
                        />
                        <span className="text-xs text-[#F7F4EF]/80 font-mono">Is Available</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSeasonal}
                          onChange={(e) => setIsSeasonal(e.target.checked)}
                          className="rounded bg-[#121315] border-[#2D3A2E] text-[#E5A93C] focus:ring-0"
                        />
                        <span className="text-xs text-[#F7F4EF]/80 font-mono">Seasonal Special</span>
                      </label>
                    </div>

                    {menuMsg && (
                      <div className="bg-[#2D3A2E]/40 border border-[#E5A93C]/30 p-3 text-xs text-[#F7F4EF]">
                        {menuMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#E5A93C] text-[#121315] font-serif hover:bg-[#F7F4EF] transition-colors"
                    >
                      publish updates to public menu
                    </button>
                  </form>
                </div>

                {/* Existing Menu Items list */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-lg font-serif text-[#F7F4EF] mb-2">update the bwydlen</h4>
                  
                  <div className="space-y-3">
                    {menuItems.length === 0 ? (
                      <div className="p-8 text-center bg-[#18191C] border border-[#2D3A2E]/20 text-xs font-mono text-[#F7F4EF]/40">
                        No custom items in database yet. Showing default system bakes/drinks.
                      </div>
                    ) : (
                      menuItems.map((item) => (
                        <div key={item.id} className="bg-[#18191C] border border-[#2D3A2E]/30 p-4 rounded-sm flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-[#E5A93C] uppercase px-1.5 py-0.5 bg-[#121315]">
                                {item.category}
                              </span>
                              {item.is_seasonal && (
                                <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.5 border border-amber-500/30">
                                  Seasonal
                                </span>
                              )}
                            </div>
                            <h5 className="font-serif text-base text-[#F7F4EF]">{item.name_en}</h5>
                            <p className="text-xs italic text-[#E5A93C]/80">{item.name_cy}</p>
                            <p className="text-xs text-[#F7F4EF]/60 leading-relaxed max-w-md">{item.description_en}</p>
                          </div>
                          
                          <div className="text-right space-y-3">
                            <span className="block font-mono text-sm text-[#F7F4EF] font-semibold">
                              £{Number(item.price).toFixed(2)}
                            </span>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="text-xs font-mono text-red-400 hover:text-red-300 hover:underline block ml-auto"
                            >
                              [Delete]
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-[#F7F4EF]">incoming community messages</h3>

                <div className="space-y-4">
                  {enquiries.length === 0 ? (
                    <div className="p-12 text-center bg-[#18191C] border border-[#2D3A2E]/20 text-xs font-mono text-[#F7F4EF]/40">
                      No incoming gatherings or enquiries yet.
                    </div>
                  ) : (
                    enquiries.map((enq) => (
                      <div 
                        key={enq.id} 
                        className={`p-6 border rounded-sm transition-all duration-300 ${
                          enq.is_resolved 
                            ? 'bg-[#18191C]/50 border-[#2D3A2E]/20 opacity-70' 
                            : 'bg-[#18191C] border-[#E5A93C]/30 shadow-lg'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                          <div>
                            <span className="text-xs font-mono text-[#E5A93C] block">
                              Received {new Date(enq.created_at).toLocaleDateString() || 'Recently'}
                            </span>
                            <h4 className="font-serif text-lg text-[#F7F4EF] mt-0.5">
                              {enq.name} <span className="text-xs font-mono text-[#F7F4EF]/50">({enq.email})</span>
                            </h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase ${
                              enq.is_resolved 
                                ? 'bg-[#2D3A2E]/30 text-[#F7F4EF]/50' 
                                : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                            }`}>
                              {enq.is_resolved ? 'Resolved' : 'Unresolved'}
                            </span>
                            
                            <button
                              onClick={() => toggleEnquiry(enq.id, enq.is_resolved)}
                              className="text-xs font-mono px-3 py-1 bg-[#121315] hover:bg-[#2D3A2E] text-[#F7F4EF] border border-[#2D3A2E]/40"
                            >
                              {enq.is_resolved ? 'Mark Unresolved' : 'Mark Resolved'}
                            </button>
                          </div>
                        </div>

                        <div className="bg-[#121315] p-4 text-xs sm:text-sm text-[#F7F4EF]/80 font-mono whitespace-pre-wrap rounded-sm border border-[#2D3A2E]/20">
                          <strong>Subject:</strong> {enq.subject || 'General Enquiry'}<br/><br/>
                          {enq.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}