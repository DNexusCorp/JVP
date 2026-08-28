import React, { useState, useEffect } from 'react';
import { Diamond, ArrowRight, Sparkles, Star } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from './data/products';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ValueProps } from './components/ValueProps';
import { CategoryStrip } from './components/CategoryStrip';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShopView } from './components/ShopView';
import { TrackOrderView } from './components/TrackOrderView';
import { PujaGuideView } from './components/PujaGuideView';
import { WishlistView, ContactModal } from './components/InfoModals';
import { Footer } from './components/Footer';
import { DivineLoader } from './components/Loader';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Show pristine divine splash loader on initial load with smooth handover to main content
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  
  // Cart state
  const [cartItems, setCartItems] = useState([
    { product: PRODUCTS[0], quantity: 1 } // Pre-seed 1 Tulasi Mala for immediate interactive feel
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([PRODUCTS[1]]); // Pre-seed Karungali

  // Modal states
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your Sacred Cart! 🌸`);
  };

  const handleUpdateCartQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from Wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to Sacred Wishlist! ❤️`);
    }
  };

  const handleBuyNow = (product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleNavigate = (view, categorySlug) => {
    setCurrentView(view);
    if (categorySlug !== undefined) {
      setSelectedCategory(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setCurrentView('shop');
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularProducts = PRODUCTS.slice(0, 5); // 5 popular products matching the original layout

  return (
    <div className="min-h-screen flex flex-col antialiased text-[#191c1e] bg-[#EBF1FF]">
      
      {/* Pristine Animated Divine Splash Loader */}
      {isInitialLoading && (
        <DivineLoader 
          message="Consecrating Divine Living..." 
          subMessage="JVP Spirituals • Authentic & Energized"
        />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00254d] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 border border-[#fdc34d]/40 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#fdc34d]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Branding */}
      <TopHeader
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Primary Category Navigation Bar */}
      <Navbar
        currentView={currentView}
        activeCategory={selectedCategory}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full pb-12">

            {/* Hero Section */}
            <HeroSlider
              onNavigate={handleNavigate}
              onShopNow={(slug) => {
                setSelectedCategory(slug || null);
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
        
        {/* VIEW 1: HOME VIEW */}
        {currentView === 'home' && (
          <div className="animate-fadeIn bg-[#EBF1FF] rounded-2xl p-2 sm:p-4 md:p-6 mb-8">
            
            

            {/* Value Proposition Bar (6 Trust Badges) */}
            <ValueProps />

            {/* Category Quick-Links (Circular Carousel) */}
            <CategoryStrip
              selectedCategory={selectedCategory}
              onSelectCategory={(slug) => {
                setSelectedCategory(slug);
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* POPULAR PRODUCTS Section */}
            <section className="mb-14 px-4 md:px-0">
              
              {/* Section Header with Diamonds */}
              <div className="flex items-center justify-between mb-8 border-b border-[#e0e3e5] pb-3">
                <div className="flex items-center gap-4 mx-auto md:mx-0">
                  <div className="w-12 md:w-16 h-[1px] bg-[#00254d]/30 hidden sm:block"></div>
                  <Diamond className="w-4 h-4 md:w-5 md:h-5 text-[#00254d] fill-[#00254d]" />
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#00254d] uppercase tracking-wider text-center">
                    Popular Products
                  </h2>
                  <Diamond className="w-4 h-4 md:w-5 md:h-5 text-[#00254d] fill-[#00254d]" />
                  <div className="w-12 md:w-16 h-[1px] bg-[#00254d]/30 hidden sm:block"></div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hidden md:flex items-center gap-1.5 text-[#00254d] font-bold text-xs hover:text-[#003b73] transition-colors border border-[#00254d]/20 px-4 py-1.5 rounded-full bg-white shadow-xs cursor-pointer"
                  id="home-view-all-popular-btn"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 5-Column Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {popularProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((p) => p.id === product.id)}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="mt-6 text-center md:hidden">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full bg-white text-[#00254d] font-bold text-xs border border-[#00254d] py-2.5 rounded-full"
                >
                  View All Products →
                </button>
              </div>

            </section>

            {/* Featured Highlight: Consecrated Vastu & Brass Idols Banner */}
            <section className="mb-14 px-4 md:px-0">
              <div className="bg-gradient-to-r from-[#00254d] via-[#00346b] to-[#00254d] text-white rounded-xl p-6 md:p-10 ethereal-shadow relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 bg-[#fdc34d] text-[#271900] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Vastu & Home Sanctum</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-2">
                    Rectify Architectural Doshas with Jalasthana Vastu Perumal
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 mb-6 leading-relaxed">
                    Sculpted in pure brass and energized with Purusha Sukta Archana. Installing in the North-East aquatic sector transforms domestic peace, resolves monetary stagnation, and attracts auspicious harmony.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => {
                        setSelectedCategory('vastu-products');
                        setCurrentView('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#fdc34d] text-[#271900] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#ffdea6] transition-colors cursor-pointer shadow-md"
                    >
                      Explore Vastu Artifacts
                    </button>
                    <button
                      onClick={() => handleNavigate('puja-guide')}
                      className="text-white hover:text-[#fdc34d] font-bold text-xs underline px-3 py-2 cursor-pointer"
                    >
                      Read Vastu Directions Guide →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Devotee Testimonials */}
            <section className="mb-14 px-4 md:px-0">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#00254d]">
                  Blessed Words from Devotees
                </h3>
                <p className="text-xs text-[#434750] mt-1">
                  Trusted by thousands of spiritual seekers across India and worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white p-5 rounded-lg ethereal-shadow border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-[#434750] italic leading-relaxed mb-4">
                        "{t.comment}"
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#00254d]">{t.name}</p>
                        <p className="text-[11px] text-gray-500">{t.location}</p>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Verified Devotee
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: SHOP / CATALOG VIEW */}
        {currentView === 'shop' && (
          <ShopView
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((p) => p.id)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {/* VIEW 3: TRACK ORDER VIEW */}
        {currentView === 'track-order' && (
          <TrackOrderView />
        )}

        {/* VIEW 4: PUJA & VASTU ADVISOR GUIDE */}
        {currentView === 'puja-guide' && (
          <PujaGuideView
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* VIEW 5: WISHLIST VIEW */}
        {currentView === 'wishlist' && (
          <WishlistView
            items={wishlist}
            onAddToCart={handleAddToCart}
            onRemoveFromWishlist={(id) => {
              setWishlist((prev) => prev.filter((p) => p.id !== id));
            }}
            onQuickView={(p) => setQuickViewProduct(p)}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => {
          setSelectedCategory(null);
          setCurrentView('shop');
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(orderId, address, total) => {
          // Clear cart on successful order
          setCartItems([]);
        }}
        onNavigate={handleNavigate}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
      />

      {/* Contact & Support Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

    </div>
  );
}
