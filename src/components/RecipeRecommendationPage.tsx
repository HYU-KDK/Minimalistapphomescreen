import { useState } from 'react';
import { ArrowLeft, Clock, Flame, Star, Users, ChefHat } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page } from '../App';

interface RecipeRecommendationPageProps {
  navigate: (page: Page) => void;
  userProfile: any;
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  time: number;
  difficulty: number;
  spicyLevel: number;
  servings: number;
  calories: number;
  cuisine: string;
  availableIngredients: string[];
  missingIngredients: string[];
  substitutes?: { [key: string]: string };
}

export default function RecipeRecommendationPage({ navigate, userProfile }: RecipeRecommendationPageProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: '1',
      name: '김치볶음밥',
      image: 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBtZWFsfGVufDF8fHx8MTc2MjQwNzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      time: 15,
      difficulty: 1,
      spicyLevel: 2,
      servings: 1,
      calories: 420,
      cuisine: '한식',
      availableIngredients: ['김치', '밥', '계란', '참기름'],
      missingIngredients: [],
      substitutes: {}
    },
    {
      id: '2',
      name: '돼지고기 야채볶음',
      image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjIzNzcyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      time: 25,
      difficulty: 2,
      spicyLevel: 1,
      servings: 2,
      calories: 380,
      cuisine: '한식',
      availableIngredients: ['돼지고기', '양파', '당근'],
      missingIngredients: ['파프리카'],
      substitutes: { '파프리카': '피망 또는 생략' }
    },
    {
      id: '3',
      name: '계란말이',
      image: 'https://images.unsplash.com/photo-1617735605078-8a9336be0816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwaW5ncmVkaWVudHMlMjBraXRjaGVufGVufDF8fHx8MTc2MjM1NzI1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      time: 10,
      difficulty: 1,
      spicyLevel: 0,
      servings: 1,
      calories: 220,
      cuisine: '한식',
      availableIngredients: ['계란', '당근'],
      missingIngredients: ['대파'],
      substitutes: { '대파': '냉동 파 또는 양파' }
    }
  ];

  const renderDifficulty = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderSpicyLevel = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((chili) => (
          <Flame
            key={chili}
            className={`w-4 h-4 ${
              chili <= level ? 'text-red-500 fill-red-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (selectedRecipe) {
    return (
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => setSelectedRecipe(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>레시피 목록으로</span>
        </button>

        {/* Recipe Detail */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <ImageWithFallback
            src={selectedRecipe.image}
            alt={selectedRecipe.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <h1 className="text-3xl text-gray-800 mb-4">{selectedRecipe.name}</h1>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{selectedRecipe.time}분</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{selectedRecipe.servings}인분</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{selectedRecipe.calories} kcal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selectedRecipe.cuisine}</span>
              </div>
            </div>

            {/* Difficulty & Spicy */}
            <div className="flex gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">난이도</p>
                {renderDifficulty(selectedRecipe.difficulty)}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">맵기</p>
                {renderSpicyLevel(selectedRecipe.spicyLevel)}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h2 className="text-xl text-gray-800 mb-3">재료</h2>
              <div className="space-y-2">
                {selectedRecipe.availableIngredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-700">{ing}</span>
                    <span className="text-sm text-green-600">✓ 보유중</span>
                  </div>
                ))}
                {selectedRecipe.missingIngredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-700">{ing}</span>
                    <span className="text-sm text-orange-600">
                      → {selectedRecipe.substitutes?.[ing] || '필요'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Steps */}
            <div className="mb-6">
              <h2 className="text-xl text-gray-800 mb-3">조리 순서</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    1
                  </div>
                  <p className="text-gray-700 pt-1">재료를 준비하고 손질합니다.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    2
                  </div>
                  <p className="text-gray-700 pt-1">팬에 기름을 두르고 중불로 예열합니다.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    3
                  </div>
                  <p className="text-gray-700 pt-1">준비된 재료를 넣고 볶아줍니다.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    4
                  </div>
                  <p className="text-gray-700 pt-1">간을 맞추고 완성합니다.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate('chat')}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
              >
                AI에게 물어보기
              </button>
              <button className="px-6 border-2 border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl text-gray-800">AI 요리 추천</h1>
        <div className="w-20" />
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl mb-2">오늘의 추천 레시피</h2>
        <p className="text-orange-100">
          보유하신 재료로 만들 수 있는 맞춤 레시피를 준비했어요
        </p>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border border-gray-100"
          >
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg text-gray-800 mb-2">{recipe.name}</h3>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}분</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}인분</span>
                </div>
              </div>

              {/* Difficulty & Spicy */}
              <div className="flex gap-4 mb-3">
                {renderDifficulty(recipe.difficulty)}
                {renderSpicyLevel(recipe.spicyLevel)}
              </div>

              {/* Badge */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {recipe.cuisine}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  재료 {recipe.availableIngredients.length}개 보유
                </span>
                {recipe.missingIngredients.length > 0 && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    대체재 가능
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
