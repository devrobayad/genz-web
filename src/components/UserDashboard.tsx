import React, { useState } from 'react';
import { Player, Match } from '../types';
import { User, Coins, Ticket, MapPin, Share2, Clipboard, CopyCheck, Swords, Calendar } from 'lucide-react';
import { banglaDistrictsMap } from '../data/districts';

interface UserDashboardProps {
  playerUid: string;
  players: Player[];
  matches: Match[];
}

export default function UserDashboard({ playerUid, players, matches }: UserDashboardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentUser = players.find(p => p.uid === playerUid);

  if (!currentUser) {
    return (
      <div className="bg-[#0c0a09] text-white py-12 px-4 text-center">
        <p className="text-zinc-400 font-sans">ত্রুটি: আপনার রেজিস্টার্ড একাউন্ট খুঁজে পাওয়া যায়নি!</p>
        <p className="text-zinc-550 text-xs mt-1">দয়া করে পুনরায় সাইন-আপ বা রেজিস্ট্রেশন করুন।</p>
      </div>
    );
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. Matches this player represents by district
  const relatedMatches = matches.filter(m => {
    if (m.district === currentUser.district) return true;
    if (m.round === 'Grand Final') return true;
    return false;
  }).sort((a,b) => a.date.localeCompare(b.date));

  // 2. Earnings calculation based on 10 TK per referrers
  const earnedCashback = currentUser.totalReferrals * 10;

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="user-dashboard-tab">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Grid */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl text-zinc-950 shadow-md">
              <User className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-mono">B64DC LOGGED MEMBER</span>
              </div>
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 font-sans">
                স্বাগতম, {currentUser.name}!
              </h1>
              <p className="text-xs text-zinc-450 mt-1 font-mono">Character ID: {currentUser.uid} | জেলা: {banglaDistrictsMap[currentUser.district] || currentUser.district}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-orange-500" />
              <span>{banglaDistrictsMap[currentUser.district] || currentUser.district} কোয়ালিফায়ার</span>
            </span>
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-xl text-xs font-bold font-sans uppercase">
              ● VERIFIED MEMBER
            </span>
          </div>
        </div>

        {/* Dashboard Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Earnings card */}
          <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-md">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">Cash Vault Balance</span>
                <Coins className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-2xl font-black text-orange-550 mt-2 font-mono">
                {earnedCashback} Tk
              </p>
              <p className="text-xs text-zinc-405 mt-1 leading-relaxed">রেফারেল বোনাস থেকে অর্জিত মোট ব্যালেন্স।</p>
            </div>
            <div className="border-t border-zinc-850 pt-3 text-[10px] text-zinc-500 font-mono">
              * সরাসরি ক্যাশআউটের জন্য সাপোর্ট চ্যানেলে ট্রানজেকশন ID দিন।
            </div>
          </div>

          {/* Coupon redeem metadata card */}
          <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-md">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">My Shopping Voucher</span>
                <Ticket className="h-5 w-5 text-orange-500" />
              </div>
              
              <div className="mt-2.5 flex items-center justify-between bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-850 font-mono">
                <code className="text-orange-450 font-extrabold text-xs">{currentUser.cashbackCoupon}</code>
                <button 
                  onClick={() => handleCopy(currentUser.cashbackCoupon, 'coup-dash')}
                  className="p-1 text-zinc-450 hover:text-white"
                  title="Copy Coupon"
                >
                  {copiedId === 'coup-dash' ? <CopyCheck className="h-4 w-4 text-orange-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                </button>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                ১,০০০ টাকার বেশ কেনাকাটায় এই ১০০ টাকা ডিসকাউন্ট কুপনটি শপে খাটাতে পারবেন।
              </p>
            </div>
            
            <div className="border-t border-zinc-850 pt-3 text-xs flex justify-between">
              <span className="text-zinc-500 font-sans">স্ট্যাটাস:</span>
              {currentUser.cashbackCouponUsed ? (
                <span className="text-red-400 font-bold">ব্যবহৃত (Used)</span>
              ) : (
                <span className="text-orange-400 font-bold">ব্যবহারে প্রস্তুত (Active)</span>
              )}
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-md">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">Tournament Scoreboard</span>
                <Swords className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-black text-orange-500 mt-2 font-mono">
                {currentUser.totalPoints} PTS
              </p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">কিলস এবং প্লেসমেন্ট অনুযায়ী মেটা পয়েন্ট স্কোর।</p>
            </div>
            <div className="border-t border-zinc-850 pt-3 text-[10px] text-zinc-450 flex justify-between font-mono">
              <span>কিলস: {currentUser.scoreKills}</span>
              <span>প্লেসমেন্ট: {currentUser.scorePlacementPoints}</span>
            </div>
          </div>

        </div>

        {/* Invite link generation card */}
        <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-md">
          <div className="md:col-span-2 space-y-1.5">
            <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-[10px] font-bold font-sans">
              <Share2 className="h-3 w-3" />
              <span>সহজ বন্ধুদের ইনভাইট করুন</span>
            </span>
            <h3 className="text-base font-bold text-zinc-200">বন্ধুদের সাথে আপনার ইউনিক রেফার কোডটি শেয়ার করুন!</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              আপনার বন্ধুরা সাইন-আপ বা রেজিস্ট্রেশনের সময়ে আপনার কোড <strong>{currentUser.myReferralCode}</strong> ব্যবহার করলেই সাথে সাথে ১০ টাকা ডিসকাউন্ট পাবেন এবং আপনি পাবেন নগদ ১০ টাকা বোনাস! নূন্যতম ১০০ জন রেফার করলেই সাপ্তাহিক স্মার্টফোন জেতার অফার।
            </p>
          </div>

          <div className="bg-zinc-950 p-4 border border-zinc-850 rounded-2xl space-y-2 text-center text-xs">
            <span className="text-zinc-500 block uppercase font-mono text-[9px]">My Referral Code</span>
            <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800 font-mono">
              <code className="text-orange-450 font-black text-base">{currentUser.myReferralCode}</code>
              <button 
                onClick={() => handleCopy(currentUser.myReferralCode, 'ref-dash')}
                className="p-1 text-zinc-450 hover:text-white"
                title="Copy Code"
              >
                {copiedId === 'ref-dash' ? <CopyCheck className="h-4.5 w-4.5 text-orange-450" /> : <Clipboard className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-zinc-405 font-sans">মোট সফল রেফারার: <strong className="text-white">{currentUser.totalReferrals} জন</strong></p>
          </div>
        </div>

        {/* User related matches timeline checklist */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
          <h3 className="text-sm md:text-base font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 font-sans">
            <Calendar className="h-5 w-5 text-orange-400 animate-pulse" />
            <span>আপনার জেলা বা বিভাগের ম্যাচসূচি</span>
          </h3>
          
          <div className="space-y-3">
            {relatedMatches.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono py-4">আপনার জেলাটির এখন কোনো গ্রুপ ম্যাচ নির্ধারিত নেই।</p>
            ) : (
              relatedMatches.map(match => (
                <div key={match.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                        {match.round}
                      </span>
                      {match.status === 'live' ? (
                        <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-black animate-pulse">
                          LIVE
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[10px] font-mono">Upcoming</span>
                      )}
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-zinc-300 mt-1.5">{match.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">ম্যাচ তারিখ: {match.date} | সময়: {match.time} PM</p>
                  </div>

                  <div className="text-xs w-full sm:w-auto">
                    {match.status === 'live' && (match.lobbyId || match.password) ? (
                      <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl font-mono space-y-1 text-[10px] min-w-[150px]">
                        <p className="text-zinc-400 font-sans">Lobby ID: <strong className="text-white select-all">{match.lobbyId}</strong></p>
                        <p className="text-zinc-400 font-sans">Password: <strong className="text-orange-400 select-all">{match.password}</strong></p>
                      </div>
                    ) : (
                      <span className="text-zinc-500 text-xs italic font-sans font-medium">ম্যাচ শুরুর ১৫ মিনিট আগে লবি তথ্য পাবেন।</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
