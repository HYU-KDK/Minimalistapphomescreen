import { useState } from 'react';
import { ArrowLeft, TrendingUp, Eye, Heart, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page } from '../App';

interface TrendingPageProps {
  navigate: (page: Page) => void;
}

interface TrendingRecipe {
  id: string;
  rank: number;
  name: string;
  image: string;
  views: number;
  likes: number;
  time: number;
  servings: number;
  cuisine: string;
  badge?: string;
}

export default function TrendingPage({ navigate }: TrendingPageProps) {
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('week');

  const trendingRecipes: TrendingRecipe[] = [
    {
      id: '1',
      rank: 1,
      name: '김치찌개',
      image: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGV3JTIwamppZ2FlfGVufDF8fHx8MTc2MjMyNTAzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      views: 15234,
      likes: 3421,
      time: 30,
      servings: 2,
      cuisine: '한식',
      badge: '이번 주 1위'
    },
    {
      id: '2',
      rank: 2,
      name: '크림 파스타',
      image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NjIzMzI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 12890,
      likes: 2876,
      time: 25,
      servings: 2,
      cuisine: '양식',
      badge: '급상승'
    },
    {
      id: '3',
      rank: 3,
      name: '라멘',
      image: 'https://images.unsplash.com/photo-1697652974652-a2336106043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJhbWVuJTIwYm93bHxlbnwxfHx8fDE3NjI0MDUyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 11234,
      likes: 2543,
      time: 20,
      servings: 1,
      cuisine: '일식',
      badge: '인기'
    },
    {
      id: '4',
      rank: 4,
      name: '김치볶음밥',
      image: 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBtZWFsfGVufDF8fHx8MTc2MjQwNzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      views: 9876,
      likes: 2134,
      time: 15,
      servings: 1,
      cuisine: '한식'
    },
    {
      id: '5',
      rank: 5,
      name: '야채볶음',
      image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjIzNzcyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 8765,
      likes: 1987,
      time: 20,
      servings: 2,
      cuisine: '한식'
    },
    {
      id: '6',
      rank: 6,
      name: '비빔밥',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwYmliaW1iYXB8ZW58MXx8fHwxNzYyMzAxMDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 7654,
      likes: 1765,
      time: 25,
      servings: 1,
      cuisine: '한식'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>홈으로</span>
        </button>
        <h1 className="text-2xl text-gray-800">인기 요리</h1>
        <div className="w-20" />
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTimeFilter('day')}
          className={`px-4 py-2 rounded-full transition-all ${
            timeFilter === 'day'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
          }`}
        >
          오늘
        </button>
        <button
          onClick={() => setTimeFilter('week')}
          className={`px-4 py-2 rounded-full transition-all ${
            timeFilter === 'week'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
          }`}
        >
          이번 주
        </button>
        <button
          onClick={() => setTimeFilter('month')}
          className={`px-4 py-2 rounded-full transition-all ${
            timeFilter === 'month'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
          }`}
        >
          이번 달
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 mb-8 flex items-center gap-4">
        <TrendingUp className="w-12 h-12" />
        <div>
          <h2 className="text-xl mb-1">요즘 가장 핫한 레시피</h2>
          <p className="text-orange-100 text-sm">
            다른 사용자들이 가장 많이 만든 인기 요리를 확인해보세요
          </p>
        </div>
      </div>

      {/* Top 3 - Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trendingRecipes.slice(0, 3).map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border border-gray-100 relative"
          >
            {/* Rank Badge */}
            <div className={`absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center ${getRankColor(recipe.rank)}`}>
              <span className="text-2xl">{recipe.rank}</span>
            </div>

            {recipe.badge && (
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                {recipe.badge}
              </div>
            )}

            <ImageWithFallback
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg text-gray-800 mb-3">{recipe.name}</h3>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatNumber(recipe.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{formatNumber(recipe.likes)}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}분</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}인분</span>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {recipe.cuisine}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rest - Compact List */}
      <div className="space-y-4">
        {trendingRecipes.slice(3).map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-gray-100"
          >
            <div className="flex">
              {/* Rank */}
              <div className={`flex-shrink-0 w-20 flex items-center justify-center bg-gray-50 ${getRankColor(recipe.rank)}`}>
                <span className="text-3xl">{recipe.rank}</span>
              </div>

              {/* Image */}
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.name}
                className="flex-shrink-0 w-32 h-32 object-cover"
              />

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg text-gray-800 mb-2">{recipe.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(recipe.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>{formatNumber(recipe.likes)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}인분</span>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    {recipe.cuisine}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
