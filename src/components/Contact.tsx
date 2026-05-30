import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Shield, ExternalLink, ThumbsUp } from 'lucide-react';

export default function Contact({ isSection = false }: { isSection?: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    uid: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        uid: '',
        subject: 'General Inquiry',
        message: ''
      });
      // Clear success notification after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className={`bg-[#0c0a09] text-white py-[70px] px-4 ${isSection ? 'border-t border-zinc-900/60' : 'min-h-screen'}`} id="contact-tab-view">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC Support Center</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 font-sans">
            Contact Support
          </h1>
          <p className="text-zinc-400 text-sm">
            নিবন্ধন ফি ভেরিফিকেশন, ক্যাশআউট সমস্যা অথবা টুর্নামেন্ট টিম লাইন-আপ পরিবর্তন সংক্রান্ত যেকোনো সহায়তায় আমাদের সাথে আজই যোগাযোগ করুন।
          </p>
        </div>

        {/* 2-Column Contact Info & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Contact Methods / FAQ Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cards for Info */}
            <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-wider border-b border-zinc-850 pb-3 flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-orange-400" />
                <span>অফিশিয়াল কন্ট্যাক্ট চ্যানেল</span>
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* Channel 1 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-850 text-orange-500 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-350 text-xs uppercase tracking-wider font-sans">ইমেইল সাপোর্ট (Email)</h4>
                    <p className="text-zinc-200 mt-1 font-mono text-xs select-all">support@b64dc.com</p>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">২৪ ঘণ্টার মধ্যে রিপ্লাই পাবেন।</span>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-850 text-orange-400 shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-350 text-xs uppercase tracking-wider font-sans">লাইভ চ্যাট ও পেজ (Live Chat)</h4>
                    <p className="text-zinc-200 mt-1 text-xs">আমাদের অফিশিয়াল ফেসবুক পেজ মেসেঞ্জার</p>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-orange-450 hover:text-orange-400 text-xs font-bold mt-1.5"
                    >
                      <span>m.me/b64ffchampionship</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-850 text-orange-500 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-350 text-xs uppercase tracking-wider font-sans">অফিস ঠিকানা (Location)</h4>
                    <p className="text-zinc-400 mt-1 text-xs leading-relaxed">
                      মিরপুর ডিওএইচএস, এভিনিউ ৩, রোড ১১, ঢাকা ১২১৬, বাংলাদেশ।
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Policy Notice */}
            <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-850 space-y-2 text-xs">
              <h4 className="font-black text-orange-500 uppercase tracking-widest font-mono text-[10px]">⚠ গুরুত্বপূর্ন ভেরিফিকেশন নির্দেশিকা:</h4>
              <p className="text-zinc-405 leading-relaxed">
                টিকিট পেমেন্ট ও বিকাশ/নগদ রেফারার ক্যাশআউট বোনাস সংক্রান্ত যেকোনো অভিযোগ জানাতে ফর্ম পূরণের সময় সচল ক্যারেক্টার UID এবং আপনার পেমেন্ট ট্রানজেকশন স্ক্রিনশট সংগ্রহে রাখুন। আমাদের মডারেটর দল আপনাকে দ্রুত সাহায্য করবেন।
              </p>
            </div>

          </div>

          {/* Column 2: Interactive message form */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            
            <div className="border-b border-zinc-855 pb-4">
              <h3 className="text-base font-extrabold text-zinc-150">সেন্ড মেসেজ (Message Form)</h3>
              <p className="text-zinc-400 text-xs mt-1">
                নিচের ফর্মে আপনার মেসেজ লিখুন, আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
              </p>
            </div>

            {submitSuccess && (
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl text-center space-y-2 animate-fadeIn">
                <ThumbsUp className="h-8 w-8 text-orange-500 mx-auto" />
                <h4 className="font-bold text-orange-400 text-sm">ধন্যবাদ! মেসেজটি সফলভাবে পাঠানো হয়েছে।</h4>
                <p className="text-zinc-400 text-xs">আমাদের সাপোর্ট সহকারী খুব শীঘ্রই আপনার প্রদত্ত ইমেইল এ উত্তর প্রদান করবেন।</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">আপনার নাম (Name) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    placeholder="যেমন: রাফসান আহমেদ"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ইমেইল ঠিকানা (Email) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ফ্রি ফায়ার ক্যারেক্টার UID (ঐচ্ছিক)</label>
                  <input
                    type="number"
                    value={formData.uid}
                    onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-zinc-200 font-mono focus:outline-none focus:border-orange-500"
                    placeholder="যেমন: 28491040"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">বিষয় (Subject)</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
                  >
                    <option value="General Inquiry">সাধারণ জিজ্ঞাসা (General)</option>
                    <option value="Payment Verification">পেমেন্ট ও ভেরিফিকেশন সমস্যা</option>
                    <option value="Referral Reward">রেফারেল বোনাস বা ক্যাশআউট</option>
                    <option value="Merchant Partnership">শপ বা মার্চেন্ডাইজ পার্টনারশিপ</option>
                    <option value="Cheat Report">প্লেয়ার হ্যাক বা চিট রিপোর্ট</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">বিস্তারিত বার্তা (Message) *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="আপনার অভিযোগ, প্রশ্ন বা মতামত বিস্তারিত এখানে পরিষ্কার ভাষায় লিখুন..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>কন্ট্যাক্ট করুন (Submit Message)</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
