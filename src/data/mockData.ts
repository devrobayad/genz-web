import { Player, Match, Product, FaqItem, ReferralUser } from '../types';

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    name: "Official B64DC Esports Jersey 2026",
    price: 1200,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=400",
    description: "Premium breathable polyester tournament jersey with high-quality 64 district emblem print. Perfect for competitive gaming sessions.",
    category: "Jersey",
    stock: 250
  },
  {
    id: "prod_2",
    name: "HyperGrip Pro Gaming Sleeves (Pair)",
    price: 350,
    image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=400",
    description: "Sweat-absorbent gaming compression sleeves for ultra-smooth screen swiping and wrist support during Free Fire matches.",
    category: "Sleeves",
    stock: 500
  },
  {
    id: "prod_3",
    name: "Championship Edition Elite Cap",
    price: 499,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400",
    description: "Styled snapback cap featuring the gold-embossed Bangladesh 64 District Tournament tournament logo on the front.",
    category: "Cap",
    stock: 120
  },
  {
    id: "prod_4",
    name: "B64DC XXL Control-Glide Mousepad",
    price: 1100,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400",
    description: "Gigantic desk-mat (900mm x 400mm) optimized for both speed and tracking precision during competitive tournament operations.",
    category: "Mousepad",
    stock: 80
  },
  {
    id: "prod_5",
    name: "Ultimate Elite Champion Hoodie",
    price: 1800,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400",
    description: "Comfortable organic cotton heavy-knit hoodie with neon crimson visual design, custom sleeve tags, and comfortable hood.",
    category: "Hoodie",
    stock: 60
  }
];

export const mockFaqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I participate in Solo mode matches?",
    banglaQuestion: "০১. Solo মোড",
    answer: "Every match is played in Solo Mode. Custom rooms will be generated and you must join individually. Team or squad modes are not allowed.",
    banglaAnswer: "প্রতিটি ম্যাচ Solo মোডে খেলতে হবে। টিম বা স্কোয়াড মোড অনুমোদিত নয়।"
  },
  {
    id: 2,
    question: "What is the point system calculation?",
    banglaQuestion: "০২. পয়েন্ট সিস্টেম",
    answer: "Each kill is worth 1 point. Placement points are awarded as: 1st = 10 pts, 2nd = 6 pts, 3rd = 5 pts, 4th = 4 pts, 5th = 3 pts, etc.",
    banglaAnswer: "প্রতিটি Kill = ১ পয়েন্ট + Placement পয়েন্ট (১ম=১০, ২য়=৬, ৩য়=৫, ৪র্থ=৪, ৫ম=৩...)।"
  },
  {
    id: 3,
    question: "Can I play on behalf of another district?",
    banglaQuestion: "০৩. নিজ জেলায় খেলা",
    answer: "Every player must participate in the qualifiers for their own registered district.",
    banglaAnswer: "প্রত্যেক প্লেয়ারকে নিজের জেলার কোয়ালিফায়ারে অংশ নিতে হবে।"
  },
  {
    id: 4,
    question: "How many Free Fire accounts can I use?",
    banglaQuestion: "০৪. এক অ্যাকাউন্ট",
    answer: "A player can register and play with only one Free Fire account.",
    banglaAnswer: "একজন প্লেয়ার মাত্র একটি Free Fire অ্যাকাউন্ট দিয়ে রেজিস্ট্রেশন করতে পারবে।"
  },
  {
    id: 5,
    question: "What happens in a tie-breaker situation?",
    banglaQuestion: "০৫. টাই ব্রেকার",
    answer: "In case of equal points, the player with the higher number of kills will be ahead. If still tied, Survival Time will be considered.",
    banglaAnswer: "সমান পয়েন্ট হলে বেশি Kill যার সে এগিয়ে থাকবে। তারপরও সমান হলে Survival Time বিবেচ্য।"
  },
  {
    id: 6,
    question: "What happens if I miss the match start schedule?",
    banglaQuestion: "০৬. সময়মতো যোগ দেওয়া",
    answer: "If you are not present in the lobby within the scheduled match start time, you will be disqualified.",
    banglaAnswer: "ম্যাচ শুরুর নির্ধারিত সময়ের মধ্যে লবিতে না থাকলে ডিসকোয়ালিফাই।"
  },
  {
    id: 7,
    question: "What is the penalty for cheating or hacking?",
    banglaQuestion: "০৭. চিটিং নিষিদ্ধ",
    answer: "Using hacks, cheats, mods, or third-party software will result in a permanent ban.",
    banglaAnswer: "হ্যাক, চিট, মড বা তৃতীয় পক্ষের সফটওয়্যার ব্যবহার করলে স্থায়ীভাবে নিষিদ্ধ।"
  },
  {
    id: 8,
    question: "Is UID verification mandatory?",
    banglaQuestion: "০৮. UID যাচাই",
    answer: "You must provide your correct Free Fire UID during registration. Registration with incorrect UID will be canceled.",
    banglaAnswer: "রেজিস্ট্রেশনে সঠিক Free Fire UID দিতে হবে। ভুল UID দিলে রেজিস্ট্রেশন বাতিল হবে।"
  },
  {
    id: 9,
    question: "Can I register multiple times?",
    banglaQuestion: "০৯. একাধিক রেজিস্ট্রেশন নিষেধ",
    answer: "If the same player registers with multiple accounts, both registrations will be canceled.",
    banglaAnswer: "একই প্লেয়ার একাধিক অ্যাকাউন্টে রেজিস্ট্রেশন করলে উভয় বাতিল হবে।"
  },
  {
    id: 10,
    question: "Who holds the final authority over disputes?",
    banglaQuestion: "১০. চূড়ান্ত সিদ্ধান্ত",
    answer: "The decision of the organizing authority will be considered final in all matters.",
    banglaAnswer: "যেকোনো বিষয়ে আয়োজক কর্তৃপক্ষের সিদ্ধান্ত চূড়ান্ত বলে বিবেচিত হবে।"
  }
];

