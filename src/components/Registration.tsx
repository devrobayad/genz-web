import React, { useState } from 'react';
import { Player } from '../types';
import { allDistricts, divisions, banglaDistrictsMap } from '../data/districts';
import { ShieldCheck, CheckCircle2, TicketCheck, Users, Flame, Clipboard, CopyCheck } from 'lucide-react';

interface RegistrationProps {
  players: Player[];
  onRegisterSuccess: (newPlayer: Player) => void;
  onLoginSuccess: (uid: string) => void;
  onSetCurrentTab: (tab: string) => void;
}

export default function Registration({ players, onRegisterSuccess, onLoginSuccess, onSetCurrentTab }: RegistrationProps) {
  // Input fields state
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // Login Mode helper states
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginUid, setLoginUid] = useState('');
  const [loginError, setLoginError] = useState('');

  // Referral discount check
  const [isReferralApplied, setIsReferralApplied] = useState(false);
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [referralError, setReferralError] = useState('');

  // Payment simulated state
  const [paymentGateway, setPaymentGateway] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Success ticket voucher generated
  const [registeredTicket, setRegisteredTicket] = useState<Player | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyReferral = () => {
    setReferralError('');
    setIsReferralApplied(false);
    setReferralDiscount(0);

    const code = referralCode.trim().toUpperCase();
    if (!code) {
      setReferralError('দয়া করে কোড প্রবেশ করুন।');
      return;
    }

    // Check if referral code exists in mock players
    const match = players.find(p => p.myReferralCode.toUpperCase() === code);
    if (match) {
      setIsReferralApplied(true);
      setReferralDiscount(10);
      setReferralError('');
    } else {
      setReferralError('ভুল লয়ালটি কোড! সঠিক কোড দিন (যেমন: SABBIR84 বা MAHER11)');
    }
  };

  const basePrice = 100;
  const finalPrice = basePrice - referralDiscount;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !name || !phone || !district) {
      alert('দয়া করে ফর্মের সব তথ্য পূরণ করুন।');
      return;
    }

    if (uid.length < 5 || uid.length > 12) {
      alert('Free Fire UID কোডটি সাধারণত ৫ থেকে ১২ অংকের সংখ্যা হয়ে থাকে।');
      return;
    }

    // Check if already registered
    const exists = players.some(p => p.uid === uid);
    if (exists) {
      alert('দুঃখিত, এই Free Fire UID কোডটি দিয়ে ইতিমধ্যেই একজন প্লেয়ার রেজিস্টার করেছেন!');
      return;
    }

    // Start checkout simulated loading
    setIsPaying(true);
    setTimeout(() => {
      // Create new Player object
      const cleanName = name.trim();
      const firstPartName = cleanName.split(' ')[0].toUpperCase();
      const randomDigits = Math.floor(10 + Math.random() * 90);
      const generatedReferralCode = firstPartName + randomDigits;
      const uniqueCouponId = "CUP-" + firstPartName.slice(0, 3) + "-" + Math.floor(1000 + Math.random() * 9000);

      const newPlayer: Player = {
        uid: uid.trim(),
        name: cleanName,
        phone: phone.trim(),
        district,
        referralCodeUsed: isReferralApplied ? referralCode.toUpperCase().trim() : undefined,
        myReferralCode: generatedReferralCode,
        totalReferrals: 0,
        registeredAt: new Date().toISOString(),
        isVerified: true, // auto verify for seamless prototype demo
        scoreKills: 0,
        scorePlacementPoints: 0,
        totalPoints: 0,
        hasPaid: true,
        cashbackCoupon: uniqueCouponId,
        cashbackCouponUsed: false
      };

      onRegisterSuccess(newPlayer);
      setRegisteredTicket(newPlayer);
      setIsPaying(false);
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanUid = loginUid.trim();
    if (!cleanUid) {
      setLoginError('Please enter your Free Fire Character UID.');
      return;
    }

    const playerMatch = players.find(p => p.uid === cleanUid);
    if (playerMatch) {
      onLoginSuccess(playerMatch.uid);
    } else {
      setLoginError('No registered profile found with that Character UID! Please check the ID or Register first.');
    }
  };

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen flex items-center justify-center" id="register-page-tab">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Dynamic Ticket generated after a successful join */}
        {registeredTicket ? (
          <div className="md:col-span-12 bg-zinc-900 border-2 border-orange-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6 max-w-2xl mx-auto" id="registration-ticket-panel">
            <div className="text-center space-y-2">
              <CheckCircle2 className="h-12 w-12 text-orange-500 mx-auto animate-bounce" />
              <h2 className="text-xl md:text-2xl font-black text-zinc-100 font-sans">অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে!</h2>
              <p className="text-xs text-zinc-400">আপনার ব্যক্তিগত টুর্নামেন্ট অ্যাক্সেস টিকিট এবং ক্যাশব্যাক নিচের ভাউচারে কুপন কোড আকারে দেওয়া হলো।</p>
            </div>

            {/* Simulated Printed Voucher ticket */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-950 to-orange-950/20 border-2 border-dashed border-zinc-800 rounded-3xl p-6 relative overflow-hidden select-none font-mono">
              <div className="absolute -top-3 -bottom-3 left-1/2 border-l border-dashed border-zinc-800 pointer-events-none hidden md:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-xs">
                {/* Left Side: Ticket info */}
                <div className="space-y-4">
                  <span className="bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded text-[10px] font-black uppercase font-sans tracking-widest">
                    B64DC ENTRANTS
                  </span>
                  
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Player Name:</span>
                      <strong className="text-white font-sans">{registeredTicket.name}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Free Fire UID:</span>
                      <strong className="text-orange-400">{registeredTicket.uid}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Hometown Jela:</span>
                      <strong className="text-white font-sans">{banglaDistrictsMap[registeredTicket.district] || registeredTicket.district}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Status:</span>
                      <strong className="text-orange-400 text-[10px] uppercase">● ACTIVE & VERIFIED</strong>
                    </p>
                  </div>
                </div>

                {/* Right Side: Generated Codes with actions */}
                <div className="space-y-4 md:pl-6 border-t md:border-t-0 border-zinc-800 pt-4 md:pt-0">
                  <div className="space-y-3">
                    {/* Unique cashback coupon */}
                    <div className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                      <span className="block text-[9px] text-zinc-500 font-bold uppercase mb-1 font-sans">১০০ TK ক্যাশব্যাক কুপন (Coupon)</span>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-amber-400 font-black text-sm">{registeredTicket.cashbackCoupon}</code>
                        <button 
                          onClick={() => handleCopy(registeredTicket.cashbackCoupon, 'coup')}
                          className="p-1 text-zinc-400 hover:text-white"
                          title="Copy Code"
                        >
                          {copiedId === 'coup' ? <CopyCheck className="h-4.5 w-4.5 text-orange-400" /> : <Clipboard className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* My referral code */}
                    <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                      <span className="block text-[9px] text-zinc-500 font-bold uppercase mb-1 font-sans">আপনার রেফার কোড (My Referral Code)</span>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-orange-400 font-black text-sm">{registeredTicket.myReferralCode}</code>
                        <button 
                          onClick={() => handleCopy(registeredTicket.myReferralCode, 'ref')}
                          className="p-1 text-zinc-400 hover:text-white"
                          title="Copy Referral"
                        >
                          {copiedId === 'ref' ? <CopyCheck className="h-4.5 w-4.5 text-orange-400" /> : <Clipboard className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-orange-950/20 border border-orange-500/20 p-4 rounded-xl text-xs text-orange-400">
              💡 <strong>কুপন কীভাবে ব্যবহার করবেন:</strong> শপ পেইজ থেকে যেকোনো অফিশিয়াল পণ্য অর্ডার করার সময়ে আপনার রিডিম কোড <strong>{registeredTicket.cashbackCoupon}</strong> প্রবেশ করান এবং ১,০০০ টাকার বেশি বাস্কেটে সাথে সাথে ১০০ টাকা ছাড় উপভোগ করুন!
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => onSetCurrentTab('user-panel')}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl cursor-pointer shadow-lg shadow-orange-500/20 animate-pulse"
              >
                Go to Profile
              </button>
              <button
                onClick={() => onSetCurrentTab('shop')}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
              >
                Visit Shop
              </button>
            </div>
          </div>
        ) : isLoginMode ? (
          <div className="md:col-span-12 max-w-md mx-auto w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6" id="login-profile-card">
            <div className="text-center">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC PLAYER PORTAL</span>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-350 mt-1">
                Log In to Player Profile
              </h1>
              <p className="text-zinc-400 text-xs mt-1">
                Enter your registered Free Fire Character UID to instantly view and manage your profile database details.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">Character UID</label>
                <input
                  type="number"
                  required
                  value={loginUid}
                  onChange={(e) => setLoginUid(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-sm font-mono text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-orange-500 text-center"
                  placeholder="e.g. 77283940"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-400 text-center font-semibold bg-red-950/20 py-2 rounded-lg border border-red-900/30">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-zinc-950 font-extrabold text-sm rounded-xl cursor-pointer shadow-lg shadow-orange-500/10 active:scale-[0.98] transition text-center"
              >
                Access My Profile
              </button>
            </form>

            <div className="text-center border-t border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setLoginError('');
                }}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
              >
                Don't have a registered account? Register now (100 TK fee)
              </button>
            </div>
          </div>
        ) : (
          /* Main registration layout (Forms Left + Payment Info right) */
          <>
            {/* Left side: Form data inputs (7 cols) */}
            <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC SECURE REGISTRATION</span>
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-350">
                    ৬৪ জেলা চ্যাম্পিয়নশিপ নিবন্ধন
                  </h1>
                  <p className="text-zinc-400 text-xs mt-1">সব তথ্য সঠিক এবং রিয়েল ফ্রি ফায়ার UID অনুকরণ করে ফিলাপ করুন।</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(true);
                    setLoginError('');
                  }}
                  className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-orange-400 font-bold text-xs rounded-xl self-start transition-all cursor-pointer"
                >
                  Login Profile
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ফ্রি ফায়ার ক্যারেক্টার UID</label>
                    <input
                      type="number"
                      required
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-250 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                      placeholder="যেমন: 77283940"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">সম্পূর্ণ নাম (Character Name)</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-250 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                      placeholder="যেমন: Sabbir Hossain"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">মোবাইল নাম্বার (হোয়াটসঅ্যাপ)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-250 placeholder-zinc-550 focus:outline-none focus:border-orange-500"
                      placeholder="যেমন: 01712xxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">অংশগ্রহণকারী জেলা (District)</label>
                    <select
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                      id="registration-district-dropdown"
                    >
                      <option value="">জেলা নির্বাচন করুন...</option>
                      {divisions.map((div, dIdx) => (
                        <optgroup key={dIdx} label={`${div.name} Division (${div.banglaName})`}>
                          {div.districts.map(dist => (
                            <option key={dist} value={dist}>
                              {banglaDistrictsMap[dist] || dist}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Referral Apply Section */}
                <div className="border-t border-zinc-800 pt-4 space-y-2">
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-1">
                    <Users className="h-3 w-3 text-orange-505" />
                    <span>লয়ালটি রেফারেল কোড দিন (১০ TK ডিসকাউন্ট)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-orange-450"
                      placeholder="যেমন: SABBIR84"
                    />
                    <button
                      type="button"
                      onClick={handleApplyReferral}
                      className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                  {referralError && <p className="text-[10px] text-red-400 font-sans">{referralError}</p>}
                  {isReferralApplied && (
                    <p className="text-[10px] text-orange-400 font-sans font-bold flex items-center gap-1">
                      <TicketCheck className="h-3.5 w-3.5 shrink-0" />
                      <span>সফলভাবে যুক্ত হয়েছে! আপনার ফি ৯১ টাকা হয়েছে (১০ টাকা অফ!)</span>
                    </p>
                  )}
                </div>

                {/* BKASH NAGAD checkout details */}
                <div className="border-t border-zinc-805 pt-4 space-y-4">
                  <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-2xl border border-zinc-900">
                    <span className="text-xs text-zinc-400">মোট পরিশোধযোগ্য এন্ট্রি ফি:</span>
                    <strong className="text-lg font-black font-mono text-orange-500">{finalPrice} TK</strong>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'bkash', label: 'বিকাশ' },
                      { id: 'nagad', label: 'নগদ' },
                      { id: 'rocket', label: 'রকেট' }
                    ].map(gateway => (
                      <button
                        key={gateway.id}
                        type="button"
                        onClick={() => setPaymentGateway(gateway.id as any)}
                        className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                          paymentGateway === gateway.id
                            ? 'bg-zinc-950 border-orange-500 text-orange-400 ring-2 ring-orange-500/10'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-400'
                        }`}
                      >
                        {gateway.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-850">
                    <div>
                      <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-1">সেন্ডার নাম্বার (Phone)</label>
                      <input
                        type="tel"
                        required
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-orange-500/50"
                        placeholder="যেমন: 017xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-zinc-500 font-bold uppercase mb-1">ট্রানজেকশন ID (TID)</label>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-orange-500/50"
                        placeholder="যেমন: TR9S4G32"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 disabled:opacity-40 text-zinc-950 font-black text-center rounded-xl cursor-pointer shadow-lg shadow-orange-500/10 active:scale-[0.98] transition flex items-center justify-center gap-1"
                >
                  {isPaying ? 'পেমেন্ট ভেরিফাই হচ্ছে...' : `${finalPrice} টাকা পেমেন্ট নিশ্চিত করুন`}
                </button>

              </form>
            </div>

            {/* Right side: Informative card (5 cols) */}
            <div className="md:col-span-12 lg:col-span-5 space-y-6">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold px-2.5 py-0.5 rounded font-sans uppercase">
                  How To Pay Guide
                </span>
                <h3 className="text-base font-bold text-zinc-100">ইনস্ট্যান্ট পেমেন্ট গাইডলাইন</h3>
                
                <ol className="text-xs space-y-3 text-zinc-300 list-decimal pl-4 leading-relaxed">
                  <li>প্রথমে আপনার বিকাশ, নগদ অথবা রকেট পার্সোনাল অ্যাকাউন্ট থেকে আমাদের মার্চেন্ট এজেন্ট নাম্বারে সেন্ড মানি বা ক্যাশ-ইন করুন: <code className="bg-zinc-950 text-orange-410 font-mono px-1 py-0.5 rounded">01723-456789</code></li>
                  <li>সফলভাবে সেন্ড মানি করার পর ট্রানজেকশন স্লিপ থেকে আপনার ৮-ডিজিটের ট্রানজেকশন ID (Tid) কপি করে নিন।</li>
                  <li>বামে ফর্ম ফিল-আপ করুন এবং আপনার ব্যবহৃত পেমেন্ট চ্যানেল নির্বাচন করে সেন্ডিং নাম্বার ও ট্রানজেকশন ID প্রবেশ করান।</li>
                  <li>"পেমেন্ট নিশ্চিত করুন" বাটনে ক্লিক করলে সঙ্গে সঙ্গে আপনার টিকিট ও ১০০ টাকা ক্যাশব্যাক ভাউচার পেয়ে যাবেন!</li>
                </ol>
              </div>

              <div className="bg-orange-950/10 border border-orange-500/10 p-5 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <Flame className="h-4 w-4" />
                  <span>ভেরিফিকেশন চেক ও ফাইনাল টার্মস</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  সব টিকিট ম্যানুয়ালি এবং কাস্টম এন্টিচিট কুয়েরি অনুযায়ী আইডি চেক করা হবে। কোনো ভুয়া ট্রানজেকশন আইডি প্রদান করা হলে অ্যাকাউন্ট সরাসরি আজীবনের জন্য ব্যান কারাদণ্ডে অভিযুক্ত হবে।
                </p>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
