import { 
  User, 
  ShoppingBasket, 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  Receipt,
  ChefHat,
  LogIn
} from 'lucide-react';
import type { Page } from '../App';

interface HomePageProps {
  navigate: (page: Page) => void;
  isLoggedIn: boolean;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  page: Page;
  color: string;
}

export default function HomePage({ navigate, isLoggedIn }: HomePageProps) {
  const features: FeatureCard[] = [
    {
      icon: <User className="w-12 h-12" />,
      title: '프로필',
      description: '맞춤 설정',
      page: 'profile-setup',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <ShoppingBasket className="w-12 h-12" />,
      title: '재료 관리',
      description: '냉장고 속 재료',
      page: 'ingredients',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'AI 추천',
      description: '오늘의 레시피',
      page: 'recipes',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: '요리 채팅',
      description: 'AI 어시스턴트',
      page: 'chat',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: '인기 요리',
      description: '트렌드 레시피',
      page: 'trending',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: <Receipt className="w-12 h-12" />,
      title: '영수증 스캔',
      description: '자동 재료 등록',
      page: 'receipt-scan',
      color: 'from-amber-400 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4">
          <ChefHat className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-5xl mb-3 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
          오마이쿡
        </h1>
        <p className="text-gray-600 text-lg">
          냉장고 재료로 만드는 AI 맞춤 레시피
        </p>
      </div>

      {/* Login Button - Only show if not logged in */}
      {!isLoggedIn && (
        <button
          onClick={() => navigate('login')}
          className="mb-12 flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          <span>로그인 / 회원가입</span>
        </button>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => navigate(feature.page)}
            className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
          >
            {/* Icon Container */}
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:rotate-12 transition-transform duration-300`}>
              {feature.icon}
            </div>
            
            {/* Text */}
            <h3 className="text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500">
              {feature.description}
            </p>

            {/* Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-sm text-gray-400">
        <p>재료를 선택하고 AI가 추천하는 레시피를 만나보세요</p>
      </div>
    </div>
  );
}
