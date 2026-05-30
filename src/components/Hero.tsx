import React from 'react';
import { Share2, Flame, Swords, ArrowRight } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreMatches: () => void;
  onReferralClick: () => void;
}

export default function Hero({ onRegisterClick, onExploreMatches, onReferralClick }: HeroProps) {
  return (
    <div 
      className="relative bg-[#0c0a09] text-white overflow-hidden py-[70px] px-4 min-h-[500px] flex flex-col justify-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `linear-gradient(to right, #0c0a09 0%, #0c0a09 45%, rgba(12, 10, 9, 0.8) 70%, rgba(12, 10, 9, 0.4) 100%), url('/src/assets/images/action_player_bg_1780093698032.png')` }}
      id="home-hero-section"
    >
      
      {/* Absolute Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Main Hero Header and Overlay Spaced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Grid: Key Pitch & Headings with dark drop shadows for readability */}
          <div className="lg:col-span-8 space-y-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-950/40 border border-orange-500/40 text-orange-400 rounded-full text-xs font-semibold uppercase tracking-wider animate-bounce backdrop-blur-sm">
              <Flame className="h-4 w-4 fill-current text-orange-500 animate-pulse" />
              <span>ইতিহাসের বৃহত্তম ফ্রি ফায়ার টুর্নামেন্ট</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="block text-zinc-100 font-sans">বাংলাদেশ ৬৪ জেলা</span>
              <span className="block mt-1 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                ফ্রি ফায়ার টুর্নামেন্ট ২০২৬
              </span>
            </h1>

            <p className="text-zinc-200 text-base md:text-lg max-w-2xl leading-relaxed">
              খেলুন একদম সলো মোডে আপনার নিজ জেলার সম্মান রক্ষার্থে! প্রতি জেলা থেকে বাছাইকৃত সেরা ৪ জন খেলোয়াড় মিলে একটি দল গঠন করবে। সর্বমোট ৬৪ জেলা থেকে ৬৪টি টিম লড়বে মহাকাব্যিক গ্র্যান্ড ফাইনালে!
            </p>

            <div className="p-4 bg-zinc-950/85 border border-zinc-800/80 rounded-2xl flex flex-wrap gap-4 items-center max-w-xl backdrop-blur-md">
              <div className="flex -space-x-3 overflow-hidden">
                <span className="inline-block h-9 w-9 rounded-full ring-2 ring-zinc-900 bg-orange-600 flex items-center justify-center font-bold text-xs text-white">BD</span>
                <span className="inline-block h-9 w-9 rounded-full ring-2 ring-zinc-900 bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">64</span>
                <span className="inline-block h-9 w-9 rounded-full ring-2 ring-zinc-900 bg-amber-600 flex items-center justify-center font-bold text-xs text-white">FF</span>
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-orange-400">এন্ট্রি ফি মাত্র ১০০ টাকা</p>
                <p className="text-zinc-300">১০০% ক্যাশব্যাক কুপন সাথে সাথে পেয়ে যাবেন!</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm md:text-base rounded-xl cursor-pointer shadow-xl shadow-orange-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Swords className="h-5 w-5" />
                <span>রেজিস্ট্রেশন করুন</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onExploreMatches}
                className="px-6 py-3.5 bg-zinc-900/90 hover:bg-zinc-850/90 backdrop-blur-sm border border-zinc-800 text-white font-bold text-sm md:text-base rounded-xl transition"
              >
                ম্যাচ শিডিউল
              </button>
              <button
                onClick={onReferralClick}
                className="px-6 py-3.5 bg-orange-950/40 hover:bg-orange-950/60 backdrop-blur-sm border border-orange-500/30 text-orange-300 font-bold text-sm md:text-base rounded-xl flex items-center gap-2 transition"
              >
                <Share2 className="h-4 w-4" />
                <span>রেফারেল ও স্মার্টফোন অফার</span>
              </button>
            </div>
          </div>

          {/* Right Col is kept spacious for background transparency and beauty */}
          <div className="lg:col-span-4 hidden lg:block" />

        </div>

      </div>
    </div>
  );
}
