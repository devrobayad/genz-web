import React, { useState, useEffect } from 'react';
import { Player, Match, Order, ReferralUser, MatchResult, SupportChat, HeaderConfig } from './types';
import { mockPlayers, mockMatches, mockProducts, mockReferralStats } from './data/mockData';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CountdownSection from './components/CountdownSection';
import RoundsAndPrizes from './components/RoundsAndPrizes';
import MatchSchedule from './components/MatchSchedule';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';
import FAQ from './components/FAQ';
import ReferralSystem from './components/ReferralSystem';
import Registration from './components/Registration';
import ProfileViewer from './components/ProfileViewer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { AboutTab, TermsTab } from './components/AboutAndTerms';
import Contact from './components/Contact';
import LiveSupport from './components/LiveSupport';

export default function App() {
  // Navigation active tab State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Header customizations State
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(() => {
    const saved = localStorage.getItem('b64dc_header_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      logoText: 'BD 64 DISTRICT',
      logoSubtitle: 'Free Fire Championship',
      logoIcon: 'Trophy',
      navItems: [
        { id: 'home', label: 'Home' },
        { id: 'matches', label: 'Schedule' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'shop', label: 'Shop' },
        { id: 'referral', label: 'Referral' },
        { id: 'faq', label: 'FAQ' },
        { id: 'terms', label: 'Rules' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
      ],
      showActionButton: true,
      actionButtonText: 'Register',
      actionButtonLink: 'registration'
    };
  });

  const handleUpdateHeaderConfig = (newConfig: HeaderConfig) => {
    setHeaderConfig(newConfig);
    localStorage.setItem('b64dc_header_config', JSON.stringify(newConfig));
  };

  // Database core States
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [referralUsers, setReferralUsers] = useState<ReferralUser[]>([]);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  const [supportChats, setSupportChats] = useState<SupportChat[]>([]);

  // Load from local storage or set defaults on initial boot
  useEffect(() => {
    const localPlayers = localStorage.getItem('b64dc_players');
    const localMatches = localStorage.getItem('b64dc_matches');
    const localOrders = localStorage.getItem('b64dc_orders');
    const localReferralUsers = localStorage.getItem('b64dc_referral_users');
    const localUserUid = localStorage.getItem('b64dc_current_uid');
    const localSupportChats = localStorage.getItem('b64dc_support_chats');

    if (localPlayers) setPlayers(JSON.parse(localPlayers));
    else setPlayers(mockPlayers);

    if (localMatches) setMatches(JSON.parse(localMatches));
    else setMatches(mockMatches);

    if (localOrders) setOrders(JSON.parse(localOrders));
    else setOrders([]);

    if (localReferralUsers) setReferralUsers(JSON.parse(localReferralUsers));
    else setReferralUsers(mockReferralStats);

    if (localUserUid) setCurrentUserUid(localUserUid);

    if (localSupportChats) {
      setSupportChats(JSON.parse(localSupportChats));
    } else {
      const defaultChats: SupportChat[] = [
        {
          id: 'player_1',
          userName: 'রাকিব হাসান (Dhaka)',
          userUid: '77283940',
          messages: [
            {
              id: 'msg-1',
              sender: 'user',
              text: 'আসসালামু আলাইকুম ভাইয়া, আমি ১০০ টাকা বিকাশ পেমেন্ট করেছি কিন্তু এখনও ভেরিফাইড দেখছেনা।',
              time: '10:05 PM'
            },
            {
              id: 'welcome-1',
              sender: 'support',
              text: 'ওয়ালাইকুম আসসালাম! B64DC লাইভ সাপোর্ট অ্যাসিস্ট্যান্টে আপনাকে স্বাগতম। দয়া করে আপনার ট্রানজেকশন আইডি টা বলুন আমরা এখনই অ্যাক্টিভেট করে দিচ্ছি।',
              time: '10:06 PM'
            }
          ],
          lastUpdated: '10:06 PM',
          unreadByAdmin: true,
          unreadByUser: false,
        },
        {
          id: 'player_2',
          userName: 'নাহিদ চৌধুরী (Chittagong)',
          userUid: '48102839',
          messages: [
            {
              id: 'msg-2',
              sender: 'user',
              text: 'ভাইয়া, আমি ২৫ জন ফ্রেন্ডকে রেফার করেছি। আমার রেফারেল ব্যালেন্স কীভাবে তুলতে পারব?',
              time: '09:40 PM'
            }
          ],
          lastUpdated: '09:40 PM',
          unreadByAdmin: true,
          unreadByUser: false,
        }
      ];
      setSupportChats(defaultChats);
      localStorage.setItem('b64dc_support_chats', JSON.stringify(defaultChats));
    }
  }, []);

  // Save changes to localStorage on any state modification
  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Support Chat routing and replies
  const handleSendUserMessage = (chatId: string, text: string, userName: string, userUid?: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: 'msg-' + Math.random().toString(),
      sender: 'user' as const,
      text,
      time: timeStr
    };

    setSupportChats(prevChats => {
      const existingChatIdx = prevChats.findIndex(c => c.id === chatId);
      let updatedChats = [...prevChats];

      if (existingChatIdx > -1) {
        const existingChat = prevChats[existingChatIdx];
        updatedChats[existingChatIdx] = {
          ...existingChat,
          userName: userName || existingChat.userName,
          userUid: userUid || existingChat.userUid,
          messages: [...existingChat.messages, newMessage],
          lastUpdated: timeStr,
          unreadByAdmin: true,
          unreadByUser: false
        };
      } else {
        updatedChats.push({
          id: chatId,
          userName: userName || 'Guest User',
          userUid,
          messages: [newMessage],
          lastUpdated: timeStr,
          unreadByAdmin: true,
          unreadByUser: false
        });
      }

      saveToLocal('b64dc_support_chats', updatedChats);
      return updatedChats;
    });
  };

  const handleSendAdminReply = (chatId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: 'msg-' + Math.random().toString(),
      sender: 'support' as const,
      text,
      time: timeStr
    };

    setSupportChats(prevChats => {
      const updatedChats = prevChats.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastUpdated: timeStr,
            unreadByAdmin: false,
            unreadByUser: true
          };
        }
        return c;
      });

      saveToLocal('b64dc_support_chats', updatedChats);
      return updatedChats;
    });
  };

  const handleClearChatUnread = (chatId: string, side: 'admin' | 'user') => {
    setSupportChats(prevChats => {
      const updatedChats = prevChats.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            unreadByAdmin: side === 'admin' ? false : c.unreadByAdmin,
            unreadByUser: side === 'user' ? false : c.unreadByUser
          };
        }
        return c;
      });
      saveToLocal('b64dc_support_chats', updatedChats);
      return updatedChats;
    });
  };

  // State handlers and callbacks

  // 1. Registration Complete
  const handleRegisterSuccess = (newPlayer: Player) => {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    saveToLocal('b64dc_players', updatedPlayers);

    // If referral is used, update the target referrer stats
    if (newPlayer.referralCodeUsed) {
      const codeUsed = newPlayer.referralCodeUsed.toUpperCase();
      
      // Update inside player profiles list
      const revisedPlayers = updatedPlayers.map(p => {
        if (p.myReferralCode.toUpperCase() === codeUsed) {
          return {
            ...p,
            totalReferrals: p.totalReferrals + 1
          };
        }
        return p;
      });
      setPlayers(revisedPlayers);
      saveToLocal('b64dc_players', revisedPlayers);

      // Update inside specific referral rank leaderboard list
      const revisedReferrals = referralUsers.map(u => {
        if (u.referralCode.toUpperCase() === codeUsed) {
          const tot = u.totalReferrals + 1;
          const wk = u.weeklyReferrals + 1;
          return {
            ...u,
            totalReferrals: tot,
            weeklyReferrals: wk,
            smartphoneQualified: wk >= 100
          };
        }
        return u;
      });
      setReferralUsers(revisedReferrals);
      saveToLocal('b64dc_referral_users', revisedReferrals);
    }

    // Set logged player
    setCurrentUserUid(newPlayer.uid);
    localStorage.setItem('b64dc_current_uid', newPlayer.uid);
    setCurrentTab('user-panel');
  };

  const handleLoginSuccess = (uid: string) => {
    setCurrentUserUid(uid);
    localStorage.setItem('b64dc_current_uid', uid);
    setCurrentTab('user-panel');
  };

  const handleLogout = () => {
    setCurrentUserUid(null);
    localStorage.removeItem('b64dc_current_uid');
    setCurrentTab('home');
  };

  // 2. Add Match from admin
  const handleAddMatch = (newMatch: Match) => {
    const updated = [newMatch, ...matches];
    setMatches(updated);
    saveToLocal('b64dc_matches', updated);
  };

  const handleUpdateMatchStatus = (matchId: string, status: 'upcoming' | 'live' | 'ended') => {
    const updated = matches.map(m => {
      if (m.id === matchId) {
        return { ...m, status };
      }
      return m;
    });
    setMatches(updated);
    saveToLocal('b64dc_matches', updated);
  };

  const handleDeleteMatch = (matchId: string) => {
    const updated = matches.filter(m => m.id !== matchId);
    setMatches(updated);
    saveToLocal('b64dc_matches', updated);
  };

  // 3. Registering match results score entry (Calculates and saves)
  const handleAddMatchResult = (matchId: string, resultObj: MatchResult) => {
    // Append result inside selected match results list
    const updatedMatches = matches.map(match => {
      if (match.id === matchId) {
        const resultsArray = match.results || [];
        return {
          ...match,
          results: [...resultsArray, resultObj]
        };
      }
      return match;
    });
    setMatches(updatedMatches);
    saveToLocal('b64dc_matches', updatedMatches);

    // Increment points totals on Player database profile as well!
    const updatedPlayers = players.map(p => {
      if (p.uid === resultObj.playerUid) {
        const killsCount = Number(p.scoreKills) + Number(resultObj.kills);
        const placementPoints = resultObj.placement === 1 ? 10 : 
                                resultObj.placement === 2 ? 6 :
                                resultObj.placement === 3 ? 5 :
                                resultObj.placement === 4 ? 4 :
                                resultObj.placement === 5 ? 3 : 2;
        
        const placementSum = Number(p.scorePlacementPoints) + placementPoints;
        const total = killsCount + placementSum;

        return {
          ...p,
          scoreKills: killsCount,
          scorePlacementPoints: placementSum,
          totalPoints: total
        };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    saveToLocal('b64dc_players', updatedPlayers);
  };

  // 4. Shop Order placements
  const handleAddOrder = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToLocal('b64dc_orders', updatedOrders);

    // If coupon was applied, mark it used so client cannot re-apply
    if (newOrder.couponUsed) {
      const couponCode = newOrder.couponUsed.trim();
      const revisedPlayers = players.map(p => {
        if (p.cashbackCoupon === couponCode) {
          return {
            ...p,
            cashbackCouponUsed: true
          };
        }
        return p;
      });
      setPlayers(revisedPlayers);
      saveToLocal('b64dc_players', revisedPlayers);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'Pending' | 'Shipped' | 'Deliverd') => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    });
    setOrders(updated);
    saveToLocal('b64dc_orders', updated);
  };

  // 5. Account operations
  const handleApprovePlayer = (playerUid: string) => {
    const updated = players.map(p => {
      if (p.uid === playerUid) {
        return { ...p, isVerified: true };
      }
      return p;
    });
    setPlayers(updated);
    saveToLocal('b64dc_players', updated);
  };

  const handleDeletePlayer = (playerUid: string) => {
    const updated = players.filter(p => p.uid !== playerUid);
    setPlayers(updated);
    saveToLocal('b64dc_players', updated);
  };

  // 6. DB reset back to pristine defaults
  const handleResetSystemData = () => {
    localStorage.clear();
    setPlayers(mockPlayers);
    setMatches(mockMatches);
    setOrders([]);
    setReferralUsers(mockReferralStats);
    setCurrentUserUid(null);
    setSupportChats([]);
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-zinc-100 flex flex-col font-sans" id="b64dc-root">
      
      {/* Navigation Top Header */}
      <Navigation 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        currentUserUid={currentUserUid}
        onLogout={handleLogout}
        headerConfig={headerConfig}
      />

      {/* Pages switcher container */}
      <main className="flex-1">
        
        {currentTab === 'home' && (
          <div className="divide-y divide-zinc-900">
            <Hero 
              onRegisterClick={() => setCurrentTab('registration')}
              onExploreMatches={() => setCurrentTab('matches')}
              onReferralClick={() => setCurrentTab('referral')}
            />
            <CountdownSection />
            <RoundsAndPrizes />
            <FAQ isSection={true} />
            <Contact isSection={true} />
            {/* Quick Rules review below */}
            <div className="bg-zinc-900/50 py-6 text-center text-xs text-zinc-400 border-t border-zinc-850">
              * টুর্নামেন্টে যোগদানের এন্ট্রি ফি মাত্র ১০০ টাকা। ক্যাশব্যাক কুপন সাথে সাথে পেয়ে যাবেন।
            </div>
          </div>
        )}

        {currentTab === 'about' && <AboutTab />}

        {currentTab === 'terms' && <TermsTab />}

        {currentTab === 'matches' && (
          <MatchSchedule 
            matches={matches} 
            players={players} 
          />
        )}

        {currentTab === 'leaderboard' && (
          <Leaderboard 
            players={players} 
            referralUsers={referralUsers} 
          />
        )}

        {currentTab === 'shop' && (
          <Shop 
            onAddOrder={handleAddOrder}
            players={players}
          />
        )}

        {currentTab === 'faq' && <FAQ />}

        {currentTab === 'contact' && <Contact />}

        {currentTab === 'referral' && (
          <ReferralSystem 
            onRegisterClick={() => setCurrentTab('registration')}
            topReferrers={referralUsers}
          />
        )}

        {currentTab === 'registration' && (
          <Registration 
            players={players}
            onRegisterSuccess={handleRegisterSuccess}
            onLoginSuccess={handleLoginSuccess}
            onSetCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileViewer 
            players={players}
            matches={matches}
          />
        )}

        {currentTab === 'user-panel' && currentUserUid && (
          <UserDashboard 
            playerUid={currentUserUid}
            players={players}
            matches={matches}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard 
            players={players}
            matches={matches}
            orders={orders}
            onAddMatch={handleAddMatch}
            onUpdateMatchStatus={handleUpdateMatchStatus}
            onDeleteMatch={handleDeleteMatch}
            onAddMatchResult={handleAddMatchResult}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onApprovePlayer={handleApprovePlayer}
            onDeletePlayer={handleDeletePlayer}
            onResetSystemData={handleResetSystemData}
            supportChats={supportChats}
            onSendAdminReply={handleSendAdminReply}
            onClearChatUnread={handleClearChatUnread}
            headerConfig={headerConfig}
            onUpdateHeaderConfig={handleUpdateHeaderConfig}
          />
        )}

      </main>

      {/* Footer Element */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-10 px-4 text-center text-xs text-zinc-500 font-sans" id="b64dc-footer">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-bold tracking-wider text-orange-500">
            BANGLADESH 64 DISTRICT FREE FIRE CHAMPIONSHIP 2026
          </p>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            ৬৪ জেলার স্বনামধন্য গেমিং কমিউনিটি একত্রিত হয়ে এই টুর্নামেন্টের আয়োজন করছেন। যেকোনো প্রকার তথ্য পেতে অথবা এডমিন কন্ট্রোল টিমের সাথে কন্ট্যাক্ট করতে আমাদের অফিশিয়াল ফেসবুক পেজ ভিজিট করুন।
          </p>
          <div className="flex justify-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            <span className="cursor-pointer hover:text-zinc-300" onClick={() => setCurrentTab('about')}>আমাদের সম্পর্কে</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-zinc-300" onClick={() => setCurrentTab('terms')}>শর্তাবলী ও নিয়মাবলি</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-zinc-300" onClick={() => setCurrentTab('faq')}>এফএকিউ (FAQ)</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-zinc-300" onClick={() => setCurrentTab('contact')}>যোগাযোগ (Contact)</span>
          </div>
          <div className="text-[10px] text-zinc-600">
            © 2026 B64DC Arenas. All rights reserved. Made for competitive esports athletes.
          </div>
        </div>
      </footer>

      <LiveSupport 
        supportChats={supportChats}
        onSendUserMessage={handleSendUserMessage}
        onSendAdminReply={handleSendAdminReply}
        onClearChatUnread={handleClearChatUnread}
        currentUserUid={currentUserUid}
        players={players}
      />

    </div>
  );
}
