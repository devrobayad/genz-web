import React, { useState } from 'react';
import { mockFaqs } from '../data/mockData';
import { HelpCircle, Search } from 'lucide-react';

export default function FAQ({ isSection = false }: { isSection?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = mockFaqs.filter(faq => {
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.banglaQuestion.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.banglaAnswer.toLowerCase().includes(query)
    );
  });

  return (
    <div className={`bg-[#0c0a09] text-white py-[70px] px-4 ${isSection ? 'border-t border-zinc-900/60' : 'min-h-screen'}`} id="faq-accordions-tab">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Head Segment */}
        <div className="text-center space-y-3 border-b border-zinc-800 pb-6">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC RULEBOOK</span>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            {isSection ? 'সাধারণ নিয়মাবলী ও প্রশ্নোত্তর' : 'জিজ্ঞাসিত প্রশ্নোত্তর (QA & Rules)'}
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            {isSection 
              ? 'টুর্নামেন্টে অংশগ্রহণের পূর্বে প্রায়শই জিজ্ঞাসিত প্রশ্নের নিয়মাবলী ও কঠোর গাইডলাইন নিচের অংশ থেকে দেখে নিন।' 
              : 'টুর্নামেন্ট সম্পর্কে প্রায়শই জিজ্ঞাসিত প্রশ্নের বাংলা এবং ইংরেজি রূপরেখা ও কঠোর নিয়মকানুন নিচে দেওয়া হলো।'}
          </p>
        </div>

        {/* Search tool */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="আপনার প্রয়োজনীয় নিয়মাবলী বা প্রশ্ন লিখে সার্চ করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs md:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition shadow-inner"
            id="faq-search-input"
          />
        </div>

        {/* Faq Items direct view - Grid Layout with 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {filteredFaqs.map((faq) => {
            return (
              <div 
                key={faq.id} 
                id={`faq-item-${faq.id}`}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-orange-500/20 hover:bg-zinc-900/60 transition-all duration-300"
              >
                
                {/* Header line direct */}
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500/10 text-orange-500 p-2 rounded-lg border border-orange-500/15 shrink-0">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-extrabold text-white leading-snug">{faq.banglaQuestion}</h3>
                  </div>
                </div>

                {/* Answer content direct */}
                <div className="pt-3.5 border-t border-zinc-800/80 text-xs md:text-sm">
                  <p className="text-zinc-200 leading-relaxed">
                    {faq.banglaAnswer}
                  </p>
                </div>

              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-zinc-500 col-span-full font-medium">
              কোনো নিয়মাবলি এই নামের সাথে মিলছে না। অনুগ্রহ করে ভিন্ন সার্চ ট্রাই করুন।
            </div>
          )}
        </div>

        {/* Global summary badge */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-400">
            <strong className="text-white block font-bold mb-1">গুরুত্বপূর্ণ নোটিশ:</strong>
            উপরে উল্লেখিত সকল ১০০% কাস্টম লবি এবং পয়েন্ট ডিক্লাসিফিকেশন নিয়মের চূড়ান্ত সিদ্ধান্ত B64DC অর্গানাইজেশন মডারেটরদের হাতে ন্যস্ত থাকবে। কোনো প্রকার বিবাদের ক্ষেত্রে ম্যাচ রেকর্ড পর্যালোচনা করে অফিসিয়াল লিডারবোর্ড হালনাগাদ করা হবে।
          </div>
        </div>

      </div>
    </div>
  );
}
