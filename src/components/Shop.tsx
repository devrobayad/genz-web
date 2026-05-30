import React, { useState } from 'react';
import { Product, Order } from '../types';
import { ShoppingBag, CheckCircle2, Ticket, X, Trash2, ShoppingCart } from 'lucide-react';
import { mockProducts } from '../data/mockData';

interface ShopProps {
  onAddOrder: (order: Order) => void;
  players: any[];
}

export default function Shop({ onAddOrder, players }: ShopProps) {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal > 1500 ? 0 : 60; // Free shipping over 1500
  const finalDiscount = subtotal >= 1000 ? appliedDiscount : 0;
  const grandTotal = subtotal - finalDiscount + shippingFee;

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    // Auto reset discount state if subtotal falls or changes, to force validate subtotal
    setCouponError('');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(updated);
    setCouponError('');
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    setCouponError('');
  };

  // 100 TK coupon is valid ONLY for subtotals over 1000 TK!
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (subtotal < 1000) {
      setCouponError('কুপনটি ব্যবহার করতে হলে কমপক্ষে ১,০০০ টাকার পণ্য কিনতে হবে।');
      return;
    }

    const trimmed = couponCode.trim();
    if (!trimmed) {
      setCouponError('দয়া করে সঠিক কুপন কোড প্রবেশ করুন।');
      return;
    }

    // Verify if coupon represents a valid player coupon starting with 'CUP-' or lookup inside database players registration coupons
    const isValidPlayerCoupon = players.some(p => p.cashbackCoupon === trimmed && !p.cashbackCouponUsed) ||
                                trimmed.startsWith('CUP-') || trimmed === "B64DC100";

    if (isValidPlayerCoupon) {
      setAppliedDiscount(100);
      setCouponSuccess('কুপন কোড সফলভাবে যুক্ত হয়েছে! ১০০ টাকা ডিসকাউন্ট পেয়ে গেছেন।');
    } else {
      setCouponError('ভুল কুপন কোড অথবা এটি ইতিমধ্যেই ব্যবহৃত হয়েছে।');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !district || !address) {
      alert('দয়া করে চেকআউটের সকল তথ্য পূরণ করুন।');
      return;
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      customerName,
      phone,
      district,
      address,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal,
      discount: finalDiscount,
      total: grandTotal,
      couponUsed: finalDiscount > 0 ? couponCode : undefined,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save order
    onAddOrder(newOrder);
    setLastOrder(newOrder);

    // Reset everything
    setCart([]);
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponSuccess('');
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="bg-[#0c0a09] text-white py-10 px-4 min-h-screen" id="merchandise-shop-tab">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Head header segment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block font-mono">B64DC OFFICIAL STORE</span>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              অফিশিয়াল বি৬৪ডিসি শপ
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              ১০০% খাঁটি পণ্য কিনুন এবং আপনার ফ্রি ফায়ার রেজিস্ট্রেশন কুপন কোড রিডিম করুন!
            </p>
          </div>

          <div className="bg-[#1b120c] border border-orange-500/20 px-4 py-2.5 rounded-xl text-xs text-orange-400 font-medium">
            💡 <strong className="text-white">রিফান্ড বোনাস অফার:</strong> রেজিস্ট্রেশনের জন্য পেমেন্টকৃত ১০০ টাকার কুপন এখানে ১,০০০ টাকার বেশি কেনাকাটায় খাтать পারবেন।
          </div>
        </div>

        {/* Success message popup for last order */}
        {lastOrder && (
          <div className="bg-orange-950/15 border-2 border-orange-500/30 rounded-3xl p-6 text-center space-y-4 max-w-2xl mx-auto" id="order-success-banner">
            <CheckCircle2 className="h-12 w-12 text-orange-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-zinc-100 font-sans">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!</h3>
            <p className="text-xs text-zinc-450">
              অর্ডার ট্র্যাকিং আইডি: <strong className="text-white font-mono bg-zinc-950 px-2 py-1 rounded border border-zinc-800">{lastOrder.id}</strong>। খুব দ্রুত আমদের শপ ডেলিভারি এজেন্ট আপনার সাথে <strong>{lastOrder.phone}</strong> নাম্বারে যোগাযোগ করবেন।
            </p>
            <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-left text-xs font-mono max-w-md mx-auto">
              <p className="text-orange-400 font-bold font-sans">অর্ডার সামারি:</p>
              <div className="mt-2 divide-y divide-zinc-850/65">
                {lastOrder.items.map((it, idx) => (
                  <p key={idx} className="py-1 flex justify-between">
                    <span className="text-zinc-200">{it.productName} X {it.quantity}</span>
                    <span className="text-orange-400 font-bold">{it.price * it.quantity} Tk</span>
                  </p>
                ))}
                <p className="py-1 mt-1 font-bold text-zinc-300 flex justify-between border-t border-zinc-800">
                  <span>সর্বমোট (পেমেন্ট সিওডি):</span>
                  <span>{lastOrder.total} Tk</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setLastOrder(null)}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 text-xs font-black rounded-lg cursor-pointer hover:brightness-110 shadow-md shadow-orange-500/10"
            >
              নতুন শপিং শুরু করুন
            </button>
          </div>
        )}

        {/* Shop view: Product Grid on the Left, Shopping Bag on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Products Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" id="products-catalog">
            {mockProducts.map((product) => (
              <div 
                key={product.id} 
                id={`product-${product.id}`}
                className="bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl hover:border-zinc-700 transition flex flex-col justify-between"
              >
                
                {/* Product Image */}
                <div className="relative h-48 bg-zinc-950">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover origin-center opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-orange-400 font-sans uppercase">
                    {product.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-zinc-100">{product.name}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
                    <div>
                      <span className="block text-[10px] text-zinc-500 uppercase font-mono font-bold">Price Token</span>
                      <span className="block text-xl font-black text-orange-400 font-mono">{product.price} Tk</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-zinc-950 font-black text-xs rounded-xl flex items-center gap-1 transition-all"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Shopping bag / Checkout calculation Card (4 cols) */}
          <div className="lg:col-span-4" id="shopping-cart-sidebar">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6 shadow-2xl space-y-6 sticky top-20">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-extrabold text-zinc-200 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                  <span>শপিং ব্যাগ (Shopping Cart)</span>
                </h3>
                <span className="text-xs bg-zinc-950 text-zinc-400 font-mono font-bold px-2.5 py-1 rounded-full border border-zinc-850">
                  {cart.reduce((ac, it) => ac + it.quantity, 0)} Items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 flex flex-col items-center justify-center space-y-2">
                  <ShoppingCart className="h-10 w-10 text-zinc-700" />
                  <p className="text-xs">আপনার কার্টটি একদম খালি!</p>
                  <p className="text-[10px] text-zinc-650">পণ্য কিনতে বাম পাশের অফিশিয়াল ক্যাটাগরিগুলো থেকে বেছে নিন।</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart items list */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="bg-zinc-950 p-2.5 border border-zinc-850 rounded-2xl flex gap-3 justify-between items-center">
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-zinc-300 truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-orange-400 font-mono block mt-0.5">{item.product.price} Tk/pcs</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg">
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-xs text-zinc-450 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-1.5 text-xs font-mono font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-xs text-zinc-450 hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-orange-400 hover:text-orange-350 p-1"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Redeem registration cashback coupon code form */}
                  <form onSubmit={handleApplyCoupon} className="border-t border-b border-zinc-800 py-4 space-y-2">
                    <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1 font-sans">
                      <Ticket className="h-3 w-3 text-orange-500" />
                      <span>ক্যাশব্যাক কুপন কোড রিডিম করুন</span>
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="CUP-XXX অথবা B64DC100"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono uppercase tracking-wide focus:outline-none focus:border-orange-500/55"
                      />
                      <button
                        type="submit"
                        className="px-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold"
                      >
                        প্রয়োগ
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
                    {couponSuccess && <p className="text-[10px] text-orange-400 font-bold">{couponSuccess}</p>}
                    
                    {subtotal < 1000 && (
                      <p className="text-[9px] text-zinc-500 font-sans italic">
                        * ১০০ টাকার কুপন ব্যবহারের জন্য শপিং সাবটোটাল ১,০০০ টাকা অতিক্রম করতে হবে।
                      </p>
                    )}
                  </form>

                  {/* Calculations and sums */}
                  <div className="text-xs font-mono space-y-2">
                    <div className="flex justify-between text-zinc-400">
                      <span>সাবটোটাল (Subtotal):</span>
                      <span>{subtotal} Tk</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>ডেলিভারি চার্জ (Delivery):</span>
                      <span>{shippingFee === 0 ? <strong className="text-orange-400">FREE {`(>1500)`}</strong> : `${shippingFee} Tk`}</span>
                    </div>
                    {finalDiscount > 0 && (
                      <div className="flex justify-between text-orange-400 font-bold">
                        <span>কুপন ডিসকাউন্ট (Coupon):</span>
                        <span>- {finalDiscount} Tk</span>
                      </div>
                    )}
                    <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold font-sans">
                      <span className="text-white">সর্বমোট বিল (Total):</span>
                      <span className="text-orange-400 font-mono font-black">{grandTotal} Tk</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black text-center rounded-xl cursor-pointer shadow-lg shadow-orange-500/10 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    অর্ডার কনফার্ম করুন
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Checkout details Modal popup */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-6">
            
            <button 
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h3 className="text-lg font-bold text-zinc-100 font-sans">শিপিং তথ্য এবং কাস্টমার ফর্ম</h3>
              <p className="text-xs text-zinc-450 mt-1">অর্ডার নিশ্চিত করতে আপনার শিপিং ঠিকানা দিন। ক্যাশ অন ডেলিভারি (COD) পেমেন্ট প্রযোজ্য।</p>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">কাস্টমার নাম (Full Name)</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500/70"
                  placeholder="যেমন: Sabbir Hossain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">মোবাইল নাম্বার</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500/70"
                    placeholder="যেমন: 01712xxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">জেলা (District)</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500/70"
                    placeholder="যেমন: Bogra / ঢাকা"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">শিপিং ঠিকানা (Complete Address)</label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-orange-500/70"
                  placeholder="যেমন: হাউজ ১০, রোড ২, মিরপুর-১১, ঢাকা..."
                />
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-2xl flex justify-between text-xs border border-zinc-850 font-mono">
                <span className="text-zinc-500">পরিশোধযোগ্য বিল:</span>
                <strong className="text-orange-400">{grandTotal} Tk (COD)</strong>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-zinc-950 font-black text-center text-xs rounded-xl"
              >
                অর্ডার নিশ্চিত করুন (Confirm COD)
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
