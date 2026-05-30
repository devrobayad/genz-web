import React, { useState } from 'react';
import { Player, Match } from '../types';
import { Search, User, ShieldCheck, Swords, MapPin, FileText, Info } from 'lucide-react';
import { banglaDistrictsMap } from '../data/districts';

interface ProfileViewerProps {
  players: Player[];
  matches: Match[];
}

export default function ProfileViewer({ players, matches }: ProfileViewerProps) {
  const [searchUid, setSearchUid] = useState('');
  const [searchedPlayer, setSearchedPlayer] = useState<Player | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (uidToQuery: string) => {
    const trimmed = uidToQuery.trim();
    if (!trimmed) return;
    const match = players.find(p => p.uid === trimmed);
    setSearchedPlayer(match || null);
    setHasSearched(true);
  };

  // Quick lookup champions
  const featuredChampions = players.slice(0, 4);

  // Calculate customized match stats for queried player
  const getPlayedMatchesCount = (uid: string) => {
    return matches.filter(m => m.results?.some(r => r.playerUid === uid)).length;
  };

  const getPlayerMatches = (uid: string) => {
    return matches.filter(m => m.results?.some(r => r.playerUid === uid));
  };

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="profile-lookup-tab">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Head header */}
        <div className="text-center space-y-2 border-b border-zinc-800 pb-6">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC PLAYER TRACKER</span>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 font-sans">
            প্লেয়ার প্রোফাইল সার্চ
          </h1>
          <p className="text-zinc-400 text-sm">
            ফ্রি ফায়ার ক্যারেক্টার UID দিয়ে সার্চ করে যেকোনো খেলোয়াড়ের লিগ স্ট্যাটাস ও রেফারেল বোনাস ক্যাশ দেখে নিন।
          </p>
        </div>

        {/* Dynamic Search Box Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-zinc-500" />
            <input
              type="text"
              placeholder="প্লেয়ারের ফ্রি ফায়ার UID ক্যারেক্টার আইডি লিখুন (যেমন: 84729104, 11029485, ইত্যাদি)"
              value={searchUid}
              onChange={(e) => setSearchUid(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchUid)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition"
              id="profile-uid-input"
            />
          </div>
          <button
            onClick={() => handleSearch(searchUid)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs md:text-sm rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
          >
            খুঁজুন
          </button>
        </div>

        {/* Pre-listed players buttons list */}
        <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl">
          <span className="block text-[10px] text-zinc-550 uppercase font-mono font-bold mb-2">ক্ষুদ্র উদাহরণ (ট্যাপ করে দেখতে পারেন):</span>
          <div className="flex flex-wrap gap-2">
            {featuredChampions.map(p => (
              <button
                key={p.uid}
                onClick={() => {
                  setSearchUid(p.uid);
                  handleSearch(p.uid);
                }}
                className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 hover:text-orange-450 font-medium transition"
              >
                {p.name} ({p.uid})
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card View output */}
        {hasSearched && searchedPlayer ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden" id="profile-detailed-card">
            
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-855 pb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-orange-605 p-3 rounded-2xl text-zinc-950 shadow-md">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-zinc-150 font-sans">{searchedPlayer.name}</h2>
                    <span className="inline-flex items-center gap-0.5 bg-orange-500/10 text-orange-400 text-[9px] font-sans font-black uppercase px-2 py-0.5 rounded border border-orange-500/25">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-450 mt-1 font-mono">Character ID: <strong className="text-white">{searchedPlayer.uid}</strong></p>
                </div>
              </div>

              <div className="text-xs text-zinc-400 flex items-center gap-2 font-mono bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-xl self-start">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>জেলা: <strong>{banglaDistrictsMap[searchedPlayer.district] || searchedPlayer.district}</strong></span>
              </div>
            </div>

            {/* Performance metrics stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-center">
                <span className="block text-[10px] text-zinc-550 uppercase font-mono font-bold">মোট কিল (Kills)</span>
                <span className="block text-2xl font-black text-orange-500 mt-1 font-mono">{searchedPlayer.scoreKills}</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-center">
                <span className="block text-[10px] text-zinc-550 uppercase font-mono font-bold">প্লেসমেন্ট স্কোর</span>
                <span className="block text-2xl font-black text-amber-500 mt-1 font-mono">{searchedPlayer.scorePlacementPoints}</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-center">
                <span className="block text-[10px] text-zinc-550 uppercase font-mono font-bold">মোট পয়েন্ট (Total)</span>
                <span className="block text-2xl font-black text-orange-400 mt-1 font-mono">{searchedPlayer.totalPoints} pt</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-center">
                <span className="block text-[10px] text-zinc-550 uppercase font-mono font-bold">খেলা হয়েছে (Matches)</span>
                <span className="block text-2xl font-black text-orange-500 mt-1 font-mono">{getPlayedMatchesCount(searchedPlayer.uid)}</span>
              </div>

            </div>

            {/* Down block: Referral Stats and coupon note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-800/60 pt-6">
              
              <div className="bg-zinc-950 p-4 border border-zinc-850 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-zinc-350 uppercase tracking-widest flex items-center gap-1">
                  <User className="h-4.5 w-4.5 text-orange-400" />
                  <span>রেফারেল স্ট্যাটাস (Invites)</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block">মোট আমন্ত্রণ:</span>
                    <strong className="text-zinc-300 block mt-0.5">{searchedPlayer.totalReferrals} জন</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">ইউনিক রেফার কোড:</span>
                    <code className="text-orange-400 font-extrabold block mt-0.5">{searchedPlayer.myReferralCode}</code>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-850 rounded-2xl space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-350 uppercase tracking-widest flex items-center gap-1">
                    <FileText className="h-4.5 w-4.5 text-orange-400" />
                    <span>ক্যাশব্যাক কুপন (Shopping Coupon)</span>
                  </h4>
                  <p className="text-[10px] text-zinc-550 mt-1">টুর্নামেন্টে যোগদানের ১০০০+ অর্ডারে ১০০ টাকা ক্যাশব্যাক ভাউচার।</p>
                </div>
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="text-zinc-450">Coupon Used status:</span>
                  {searchedPlayer.cashbackCouponUsed ? (
                    <span className="text-red-400 font-bold">ব্যবহৃত (Used)</span>
                  ) : (
                    <span className="text-orange-400 font-semibold font-mono">{searchedPlayer.cashbackCoupon}</span>
                  )}
                </div>
              </div>

            </div>

            {/* Individual matches list timeline for the searched player */}
            {getPlayerMatches(searchedPlayer.uid).length > 0 && (
              <div className="border-t border-zinc-800/80 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1 text-orange-400 font-sans">
                  <Swords className="h-4.5 w-4.5" />
                  <span>খেলোয়াড়ের সাম্প্রতিক ম্যাচসমূহ</span>
                </h4>
                
                <div className="space-y-2.5">
                  {getPlayerMatches(searchedPlayer.uid).map((match, mIdx) => {
                    const myResult = match.results?.find(r => r.playerUid === searchedPlayer.uid);
                    return (
                      <div key={mIdx} className="bg-zinc-950 p-3 rounded-xl flex justify-between items-center border border-zinc-850">
                        <div>
                          <span className="text-xs font-bold text-zinc-200 block">{match.title}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">ম্যাচ তারিখ: {match.date}</span>
                        </div>

                        <div className="text-right text-xs font-mono font-bold space-y-0.5">
                          <p className="text-orange-500">কিল: {myResult?.kills || 0}</p>
                          <p className="text-orange-400">পয়েন্ট: {myResult?.points || 0}pt</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        ) : hasSearched ? (
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl py-12 px-4 text-center">
            <Info className="h-10 w-10 text-zinc-650 mx-auto mb-2" />
            <p className="text-zinc-400 text-sm">দুঃখিত, কোনো প্লেয়ার এই UID আইডি দিয়ে রেজিস্টার করেননি!</p>
            <p className="text-zinc-650 text-xs mt-1">সঠিক Free Fire ক্যারেক্টার আইডি পুনরায় টাইপ করুন।</p>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-850 rounded-3xl p-6 text-center text-xs text-zinc-500">
            🔍 শুরু করার জন্য উপরস্থ বক্সে যেকোনো একটি প্লেয়ার UID আইডি বা ট্র্যাকার লিখে "খুঁজুন" বাটনে চাপ দিন।
          </div>
        )}

      </div>
    </div>
  );
}
