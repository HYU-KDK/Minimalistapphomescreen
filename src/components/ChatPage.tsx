import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import type { Page } from '../App';

interface ChatPageProps {
  navigate: (page: Page) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage({ navigate }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 요리 관련 질문이 있으시면 언제든 물어보세요. 재료 손질법, 조리 온도, 대체 재료 등 무엇이든 도와드리겠습니다.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = [
    '좋은 질문이에요! 중불은 가스레인지 다이얼 기준 5-6단계 정도입니다. 손을 프라이팬 위 10cm 정도 위치에 두었을 때 뜨겁지만 참을 수 있는 정도면 적당해요.',
    '네, 가능합니다! 대파 대신 양파나 쪽파를 사용하셔도 됩니다. 양파를 사용할 경우 조금 더 단맛이 나지만 충분히 맛있게 만들 수 있어요.',
    '고기가 익었는지 확인하는 방법은 색깔 변화를 보는 것입니다. 돼지고기는 분홍색이 완전히 사라지고 회백색이 되면 익은 것이고, 닭고기는 투명했던 육즙이 맑아지면 익은 거예요.',
    '2인분으로 늘리시려면 모든 재료를 2배로 늘려주세요. 다만 소금, 간장 같은 간 재료는 1.5배 정도만 넣고 맛을 보면서 조절하시는 게 좋습니다.',
    '데치기는 끓는 물에 재료를 짧게 넣었다 빼는 것이고, 삶기는 재료가 완전히 익을 때까지 끓이는 거예요. 데치기는 보통 30초~2분 정도만 하고, 삶기는 재료에 따라 10분 이상 걸릴 수 있어요.'
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    '중불이 어느 정도인가요?',
    '대파 대신 다른 걸 써도 되나요?',
    '고기가 익었는지 어떻게 알아요?',
    '2인분으로 늘리려면?',
    '데치기와 삶기의 차이는?'
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로</span>
          </button>
          <h1 className="text-xl text-gray-800">AI 요리 어시스턴트</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                  : 'bg-white text-gray-800 shadow-md border border-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-orange-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="bg-white text-gray-800 shadow-md border border-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">자주 묻는 질문:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="궁금한 점을 물어보세요..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`px-6 py-3 rounded-xl transition-all ${
              inputValue.trim()
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
