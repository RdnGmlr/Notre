import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { BottomNavbar } from './components/layout/BottomNavbar';
import type { TabType } from './components/layout/BottomNavbar';
import { SplashScreen } from './screens/SplashScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CartScreen } from './screens/CartScreen';
import { PaymentQRISScreen } from './screens/PaymentQRISScreen';
import { OrderTicketScreen } from './screens/OrderTicketScreen';
import { ProfileScreen } from './screens/ProfileScreen';

type AppView = 'splash' | 'auth' | 'home' | 'cart' | 'payment' | 'ticket' | 'profile';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('splash');

  // Check if authenticated in current session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('order_socielle_session_auth') === 'true';
  });

  const [selectedTicketOrderId, setSelectedTicketOrderId] = useState<string | undefined>(undefined);

  // Splash Screen Transition: immediately goes to Auth screen when app opens
  const handleSplashFinish = () => {
    if (!isAuthenticated) {
      setCurrentView('auth');
    } else {
      setCurrentView('home');
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('order_socielle_session_auth', 'true');
    localStorage.setItem('order_socielle_auth', 'true');
    setCurrentView('home');
  };

  const handleSkipAsGuest = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('order_socielle_session_auth', 'true');
    localStorage.setItem('order_socielle_auth', 'guest');
    setCurrentView('home');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('order_socielle_session_auth');
    localStorage.removeItem('order_socielle_auth');
    setIsAuthenticated(false);
    setCurrentView('auth');
  };

  // Map view to bottom navbar active tab
  const getActiveTab = (): TabType => {
    if (currentView === 'cart') return 'cart';
    if (currentView === 'profile' || currentView === 'ticket') return 'profile';
    return 'home';
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentView(tab);
  };

  const isMainAppView = ['home', 'cart', 'ticket', 'profile'].includes(currentView);

  return (
    <CartProvider>
      <MobileContainer
        navbar={
          isMainAppView ? (
            <BottomNavbar
              activeTab={getActiveTab()}
              onTabChange={handleTabChange}
            />
          ) : undefined
        }
      >
        {/* Splash Screen */}
        {currentView === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}

        {/* Auth Screen (Login / Register / OTP) */}
        {currentView === 'auth' && (
          <AuthScreen
            onSuccess={handleAuthSuccess}
            onSkipAsGuest={handleSkipAsGuest}
          />
        )}

        {/* Active Screen View */}
        <div className="flex-1 flex flex-col">
          {currentView === 'home' && <HomeScreen />}

          {currentView === 'cart' && (
            <CartScreen
              onBackToHome={() => setCurrentView('home')}
              onProceedToPayment={() => setCurrentView('payment')}
            />
          )}

          {currentView === 'payment' && (
            <PaymentQRISScreen
              onBack={() => setCurrentView('cart')}
              onPaymentSuccess={() => {
                setSelectedTicketOrderId(undefined);
                setCurrentView('ticket');
              }}
            />
          )}

          {currentView === 'ticket' && (
            <OrderTicketScreen
              orderId={selectedTicketOrderId}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'profile' && (
            <ProfileScreen
              onSelectOrderTicket={(orderId) => {
                setSelectedTicketOrderId(orderId);
                setCurrentView('ticket');
              }}
              onGoToHome={() => setCurrentView('home')}
              onLogout={handleLogout}
            />
          )}
        </div>
      </MobileContainer>
    </CartProvider>
  );
}

export default App;
