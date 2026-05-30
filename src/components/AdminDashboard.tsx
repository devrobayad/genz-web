import React, { useState, useEffect, useRef } from 'react';
import { Match, Player, Order, MatchResult, SupportChat, HeaderConfig, NavItemConfig } from '../types';
import { allDistricts, banglaDistrictsMap } from '../data/districts';
import { 
  PlusCircle, 
  Trash2, 
  Award, 
  Check, 
  RotateCcw,
  Sliders,
  Swords,
  ShoppingBag,
  Users,
  MessageSquare,
  Send,
  User,
  Headphones,
  Settings,
  Plus
} from 'lucide-react';

interface AdminDashboardProps {
  players: Player[];
  matches: Match[];
  orders: Order[];
  onAddMatch: (match: Match) => void;
  onUpdateMatchStatus: (matchId: string, status: 'upcoming' | 'live' | 'ended') => void;
  onDeleteMatch: (matchId: string) => void;
  onAddMatchResult: (matchId: string, result: MatchResult) => void;
  onUpdateOrderStatus: (orderId: string, status: 'Pending' | 'Shipped' | 'Deliverd') => void;
  onApprovePlayer: (playerUid: string) => void;
  onDeletePlayer: (playerUid: string) => void;
  onResetSystemData: () => void;
  supportChats: SupportChat[];
  onSendAdminReply: (chatId: string, text: string) => void;
  onClearChatUnread: (chatId: string, side: 'admin' | 'user') => void;
  headerConfig: HeaderConfig;
  onUpdateHeaderConfig: (newConfig: HeaderConfig) => void;
}

