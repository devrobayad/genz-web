import React, { useState } from 'react';
import { Player, ReferralUser } from '../types';
import { Trophy, Smartphone, Search, ShieldAlert, Star, Sparkles } from 'lucide-react';
import { banglaDistrictsMap } from '../data/districts';

interface LeaderboardProps {
  players: Player[];
  referralUsers: ReferralUser[];
}

export default function Leaderboard({ players, referralUsers }: LeaderboardProps) {
  const [boardType, setBoardType] = useState<'points' | 'referrals'>('points');
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  // 1. Sort and filter players for point leaderboard
  const sortedPlayers = [...players]
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints; // First by total points
      }
      if (b.scoreKills !== a.scoreKills) {
        return b.scoreKills - a.scoreKills; // First Tie breaker: Kills
      }
      return b.uid.localeCompare(a.uid); // Second Tie breaker: fallback character UID
    })
    .filter(p => {
      const query = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query) || p.uid.includes(query);
      const matchDistrict = districtFilter === '' || p.district === districtFilter;
      return matchName && matchDistrict;
    });

  // 2. Sort and filter referrals
  const sortedReferrals = [...referralUsers]
    .sort((a, b) => b.weeklyReferrals - a.weeklyReferrals) // Sort primarily by weekly referrals as the smartphone refers to weekly contest
    .map((usr, index) => ({
      ...usr,
      rank: index + 1,
      // Qualification Rule: Weekly Referrals >= 100, and must be in the top 5
      smartphoneQualified: usr.weeklyReferrals >= 100 && index < 5
    }))
    .filter(p => {
      const query = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query) || p.referralCode.toLowerCase().includes(query);
      const matchDistrict = districtFilter === '' || p.district === districtFilter;
      return matchName && matchDistrict;
    });

  // Collect active districts registered for filter dropdown
  const activeDistricts = Array.from(new Set(players.map(p => p.district))).sort();

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="leaderboards-tab">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Head header elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC LIVE LEADERBOARDS</span>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              র‍্যাঙ্কিং ও লিডারবোর্ড
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              টুর্নামেন্ট ম্যাচে অংশ নেওয়া ট্যালেন্টদের স্কোরবোর্ড এবং টপ রেফারেল স্পেশাল অফার।
            </p>
          </div>

          <div className="flex bg-[#120f0e] p-1 border border-zinc-800 rounded-xl">
            <button
              onClick={() => { setBoardType('points'); setSearchQuery(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                boardType === 'points'
                  ? 'bg-orange-500 text-zinc-950 shadow-lg font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>প্লেয়ার স্কোরবোর্ড</span>
            </button>
            <button
              onClick={() => { setBoardType('referrals'); setSearchQuery(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                boardType === 'referrals'
                  ? 'bg-orange-500 text-zinc-950 shadow-lg font-black'
                  : 'text-zinc-450 hover:text-white'
              }`}
            >
              <Smartphone className="h-4 w-4 animate-bounce" />
              <span>রেফারেল লিডারবোর্ড</span>
            </button>
          </div>
        </div>

        {/* Global search/filters for both boards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-450" />
            <input
              type="text"
              placeholder={boardType === 'points' ? "নাম বা Free Fire Character UID লকআপ করতে লিখুন..." : "রেফার কোড বা রিওয়ার্ডারের নাম লিখুন..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition"
              id="leaderboard-query-filter"
            />
          </div>

          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-orange-500 transition"
              id="leaderboard-district-selector"
            >
              <option value="">সকল জেলা (All Districts)</option>
              {activeDistricts.map(dist => (
                <option key={dist} value={dist}>{banglaDistrictsMap[dist] || dist}</option>
              ))}
            </select>
          </div>
        </div>

        {boardType === 'points' ? (
          /* Points Leaderboard View */
          <div className="space-y-4">
            
            {/* Tie breaker rule reminder banner */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center gap-2.5 text-xs text-zinc-400">
              <ShieldAlert className="h-4 w-4 text-orange-400 shrink-0" />
              <span>
                <strong>টাই ব্রেকার নিয়ম:</strong> সমান পয়েন্ট হলে বেশি Kill যার সে এগিয়ে থাকবে। তাও সমান হলে Survival Time বিবেচনা করা হবে।
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-90 w-full bg-zinc-900/40 shadow-inner">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider font-sans">
                    <th className="py-4 px-4 text-center w-20">র‍্যাঙ্ক (Rank)</th>
                    <th className="py-4 px-4">প্লেয়ারের পরিচয় ও UID</th>
                    <th className="py-4 px-4">সংগ্রামী জেলা</th>
                    <th className="py-4 px-4 text-center font-mono">কিল (Kills)</th>
                    <th className="py-4 px-4 text-center font-mono">প্লেসমেন্ট স্কোর</th>
                    <th className="py-4 px-4 text-right font-mono">মোট অর্জন (Points)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {sortedPlayers.map((player, idx) => {
                    const isTopThree = idx < 3;
                    const badgeStyles = idx === 0 
                      ? 'bg-orange-500 text-zinc-950 ring-4 ring-orange-500/10' 
                      : idx === 1 
                        ? 'bg-zinc-300 text-zinc-950 ring-4 ring-zinc-350/15' 
                        : 'bg-orange-800 text-white ring-4 ring-orange-950/20';

                    return (
                      <tr key={player.uid} className={`hover:bg-zinc-850 transition-colors ${idx === 0 ? 'bg-orange-500/5' : ''}`}>
                        <td className="py-4 px-4 text-center">
                          {isTopThree ? (
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-black text-xs ${badgeStyles}`}>
                              {idx + 1}
                            </span>
                          ) : (
                            <span className="text-zinc-500 font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-sans text-white font-bold text-sm block">{player.name}</span>
                            <span className="text-zinc-450 text-[10px] block mt-0.5">UID: {player.uid}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-sans bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md text-xs text-zinc-300">
                            {banglaDistrictsMap[player.district] || player.district}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-orange-500 font-extrabold text-sm">{player.scoreKills}</td>
                        <td className="py-4 px-4 text-center text-amber-500 font-extrabold text-sm">{player.scorePlacementPoints}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-black px-3 py-1 rounded-lg">
                            {player.totalPoints} PTS
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {sortedPlayers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-550 font-mono">
                        কোনো প্রতিযোগী প্লেয়ারের রেকর্ড নেই।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Referrals Leaderboard View with Smartphone constraints */
          <div className="space-y-6">
            
            {/* Rules reminder regarding Weekly 100 counts and Smartphones */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-2">
                <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-450 px-2.5 py-1 rounded text-[10px] font-bold">
                  <Star className="h-3 w-3 fill-current" />
                  <span>সাপ্তাহিক স্মার্টফোন চ্যালেঞ্জ</span>
                </span>
                <h3 className="text-base font-bold text-zinc-200">১ সপ্তাহে ১০০+ সফল রেফারেল করলেই পাবেন স্মার্টফোন!</h3>
                <p className="text-zinc-450 text-xs leading-relaxed">
                  সাপ্তাহিক টপ ১০০ লিডারবোর্ডের মধ্যে শুধুমাত্র <strong className="text-white">শীর্ষ ৫ জন (Top 5)</strong> বিজয়ী পাবেন একটি করে স্মার্টফোন। তবে শর্ত হলো, সেই নির্দিষ্ট সপ্তাহে নূন্যতম ১০০ জন প্লেয়ারকে রেফার সম্পন্ন করতে হবে! এর নিচে রেফার হলে ফোন দেওয়া সম্ভব নয়।
                </p>
              </div>

              <div className="md:col-span-4 bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl text-center shadow-inner">
                <span className="text-[10px] font-bold text-zinc-400 uppercase font-mono block">Weekly Contest Reward</span>
                <span className="text-xl font-bold text-orange-400 block mt-1">Smart Phone X 5</span>
                <span className="text-[10px] text-zinc-550 block font-mono">* Qualification limit: 100 refers</span>
              </div>
            </div>

            {/* List limit */}
            <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-90 w-full bg-zinc-900/40 shadow-inner">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider font-sans">
                    <th className="py-4 px-4 text-center w-20">র‍্যাঙ্ক (Rank)</th>
                    <th className="py-4 px-4">রেফারকারীর নাম ও জেলা</th>
                    <th className="py-4 px-4">ইউনিক রেফার কোড</th>
                    <th className="py-4 px-4 text-center font-mono">টোটাল লাইফটাইম রেফারার</th>
                    <th className="py-4 px-4 text-center font-mono">সাপ্তাহিক রেফারার (চলতি সপ্তাহ)</th>
                    <th className="py-4 px-4 text-right">পুরষ্কার যোগ্যতা STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 font-mono">
                  {sortedReferrals.slice(0, 100).map((usr, idx) => {
                    const isWeeklyWinner = idx < 5;
                    const meetsTarget = usr.weeklyReferrals >= 100;
                    const qualified = isWeeklyWinner && meetsTarget;

                    return (
                      <tr key={usr.referralCode} className={`hover:bg-zinc-850 transition-colors ${qualified ? 'bg-orange-500/5' : ''}`}>
                        <td className="py-4 px-4 text-center">
                          {idx < 3 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md font-black text-xs bg-orange-500/10 border border-orange-500/40 text-orange-400">
                              #{idx + 1}
                            </span>
                          ) : (
                            <span className="text-zinc-500 font-bold">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-sans text-zinc-200 font-bold block">{usr.name}</span>
                            <span className="text-zinc-450 text-[10px] font-sans block mt-0.5">जिला: {banglaDistrictsMap[usr.district] || usr.district}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded text-orange-400 text-xs font-black">
                            {usr.referralCode}
                          </code>
                        </td>
                        <td className="py-4 px-4 text-center text-zinc-300">{usr.totalReferrals} জন</td>
                        <td className="py-4 px-4 text-center text-orange-400 font-black text-sm">{usr.weeklyReferrals} জন</td>
                        <td className="py-4 px-4 text-right">
                          {qualified ? (
                            <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-400 border border-orange-500/25 px-2 py-1 rounded-lg text-xs font-sans font-extrabold animate-pulse">
                              <Sparkles className="h-3 w-3 shrink-0" />
                              <span>মোবাইল কোয়ালিফাইড</span>
                            </span>
                          ) : isWeeklyWinner && !meetsTarget ? (
                            <span className="inline-flex items-center text-xs text-orange-300/80 font-sans border-b border-dashed border-orange-400/30" title="১০০ রেফার পূরন করতে হবে">
                              আরেকটু করুন (নূন্যতম ১০০ দরকার)
                            </span>
                          ) : (
                            <span className="text-zinc-550 text-xs font-sans">সাধারণ রিওয়ার্ড</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {sortedReferrals.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-550 font-mono">
                        কোনো সফল রেফারেল ডাটা নেই।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
