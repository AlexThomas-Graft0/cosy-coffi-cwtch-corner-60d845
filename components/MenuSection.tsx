'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

export function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category', { ascending: false })
          .order('name_en', { ascending: true });

        if (error) throw error;
        if (data) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Filtered lists for fallback if database query is empty or failed
  const defaultDrinks = [
    {
      name_en: 'Flat White',
      name_cy: 'Coffi Flat',
      price: 3.60,
      description_en: 'A double shot of our house espresso, smoothed with velvet-textured organic Welsh milk. (Oat milk available on request).',
      description_cy: 'Ergyd ddwbl o espresso y tŷ, wedi ei lyfnhau gyda llaeth Cymreig organig melfedaidd.'
    },
    {
      name_en: 'Spiced Bara Brith Latte',
      name_cy: 'Latte Bara Brith Sbeislyd',
      price: 4.20,
      description_en: "Our signature seasonal drink. Espresso infused with warm notes of nutmeg, cinnamon, dried fruit, and brown sugar syrup, mimicking the flavor of Wales' favorite tea loaf.",
      description_cy: 'Espresso wedi ei drwytho â nodau cynnes o nytmeg, sinamon, ffrwythau sych, a surop siwgr brown.'
    },
    {
      name_en: 'Welsh Brew Tea',
      name_cy: 'Te Cymreig',
      price: 2.80,
      description_en: 'A traditional, comforting pot of strong black tea, served in a heavy clay pot with a splash of fresh milk.',
      description_cy: 'Potel draddodiadol o de du cryf, wedi ei weini mewn pot clai trwm gyda sblash o laeth ffres.'
    },
    {
      name_en: 'Dandelion & Honey Infusion',
      name_cy: 'Trwyth Dant y Llew a Mêl',
      price: 3.50,
      description_en: 'A soothing, caffeine-free herbal blend made with local wild dandelion root and a generous spoonful of raw Cardiff honey.',
      description_cy: 'Blended llysieuol tawel, heb gaffein, wedi ei wneud â gwraidd dant y llew gwyllt a llwy fawr o fêl Caerdydd.'
    }
  ];

  const defaultBakes = [
    {
      name_en: 'Traditional Welsh Cakes',
      name_cy: 'Picau ar y Maen',
      price: 2.50,
      description_en: 'Griddled fresh on our hotplate every morning. Served warm, dusted with fine sugar, and accompanied by salted Welsh butter.',
      description_cy: 'Wedi eu pobi yn ffres ar y maen bob bore. Gweinir yn gynnes gyda siwgr mân a menyn hallt Cymreig.'
    },
    {
      name_en: 'Thick Slice of Bara Brith',
      name_cy: 'Sleisen o Fara Brith',
      price: 3.20,
      description_en: 'Our family-recipe fruit loaf, soaked overnight in strong Welsh tea and packed with rich raisins. Best enjoyed with a hot cup of black coffee.',
      description_cy: 'Ein torth ffrwythau teuluol, wedi ei socian dros nos mewn te Cymreig cryf ac yn llawn rhesins.'
    },
    {
      name_en: 'Salted Honey & Oat Tart',
      name_cy: 'Tarten Fêl Halenog ac Ceirch',
      price: 4.00,
      description_en: 'A crisp pastry shell filled with a rich, salted honey custard and topped with toasted organic oats.',
      description_cy: 'Cragen grimp wedi ei llenwi â chwstard mêl hallt cyfoethog ac wedi ei thoppio â cheirch organig wedi eu tostio.'
    }
  ];

  // Map database items if loaded
  const dbDrinks = items.filter(i => i.category.toLowerCase().includes('drink') || i.category.toLowerCase().includes('special'));
  const dbBakes = items.filter(i => i.category.toLowerCase().includes('bake'));

  const drinksToDisplay = dbDrinks.length > 0 ? dbDrinks.map(i => ({
    name_en: i.name_en,
    name_cy: i.name_cy || '',
    price: Number(i.price),
    description_en: i.description_en || '',
    description_cy: i.description_cy || ''
  })) : defaultDrinks;

  const bakesToDisplay = dbBakes.length > 0 ? dbBakes.map(i => ({
    name_en: i.name_en,
    name_cy: i.name_cy || '',
    price: Number(i.price),
    description_en: i.description_en || '',
    description_cy: i.description_cy || ''
  })) : defaultBakes;

  return (
    <section id="menu" className="py-24 bg-[#121315] relative">
      {/* Soft background glow */}
      <div className="absolute left-1/4 top-1/3 w-[350px] h-[350px] bg-[#E5A93C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest block">bwydlen | menu</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#F7F4EF] font-medium">simple, seasonal, and local.</h2>
          <p className="text-sm sm:text-base text-[#F7F4EF]/70 font-light">
            Everything we serve is prepared slowly, with care, using ingredients sourced from Welsh soil.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: Hot Drinks */}
          <div>
            <div className="border-b border-[#2D3A2E] pb-4 mb-8 flex justify-between items-end">
              <h3 className="text-2xl font-serif text-[#F7F4EF] font-medium">Diodydd Poeth</h3>
              <span className="text-xs font-mono text-[#E5A93C] tracking-widest uppercase">Hot Drinks</span>
            </div>

            <div className="space-y-8">
              {drinksToDisplay.map((item, index) => (
                <div key={index} className="group pb-6 border-b border-[#2D3A2E]/20 last:border-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-lg font-serif text-[#F7F4EF] group-hover:text-[#E5A93C] transition-colors duration-200">
                        {item.name_en}
                      </h4>
                      {item.name_cy && (
                        <p className="text-xs font-mono text-[#E5A93C]/80 lowercase">
                          {item.name_cy}
                        </p>
                      )}
                    </div>
                    <span className="text-base font-mono text-[#F7F4EF]/90 font-medium">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>
                  {item.description_en && (
                    <p className="mt-2 text-xs sm:text-sm text-[#F7F4EF]/70 font-light leading-relaxed">
                      {item.description_en}
                    </p>
                  )}
                  {item.description_cy && (
                    <p className="mt-1 text-xs italic text-[#F7F4EF]/40 font-light">
                      {item.description_cy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Artisan Bakes */}
          <div>
            <div className="border-b border-[#2D3A2E] pb-4 mb-8 flex justify-between items-end">
              <h3 className="text-2xl font-serif text-[#F7F4EF] font-medium">Cacen ac Crand</h3>
              <span className="text-xs font-mono text-[#E5A93C] tracking-widest uppercase">Artisan Bakes</span>
            </div>

            <div className="space-y-8">
              {bakesToDisplay.map((item, index) => (
                <div key={index} className="group pb-6 border-b border-[#2D3A2E]/20 last:border-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-lg font-serif text-[#F7F4EF] group-hover:text-[#E5A93C] transition-colors duration-200">
                        {item.name_en}
                      </h4>
                      {item.name_cy && (
                        <p className="text-xs font-mono text-[#E5A93C]/80 lowercase">
                          {item.name_cy}
                        </p>
                      )}
                    </div>
                    <span className="text-base font-mono text-[#F7F4EF]/90 font-medium">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>
                  {item.description_en && (
                    <p className="mt-2 text-xs sm:text-sm text-[#F7F4EF]/70 font-light leading-relaxed">
                      {item.description_en}
                    </p>
                  )}
                  {item.description_cy && (
                    <p className="mt-1 text-xs italic text-[#F7F4EF]/40 font-light">
                      {item.description_cy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dietary Note Footer */}
        <div className="mt-16 p-6 bg-[#18191C] border border-[#2D3A2E]/30 text-center max-w-3xl mx-auto rounded-sm">
          <p className="text-xs sm:text-sm text-[#F7F4EF]/80 font-light leading-relaxed">
            All of our bakes can be made gluten-free or vegan upon request. Please let our host know of any allergies before placing your order. We are proud to use organic, pasture-raised Welsh dairy.
          </p>
        </div>

      </div>
    </section>
  );
}