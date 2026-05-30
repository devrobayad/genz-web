import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, MapPin, Users, Share2, Hourglass } from 'lucide-react';

export default function CountdownSection() {
  // Live countdown to Grand Final (June 5, 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-05T21:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#090706] py-[70px] px-4 border-y border-zinc-900" id="countdown-dedicated-section">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Countdown card wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/60 border border-zinc-850 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-md">
          {/* Subtle glowing elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Left Col inside Segment: Title, details, status indicator */}
          <div className="lg:col-span-6 space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold text-orange-400 tracking-wider uppercase font-mono">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>Countdown to Grand Finals</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
              গ্র্যান্ড ফাইনাল শুরু হতে আর মাত্র বাকি
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              সারা দেশের বাছাইকৃত প্রতিভাবান জেলার লিজেন্ডারি চ্যাম্পিয়নরা লড়বে চূড়ান্ত যুদ্ধক্ষেত্রে। সময় শেষ হওয়ার পূর্বেই নিজের জেলাকে সমর্থন করতে রেডি থাকুন এবং চমৎকার সব অফার উপভোগ করুন!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-zinc-300">
              <span className="flex items-center gap-2 bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span>তারিখ: ৫ জুন, ২০২৬</span>
              </span>
              <span className="flex items-center gap-2 bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>মোড: Solo & S64 Finals</span>
              </span>
            </div>
          </div>

          {/* Right Col inside Segment: Dynamic Time Panels */}
          <div className="lg:col-span-6 relative z-10">
            <div className="grid grid-cols-4 gap-3 md:gap-4_">
              {[
                { label: 'দিন', value: timeLeft.days, color: 'text-orange-500' },
                { label: 'ঘণ্টা', value: timeLeft.hours, color: 'text-amber-500' },
                { label: 'মিনিট', value: timeLeft.minutes, color: 'text-orange-400' },
                { label: 'সেকেন্ড', value: timeLeft.seconds, color: 'text-amber-440' }
              ].map((time, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 text-center shadow-xl group hover:border-orange-500/30 transition-all duration-300"
                >
                  <span className={`block text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight ${time.color}`}>
                    {String(time.value).padStart(2, '0')}
                  </span>
                  <span className="block text-xs text-zinc-450 font-bold mt-2 tracking-wider uppercase">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tournament Statistic Indicators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-indicator-grids">
          <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 items-center transition-all">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/10">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-black font-mono text-zinc-100">৬৪</span>
              <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">অংশগ্রহণকারী জেলা</span>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 items-center transition-all">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-black font-mono text-zinc-100">১ লাখ+</span>
              <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">সর্বমোট প্রাইজপুল</span>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 items-center transition-all">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-black font-mono text-zinc-100">৫,০০০+</span>
              <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">মোট খেলোয়াড়</span>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 items-center transition-all">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-black font-mono text-zinc-100">১০ টাকা</span>
              <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">প্রতি রেফারেল বোনাস</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