export default function AdminDashboard({
  players,
  matches,
  orders,
  onAddMatch,
  onUpdateMatchStatus,
  onDeleteMatch,
  onAddMatchResult,
  onUpdateOrderStatus,
  onApprovePlayer,
  onDeletePlayer,
  onResetSystemData,
  supportChats = [],
  onSendAdminReply,
  onClearChatUnread,
  headerConfig,
  onUpdateHeaderConfig
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = useState<'matches' | 'scores' | 'orders' | 'chats' | 'players' | 'header' | 'system'>('matches');

  // Live support chat state
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [replyInput, setReplyInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Clear unread badge when admin active chat updates or new message arrives while viewing
  useEffect(() => {
    if (adminTab === 'chats' && activeChatId) {
      onClearChatUnread(activeChatId, 'admin');
    }
  }, [adminTab, activeChatId, supportChats.find(c => c.id === activeChatId)?.messages.length]);

  // Scroll chat thread to bottom on select/new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [activeChatId, supportChats.find(c => c.id === activeChatId)?.messages]);

  // Match form states
  const [matchTitle, setMatchTitle] = useState('');
  const [matchRound, setMatchRound] = useState<'Elimination' | 'Quarter Final' | 'Semi Final' | 'Grand Final'>('Elimination');
  const [matchDistrict, setMatchDistrict] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [matchLobbyId, setMatchLobbyId] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  // Submit results form states
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [scorePlayerUid, setScorePlayerUid] = useState('');
  const [scoreKills, setScoreKills] = useState(0);
  const [scorePlacement, setScorePlacement] = useState(1);

  // Header configuration state fields
  const [localHeaderConfig, setLocalHeaderConfig] = useState<HeaderConfig>(headerConfig);

  // Sync state if props change (e.g. database reset)
  useEffect(() => {
    if (headerConfig) {
      setLocalHeaderConfig(headerConfig);
    }
  }, [headerConfig]);

  const [newNavItemId, setNewNavItemId] = useState('home');
  const [newNavItemLabel, setNewNavItemLabel] = useState('');

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchTitle || !matchDate || !matchTime) {
      alert('দয়া করে শিরোনাম, তারিখ এবং সময় পূরণ করুন।');
      return;
    }

    const newMatch: Match = {
      id: "match_" + Math.floor(100000 + Math.random() * 900000),
      title: matchTitle,
      round: matchRound,
      district: matchRound === 'Elimination' ? matchDistrict : undefined,
      status: 'upcoming',
      date: matchDate,
      time: matchTime,
      lobbyId: matchLobbyId || undefined,
      password: matchPassword || undefined,
      results: []
    };

    onAddMatch(newMatch);
    
    // reset form fields
    setMatchTitle('');
    setMatchDistrict('');
    setMatchDate('');
    setMatchTime('');
    setMatchLobbyId('');
    setMatchPassword('');
    alert('নতুন কাস্টম ম্যাচ সফলভাবে শিডিউলে যুক্ত হয়েছে!');
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId || !scorePlayerUid) {
      alert('দয়া করে নির্দিষ্ট কাস্টম ম্যাচ এবং প্লেয়ার নির্বাচন করুন।');
      return;
    }

    const matchedPlayer = players.find(p => p.uid === scorePlayerUid);
    if (!matchedPlayer) {
      alert('ভুল UID! এই ক্যারেক্টার আইডি তে কোনো নিবন্ধিত প্লেয়ার ডাটাবেজে পাওয়া যায়নি।');
      return;
    }

    // Points logic: 1 per kill, plus placement tier
    const placementPoints = scorePlacement === 1 ? 10 : 
                            scorePlacement === 2 ? 6 :
                            scorePlacement === 3 ? 5 :
                            scorePlacement === 4 ? 4 :
                            scorePlacement === 5 ? 3 : 2;

    const totalCalculated = Number(scoreKills) + placementPoints;

    const resultObj: MatchResult = {
      playerUid: scorePlayerUid,
      playerName: matchedPlayer.name,
      district: matchedPlayer.district,
      kills: Number(scoreKills),
      placement: Number(scorePlacement),
      points: totalCalculated
    };

    onAddMatchResult(selectedMatchId, resultObj);

    // Reset scores form fields
    setScoreKills(0);
    setScorePlacement(1);
    alert('স্কোর সফলভাবে ডাটাবেজে যোগ হয়েছে এবং পয়েন্ট রিক্যালকুলেট করা হয়েছে!');
  };

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="admin-dashboard-tab">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Head header element */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-805 pb-6">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC STAFF CONTROL CENTER</span>
            <span className="text-sm bg-orange-500/10 border border-orange-500/25 px-2.5 py-1.5 mt-2 rounded text-orange-400 font-extrabold inline-block">
              🛡️ এডমিন প্যানেল (Authorized Area)
            </span>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
              টুর্নামেন্ট নিয়ন্ত্রণ, ম্যাচ শিডিউলিং, স্কোরবোর্ড হালনাগাদ ও পণ্য অর্ডার শিপিং মনিটরিং স্টুডিও।
            </p>
          </div>

           {/* Secondary micro nav for admin tabs */}
          <div className="flex flex-wrap bg-zinc-950 p-1 border border-zinc-850 rounded-xl">
            {[
              { id: 'matches', label: 'ম্যাচ শিডিউল', icon: Swords },
              { id: 'scores', label: 'স্কোর ইনপুট', icon: Award },
              { id: 'orders', label: 'শপ অর্ডারস', icon: ShoppingBag },
              { id: 'chats', label: 'লাইভ চ্যাট', icon: MessageSquare },
              { id: 'players', label: 'প্লেয়ার তালিকা', icon: Users },
              { id: 'header', label: 'হেডার অপশন', icon: Settings },
              { id: 'system', label: 'ডাটাবেজ', icon: Sliders }
            ].map(tab => {
              const Icon = tab.icon;
              const isChats = tab.id === 'chats';
              const unreadAdminCount = isChats ? supportChats.filter(c => c.unreadByAdmin).length : 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 relative ${
                    adminTab === tab.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {unreadAdminCount > 0 && (
                    <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse absolute -top-0.5 -right-0.5"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Admin Sub-views */}

        {adminTab === 'matches' && (
          /* Match Scheduler view */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="admin-stage-1">
            
            {/* Create Match Column */}
            <form onSubmit={handleCreateMatch} className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-orange-400 flex items-center gap-1.5 font-sans">
                <PlusCircle className="h-5 w-5" />
                <span>নতুন ম্যাচ শিডিউল করুন</span>
              </h3>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ম্যাচ টাইটেল (Title)</label>
                <input
                  type="text"
                  required
                  value={matchTitle}
                  onChange={(e) => setMatchTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                  placeholder="যেমন: Dhaka Group B Elimination Clash"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">রাউন্ড (Tournament Stage)</label>
                  <select
                    value={matchRound}
                    onChange={(e) => setMatchRound(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Elimination">Elimination (সলো)</option>
                    <option value="Quarter Final">Quarter Final (বিভাগ)</option>
                    <option value="Semi Final">Semi Final</option>
                    <option value="Grand Final">Grand Final</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">জেলা (সলো শুধুমাত্র)</label>
                  <select
                    disabled={matchRound !== 'Elimination'}
                    value={matchDistrict}
                    onChange={(e) => setMatchDistrict(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none disabled:opacity-40 focus:border-orange-500"
                  >
                    <option value="">জেলা নির্বাচন...</option>
                    {allDistricts.map(ct => (
                      <option key={ct} value={ct}>{banglaDistrictsMap[ct] || ct}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">তারিখ (Date)</label>
                  <input
                    type="date"
                    required
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">সময় (Time PM)</label>
                  <input
                    type="text"
                    required
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    placeholder="যেমন: 08:30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-zinc-950/50 p-3 rounded-2xl border border-zinc-850">
                <div>
                  <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-1">Lobby ID (Optional)</label>
                  <input
                    type="number"
                    value={matchLobbyId}
                    onChange={(e) => setMatchLobbyId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-xs font-mono focus:border-orange-500"
                    placeholder="904123"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-1">Password (Optional)</label>
                  <input
                    type="text"
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-xs font-mono focus:border-orange-500"
                    placeholder="pass123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl shadow-md cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
              >
                ম্যাচ তৈরি করুন (Create Match)
              </button>
            </form>

            {/* Existing Matches List */}
            <div className="lg:col-span-7 bg-zinc-90 to-zinc-950 bg-zinc-900 border border-zinc-805 rounded-3xl p-6 space-y-4 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-sans">বর্তমান টুর্নামেন্ট সূচি ({matches.length})</h3>
              
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {matches.map(match => (
                  <div key={match.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-orange-400 px-2.5 py-0.5 rounded font-mono uppercase font-black">
                        {match.round}
                      </span>
                      <h4 className="text-xs md:text-sm font-bold text-zinc-200 mt-1">{match.title}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {match.id} | তারিখ: {match.date} | {match.time} PM</p>
                      
                      <div className="flex gap-2 items-center mt-2">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          match.status === 'live' 
                            ? 'bg-orange-600 text-white' 
                            : match.status === 'ended' 
                              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                              : 'bg-zinc-900 text-zinc-400'
                        }`}>
                          {match.status}
                        </span>
                        {match.lobbyId && <span className="text-[10px] font-mono text-zinc-400">Lid: {match.lobbyId}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                      {match.status === 'upcoming' && (
                        <button
                          onClick={() => onUpdateMatchStatus(match.id, 'live')}
                          className="px-2.5 py-1.5 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 text-xs font-bold rounded-lg transition"
                        >
                          লাইভ (Live)
                        </button>
                      )}
                      
                      {match.status === 'live' && (
                        <button
                          onClick={() => onUpdateMatchStatus(match.id, 'ended')}
                          className="px-2.5 py-1.5 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-550/20 text-xs font-bold rounded-lg transition"
                        >
                          শেষ (End)
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteMatch(match.id)}
                        className="p-2 bg-zinc-900 hover:bg-orange-950/20 border border-zinc-850 text-zinc-500 hover:text-orange-400 rounded-lg transition"
                        title="Delete Match"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {adminTab === 'scores' && (
          /* Match result submission controller panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="admin-stage-2">
            
            {/* Input Results form */}
            <form onSubmit={handleScoreSubmit} className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-orange-400 flex items-center gap-1.5 font-sans">
                <Award className="h-5 w-5" />
                <span>প্লেয়ার কিলস ও পয়েন্ট দাখিল</span>
              </h3>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">কাস্টম ম্যাচ নির্বাচন করুন (Select Match)</label>
                <select
                  required
                  value={selectedMatchId}
                  onChange={(e) => setSelectedMatchId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                >
                  <option value="">ম্যাচ সিলেক্ট করুন...</option>
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>{m.title} ({m.status.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">নিবন্ধিত প্লেয়ার নির্বাচন করুন (Select Player)</label>
                <select
                  required
                  value={scorePlayerUid}
                  onChange={(e) => setScorePlayerUid(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                >
                  <option value="">প্লেয়ার সিলেক্ট করুন...</option>
                  {players.map(p => (
                    <option key={p.uid} value={p.uid}>{p.name} (UID: {p.uid} | জেলা: {banglaDistrictsMap[p.district] || p.district})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">কিলস সংখ্যা (Kills)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={scoreKills}
                    onChange={(e) => setScoreKills(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-550"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">প্লেসমেন্ট স্থান (Placement Rank)</label>
                  <select
                    value={scorePlacement}
                    onChange={(e) => setScorePlacement(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-550"
                  >
                    <option value="1">১ম বোয়াহ (Booyah) [+10 pts]</option>
                    <option value="2">২য় স্থান (2nd) [+6 pts]</option>
                    <option value="3">৩য় স্থান (3rd) [+5 pts]</option>
                    <option value="4">৪র্থ স্থান (4th) [+4 pts]</option>
                    <option value="5">৫ম স্থান (5th) [+3 pts]</option>
                    <option value="6">৬ষ্ঠ - ১০ম স্থান [+2 pts]</option>
                    <option value="11">১১তম - ২০তম স্থান [+1 pt]</option>
                  </select>
                </div>
              </div>

              <div className="bg-zinc-950 p-2.5 rounded-2xl text-[10px] text-zinc-500 font-mono">
                * পয়েন্ট ক্যালকুলেটর ফর্মুলা: কিলস * ১ + প্লেসমেন্ট পয়েন্ট। যুক্ত বাটনে চাপ দিলে প্লেয়ার প্রোফাইল রিয়েলটাইমে হালনাগাদ হবে।
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl hover:brightness-110 shadow-md cursor-pointer transition-all"
              >
                স্কোর সাবমিট করুন (Add Score)
              </button>
            </form>

            {/* Live Score entries previews of the Selected Match */}
            <div className="lg:col-span-7 bg-zinc-90 to-zinc-950 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
              <h3 className="text-sm font-bold text-zinc-250 uppercase tracking-widest font-sans">ম্যাচ ফলাফল জিপসি</h3>
              
              {selectedMatchId ? (
                <div className="space-y-4">
                  <p className="text-xs text-zinc-400">
                    নির্বাচিত ম্যাচ: <strong className="text-orange-400 font-bold font-sans">{matches.find(m => m.id === selectedMatchId)?.title}</strong>
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-zinc-800 text-xs">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-zinc-950 text-zinc-400 text-left border-b border-zinc-800">
                          <th className="py-2 px-3">খেলোয়াড়</th>
                          <th className="py-2 px-3">জেলা</th>
                          <th className="py-2 px-3 text-center">কিল</th>
                          <th className="py-2 px-3 text-center">স্থান</th>
                          <th className="py-2 px-3 text-right">পয়েন্ট</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850 font-mono">
                        {(matches.find(m => m.id === selectedMatchId)?.results || []).map((res, rIdx) => (
                          <tr key={rIdx}>
                            <td className="py-2 px-3 font-sans text-zinc-200">{res.playerName}</td>
                            <td className="py-2 px-3 font-sans text-zinc-400">{banglaDistrictsMap[res.district] || res.district}</td>
                            <td className="py-2 px-3 text-center text-orange-500 font-bold">{res.kills}</td>
                            <td className="py-2 px-3 text-center text-orange-400">#0{res.placement}</td>
                            <td className="py-2 px-3 text-right text-orange-450 font-black">{res.points} pt</td>
                          </tr>
                        ))}
                        {(matches.find(m => m.id === selectedMatchId)?.results || []).length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-zinc-550 font-sans">
                              এই কাস্টম ম্যাচে এখনও কোনো প্লেয়ারের ফলাফল দাখিল করা হয়নি।
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 py-6 text-center font-sans">
                  ফলাফল তালিকা পর্যবেক্ষণ করতে বাম পাশের ডেক থেকে কাস্টম ম্যাচ সিলেক্ট করুন।
                </p>
              )}
            </div>

          </div>
        )}

        {adminTab === 'orders' && (
          /* Merchandise orders tracker view */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md" id="admin-stage-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5 font-sans">
              <ShoppingBag className="h-5 w-5" />
              <span>অনলাইন শপ অর্ডারস তালিকা ({orders.length})</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 text-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-450 border-b border-zinc-800 font-bold">
                    <th className="py-3 px-3">অর্ডার আইডি</th>
                    <th className="py-3 px-3">কাস্টমার পরিচয় ও মোবাইল</th>
                    <th className="py-3 px-3">শিপিং ঠিকানা</th>
                    <th className="py-3 px-3">পণ্যসমূহ</th>
                    <th className="py-3 px-3 text-right">ডিসকাউন্ট কুপন</th>
                    <th className="py-3 px-3 text-right">টোটাল বিল (COD)</th>
                    <th className="py-3 px-3 text-center">বিতরণ স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 font-mono">
                  {orders.map(order => {
                    const statusColors = order.status === 'Deliverd' 
                      ? 'bg-orange-550/10 text-orange-400 border border-orange-500/20' 
                      : order.status === 'Shipped' 
                        ? 'bg-orange-400/10 text-orange-400/80 border border-orange-400/15' 
                        : 'bg-orange-605/10 text-orange-500 border border-orange-505/20 animate-pulse';

                    return (
                      <tr key={order.id} className="hover:bg-zinc-850 transition">
                        <td className="py-3 px-3 font-bold text-white">{order.id}</td>
                        <td className="py-3 px-3 font-sans">
                          <span className="block font-bold text-zinc-200">{order.customerName}</span>
                          <span className="block text-[10px] text-zinc-450 mt-0.5">{order.phone}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-zinc-400 max-w-[150px] truncate" title={order.address}>
                          {order.district}, {order.address}
                        </td>
                        <td className="py-3 px-3 font-sans">
                          {order.items.map((it, idx) => (
                            <span key={idx} className="block text-[10px] text-zinc-300">
                              {it.productName} (x{it.quantity})
                            </span>
                          ))}
                        </td>
                        <td className="py-3 px-3 text-right text-orange-400">
                          {order.couponUsed ? (
                            <code className="text-[10px] bg-zinc-950 border border-zinc-800 px-1 py-0.5 text-orange-400">
                              {order.couponUsed}
                            </code>
                          ) : (
                            <span className="text-zinc-650">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right text-orange-400 font-extrabold">{order.total} Tk</td>
                        <td className="py-3 px-3 text-center">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className={`px-2.5 py-1 text-[10px] font-sans font-bold rounded-lg border-none focus:outline-none cursor-pointer ${statusColors}`}
                          >
                            <option value="Pending" className="text-orange-500 bg-zinc-950">Pending (অপেক্ষা)</option>
                            <option value="Shipped" className="text-zinc-300 bg-zinc-950">Shipped (ডেলিভারি)</option>
                            <option value="Deliverd" className="text-orange-400 bg-zinc-950">Delivered (সফল)</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-550 font-sans">
                        এখনও কোনো অর্ডার দাখিল করা হয়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'players' && (
          /* Registered Players master listing panel */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md" id="admin-stage-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5 font-sans">
              <Users className="h-5 w-5" />
              <span>নিবন্ধিত প্লেয়ার তালিকা ({players.length})</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 text-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-450 border-b border-zinc-800 font-bold">
                    <th className="py-3 px-3">ক্যারেক্টার FF UID</th>
                    <th className="py-3 px-3">নাম ও ফোন</th>
                    <th className="py-3 px-3">প্রতিনিধিত্ব জেলা</th>
                    <th className="py-3 px-3 font-mono text-center">আমন্ত্রিত রেফারেল</th>
                    <th className="py-3 px-3">ইউনিক কোড</th>
                    <th className="py-3 px-3 text-right">ক্যাশব্যাক কুপন কোড</th>
                    <th className="py-3 px-3 text-center">পদক্ষেপ (Action)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 font-mono">
                  {players.map(player => (
                    <tr key={player.uid} className="hover:bg-zinc-850 transition">
                      <td className="py-3 px-3 text-white font-bold">{player.uid}</td>
                      <td className="py-3 px-3 font-sans">
                        <span className="block font-bold text-zinc-200">{player.name}</span>
                        <span className="block text-[10px] text-zinc-450 mt-0.5">{player.phone}</span>
                      </td>
                      <td className="py-3 px-3 font-sans">{banglaDistrictsMap[player.district] || player.district}</td>
                      <td className="py-3 px-3 text-center text-orange-400">{player.totalReferrals} জন</td>
                      <td className="py-3 px-3">
                        <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-orange-400 font-bold text-[10px]">
                          {player.myReferralCode}
                        </code>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`text-[10px] text-zinc-400 font-mono ${player.cashbackCouponUsed ? 'line-through text-zinc-550' : ''}`}>
                          {player.cashbackCoupon}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex justify-center gap-1">
                          {!player.isVerified && (
                            <button
                              onClick={() => onApprovePlayer(player.uid)}
                              className="px-2 py-1 bg-orange-500 text-zinc-950 text-[10px] font-bold rounded-md hover:brightness-110 flex items-center gap-0.5 transition"
                              title="Verify Account"
                            >
                              <Check className="h-3 w-3" /> Verify
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('নিবন্ধনটি চিরতরে মুছে দিতে চান?')) {
                                onDeletePlayer(player.uid);
                              }
                            }}
                            className="p-1 text-zinc-500 hover:text-orange-400 transition"
                            title="Delete Player"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'chats' && (
          <div className="grid grid-cols-1 md:grid-cols-12 border border-zinc-800 rounded-3xl overflow-hidden h-[550px] bg-zinc-950 shadow-2xl animate-fade-in" id="admin-chats-view">
            
            {/* 1. Chats Sidebar User List */}
            <div className="md:col-span-4 border-r border-zinc-800 flex flex-col bg-zinc-900/40 h-full">
              <div className="p-4 bg-zinc-950 border-b border-zinc-850">
                <h4 className="text-xs font-black text-orange-400 tracking-wider uppercase flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-orange-500 animate-pulse" />
                  <span>গ্রাহক চ্যাট সেশন ({supportChats.length})</span>
                </h4>
              </div>
              
              <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/60">
                {supportChats.length === 0 ? (
                  <div className="p-8 text-center text-xs text-zinc-550 italic font-medium font-sans">
                    কোনোই সক্রিয় লাইভ চ্যাট রেকর্ড পাওয়া যায়নি।
                  </div>
                ) : (
                  supportChats.map(chat => {
                    const isSelected = chat.id === activeChatId;
                    const lastMsg = chat.messages[chat.messages.length - 1];
                    return (
                      <button
                        key={chat.id}
                        onClick={() => setActiveChatId(chat.id)}
                        className={`w-full text-left p-4 flex gap-3 items-start transition-all ${
                          isSelected 
                            ? 'bg-zinc-900 border-l-4 border-orange-500' 
                            : 'hover:bg-zinc-900/50 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="bg-zinc-800 border border-zinc-700 p-2 rounded-xl text-orange-500 shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h5 className="text-xs font-black text-zinc-100 truncate">{chat.userName}</h5>
                            <span className="text-[9px] text-zinc-500 font-mono shrink-0">{chat.lastUpdated}</span>
                          </div>
                          {chat.userUid && (
                            <span className="text-[9px] font-mono text-zinc-550 block">ID: {chat.userUid}</span>
                          )}
                          <p className="text-[10px] text-zinc-400 mt-1 truncate">
                            {lastMsg ? lastMsg.text : 'সেশন ওপেন হয়েছে'}
                          </p>
                        </div>
                        {chat.unreadByAdmin && (
                          <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-full shrink-0 animate-pulse">
                            New
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* 2. Messages Console */}
            <div className="md:col-span-8 flex flex-col h-full bg-zinc-950">
              {activeChatId ? (
                (() => {
                  const currentChat = supportChats.find(c => c.id === activeChatId);
                  if (!currentChat) return null;
                  
                  const handleAdminSubmit = (e: React.FormEvent) => {
                    e.preventDefault();
                    if (!replyInput.trim()) return;
                    onSendAdminReply(activeChatId, replyInput.trim());
                    setReplyInput('');
                  };

                  return (
                    <div className="flex flex-col h-full">
                      {/* Thread Header */}
                      <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-orange-600/15 text-orange-400 p-2 rounded-xl border border-orange-500/20">
                            <Headphones className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-zinc-200">{currentChat.userName}</h4>
                            <span className="text-[10px] text-zinc-500 block leading-tight">
                              {currentChat.userUid ? `প্লেয়ার আইডি: ${currentChat.userUid} (Verified Profile)` : 'ভিজিটর বা গেস্ট অ্যাকাউন্ট'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono bg-zinc-900 px-2 py-0.5 border border-zinc-800 text-zinc-400 rounded-lg">
                          সেশন আইডি: {currentChat.id}
                        </span>
                      </div>

                      {/* Messages area */}
                      <div 
                        ref={chatEndRef}
                        className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] scrollbar-thin scrollbar-thumb-zinc-800"
                      >
                        {currentChat.messages.map(msg => {
                          const isSupport = msg.sender === 'support';
                          return (
                            <div 
                              key={msg.id} 
                              className={`flex gap-2.5 items-start ${isSupport ? 'justify-end' : 'justify-start'}`}
                            >
                              {!isSupport && (
                                <div className="bg-zinc-800 border border-zinc-700 p-1.5 rounded-lg text-orange-500 mt-1">
                                  <User className="h-3.5 w-3.5" />
                                </div>
                              )}
                              
                              <div className="space-y-1 max-w-[75%]">
                                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                  isSupport 
                                    ? 'bg-orange-600 text-white rounded-tr-none' 
                                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none font-medium'
                                }`}>
                                  {msg.text}
                                </div>
                                <span className={`text-[9px] text-zinc-550 block font-mono px-1 ${isSupport ? 'text-right' : 'text-left'}`}>
                                  {msg.time} {isSupport ? '✓✓' : '✓'}
                                </span>
                              </div>

                              {isSupport && (
                                <div className="bg-orange-600/10 border border-orange-500/20 p-1.5 rounded-lg text-orange-400 mt-1">
                                  <User className="h-3.5 w-3.5" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Send Form Footer */}
                      <form 
                        onSubmit={handleAdminSubmit}
                        className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2"
                      >
                        <input
                          type="text"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder={`${currentChat.userName}-কে উত্তর দিন...`}
                          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer hover:brightness-110 active:scale-[0.98] transition"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>উত্তর দিন</span>
                        </button>
                      </form>
                    </div>
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <MessageSquare className="h-10 w-10 text-orange-600/60 animate-bounce" />
                  <h4 className="text-xs font-black text-zinc-300">একটি চ্যাট সেশন নির্বাচন করুন</h4>
                  <p className="text-[11px] text-zinc-500 max-w-sm">
                    বামদিকের তালিকা থেকে যেকোনো ইউজার বা কাস্টমার সিলেক্ট করে লাইভ চ্যাটে ইনস্ট্যান্ট রিপ্লাই দিন।
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {adminTab === 'header' && (() => {
          const hasHeaderChanges = JSON.stringify(localHeaderConfig) !== JSON.stringify(headerConfig);
          return (
            <div className="space-y-8 animate-fade-in" id="admin-header-settings-view">
              
              {/* Header indicator badge */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <span className="text-xs bg-orange-600/10 border border-orange-500/25 px-2.5 py-1 mt-1 rounded text-orange-400 font-bold inline-block">
                    Live Navbar Customizable Module
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-100 font-sans">নেভিগেশন হেডার এডিটর ও লাইভ কাস্টমাইজেশন</h3>
                  <p className="text-xs text-zinc-400">লোগো পরিবর্তন, মেনু আইটেম অপসারণ/যোগকরণ এবং সেশন অ্যাকশন বাটন ম্যানুয়ালি কাস্টমাইজ করুন।</p>
                </div>
                
                <div className="flex items-center gap-3 self-start md:self-center">
                  {hasHeaderChanges && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateHeaderConfig(localHeaderConfig);
                      }}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black rounded-xl shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
                    >
                      <Settings className="h-4 w-4 animate-spin-slow" />
                      <span>সেভ করুন (Save Changes)</span>
                    </button>
                  )}
                  
                  <div className="bg-zinc-950 px-4 py-2 border border-zinc-850 rounded-xl text-center md:text-right">
                    <span className="block text-[10px] text-zinc-500 uppercase font-bold font-mono">Status Indicator</span>
                    {hasHeaderChanges ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5 animate-pulse">
                        <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                        <span>Unsaved Changes</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-0.5">
                        <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                        <span>All Changes Saved</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Logos & buttons */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* 1. Logo settings card */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
                    <h4 className="text-xs md:text-sm font-extrabold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>১. লোগো ও ব্র্যান্ডিং (Logo Branding)</span>
                    </h4>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">লোগো প্রধান নাম (Logo Text)</label>
                        <input
                          type="text"
                          value={localHeaderConfig?.logoText || ''}
                          onChange={(e) => {
                            setLocalHeaderConfig({
                              ...localHeaderConfig,
                              logoText: e.target.value
                            });
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                          placeholder="যেমন: BD 64 DISTRICT"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">লোগো স্লোগান/উপশিরোনাম (Slogan)</label>
                        <input
                          type="text"
                          value={localHeaderConfig?.logoSubtitle || ''}
                          onChange={(e) => {
                            setLocalHeaderConfig({
                              ...localHeaderConfig,
                              logoSubtitle: e.target.value
                            });
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                          placeholder="যেমন: Free Fire Championship"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">লোগো আইকন (Branding Icon)</label>
                        <select
                          value={localHeaderConfig?.logoIcon || 'Trophy'}
                          disabled={!!localHeaderConfig?.logoImg}
                          onChange={(e) => {
                            setLocalHeaderConfig({
                              ...localHeaderConfig,
                              logoIcon: e.target.value as any
                            });
                          }}
                          className={`w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500 ${!!localHeaderConfig?.logoImg ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <option value="Trophy">🏆 Trophy (ট্রফি)</option>
                          <option value="Swords">⚔ Swords (তলোয়ার)</option>
                          <option value="Award">🏅 Award (পুরষ্কার)</option>
                          <option value="Shield">🛡 Shield (শিল্ড)</option>
                          <option value="Users">👥 Users (প্লেয়ারস)</option>
                          <option value="None">❌ No Icon (কোনো আইকন ছাড়া)</option>
                        </select>
                        {localHeaderConfig?.logoImg && (
                          <p className="text-[9px] text-zinc-500 mt-1">কাস্টম লোগো ছবি থাকায় আইকন নিষ্ক্রিয় করা হয়েছে।</p>
                        )}
                      </div>

                      {/* Logo Image Upload Control Block */}
                      <div className="pt-2.5 border-t border-zinc-800/80 space-y-2">
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase">কাস্টম লোগো ছবি (Custom Logo Image)</label>
                        
                        {localHeaderConfig?.logoImg ? (
                          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-inner">
                            <img 
                              src={localHeaderConfig.logoImg} 
                              alt="Custom Logo" 
                              className="h-10 w-auto object-contain bg-zinc-900 border border-zinc-850 rounded p-1 max-w-[130px]" 
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setLocalHeaderConfig({
                                  ...localHeaderConfig,
                                  logoImg: undefined
                                });
                              }}
                              className="text-[10px] text-red-500 hover:text-red-400 font-bold px-2.5 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 rounded-xl transition duration-200"
                            >
                              ছবি মুছুন
                            </button>
                          </div>
                        ) : (
                          <div className="bg-zinc-950 border border-dashed border-zinc-800 rounded-2xl p-4 text-center space-y-1 hover:border-orange-500/30 transition relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 500000) {
                                    alert('ছবিটি অনেক বড় (দয়া করে ৫০০KB এর নিচের আকারের স্লিম লোগো ছবি আপলোড করুন)');
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setLocalHeaderConfig({
                                      ...localHeaderConfig,
                                      logoImg: reader.result as string
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="text-[10px] text-zinc-400">
                              <span className="text-orange-500 font-bold block mb-0.5">লোগো ছবি সিলেক্ট করুন (Upload Image)</span>
                              সাইজ ৫০০KB এর কম এবং ট্রান্সপারেন্ট PNG রেকমেন্ডেড
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2. Action Button Settings */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
                    <h4 className="text-xs md:text-sm font-extrabold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span>২. অ্যাকশন বাটন সেটিংস (Action Button)</span>
                    </h4>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-2xl border border-zinc-850">
                        <div>
                          <span className="block text-xs font-bold text-zinc-200">অ্যাকশন বাটন প্রদর্শন</span>
                          <span className="block text-[9px] text-zinc-500 font-medium font-sans">মেনুবারে বাটন রাইট সাইডে দেখাবে</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localHeaderConfig?.showActionButton || false}
                            onChange={(e) => {
                              setLocalHeaderConfig({
                                ...localHeaderConfig,
                                showActionButton: e.target.checked
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      {localHeaderConfig?.showActionButton && (
                        <>
                          <div>
                            <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">বাটন নাম (Button Text)</label>
                            <input
                              type="text"
                              value={localHeaderConfig?.actionButtonText || 'Register'}
                              onChange={(e) => {
                                setLocalHeaderConfig({
                                  ...localHeaderConfig,
                                  actionButtonText: e.target.value
                                });
                              }}
                              className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                              placeholder="যেমন: Register"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">বাটন লিংক লক্ষ্য (Target Link Tab)</label>
                            <select
                              value={localHeaderConfig?.actionButtonLink || 'registration'}
                              onChange={(e) => {
                                setLocalHeaderConfig({
                                  ...localHeaderConfig,
                                  actionButtonLink: e.target.value
                                });
                              }}
                              className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                            >
                              <option value="registration">Registration Tab (নিবন্ধন ফর্ম)</option>
                              <option value="shop">Shop Tab (মার্কেট শপ)</option>
                              <option value="matches">Schedule Tab (ম্যাচ সূচি)</option>
                              <option value="home">Home Tab (হোম পেজ)</option>
                              <option value="referral">Referral Tab (রেফারেল)</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>

              {/* Right Column: Nav Menu Links List & Add form */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-md">
                  <h4 className="text-xs md:text-sm font-extrabold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    <span>৩. নেভিগেশন মেনু আইটেম তালিকা (Navigation Items)</span>
                  </h4>

                  {/* List of current links */}
                  <div className="space-y-3">
                    {(!localHeaderConfig?.navItems || localHeaderConfig.navItems.length === 0) ? (
                      <div className="text-center py-6 text-xs text-zinc-550 font-sans italic">
                        মেনুবার খালি। অনুগ্রহ করে নতুন কোনো লিংক এড করুন নিচের ডেক থেকে।
                      </div>
                    ) : (
                      localHeaderConfig.navItems.map((item, index) => (
                        <div
                          key={index}
                          className="bg-zinc-950 border border-zinc-850 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-3"
                        >
                          {/* Label info */}
                          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-0.5">মেনু লেবেল (Label)</label>
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => {
                                  const updatedItems = [...localHeaderConfig.navItems];
                                  updatedItems[index] = { ...item, label: e.target.value };
                                  setLocalHeaderConfig({
                                    ...localHeaderConfig,
                                    navItems: updatedItems
                                  });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-sans font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-0.5">ট্যাব আইডি টার্গেট (Tab Key)</label>
                              <select
                                value={item.id}
                                onChange={(e) => {
                                  const updatedItems = [...localHeaderConfig.navItems];
                                  updatedItems[index] = { ...item, id: e.target.value };
                                  setLocalHeaderConfig({
                                    ...localHeaderConfig,
                                    navItems: updatedItems
                                  });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-xs text-zinc-300 focus:outline-none focus:border-orange-500 font-mono"
                              >
                                <option value="home">home (হোম স্ক্রিন)</option>
                                <option value="matches">matches (ম্যাচ সূচি)</option>
                                <option value="leaderboard">leaderboard (লিডারবোর্ড)</option>
                                <option value="shop">shop (শপ মার্কেট)</option>
                                <option value="referral">referral (রেফার পয়েন্ট)</option>
                                <option value="faq">faq (জিজ্ঞাসিত QA)</option>
                                <option value="terms">terms (রুলবুক নিয়মাবলী)</option>
                                <option value="about">about (টুর্নামেন্ট পরিচিতি)</option>
                                <option value="contact">contact (যোগাযোগ ফর্ম)</option>
                              </select>
                            </div>
                          </div>

                          {/* Delete Link btn */}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedItems = localHeaderConfig.navItems.filter((_, i) => i !== index);
                              setLocalHeaderConfig({
                                ...localHeaderConfig,
                                navItems: updatedItems
                              });
                            }}
                            className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition duration-200 shrink-0 self-end sm:self-center"
                            title="Remove Link"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add link panel block */}
                  <div className="bg-zinc-950 border border-dashed border-zinc-800 p-4 rounded-xl space-y-4 mt-6">
                    <span className="block text-[11px] font-extrabold text-orange-400 uppercase tracking-widest font-mono">
                      + নতুন নেভিগেশন লিংক যোগ করুন
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">মেনু নাম (Link Label)</label>
                        <input
                          type="text"
                          value={newNavItemLabel}
                          onChange={(e) => setNewNavItemLabel(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none"
                          placeholder="যেমন: Sponsor"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ট্যাব টার্গেট (Tab ID)</label>
                        <select
                          value={newNavItemId}
                          onChange={(e) => setNewNavItemId(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-xs text-zinc-300 focus:outline-none"
                        >
                          <option value="home">home (হোম স্ক্রিন)</option>
                          <option value="matches">matches (কাস্টম ম্যাচ সূচি)</option>
                          <option value="leaderboard">leaderboard (জেলা লিডারবোর্ড)</option>
                          <option value="shop">shop (জার্সি শপ মার্কেট)</option>
                          <option value="referral">referral (রেফার ট্র্যাকিং)</option>
                          <option value="faq">faq (আমাদের QA প্রশ্ন ও উত্তর)</option>
                          <option value="terms">terms (অফিসিয়াল রুলবুক ও নিয়ম)</option>
                          <option value="about">about (আমাদের পরিচিতি ও রূপরেখা)</option>
                          <option value="contact">contact (সাপোর্ট ডেস্ক কন্টাক্ট)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!newNavItemLabel.trim()) {
                          alert('দয়া করে মেনু নাম টাইপ করুন।');
                          return;
                        }
                        const finalNewItem: NavItemConfig = {
                          id: newNavItemId,
                          label: newNavItemLabel.trim()
                        };
                        const updatedItems = [...(localHeaderConfig?.navItems || []), finalNewItem];
                        setLocalHeaderConfig({
                          ...localHeaderConfig,
                          navItems: updatedItems
                        });
                        setNewNavItemLabel('');
                      }}
                      className="w-full py-2 bg-orange-500/10 hover:bg-orange-600 hover:text-zinc-950 border border-orange-500/20 text-orange-400 text-xs font-bold rounded-lg transition duration-200 flex items-center justify-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>নেভিগেশন লিংক যুক্ত করুন (+ Add Item)</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
          );
        })()}

        {adminTab === 'system' && (
          /* System data backup/reset tools */
          <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-6 space-y-6 max-w-xl mx-auto shadow-xl" id="admin-stage-5">
            <div className="text-center space-y-2">
              <Sliders className="h-10 w-10 text-orange-500 mx-auto animate-pulse" />
              <h3 className="text-base font-extrabold text-zinc-200 font-sans">সিস্টেম ডাটা সেটিং ব্যাকআপ</h3>
              <p className="text-xs text-zinc-400">এই প্যানেল থেকে টেস্ট করার সুবিধার্থে ডাটাবেজ কুইক রিস্টোর করতে পারবেন।</p>
            </div>

            <div className="bg-orange-950/15 border border-orange-500/20 p-4 rounded-xl text-xs text-orange-400 leading-relaxed text-center font-sans font-medium">
              ⚠ <strong>সাবধান!</strong> রিস্টোর ডেটা অপশনে চাপ দিলে আপনার যোগ করা সকল ম্যাচ, অর্ডার রিসিভড এবং নতুন প্লেয়ারদের সকল ডাটা ডিলিট হয়ে একদম নতুনের মতো সেট হয়ে যাবে।
            </div>

            <button
              onClick={() => {
                if(confirm('আপনি কি ডাটাবেজ রিসেট করতে চান? আপনার টেস্ট করা সকল প্রাকটিস ডিলিট হবে।')) {
                  onResetSystemData();
                  alert('সিস্টেম রিস্টোর সম্পন্ন হয়েছে! ডাটাবেজ প্রথম অবস্থায় ফিরে গিয়েছে।');
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/10 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>রিস্টোর অরিজিনাল ডাটা (Reset Database)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
