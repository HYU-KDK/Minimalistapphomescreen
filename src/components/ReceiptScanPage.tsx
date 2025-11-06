import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Camera, Check, X, Loader } from 'lucide-react';
import type { Page } from '../App';

interface ReceiptScanPageProps {
  navigate: (page: Page) => void;
}

interface ScannedIngredient {
  name: string;
  quantity?: string;
  category: string;
  confirmed: boolean;
}

export default function ReceiptScanPage({ navigate }: ReceiptScanPageProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedIngredient[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockScanResults: ScannedIngredient[] = [
    { name: '양파', quantity: '1개', category: '채소', confirmed: true },
    { name: '당근', quantity: '2개', category: '채소', confirmed: true },
    { name: '돼지고기', quantity: '300g', category: '육류', confirmed: true },
    { name: '우유', quantity: '1L', category: '유제품', confirmed: true },
    { name: '계란', quantity: '10개', category: '유제품', confirmed: true },
    { name: '간장', quantity: '500ml', category: '조미료', confirmed: true },
    { name: '참기름', quantity: '100ml', category: '조미료', confirmed: true }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedItems(mockScanResults);
      setIsScanning(false);
    }, 2500);
  };

  const toggleConfirm = (index: number) => {
    setScannedItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, confirmed: !item.confirmed } : item
      )
    );
  };

  const removeItem = (index: number) => {
    setScannedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveIngredients = () => {
    const confirmedItems = scannedItems.filter((item) => item.confirmed);
    // In real app, save to database
    alert(`${confirmedItems.length}개의 재료가 저장되었습니다!`);
    navigate('ingredients');
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>홈으로</span>
        </button>
        <h1 className="text-2xl text-gray-800">영수증 스캔</h1>
        <div className="w-20" />
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl mb-2">영수증으로 간편하게 재료 추가</h2>
        <p className="text-orange-100 text-sm">
          마트 영수증 사진을 업로드하면 AI가 자동으로 재료를 인식합니다
        </p>
      </div>

      {!uploadedImage ? (
        <>
          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <div className="text-center">
              <div className="mb-6">
                <Camera className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                <h2 className="text-xl text-gray-800 mb-2">영수증을 촬영하거나 업로드하세요</h2>
                <p className="text-gray-600 text-sm">
                  JPG, PNG 형식의 이미지를 업로드할 수 있습니다
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  <Upload className="w-5 h-5" />
                  <span>파일 업로드</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span>사진 촬영</span>
                </button>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-blue-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-blue-900 mb-1">촬영 팁</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 영수증 전체가 보이도록 촬영해주세요</li>
                  <li>• 밝은 곳에서 촬영하면 인식률이 높아집니다</li>
                  <li>• 구겨지지 않고 펼쳐진 상태로 촬영해주세요</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Scanning State */}
          {isScanning && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
              <div className="text-center">
                <Loader className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
                <h2 className="text-xl text-gray-800 mb-2">영수증을 분석하고 있어요...</h2>
                <p className="text-gray-600 text-sm">잠시만 기다려주세요</p>
              </div>
            </div>
          )}

          {/* Scanned Results */}
          {!isScanning && scannedItems.length > 0 && (
            <>
              <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-800">인식된 재료</h2>
                  <span className="text-sm text-gray-600">
                    {scannedItems.filter((item) => item.confirmed).length} / {scannedItems.length}개 선택됨
                  </span>
                </div>

                {/* Uploaded Image Preview */}
                <div className="mb-6">
                  <img
                    src={uploadedImage}
                    alt="Uploaded receipt"
                    className="w-full max-h-48 object-contain rounded-xl border border-gray-200"
                  />
                </div>

                {/* Scanned Items List */}
                <div className="space-y-3 mb-6">
                  {scannedItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        item.confirmed
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => toggleConfirm(index)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          item.confirmed
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {item.confirmed && <Check className="w-4 h-4 text-white" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800">{item.name}</span>
                          {item.quantity && (
                            <span className="text-sm text-gray-600">- {item.quantity}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>

                      <button
                        onClick={() => removeItem(index)}
                        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setScannedItems([]);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    다시 촬영
                  </button>
                  <button
                    onClick={handleSaveIngredients}
                    disabled={scannedItems.filter((item) => item.confirmed).length === 0}
                    className={`flex-1 px-6 py-3 rounded-xl transition-all ${
                      scannedItems.filter((item) => item.confirmed).length > 0
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    재료 추가하기
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
