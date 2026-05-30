import React from 'react';
import { ShieldCheck, Users, Target, Trophy, Swords, Award } from 'lucide-react';

export function AboutTab() {
  return (
    <div className="bg-[#0c0a09] text-white py-12 px-4 min-h-screen" id="about-page-tab">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Head */}
        <div className="text-center border-b border-zinc-800 pb-8">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC MISSION</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            আমাদের টুর্নামেন্ট সম্পর্কে
          </h1>
          <p className="text-zinc-400 text-sm mt-3 max-w-2xl mx-auto">
            দেশের সবচেয়ে প্রশংসিত এবং রোমাঞ্চকর উইকেন্ড ই-স্পোর্টস কার্নিভাল। ৬৪ জেলার সুপ্ত প্রতিভাদের বিশ্বের দরবারে মেলে ধরাই আমাদের একমাত্র লক্ষ্য।
          </p>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="bg-orange-500/10 text-orange-500 w-11 h-11 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">উদ্যেশ্য ও লক্ষ্য</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                বাংলাদেশে ফ্রি ফায়ার ইমিটেশন গেমিং অনেক জনপ্রিয় হলেও প্রত্যন্ত অঞ্চলের প্লেয়াররা কোনো বড় প্ল্যাটফর্ম পান না। এই টুর্নামেন্টের মাধ্যমে আমরা ৬৪ জেলার প্রতি বর্গমাইলের সেরা প্লেয়ারদের খুঁজে আনবো এবং প্রতিটি জেলাকে একটি স্বাধীন চ্যাম্পিয়নশিপ দল আকারে সম্মানিত করবো।
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="bg-orange-500/10 text-orange-400 w-11 h-11 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">জেলা চ্যাম্পিয়ন স্কোয়াড</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                ঐতিহ্যবাহী সলো এলিমিনেশনে টিকে থাকার পর প্রতিটি জেলার প্রথম ৪ জন প্লেয়ারকে নিয়ে তৈরি হবে অফিশিয়াল জেলাভিত্তিক স্কোয়াড। যারা একে অপরের চরম প্রতিদ্বন্দ্বী ছিলো, তারা তখন নিজের জেলার মান বাঁচাতে কাঁধে কাঁধ মিলিয়ে খেলবে গ্র্যান্ড ফাইনাল।
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white text-center">টুর্নামেন্টের পূর্ণ লাইফসাইকেল</h3>
          
          <div className="relative border-l-2 border-orange-500/30 ml-4 md:ml-12 space-y-8 py-4">
            
            <div className="relative pl-6 md:pl-10">
              <span className="absolute -left-3 top-0 bg-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black ring-4 ring-[#0c0a09]">১</span>
              <h4 className="font-bold text-orange-500 text-sm md:text-base">নিবন্ধন ও ফি প্রদান (Registration)</h4>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                ১০০ টাকা অফিশিয়াল নিবন্ধন ফি দিয়ে যেকোনো ভেরিফাইড বাংলাদেশী ইউজার আমাদের পোর্টালে যুক্ত হতে পারেন। যোগ দেওয়ার পর সঙ্গে সঙ্গে পাবেন ১০০ টাকার রিডিম্যাবল ক্যাশ কুপন।
              </p>
            </div>

            <div className="relative pl-6 md:pl-10">
              <span className="absolute -left-3 top-0 bg-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black ring-4 ring-[#0c0a09]">২</span>
              <h4 className="font-bold text-zinc-100 text-sm md:text-base">নিজ জেলায় Solo যুদ্ধ (District Selection)</h4>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                সলো কোয়ালিফায়ারে নিজ নিজ জেলা অনুযায়ী প্লেমেন্ট পয়েন্ট ও কিলস পয়েন্ট তাড়া করার যুদ্ধ। ৬৪ জেলাতে পর্যায়ক্রমে ৬০ জন প্লেয়ারের কাস্টম রুমে যুদ্ধ অনুষ্ঠিত হবে।
              </p>
            </div>

            <div className="relative pl-6 md:pl-10">
              <span className="absolute -left-3 top-0 bg-zinc-950 border-2 border-orange-500 text-orange-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-[#0c0a09]">৩</span>
              <h4 className="font-bold text-orange-400 text-sm md:text-base">স্কোয়াড বা টিম ঘোষণা (District Squads)</h4>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                সলো এলিমিনেশনের টপ ৪ জন খেলোয়াড়কে মার্জ করে জেলার অফিশিয়াল স্কোয়াড ঘোষণা এবং ট্রেইনিং ক্যাম্পের শুভ সূচনা।
              </p>
            </div>

            <div className="relative pl-6 md:pl-10">
              <span className="absolute -left-3 top-0 bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-[#0c0a09]">৪</span>
              <h4 className="font-bold text-orange-500 text-sm md:text-base">গ্র্যান্ড ফাইনাল ই-স্পোর্টস মেলা (Grand Finals)</h4>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                ৬৪ জেলা থেকে সেরা ৬৪ স্কোয়াড মিলে ট্রফি, নগদ ৫০,০০০ টাকা এবং বাংলাদেশসেরা জেলা টাইটেলের লড়াই!
              </p>
            </div>

          </div>
        </div>

        {/* Support team info */}
        <div className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-5 text-center text-xs text-zinc-400">
          উক্ত ইভেন্টটি সম্পূর্ণ কোনো পাবলিশার অনুমোদিত থার্ড পার্টি ফ্যান-বেইজ টুর্নামেন্ট। এর সাথে Garena Free Fire এর সরাসরি কোনো অফিশিয়াল পার্টনারশিপ বাধ্যবাধকতা নেই।
        </div>

      </div>
    </div>
  );
}

