import React, { useState } from 'react';
import { Share2, Smartphone, Gift, Coins, HelpCircle } from 'lucide-react';

interface ReferralSystemProps {
  onRegisterClick: () => void;
  topReferrers: any[];
}

export default function ReferralSystem({ onRegisterClick, topReferrers }: ReferralSystemProps) {
  const [estimateCount, setEstimateCount] = useState(50);
  
  // Calculate gains
  const earnedCash = estimateCount * 10;
  const isSmartphoneEligible = estimateCount >= 100;

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="referral-system-tab">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Head Segment banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 px-3.5 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-widest border border-orange-500/20 animate-pulse">
            <Share2 className="h-3.5 w-3.5" />
            <span>শেয়ার এন্ড আর্ন স্কিম</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            রেফারেল সিস্টেম ও রিওয়ার্ড হাব
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            বন্ধুদের ইনভাইট করে সহজে ইনকাম করুন নগদ বিকাশ টাকা এবং জিতে নিন আকর্ষণীয় ব্র্যান্ডের স্মার্টফোন!
          </p>
        </div>

        {/* Triple Benefits Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl font-sans" />
            <div>
              <div className="bg-orange-500/10 text-orange-450 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-orange-500/15">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-zinc-100">রেফারার পান ১০ TK বোনাস</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                আপনার রেফারেল কোড ব্যবহার করে কোনো খেলোয়াড় রেজিস্ট্রেশন সম্পন্ন করলেই সাথে সাথে আপনার প্রোফাইল ওয়ালেটে নগদ ১০ টাকা যুক্ত হয়ে যাবে। সরাসরি বিকাশ/নগদে ক্যাশআউট করতে পারবেন!
              </p>
            </div>
            <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-450 font-bold">
              * আনলিমিটেড লাইফটাইম রেফার ইনকাম
            </div>
          </div>

          <div className="bg-zinc-950 md:bg-zinc-900 border border-zinc-805 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-lg ring-1 ring-orange-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl" />
            <div>
              <div className="bg-orange-500/10 text-orange-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-orange-500/15">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-zinc-100">রেজিস্ট্রেশন ফি ১০ TK ছাড়</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                যে খেলোয়াড় আপনার রেফার কোড ব্যবহার করে প্রথমবার টুর্নামেন্টে নিবন্ধন করবেন, তিনি ১০০ টাকার এন্ট্রি ফি-তে সরাসরি ১০ টাকা ডিসকাউন্ট পাবেন। অর্থাৎ মাত্র ৯০ টাকা দিয়ে জয়েন করতে পারবেন!
              </p>
            </div>
            <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-400 font-bold">
              * নতুন সদস্যদের জন্য ইনস্ট্যান্ট ডিসকাউন্ট
            </div>
          </div>

          <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl" />
            <div>
              <div className="bg-orange-500/10 text-orange-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-orange-500/15">
                <Smartphone className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-zinc-100">সাপ্তাহিক স্মার্টফোন পুরষ্কার</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                প্রতি সপ্তাহে শীর্ষ ১০০ জন রেফারকারীর মধ্যে সর্বোচ্চ ৫ জন পাবেন ব্র্যান্ড নিউ মোবাইল ফোন! স্মার্টফোন ক্যাটাগরিতে নাম লেখাতে চলতি সপ্তাহে নূন্যতম ১০০ জন প্লেয়ারকে রেফার করা আবশ্যক।
              </p>
            </div>
            <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-450 font-bold">
              * ১ সপ্তাহে ১০০+ রেফারেল শর্তযোগ্য
            </div>
          </div>

        </div>

        {/* Dynamic Earn Calculator and Slider */}
        <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="referral-calculator">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider block font-mono">EARNING ESTIMATOR</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-zinc-150">ইনকাম ক্যালকুলেটর (Estimator)</h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">স্লাইডারটি ডানে-বামে সরিয়ে আপনার সম্ভাব্য রেফার ইনকাম এবং পুরষ্কারের যোগ্যতা হিসেব করে নিন!</p>
            </div>

            {/* Slider control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-zinc-405">
                <span>১টি রেফারেল = ১০ টাকা</span>
                <span className="font-mono bg-zinc-950 border border-zinc-850 px-2.5 py-1 rounded text-orange-400 font-black text-sm">
                  {estimateCount} জন খেলোয়াড়
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={estimateCount}
                onChange={(e) => setEstimateCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-950 accent-orange-550"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0</span>
                <span>100 (মোবাইল লিমিট)</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 space-y-4">
            
            <div className="flex justify-between items-center border-b border-zinc-850 pb-3">
              <span className="text-xs text-zinc-450">সম্ভাব্য নগদ অর্থ বোনাস:</span>
              <span className="text-2xl font-black text-orange-400 font-mono">{earnedCash} TK</span>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] text-zinc-500 uppercase font-mono block">smartphone contest status:</span>
              
              {isSmartphoneEligible ? (
                <div className="bg-orange-500/10 border border-orange-500/25 p-3 rounded-xl flex items-center gap-2 text-xs text-orange-400 font-sans">
                  <Smartphone className="h-4.5 w-4.5 text-orange-400 shrink-0" />
                  <div>
                    <span className="block font-black">স্মার্টফোনের শর্ত পূরণ হয়েছে!</span>
                    <span className="block text-[10px] text-zinc-400 text-opacity-80">আপনি চলতি সপ্তাহের প্রতিযোগিতার জন্য যোগ্য। যদি আপনি টপ ৫ এ থাকেন তবে একটি স্মার্টফোন নিশ্চিত।</span>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-950/20 border border-orange-500/20 p-3 rounded-xl flex items-center gap-2 text-xs text-orange-400/80 font-sans">
                  <HelpCircle className="h-4.5 w-4.5 shrink-0 text-orange-500" />
                  <div>
                    <span className="block font-bold">স্মার্টফোনের উপযুক্ততা অর্জন করতে:</span>
                    <span className="block text-[10px] text-zinc-500">আরও <strong className="text-orange-400 font-mono">{100 - estimateCount}</strong> টি সফল রেফারেল লাগবে ফোন ক্যাম্পেইনে অংশ নিতে।</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onRegisterClick}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
            >
              রেজিস্ট্রেশন করে ইউনিক কোড নিন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
