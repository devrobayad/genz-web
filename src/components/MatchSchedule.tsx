import React, { useState } from 'react';
import { Match, Player } from '../types';
import { Calendar, Play, CheckCircle2, Search, Medal, Swords, Clipboard, CopyCheck } from 'lucide-react';
import { banglaDistrictsMap } from '../data/districts';

interface MatchScheduleProps {
  matches: Match[];
  players: Player[];
}

export default function MatchSchedule({ matches, players }: MatchScheduleProps) {
  const [filterType, setFilterType] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMatches = matches.filter(match => {
    // Stage Filter
    if (filterType !== 'all' && match.status !== filterType) {
      return false;
    }
    // District Search
    if (searchDistrict.trim() !== '') {
      const matchDist = match.district?.toLowerCase() || '';
      const banglaDist = match.district ? (banglaDistrictsMap[match.district] || '').toLowerCase() : '';
      const query = searchDistrict.toLowerCase();
      return matchDist.includes(query) || banglaDist.includes(query) || match.title.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="match-schedule-tab">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section with summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC MATCH SYSTEM</span>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              ম্যাচ শিডিউল ও ফলাফল
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              লাইভ, আপকামিং এবং সমাপ্ত হওয়া সকল ম্যাচসমূহ এক নজরে দেখে নিন।
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'সব ম্যাচ', count: matches.length },
              { id: 'live', label: 'লাইভ ম্যাচ', count: matches.filter(m => m.status === 'live').length, color: 'text-orange-500 ring-orange-500/20' },
              { id: 'upcoming', label: 'আপকামিং', count: matches.filter(m => m.status === 'upcoming').length, color: 'text-amber-400 ring-amber-500/20' },
              { id: 'ended', label: 'সমাপ্ত ম্যাচ', count: matches.filter(m => m.status === 'ended').length, color: 'text-orange-400 ring-orange-500/20' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
                  filterType === type.id
                    ? 'bg-zinc-900 border-orange-500/30 text-white shadow-xl shadow-zinc-950/40 ring-2 ring-orange-500/20'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{type.label}</span>
                <span className="font-mono bg-zinc-900/95 px-1.5 py-0.5 rounded text-[10px] text-zinc-300">{type.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter input bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-450" />
            <input
              type="text"
              placeholder="জেলা বা টুর্নামেন্ট নাম দিয়ে খুঁজুন (যেমন: Bogra, ঢাকা...)"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition"
              id="match-district-search-input"
            />
          </div>
        </div>

        {/* Match Lists Grid */}
        {filteredMatches.length === 0 ? (
          <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl py-12 px-4 text-center">
            <Calendar className="h-10 w-10 text-zinc-650 mx-auto mb-2" />
            <p className="text-zinc-400 text-sm">কোনো ম্যাচ খুঁজে পাওয়া যায়নি!</p>
            <p className="text-zinc-550 text-xs mt-1">সব ম্যাচ দেখতে ফিল্টার পরিবর্তন বা জেলা সার্চ সংশোধন করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredMatches.map(match => {
              const keyStatus = match.status;
              
              return (
                <div 
                  key={match.id} 
                  id={`match-card-${match.id}`}
                  className={`bg-zinc-900 border rounded-2xl p-5 md:p-6 transition-all duration-350 hover:border-zinc-750 hover:bg-zinc-900/95 relative overflow-hidden ${
                    keyStatus === 'live' 
                      ? 'border-orange-500/40 shadow-xl shadow-orange-950/10' 
                      : keyStatus === 'ended' 
                        ? 'border-orange-500/20' 
                        : 'border-zinc-800'
                  }`}
                >
                  
                  {/* Decorative corner indicators */}
                  {keyStatus === 'live' && (
                    <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] uppercase font-black px-4 py-1 rounded-bl-xl tracking-wider animate-pulse flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white block animate-ping" />
                      <span>LIVE</span>
                    </div>
                  )}

                  {/* Top line info */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                        match.round === 'Grand Final' 
                          ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20' 
                          : 'bg-zinc-950 text-orange-400 border border-zinc-800'
                      }`}>
                        {match.round}
                      </span>
                      {match.district && (
                        <span className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                          <span>{banglaDistrictsMap[match.district] || match.district} জেলা</span>
                        </span>
                      )}
                    </div>

                    <div className="text-zinc-400 font-mono text-xs flex items-center gap-3">
                      <span>📆 {match.date}</span>
                      <span>⏰ {match.time} PM</span>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <Swords className="h-4 w-4 text-orange-500 shrink-0" />
                    <span>{match.title}</span>
                  </h3>

                  {/* If match is Live or Upcoming and lobby credentials defined */}
                  {keyStatus === 'live' && (
                    <div className="bg-zinc-950/80 border border-zinc-850 rounded-xl p-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest">Lobby Login Access</h4>
                        <p className="text-xs text-zinc-450 mt-1">ম্যাচ শুরু হতে যাচ্ছে। ভেরিফাইড ইউজাররা দ্রুত যুক্ত হোন।</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 md:justify-end items-center">
                        {match.lobbyId && (
                          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center justify-between gap-4 text-xs font-mono w-full sm:w-auto">
                            <span>Lobby ID: <strong className="text-white">{match.lobbyId}</strong></span>
                            <button 
                              onClick={() => handleCopy(match.lobbyId || '', `lob-${match.id}`)}
                              className="text-zinc-400 hover:text-white"
                              title="Copy ID"
                            >
                              {copiedId === `lob-${match.id}` ? <CopyCheck className="h-4.5 w-4.5 text-orange-450" /> : <Clipboard className="h-4 w-4" />}
                            </button>
                          </div>
                        )}
                        {match.password && (
                          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center justify-between gap-4 text-xs font-mono w-full sm:w-auto">
                            <span>Pass: <strong className="text-orange-400">{match.password}</strong></span>
                            <button 
                              onClick={() => handleCopy(match.password || '', `pwd-${match.id}`)}
                              className="text-zinc-400 hover:text-white"
                              title="Copy Pass"
                            >
                              {copiedId === `pwd-${match.id}` ? <CopyCheck className="h-4.5 w-4.5 text-orange-450" /> : <Clipboard className="h-4 w-4" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Upcoming match disclaimer */}
                  {keyStatus === 'upcoming' && (
                    <div className="mt-4 flex items-center gap-2 text-xs bg-zinc-950 px-3 py-2.5 border border-zinc-900 rounded-xl text-orange-400">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>ম্যাচের লবি আইডি এবং পাসওয়ার্ড ম্যাচ শুরুর ঠিক ১৫ মিনিট পূর্বে এখানে দেওয়া হবে।</span>
                    </div>
                  )}

                  {/* Ended match results board */}
                  {keyStatus === 'ended' && match.results && match.results.length > 0 && (
                    <div className="mt-5 border-t border-zinc-800/85 pt-4 space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-orange-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>ম্যাচের ফলাফল এবং পয়েন্ট তালিকা (Rankings)</span>
                      </h4>

                      <div className="overflow-x-auto rounded-xl border border-zinc-800 shadow-inner">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-450 font-bold uppercase tracking-wider">
                              <th className="py-2.5 px-3 select-none text-center">স্থান (Rank)</th>
                              <th className="py-2.5 px-3">খেলোয়াড়ের নাম (Player)</th>
                              <th className="py-2.5 px-3">জেলা (District)</th>
                              <th className="py-2.5 px-3 text-center">কিল (Kills)</th>
                              <th className="py-2.5 px-3 text-center">প্লেসমেন্ট (Placement Pts)</th>
                              <th className="py-2.5 px-3 text-right">মোট পয়েন্ট (Total Pts)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-850/80 font-mono select-none">
                            {match.results.map((result, idx) => {
                              // Placement points logic
                              const placementPoints = result.placement === 1 ? 10 : 
                                                      result.placement === 2 ? 6 :
                                                      result.placement === 3 ? 5 :
                                                      result.placement === 4 ? 4 :
                                                      result.placement === 5 ? 3 : 2;
                              return (
                                <tr key={idx} className="hover:bg-zinc-855 transition">
                                  <td className="py-2 px-3 text-center font-bold">
                                    {idx === 0 ? (
                                      <span className="inline-flex items-center gap-0.5 bg-orange-405 border border-orange-400/40 text-orange-400 rounded-md px-1.5 py-0.5 text-[10px]">
                                        <Medal className="h-3 w-3 fill-current" />
                                        <span>১ম বোয়াহ</span>
                                      </span>
                                    ) : (
                                      <span className="text-zinc-550 font-bold">#0{idx + 1}</span>
                                    )}
                                  </td>
                                  <td className="py-2 px-3 font-sans text-zinc-200 font-semibold">{result.playerName}</td>
                                  <td className="py-2 px-3 font-sans text-zinc-400">{banglaDistrictsMap[result.district] || result.district}</td>
                                  <td className="py-2 px-3 text-center text-orange-500 font-bold">{result.kills}</td>
                                  <td className="py-2 px-3 text-center text-amber-500 font-bold">{placementPoints}</td>
                                  <td className="py-2 px-3 text-right text-orange-400 font-black">{result.points} pt</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
