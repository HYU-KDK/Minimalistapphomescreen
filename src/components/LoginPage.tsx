import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import type { Page } from '../App';

interface LoginPageProps {
  navigate: (page: Page) => void;
  onLogin: (email: string) => void;
}

export default function LoginPage({ navigate, onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>홈으로</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl text-center mb-2 text-gray-800">
            {isSignUp ? '회원가입' : '로그인'}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isSignUp ? '오마이쿡과 함께 요리를 시작하세요' : '다시 만나서 반가워요!'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              {isSignUp ? '회원가입' : '로그인'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-sm">Kakao</span>
              </button>
            </div>
          </div>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600"
            >
              {isSignUp ? (
                <>
                  이미 계정이 있으신가요?{' '}
                  <span className="text-orange-500">로그인</span>
                </>
              ) : (
                <>
                  계정이 없으신가요?{' '}
                  <span className="text-orange-500">회원가입</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
