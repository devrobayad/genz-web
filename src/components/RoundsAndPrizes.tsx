import React from 'react';
import { Trophy, ShieldCheck, Swords, Award, Smartphone, ArrowRight, Star, Flame } from 'lucide-react';

export default function RoundsAndPrizes() {
  return (
    <div className="bg-zinc-950 text-white py-[70px] px-4 shadow-inner" id="rounds-and-prizes-section">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* 1. Tournament Rounds Section */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 font-sans">
                টুর্নামেন্ট রাউন্ড ও খেলার গতিপথ
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-450 rounded" />
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-4">
              ৬৪ জেলা ফ্রি ফায়ারে রয়েছে বিশেষ ৩টি স্তর। সলো মোড থেকে শুরু করে জেলা ভিত্তিক চূড়ান্ত স্কোয়াড যুদ্ধ!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Round 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 font-mono text-xs font-bold px-3 py-1 rounded-full">
                ধাপ ০১
              </div>
              <div>
                <div className="bg-orange-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center text-orange-500 mb-4">
                  <Swords className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">জেলা ভিত্তিক এলিমিনেশন (Solo)</h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                  প্রথমে প্রতিটি জেলার রেজিস্টার্ড খেলোয়াড়রা নিজ জেলার গ্রুপগুলোতে সলো ম্যাচ খেলবে। এই রাউন্ডটি সম্পূর্ণ সোলো কিলস এবং সারভাইভাল টাইমের ভিত্তিতে রেট করা হবে।
                </p>
              </div>
              <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-500 font-semibold flex items-center gap-1">
                <span>১ম ধাপে সলো প্লে</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            {/* Round 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg ring-1 ring-orange-500/20">
              <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 font-mono text-xs font-bold px-3 py-1 rounded-full">
                ধাপ ০২
              </div>
              <div>
                <div className="bg-orange-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center text-orange-500 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">জেলা দল গঠন (Squad Assembly)</h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                  এলিমিনেশন রাউন্ড রুলস অনুযায়ী প্রতিটা জেলার পয়েন্ট টেবিল থেকে শীর্ষ ৪ জন (Top 4) প্লেয়ারকে নিয়ে তৈরি হবে সেই জেলার একমাত্র অফিশিয়াল স্কোয়াড টিম।
                </p>
              </div>
              <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-500 font-semibold flex items-center gap-1">
                <span>১ জেলা = ১ অফিশিয়াল স্কোয়াড</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            {/* Round 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 font-mono text-xs font-bold px-3 py-1 rounded-full">
                ধাপ ০৩
              </div>
              <div>
                <div className="bg-orange-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center text-orange-500 mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">গ্র্যান্ড ফাইনাল (64 District Clash)</h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                  ৬৪ জেলা থেকে চূড়ান্তভাবে নির্বাচিত মোট ৬৪টি জেলা ভিত্তিক চ্যাম্পিয়ন টিম নিয়ে শুরু হবে মূল গ্র্যান্ড ফাইনাল। এখান থেকেই নির্ধারিত হবে সমগ্র বাংলাদেশের অফিশিয়াল শ্রেষ্ঠ জেলা দল!
                </p>
              </div>
              <div className="border-t border-zinc-800/80 pt-4 mt-6 text-xs text-orange-500 font-semibold flex items-center gap-1">
                <span>চূড়ান্ত চ্যাম্পিয়নশিপ ট্রফি</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

          </div>
        </div>

        {/* 2. Prizes section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 p-6 md:p-10 border border-zinc-800 rounded-3xl" id="prizes-grid">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>টোটাল প্রাইজ মানি</span>
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-orange-400 leading-tight">
              ৩২,০০,০০০+ টাকা গ্র্যান্ড প্রাইজপুল ও পুরষ্কার তালিকা
            </h2>
            <p className="text-zinc-450 text-sm leading-relaxed">
              টুর্নামেন্ট শেষে চ্যাম্পিয়ন জেলা দল, রানার্স-আপ, সর্বোচ্চ স্কোরের ভিত্তিতে ১ম থেকে ৬৪তম স্থান অর্জনকারী এবং টুর্নামেন্টের শীর্ষ ১০ খেলোয়াড় সরাসরি ক্যাশ প্রাইজ পাবেন।
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-350">
                <ShieldCheck className="h-4 w-4 text-orange-500 shrink-0" />
                <span>ম্যাচ শেষ হওয়ার ২৪ ঘণ্টার ভিতর প্রাইজ পেমেন্ট বিকাশ/রকেটে করা হবে।</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-350">
                <ShieldCheck className="h-4 w-4 text-orange-500 shrink-0" />
                <span>টপ রেফারাররা পাবেন ব্র্যান্ড নিউ স্মার্টফোন!</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-zinc-950 border border-orange-500/20 p-5 rounded-2xl flex flex-col justify-between shadow-md shadow-orange-500/5">
              <div>
                <span className="block text-2xl font-black text-orange-500 font-mono">১০,০০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">১ম স্থান (গ্র্যান্ড চ্যাম্পিয়ন)</span>
                <p className="text-xs text-zinc-400 mt-2">চ্যাম্পিয়ন মেডেল, সার্টিফিকেট ও কাস্টমাইজড B64DC গোল্ড ট্রফি ও ১০ লক্ষ টাকা নগদ প্রাইজ মানি।</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="block text-2xl font-black text-zinc-300 font-mono">৫,০০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">২য় স্থান (রানার্স-আপ)</span>
                <p className="text-xs text-zinc-400 mt-2">রানার্স-আপ মেডেল, সিলভার সার্টিফিকেট ও কাস্টম ট্রফি সেট সাথে ৫ লক্ষ টাকা নগদ।</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="block text-2xl font-black text-orange-400 font-mono">২,০০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">৩য় স্থান</span>
                <p className="text-xs text-zinc-400 mt-2">৩য় স্থান অর্জনকারী দলের জন্য ২ লক্ষ টাকা নগদ প্রাইজ মানি ও সম্মাননা মেডেল।</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="block text-2xl font-black text-zinc-400 font-mono">৫০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">৪র্থ থেকে ১০ম স্থান</span>
                <p className="text-xs text-zinc-400 mt-2">৪র্থ হতে ১০ম পজিশনের প্রতিটি দল পাবেন নিশ্চিত ৫০,০০০ টাকা করে ক্যাশ পুরষ্কার।</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="block text-2xl font-black text-zinc-400 font-mono">২০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">১১তম থেকে ৬৪তম স্থান</span>
                <p className="text-xs text-zinc-400 mt-2">অংশগ্রহণকারী অন্যান্য সকল যোগ্য জেলাভিত্তিক দল (১১-৬৪ স্থান) পাবেন ২০,০০০ টাকা করে অফিশিয়াল প্রাইজ।</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="block text-2xl font-black text-amber-500 font-mono">১০,০০০ Tk</span>
                <span className="block text-sm font-bold text-zinc-200 mt-1">শীর্ষ ১০ প্লেয়ার (Top 10 Players)</span>
                <p className="text-xs text-zinc-400 mt-2">টুর্নামেন্টের পারফরম্যান্সের ভিত্তিতে সেরা ১০ জন খেলোয়াড় পাবেন ১০,০০০ টাকা করে বিশেষ পুরষ্কার!</p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Division Quick Rules Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-orange-950/20 to-zinc-900 border border-orange-500/20 rounded-3xl p-6 md:p-8">
          <div>
            <div className="flex items-center gap-1 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="h-4 w-4" />
              <span>সহজ টুর্নামেন্ট নিয়মাবলী</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white">কোয়ালিফাই করতে যে বিষয়গুলো মাথায় রাখবেন:</h3>
            <ul className="mt-4 space-y-2.5 text-xs md:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="bg-orange-500/25 text-orange-400 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold mt-0.5 font-sans">১</span>
                <span>প্রথমে শুধু Solo মোডে খেলতে হবে, যেখানে প্রতি কিল ১ পয়েন্ট এবং প্লেসমেন্ট পয়েন্ট যোগ হবে।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-orange-500/25 text-orange-400 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold mt-0.5 font-sans">২</span>
                <span>সবচেয়ে বেশি কিল এবং সুনিপুণ লিডারবোর্ডের শীর্ষ ৪ জন পাবেন নিজ জেলার স্বপ্নের স্কোয়াডের টিকিট।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-orange-500/25 text-orange-400 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold mt-0.5 font-sans">৩</span>
                <span>কোনো প্রকার টিম-আপ, চিটিং বা ভুল UID প্রদান করলে সরাসরি ডিসকোয়ালিফাই করা হবে।</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
            <h4 className="font-bold text-zinc-100 text-base">যোগাযোগ ও হেল্পডেস্ক (Contact Info)</h4>
            <p className="text-zinc-400 text-xs">যেকোনো জিজ্ঞাসা, পেমেন্ট অথবা UID ভেরিফিকেশন সংক্রান্ত হেল্পের জন্য আমাদের ২৪/৭ সাপোর্ট প্যানেলে যুক্ত থাকুন।</p>
            <div className="space-y-2 text-xs text-zinc-400 font-mono">
              <p className="flex items-center gap-2">
                <strong className="text-white">মোবাইল / বিকাশ:</strong> <span>01723-456789</span>
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-white">ইমেইল:</strong> <span>support@b64dc.com</span>
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-white">ফেসবुक গ্রুপ:</strong> <span className="text-orange-400 underline cursor-pointer">facebook.com/groups/b64dc-official</span>
              </p>
            </div>
            <div className="text-[10px] text-zinc-500">
              * B64DC আয়োজক কর্তৃপক্ষ যেকোনো মূহুর্তে নিয়ম হালনাগাদ করার অধিকার সংরক্ষণ করেন।
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