export const mockPlayers: Player[] = [
  {
    uid: "84729104",
    name: "Sabbir Hossain",
    phone: "01712345678",
    district: "Dhaka",
    myReferralCode: "SABBIR84",
    totalReferrals: 112,
    registeredAt: "2026-05-25T10:00:00Z",
    isVerified: true,
    scoreKills: 45,
    scorePlacementPoints: 35,
    totalPoints: 80,
    hasPaid: true,
    cashbackCoupon: "CUP-SAB-8472",
    cashbackCouponUsed: false,
    referralCodeUsed: "RAFIQ442"
  },
  {
    uid: "91384029",
    name: "Tahmid Rahman",
    phone: "01823456789",
    district: "Chittagong",
    myReferralCode: "TAHMID91",
    totalReferrals: 104,
    registeredAt: "2026-05-26T11:30:00Z",
    isVerified: true,
    scoreKills: 38,
    scorePlacementPoints: 30,
    totalPoints: 68,
    hasPaid: true,
    cashbackCoupon: "CUP-TAH-9138",
    cashbackCouponUsed: true,
    referralCodeUsed: ""
  },
  {
    uid: "33849102",
    name: "Zidan Sheikh",
    phone: "01934567890",
    district: "Rajshahi",
    myReferralCode: "ZIDAN33",
    totalReferrals: 95,
    registeredAt: "2026-05-27T08:15:00Z",
    isVerified: true,
    scoreKills: 48,
    scorePlacementPoints: 20,
    totalPoints: 68,
    hasPaid: true,
    cashbackCoupon: "CUP-ZID-3384",
    cashbackCouponUsed: false,
    referralCodeUsed: "SABBIR84"
  },
  {
    uid: "77283940",
    name: "Kazi Nabil",
    phone: "01545678901",
    district: "Khulna",
    myReferralCode: "NABIL77",
    totalReferrals: 100,
    registeredAt: "2026-05-27T14:20:00Z",
    isVerified: true,
    scoreKills: 32,
    scorePlacementPoints: 25,
    totalPoints: 57,
    hasPaid: true,
    cashbackCoupon: "CUP-NAB-7728",
    cashbackCouponUsed: false,
    referralCodeUsed: "SABBIR84"
  },
  {
    uid: "11029485",
    name: "Maherab Habib",
    phone: "01656789012",
    district: "Bogra",
    myReferralCode: "MAHER11",
    totalReferrals: 120,
    registeredAt: "2026-05-24T09:10:00Z",
    isVerified: true,
    scoreKills: 30,
    scorePlacementPoints: 24,
    totalPoints: 54,
    hasPaid: true,
    cashbackCoupon: "CUP-MAH-1102",
    cashbackCouponUsed: false,
    referralCodeUsed: "TAHMID91"
  },
  {
    uid: "44920194",
    name: "Sajjad Hossain",
    phone: "01367890123",
    district: "Sylhet",
    myReferralCode: "SAJJAD44",
    totalReferrals: 45,
    registeredAt: "2026-05-27T16:00:00Z",
    isVerified: true,
    scoreKills: 28,
    scorePlacementPoints: 18,
    totalPoints: 46,
    hasPaid: true,
    cashbackCoupon: "CUP-SAJ-4492",
    cashbackCouponUsed: false,
    referralCodeUsed: "NABIL77"
  },
  {
    uid: "66184029",
    name: "Arafat Islam",
    phone: "01787654321",
    district: "Barisal",
    myReferralCode: "ARAFAT66",
    totalReferrals: 38,
    registeredAt: "2026-05-28T12:05:00Z",
    isVerified: true,
    scoreKills: 20,
    scorePlacementPoints: 22,
    totalPoints: 42,
    hasPaid: true,
    cashbackCoupon: "CUP-ARA-6618",
    cashbackCouponUsed: false,
    referralCodeUsed: "MAHER11"
  },
  {
    uid: "55284019",
    name: "Yeasin Arafat",
    phone: "01811223344",
    district: "Rangpur",
    myReferralCode: "YEASIN55",
    totalReferrals: 82,
    registeredAt: "2026-05-28T15:40:00Z",
    isVerified: true,
    scoreKills: 18,
    scorePlacementPoints: 15,
    totalPoints: 33,
    hasPaid: true,
    cashbackCoupon: "CUP-YEA-5528",
    cashbackCouponUsed: false,
    referralCodeUsed: ""
  }
];

