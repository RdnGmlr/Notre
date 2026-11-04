import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { NotreSocielleIcon } from '../components/common/NotreSocielleLogo';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: () => void;
  onSkipAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onSkipAsGuest }) => {
  const { user } = useCart();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states matching prototype (Images 3 & 4)
  const [fullName, setFullName] = useState(user.name || 'Nanang Risnandar');
  const [email, setEmail] = useState('nanangrisnandar@gmail.com');
  const [phone, setPhone] = useState('8978936712');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'register') {
      user.name = fullName.trim() || 'Nanang Risnandar';
      user.phone = `0${phone.replace(/^0+/, '')}`;
    } else {
      if (email.includes('@')) {
        const extractedName = email.split('@')[0].replace(/[._]/g, ' ');
        user.name =
          extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      }
    }

    try {
      localStorage.setItem('order_socielle_user', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }

    onSuccess();
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#FCFBF9] flex flex-col justify-between p-6 animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-[360px] mx-auto flex flex-col pt-2 pb-4">
        {/* Top Logo matching Prototype Image 1, 3, 4 */}
        <div className="flex justify-center pt-2">
          <NotreSocielleIcon size={44} color="#8C4722" />
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center mt-3">
          <h2 className="text-2xl font-black text-[#1E1E1E] tracking-tight">
            Mulailah sekarang
          </h2>
          <p className="text-xs text-[#7A6E65] mt-1 max-w-[280px] mx-auto leading-relaxed">
            Buat akun atau masuk untuk menjelajahi aplikasi kami
          </p>
        </div>

        {/* Tab Switcher: Masuk vs Daftar matching Prototype */}
        <div className="mt-5 p-1 bg-[#F0F0F3] rounded-2xl flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-white text-[#1E1E1E] shadow-xs'
                : 'text-[#7A6E65] hover:text-[#1E1E1E]'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'register'
                ? 'bg-white text-[#1E1E1E] shadow-xs'
                : 'text-[#7A6E65] hover:text-[#1E1E1E]'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {/* Register-only: Nama Lengkap */}
          {activeTab === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#4A4A4A]">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs text-[#1E1E1E] focus:outline-none focus:border-[#8C4722] shadow-xs"
              />
            </div>
          )}

          {/* Email field (Present in both) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4A4A4A]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs text-[#1E1E1E] focus:outline-none focus:border-[#8C4722] shadow-xs"
            />
          </div>

          {/* Register-only: Nomor Telepon with Indonesian Flag */}
          {activeTab === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#4A4A4A]">
                Nomor Telepon
              </label>
              <div className="flex items-center bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs focus-within:border-[#8C4722]">
                <div className="flex items-center gap-1 pl-3 pr-2 py-3 border-r border-[#E5E7EB] bg-gray-50/50">
                  {/* Indonesian Flag Emblem */}
                  <span className="text-sm">🇮🇩</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#7A6E65]" />
                </div>
                <div className="flex items-center pl-3 flex-1">
                  <span className="text-xs text-[#7A6E65] font-medium mr-1.5 select-none">
                    (+62)
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="81234567890"
                    className="w-full py-3 pr-3 text-xs text-[#1E1E1E] bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Kata Sandi (Present in both) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4A4A4A]">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata Sandi"
                className="w-full pl-4 pr-11 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs text-[#1E1E1E] focus:outline-none focus:border-[#8C4722] shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-[#9CA3AF] hover:text-[#1E1E1E] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {activeTab === 'register' && (
              <span className="text-[11px] text-[#7A6E65] mt-0.5">
                Panjangnya minimal 8 karakter!
              </span>
            )}
          </div>

          {/* Login-only: Ingat Saya & Lupa Kata Sandi */}
          {activeTab === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#4A4A4A] select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8C4722] accent-[#8C4722] border-gray-300"
                />
                <span>Ingat saya</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Fitur reset kata sandi telah dikirim ke email demo Anda.')}
                className="text-xs font-semibold text-[#3B82F6] hover:underline"
              >
                Lupa Kata Sandi?
              </button>
            </div>
          )}

          {/* CTA Button: Masuk / Daftar */}
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-[#8C4722] hover:bg-[#733819] active:scale-[0.98] text-white font-bold text-sm rounded-full shadow-md transition-all text-center"
          >
            {activeTab === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        {/* Login-only: Social Login Options matching Prototype Image 3 */}
        {activeTab === 'login' && (
          <div className="mt-6 flex flex-col gap-4">
            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-[#E5E7EB]"></div>
              <span className="absolute px-3 bg-[#FCFBF9] text-[11px] text-[#9CA3AF]">
                Atau masuk dengan
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* Google Button */}
              <button
                type="button"
                onClick={onSuccess}
                className="py-3 px-4 bg-white border border-[#E5E7EB] hover:bg-gray-50 active:scale-95 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-[#1E1E1E] shadow-xs transition-all"
              >
                {/* Google 4-color 'G' icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={onSuccess}
                className="py-3 px-4 bg-white border border-[#E5E7EB] hover:bg-gray-50 active:scale-95 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-[#1E1E1E] shadow-xs transition-all"
              >
                {/* Apple logo icon */}
                <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.7-13.98-5.44-8.37-9.74-17.72-12.91-28.05-3.17-10.33-4.76-20.48-4.76-30.45 0-14.48 3.73-26.68 11.19-36.6 7.46-9.92 16.9-14.98 28.32-15.19 4.36 0 9.29 1.15 14.78 3.46 5.49 2.31 9.28 3.52 11.38 3.63 1.63 0 5.66-1.29 12.09-3.86 6.43-2.58 11.75-3.73 15.96-3.46 11.74.88 20.89 5.39 27.44 13.53-10.45 6.31-15.56 15.02-15.34 26.13.22 8.7 3.49 15.98 9.8 21.84 6.31 5.87 13.88 9.17 22.71 9.91-2.07 6.1-4.68 12.1-7.83 18.01zm-28.8-107.01c0 6.64-2.4 12.72-7.21 18.23-4.8 5.51-10.59 9.12-17.37 10.83-.87-5.67.66-11.63 4.59-17.88 3.93-6.25 9.09-10.66 15.48-13.23 2.94 1.15 4.51 2.05 4.51 2.05z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Skip for Testing */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onSkipAsGuest}
            className="text-xs font-semibold text-[#8C4722] hover:underline"
          >
            Lanjutkan sebagai Tamu &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
