import { useState } from 'react';
import { ArrowLeft, Search, Plus, X, Apple, Milk, Beef, Carrot } from 'lucide-react';
import type { Page } from '../App';

interface IngredientsPageProps {
  navigate: (page: Page) => void;
}

interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity?: string;
  expiryDate?: string;
}

export default function IngredientsPage({ navigate }: IngredientsPageProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '양파', category: '채소', quantity: '2개' },
    { id: '2', name: '돼지고기', category: '육류', quantity: '300g' },
    { id: '3', name: '계란', category: '유제품', quantity: '10개' },
    { id: '4', name: '김치', category: '절임', quantity: '500g' },
    { id: '5', name: '당근', category: '채소', quantity: '3개' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', category: '채소', quantity: '' });

  const categories = ['전체', '채소', '육류', '해산물', '유제품', '절임', '조미료'];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '채소':
        return <Carrot className="w-5 h-5" />;
      case '육류':
        return <Beef className="w-5 h-5" />;
      case '유제품':
        return <Milk className="w-5 h-5" />;
      default:
        return <Apple className="w-5 h-5" />;
    }
  };

  const filteredIngredients = ingredients.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || ing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddIngredient = () => {
    if (newIngredient.name) {
      setIngredients([
        ...ingredients,
        { ...newIngredient, id: Date.now().toString() }
      ]);
      setNewIngredient({ name: '', category: '채소', quantity: '' });
      setShowAddModal(false);
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
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
        <h1 className="text-2xl text-gray-800">재료 관리</h1>
        <div className="w-20" />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="재료 검색..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Add Ingredient Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full mb-6 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        <span>재료 추가</span>
      </button>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  {getCategoryIcon(ingredient.category)}
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">{ingredient.name}</h3>
                  <p className="text-sm text-gray-500">{ingredient.category}</p>
                  {ingredient.quantity && (
                    <p className="text-sm text-gray-600 mt-1">{ingredient.quantity}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveIngredient(ingredient.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>재료가 없습니다</p>
          <p className="text-sm mt-2">재료를 추가해보세요</p>
        </div>
      )}

      {/* Add Ingredient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-800">재료 추가</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">재료명</label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) =>
                    setNewIngredient({ ...newIngredient, name: e.target.value })
                  }
                  placeholder="예: 양파"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">카테고리</label>
                <select
                  value={newIngredient.category}
                  onChange={(e) =>
                    setNewIngredient({ ...newIngredient, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="채소">채소</option>
                  <option value="육류">육류</option>
                  <option value="해산물">해산물</option>
                  <option value="유제품">유제품</option>
                  <option value="절임">절임</option>
                  <option value="조미료">조미료</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">수량 (선택)</label>
                <input
                  type="text"
                  value={newIngredient.quantity}
                  onChange={(e) =>
                    setNewIngredient({ ...newIngredient, quantity: e.target.value })
                  }
                  placeholder="예: 2개, 300g"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                onClick={handleAddIngredient}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
