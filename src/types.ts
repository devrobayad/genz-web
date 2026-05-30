export interface Player {
  uid: string; // Free Fire User ID
  name: string;
  phone: string;
  district: string;
  referralCodeUsed?: string;
  myReferralCode: string;
  totalReferrals: number;
  registeredAt: string;
  isVerified: boolean;
  scoreKills: number;
  scorePlacementPoints: number;
  totalPoints: number;
  hasPaid: boolean;
  cashbackCoupon: string;
  cashbackCouponUsed: boolean;
}

export interface Match {
  id: string;
  title: string;
  round: 'Elimination' | 'Quarter Final' | 'Semi Final' | 'Grand Final';
  district?: string; // For elimination matches
  status: 'upcoming' | 'live' | 'ended';
  date: string;
  time: string;
  lobbyId?: string;
  password?: string;
  results?: MatchResult[];
}

export interface MatchResult {
  playerUid: string;
  playerName: string;
  district: string;
  kills: number;
  placement: number; // 1, 2, 3...
  points: number; // calculated kills + placement points
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Jersey' | 'Sleeves' | 'Cap' | 'Mousepad' | 'Hoodie';
  stock: number;
}

export interface Order {
  id: string;
  playerUid?: string;
  customerName: string;
  phone: string;
  district: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  couponUsed?: string;
  status: 'Pending' | 'Shipped' | 'Deliverd';
  createdAt: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  banglaQuestion: string;
  banglaAnswer: string;
}

export interface ReferralUser {
  rank: number;
  name: string;
  district: string;
  referralCode: string;
  totalReferrals: number;
  weeklyReferrals: number;
  smartphoneQualified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  time: string;
}

export interface SupportChat {
  id: string; // can be player uid or a guest id
  userName: string;
  userUid?: string;
  messages: ChatMessage[];
  lastUpdated: string;
  unreadByAdmin: boolean;
  unreadByUser: boolean;
}

export interface NavItemConfig {
  id: string;
  label: string;
}

export interface HeaderConfig {
  logoText: string;
  logoSubtitle: string;
  logoIcon: 'Trophy' | 'Swords' | 'Award' | 'Shield' | 'Users' | 'None';
  logoImg?: string;
  navItems: NavItemConfig[];
  showActionButton: boolean;
  actionButtonText: string;
  actionButtonLink: string;
}


