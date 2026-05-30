import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Headphones, Check, ShieldCheck, User } from 'lucide-react';
import { SupportChat, ChatMessage, Player } from '../types';

interface LiveSupportProps {
  supportChats: SupportChat[];
  onSendUserMessage: (chatId: string, text: string, userName: string, userUid?: string) => void;
  onSendAdminReply: (chatId: string, text: string) => void;
  onClearChatUnread: (chatId: string, side: 'admin' | 'user') => void;
  currentUserUid: string | null;
  players: Player[];
}

export default function LiveSupport({
  supportChats,
  onSendUserMessage,
  onSendAdminReply,
  onClearChatUnread,
  currentUserUid,
  players
}: LiveSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [guestId, setGuestId] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');

  useEffect(() => {
    let gid = localStorage.getItem('b64dc_guest_chat_id');
    let gname = localStorage.getItem('b64dc_guest_chat_name');
    if (!gid) {
      gid = 'guest_' + Math.floor(100000 + Math.random() * 900000);
      gname = 'Guest ' + gid.split('_')[1];
      localStorage.setItem('b64dc_guest_chat_id', gid);
      localStorage.setItem('b64dc_guest_chat_name', gname);
    }
    setGuestId(gid);
    setGuestName(gname);
  }, []);

  const activeChatId = currentUserUid || guestId;
  const activeChatName = currentUserUid 
    ? (players.find(p => p.uid === currentUserUid)?.name || 'FF Player')
    : guestName;

  const activeChat = supportChats.find(c => c.id === activeChatId);

  // Suggested help queries
  const suggestions = [
    { text: 'পেমেন্ট ভেরিফাই হয়নি কেন?', reply: '৬৪ জেলা টুর্নামেন্ট নিবন্ধন ফি ১০০ টাকা বিকাশ/নগদে পাঠানোর পর ডেটা ম্যানুয়ালি মেলাতে ২-১২ ঘণ্টা সময় লাগতে পারে। এডমিন প্যানেল থেকে আপনার অ্যাকাউন্ট এপ্রুভ হয়ে গেলেই আপনার ইউজার প্যানেল ভেরিফাইড (Verified Member) দেখাবে এবং আপনি ম্যাচের আইডি ও পাসওয়ার্ড দেখতে পাবেন।' },
    { text: 'রেফার বোনাস কীভাবে উইথড্র করব?', reply: 'প্রতিটি সফল রেফারে আপনি পাচ্ছেন নগদ ১০ টাকা বোনাস! নূন্যতম ১০০ টাকা ব্যালেন্স হলেই আপনার বিকাশ বা নগদ নাম্বার লিখে নিচে বার্তা পাঠান। আমাদের সাপোর্ট ট্র্যাকার টিম আপনার রিকোয়েস্ট ভেরিফাই করে সরাসরি মোবাইল ওয়ালেটে পেমেন্ট পাঠিয়ে দিবে।' },
    { text: 'ম্যাচ কবে ও কিভাবে শুরু হবে?', reply: 'আপনার নিবন্ধিত জেলা বা বিভাগের সময়সূচি সরাসরি ড্যাশবোর্ড বা "Schedule" ট্যাবে দেখতে পাবেন। ম্যাচ শুরুর ১৫ মিনিট পূর্বে ঐখানেই লবি রুম আইডি এবং গোপন পাসওয়ার্ড দেওয়া হবে। গেমে ঢুকে কাস্টম রুমে জয়েন করতে পারবেন।' },
    { text: '১০০ টাকা ক্যাশব্যাক ভাউচার কি?', reply: 'প্রতিটি নিবন্ধিত প্লেয়ারকে একটি অনন্য ১০০ টাকার ক্যাশব্যাক ভাউচার দেওয়া হয়েছে। এটি দিয়ে আমাদের স্টোর (Official Shop) থেকে ১,০০০+ টাকার জার্সি কড়ার সময়ে খাটাতে পারবেন।' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages, isTyping]);

  // Clear unread count when chat window is opened or when new replies arrive while open
  useEffect(() => {
    if (isOpen && activeChatId && activeChat?.unreadByUser) {
      onClearChatUnread(activeChatId, 'user');
    }
  }, [isOpen, activeChatId, activeChat?.unreadByUser]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  const getSystemResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('payment') || text.includes('পেমেন্ট') || text.includes('টাকা') || text.includes('ফি') || text.includes('bikas') || text.includes('nagad') || text.includes('বিকাশ') || text.includes('নগদ')) {
      return 'নিবন্ধন ফি এবং রেফার একাউন্ট পেমেন্ট মূলত সকাল ৮টা থেকে রাত ১১টার মধ্যে প্রসেস করা হয়। আপনার ট্রানজেকশন আইডি এবং ক্যারেক্টার আইডি এখানে লিখে দিন, আমাদের এডমিন টিম ৫ মিনিটের মধ্যে আপনার প্রোফাইল অ্যাক্টিভেট করে দিবে।';
    }
    if (text.includes('refer') || text.includes('রেফার') || text.includes('কোড') || text.includes('withdraw') || text.includes('ক্যাশ')) {
      return 'রেফারেল বোনাস সরাসরি পাওয়ার জন্য আপনার ফ্রেন্ডকে অবশ্যই সফলভাবে ১০০ টাকা ফি দিয়ে সাইন-আপ করতে হবে। আপনার ফ্রেন্ডের রেজিস্ট্রেশন ভেরিফাইড হলেই আপনার একাউন্টে ব্যালেন্স যোগ হবে। ব্যালেন্স ১০ টাকা প্রতি রেফার।';
    }
    if (text.includes('cheat') || text.includes('hack') || text.includes('হ্যাক') || text.includes('গালি') || text.includes('রিপোর্ট')) {
      return 'B64DC টুর্নামেন্ট সম্পূর্ণ হ্যাকার ও চিটার মুক্ত রাখতে আমরা অ্যান্টি-চিট জাজমেন্ট প্রয়োগ করছি। কোনো খেলোয়াড় হ্যাক ব্যবহার করলে সাথে সাথে তাকে ডিসকোয়ালিফাই করা হবে। দয়া করে প্রমাণের স্ক্রিনশট বা ভিডিও আমাদের সাপোর্ট মেইলে প্রেরণ করুন।';
    }
    if (text.includes('shop') || text.includes('অর্ডার') || text.includes('পণ্য') || text.includes('delivery')) {
      return 'আপনার অর্ডারকৃত পণ্য ট্র্যাকিং স্ট্যাটাস এডমিন বা কাস্টমার পোর্টালে Shipped দেখলে বুজবেন কুরিয়ারে দেওয়া হয়েছে। ঢাকা সিটির ভিতর ৩ দিন এবং ঢাকার বাহিরে ৫ কর্মদিবসের মধ্যে পেয়ে যাবেন ইনশাআল্লাহ।';
    }
    
    return 'আপনার বার্তাটি আমরা পেয়েছি! আমাদের সাপোর্ট মডারেটর Siam/Rafy আপনাকে সাহায্য করার জন্য লাইনে আছেন। অনুগ্রহ করে আপনার ফ্রি ফায়ার Character UID ও সমস্যার কথাটি লিখে রাখবেন, আমরা সর্বোচ্চ ৫মিনিটের মধ্যে রেসপন্স করব।';
  };

  const executeSupportReply = (replyText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (activeChatId) {
        onSendAdminReply(activeChatId, replyText);
      }
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;

    const userMsgText = inputText.trim();
    onSendUserMessage(activeChatId, userMsgText, activeChatName, currentUserUid || undefined);
    setInputText('');

    // Automate a support response helper
    const calculatedResponse = getSystemResponse(userMsgText);
    executeSupportReply(calculatedResponse);
  };

  const handleSuggestionClick = (sugText: string, sugReply: string) => {
    if (!activeChatId) return;
    onSendUserMessage(activeChatId, sugText, activeChatName, currentUserUid || undefined);
    executeSupportReply(sugReply);
  };

  // Welcome message falls back if there are no messages in server channel
  const currentMessages = activeChat ? activeChat.messages : [
    {
      id: 'welcome-1',
      sender: 'support' as const,
      text: 'আসসালামু আলাইকুম! B64DC লাইভ সাপোর্ট অ্যাসিস্ট্যান্টে আপনাকে স্বাগতম। আমি রাফী (কোর সাপোর্ট এডমিন)। টুর্নামেন্ট রেজিস্ট্রেশন, পেমেন্ট কুপন বা নগদ ডিসকাউন্ট নিয়ে যেকোনো সাহায্য লাগলে জানান।',
      time: 'এখন'
    }
  ];

  const unreadCount = activeChat?.unreadByUser ? 1 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="live-support-container">
      
      {/* 1. Chat Window Expanded */}
      {isOpen && (
        <div className="w-[340px] md:w-[380px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300">
          
          {/* Header Panel */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-zinc-950 p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-zinc-950 text-orange-400 p-2 rounded-xl">
                  <Headphones className="h-5 w-5" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-zinc-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-extrabold text-sm tracking-tight text-zinc-950">রাফী (কুর টিম)</h4>
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-black text-zinc-900/80 uppercase font-mono tracking-widest block leading-none">B64DC Support Live</span>
              </div>
            </div>

            <button 
              onClick={handleOpenToggle}
              className="p-1 px-2 rounded-lg bg-zinc-950/10 hover:bg-zinc-950/20 text-zinc-950 transition"
              title="Close Support"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[350px] scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {currentMessages.map((msg) => {
              const isSupport = msg.sender === 'support';
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-2 items-start ${isSupport ? 'justify-start' : 'justify-end'}`}
                >
                  {isSupport && (
                    <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg text-orange-500 mt-1">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[80%]">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isSupport 
                        ? 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-850' 
                        : 'bg-orange-600 text-white rounded-tr-none font-medium'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-zinc-550 block text-right font-mono px-1">
                      {msg.time} {isSupport ? '✓' : '✓✓'}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2 items-center text-zinc-500 text-xs pl-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="italic font-mono text-[10px]">অ্যাসিস্ট্যান্ট লিখছেন...</span>
              </div>
            )}
          </div>

          {/* Quick FAQ Suggestion Chips inside widget */}
          <div className="px-4 py-2 bg-zinc-900/40 border-t border-zinc-900/60 flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap">
            {suggestions.map((sug, sIdx) => (
              <button
                key={sIdx}
                onClick={() => handleSuggestionClick(sug.text, sug.reply)}
                className="inline-block px-2.5 py-1 bg-zinc-950 hover:bg-zinc-850 border border-zinc-850 rounded-lg text-[10px] font-sans text-orange-400/90 font-bold transition whitespace-nowrap"
              >
                {sug.text}
              </button>
            ))}
          </div>

          {/* Input Form Footer */}
          <form 
            onSubmit={handleSendMessage} 
            className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="আপনার বার্তা বা প্রশ্ন লিখুন..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 rounded-xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Floating Action Badge Button icon */}
      <button
        onClick={handleOpenToggle}
        id="live-support-floating-trigger"
        className={`relative p-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-zinc-950 shadow-2xl shadow-orange-500/20 hover:scale-[1.06] active:scale-[0.95] duration-300 transition-all cursor-pointer flex items-center justify-center`}
        title="Live Support Chat"
      >
        <MessageSquare className="h-6 w-6 animate-pulse" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex items-center justify-center rounded-full h-4.5 w-4.5 bg-red-600 text-[9px] font-extrabold text-white">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

    </div>
  );
}
