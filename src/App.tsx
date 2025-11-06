import { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfileSetupPage from './components/ProfileSetupPage';
import IngredientsPage from './components/IngredientsPage';
import RecipeRecommendationPage from './components/RecipeRecommendationPage';
import ChatPage from './components/ChatPage';
import TrendingPage from './components/TrendingPage';
import ReceiptScanPage from './components/ReceiptScanPage';

export type Page = 'home' | 'login' | 'profile-setup' | 'ingredients' | 'recipes' | 'chat' | 'trending' | 'receipt-scan';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setCurrentPage('profile-setup');
  };

  const handleProfileSetup = (profile: any) => {
    setUserProfile(profile);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} />;
      case 'login':
        return <LoginPage navigate={navigate} onLogin={handleLogin} />;
      case 'profile-setup':
        return <ProfileSetupPage navigate={navigate} onComplete={handleProfileSetup} />;
      case 'ingredients':
        return <IngredientsPage navigate={navigate} />;
      case 'recipes':
        return <RecipeRecommendationPage navigate={navigate} userProfile={userProfile} />;
      case 'chat':
        return <ChatPage navigate={navigate} />;
      case 'trending':
        return <TrendingPage navigate={navigate} />;
      case 'receipt-scan':
        return <ReceiptScanPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {renderPage()}
    </div>
  );
}

export default App;