export function TermsTab() {
  const termsList = [
    {
      title: "রেজিস্ট্রেশন এবং ফি বাতিলকরণ",
      desc: "প্রতিটি সলো রেজিস্ট্রেশনের জন্য ফি ১০০ টাকা। একবার রেজিস্ট্রেশন কনফার্ম হয়ে পেমেন্ট ট্রানজেকশন সফল হলে সেটি অফেরতযোগ্য হিসেবে গণ্য হবে।"
    },
    {
      title: "ডিভাইস ও নেটওয়ার্ক দায়বদ্ধতা",
      desc: "খেলোয়াড় যেকোনো মোবাইল ডিভাইস (আইফোন বা অ্যান্ড্রয়েড) ব্যবহার করে অংশ নিতে পারবেন, তবে এমুলেটর বা পিসি গেমিং কঠোরভাবে নিষিদ্ধ। ইন্টারনেটের জটিলতা সম্পূর্ণ খেলোয়াড়ের নিজের ব্যক্তিগত দায়িত্ব।"
    },
    {
      title: "রেফারাল বোনাস উইথড্রয়াল",
      desc: "রেফারাল বোনাসের নগদ ১০ টাকা উইথড্র করার পর ২৪ ঘণ্টার ভিতর ট্রানজেকশন রিকোয়েস্ট ভেরিফাই করে পাঠিয়ে দেওয়া হবে। কোনো ভুয়া নাম ব্যবহার বা ক্লোন অ্যাপ চালনা ধরা পড়লে ক্যাশ আউট ব্লক করা হবে।"
    },
    {
      title: "স্পোর্টটসম্যানশিপ ও ইন-গেম টক্সিসিটি",
      desc: "সহযোদ্ধাদের উদ্দেশ্যে কোনো গালিগালাজ, সাইবার বুলিং বা কাস্টম লবি চ্যাটে কুরুচিপূর্ণ আচরণ করলে প্লেয়ারকে ডিরেক্ট ডিসকোয়ালিফাই করা সহ লিডারবোর্ডের পয়েন্ট মুছে ফেলা হবে।"
    },
    {
      title: "টাই ব্রেকার ও ডিসবিউট রেজাল্ট",
      desc: "সমান পয়েন্টের ক্ষেত্রে যার কিল সংখ্যা বেশি, সে এগিয়ে থাকবে। তাও সমান হলে সারভাইভাল টাইমকে দেখা হবে। তবে জরুরি ক্ষেত্রে ও ফাইনাল এনাউন্সমেন্টে মডারেটর অথবা এডমিনদের সিদ্ধান্তই শেষ কথা।"
    },
  ];

  return (
    <div className="bg-[#0c0a09] text-white py-12 px-4 min-h-screen" id="terms-page-tab">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Head */}
        <div className="text-center border-b border-zinc-800 pb-8">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC LEGAL GUIDE</span>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            শর্তাবলী ও নিয়মাবলি (Terms & Conditions)
          </h1>
          <p className="text-zinc-400 text-sm mt-3">
            বি৬৪ডিসিতে নিবন্ধন করার পূর্বে নিম্নের ৫টি ধারা মনোযোগ সহকারে পড়ে নিন।
          </p>
        </div>

        {/* Terms list cards */}
        <div className="space-y-4">
          {termsList.map((term, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-start gap-4">
              <span className="bg-orange-500/10 text-orange-500 w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-base shrink-0 border border-orange-500/25">
                ০{index + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-zinc-250">{term.title}</h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">{term.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety banner */}
        <div className="bg-orange-950/15 border border-orange-500/20 rounded-2xl p-5 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-400">
            <strong className="text-orange-500 block font-bold mb-1">সতর্ক বার্তা ও অ্যাকাউন্ট ব্যান পলিসি:</strong>
            বাংলাদেশ ৬৪ জেলা ফ্রি ফায়ার প্রাঙ্গণ একটি অত্যন্ত স্বচ্ছ এবং পরিচ্ছন্ন যুদ্ধক্ষেত্র। গেম ফাইলের কোনো প্রকার পরিবর্তন, স্ক্রিপ্টিং, হেডশট হ্যাক, জিপিএস বা থার্ড পার্টি কোনো প্লাগইন সম্পূর্ণ নিষিদ্ধ। এডমিন কন্ট্রোল টিম ম্যানুয়ালি এন্টি-চিট বট দিয়ে কাস্টম ম্যাচ পর্যবেক্ষণ করবেন। কোনো প্রকার অনিয়ম ধরা পড়লে ওই জেলায় পুনরায় ম্যাচ বা সেই খেলোয়াড়কে আজীবনের জন্য ব্যান কারাদণ্ডে অভিযুক্ত করা হবে।
          </div>
        </div>

      </div>
    </div>
  );
}