export const mockMatches: Match[] = [
  {
    id: "match_1",
    title: "Bogra District Solo Elimination Qualifier",
    round: "Elimination",
    district: "Bogra",
    status: "ended",
    date: "2026-05-28",
    time: "15:00",
    lobbyId: "904812",
    password: "bogra-freefire",
    results: [
      { playerUid: "11029485", playerName: "Maherab Habib", district: "Bogra", kills: 9, placement: 1, points: 19 },
      { playerUid: "88990011", playerName: "Anik Rahman", district: "Bogra", kills: 6, placement: 2, points: 12 },
      { playerUid: "88990022", playerName: "Noyon Islam", district: "Bogra", kills: 5, placement: 3, points: 10 },
      { playerUid: "88990033", playerName: "Fahim Shahriar", district: "Bogra", kills: 3, placement: 4, points: 7 },
      { playerUid: "88990044", playerName: "Siam Sakib", district: "Bogra", kills: 4, placement: 5, points: 7 }
    ]
  },
  {
    id: "match_2",
    title: "Dhaka District Elimination Battle - Group A",
    round: "Elimination",
    district: "Dhaka",
    status: "live",
    date: "2026-05-29",
    time: "20:00",
    lobbyId: "910543",
    password: "dhaka-solo-9",
    results: []
  },
  {
    id: "match_3",
    title: "Chittagong District Solo Elimination - Arena 2",
    round: "Elimination",
    district: "Chittagong",
    status: "upcoming",
    date: "2026-05-30",
    time: "16:00",
    lobbyId: "912440",
    password: "ctg-esports",
    results: []
  },
  {
    id: "match_4",
    title: "Rajshahi Division Playoff - Round 1",
    round: "Elimination",
    district: "Rajshahi",
    status: "upcoming",
    date: "2026-05-30",
    time: "18:30",
    lobbyId: "915802",
    password: "raj-ff-33",
    results: []
  },
  {
    id: "match_5",
    title: "64 District Championship Grand Final - Round 1",
    round: "Grand Final",
    status: "upcoming",
    date: "2026-06-05",
    time: "21:00"
  }
];

export const mockReferralStats: ReferralUser[] = [
  { rank: 1, name: "Maherab Habib", district: "Bogra", referralCode: "MAHER11", totalReferrals: 120, weeklyReferrals: 110, smartphoneQualified: true },
  { rank: 2, name: "Sabbir Hossain", district: "Dhaka", referralCode: "SABBIR84", totalReferrals: 112, weeklyReferrals: 105, smartphoneQualified: true },
  { rank: 3, name: "Tahmid Rahman", district: "Chittagong", referralCode: "TAHMID91", totalReferrals: 104, weeklyReferrals: 102, smartphoneQualified: true },
  { rank: 4, name: "Kazi Nabil", district: "Khulna", referralCode: "NABIL77", totalReferrals: 100, weeklyReferrals: 100, smartphoneQualified: true },
  { rank: 5, name: "Zidan Sheikh", district: "Rajshahi", referralCode: "ZIDAN33", totalReferrals: 95, weeklyReferrals: 94, smartphoneQualified: false }, // Failed the qualifying requirement (>100 referrals in a week)
  { rank: 6, name: "Yeasin Arafat", district: "Rangpur", referralCode: "YEASIN55", totalReferrals: 82, weeklyReferrals: 68, smartphoneQualified: false },
  { rank: 7, name: "Sajjad Hossain", district: "Sylhet", referralCode: "SAJJAD44", totalReferrals: 45, weeklyReferrals: 30, smartphoneQualified: false },
  { rank: 8, name: "Arafat Islam", district: "Barisal", referralCode: "ARAFAT66", totalReferrals: 38, weeklyReferrals: 25, smartphoneQualified: false }
];
