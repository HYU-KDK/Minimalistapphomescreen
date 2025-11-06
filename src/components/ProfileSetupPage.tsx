import { useState } from 'react';
import { ArrowLeft, ChefHat, AlertCircle, Clock, Flame, Refrigerator } from 'lucide-react';
import type { Page } from '../App';

interface ProfileSetupPageProps {
  navigate: (page: Page) => void;
  onComplete: (profile: any) => void;
}

export default function ProfileSetupPage({ navigate, onComplete }: ProfileSetupPageProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    cookingLevel: '',
    allergies: [] as string[],
    spicyLevel: 3,
    cookingTime: '',
    kitchenTools: [] as string[],
    cuisinePreference: [] as string[]
  });

  const cookingLevels = [
    { value: 'beginner', label: '초급', desc: '라면, 계란 요리' },
    { value: 'intermediate', label: '중급', desc: '볶음, 찌개' },
    { value: 'advanced', label: '고급', desc: '모든 요리 가능' }
  ];

  const allergyOptions = ['계란', '우유', '견과류', '갑각류', '밀가루', '대두', '생선'];
  const timeOptions = [
    { value: '10', label: '10분 이하' },
    { value: '30', label: '10-30분' },
    { value: '60', label: '30분 이상' }
  ];
  const toolOptions = ['전자레인지', '인덕션', '가스레인지', '에어프라이어', '오븐', '믹서기'];
  const cuisineOptions = ['한식', '양식', '중식', '일식', '퓨전'];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('home');
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.cookingLevel !== '';
      case 2:
        return true; // Allergies are optional
      case 3:
        return true; // Spicy level has default
      case 4:
        return profile.cookingTime !== '';
      case 5:
        return profile.kitchenTools.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전</span>
          </button>
          <div className="text-sm text-gray-500">
            {step} / 5
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {/* Step 1: Cooking Level */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl text-gray-800">요리 수준을 선택해주세요</h2>
              </div>
              <p className="text-gray-600 mb-6">
                당신의 요리 실력에 맞는 레시피를 추천해드립니다
              </p>
              <div className="space-y-3">
                {cookingLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setProfile({ ...profile, cookingLevel: level.value })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      profile.cookingLevel === level.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-800">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.desc}</div>
                      </div>
                      {profile.cookingLevel === level.value && (
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Allergies */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl text-gray-800">알레르기 정보</h2>
              </div>
              <p className="text-gray-600 mb-6">
                알레르기가 있는 식재료를 선택해주세요 (선택사항)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allergyOptions.map((allergy) => (
                  <button
                    key={allergy}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        allergies: toggleArrayItem(profile.allergies, allergy)
                      })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      profile.allergies.includes(allergy)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Spicy Level */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl text-gray-800">맵기 선호도</h2>
              </div>
              <p className="text-gray-600 mb-6">
                어느 정도의 매운 맛을 선호하시나요?
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Flame
                      key={level}
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        level <= profile.spicyLevel
                          ? 'text-orange-500 fill-orange-500'
                          : 'text-gray-300'
                      }`}
                      onClick={() => setProfile({ ...profile, spicyLevel: level })}
                    />
                  ))}
                </div>
                <div className="text-center text-sm text-gray-500">
                  {profile.spicyLevel === 1 && '안 매워요'}
                  {profile.spicyLevel === 2 && '약간 매워요'}
                  {profile.spicyLevel === 3 && '보통이에요'}
                  {profile.spicyLevel === 4 && '매워요'}
                  {profile.spicyLevel === 5 && '아주 매워요'}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Cooking Time */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl text-gray-800">조리 가능 시간</h2>
              </div>
              <p className="text-gray-600 mb-6">
                평소 한 끼 요리에 얼마나 시간을 쓰시나요?
              </p>
              <div className="space-y-3">
                {timeOptions.map((time) => (
                  <button
                    key={time.value}
                    onClick={() => setProfile({ ...profile, cookingTime: time.value })}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      profile.cookingTime === time.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Kitchen Tools */}
          {step === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Refrigerator className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl text-gray-800">보유 주방 도구</h2>
              </div>
              <p className="text-gray-600 mb-6">
                사용 가능한 주방 도구를 모두 선택해주세요
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {toolOptions.map((tool) => (
                  <button
                    key={tool}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        kitchenTools: toggleArrayItem(profile.kitchenTools, tool)
                      })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      profile.kitchenTools.includes(tool)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full mt-8 py-3 rounded-xl transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === 5 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
