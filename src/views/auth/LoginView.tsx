import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, ShieldCheck, LogIn, Fuel, Mail, ArrowLeft, Eye } from 'lucide-react';
import { UserRole } from '../../types';
import logoImg from '../../assets/images/badan_gizi_logo_1785799692960.jpg';

interface LoginViewProps {
  onBackToVisitor?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onBackToVisitor }) => {
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState('dapurhafshawaty@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(usernameOrEmail, password);
      if (!success) {
        setError('Email/Username atau password tidak terdaftar');
      }
    } catch (err) {
      setError('Gagal menghubungi server autentikasi SSO');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (userRole: UserRole, userIdentity: string) => {
    setLoading(true);
    setError('');
    await login(userIdentity, 'password123');
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/github/url');
      const data = await res.json();
      if (data.success && data.data.authUrl) {
        // Open GitHub OAuth Popup
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          data.data.authUrl,
          'GitHub OAuth Login',
          `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listen for postMessage from callback popup
        const listener = async (event: MessageEvent) => {
          if (event.data && event.data.type === 'GITHUB_OAUTH_SUCCESS') {
            window.removeEventListener('message', listener);
            if (popup) popup.close();
            // Automatically log in user as Admin Penuh demo
            await login('dapurhafshawaty@gmail.com', 'password123');
            setLoading(false);
          }
        };
        window.addEventListener('message', listener);

        // Fallback timeout
        setTimeout(() => {
          window.removeEventListener('message', listener);
          setLoading(false);
        }, 15000);
      } else {
        setError('Gagal mendapatkan URL otorisasi GitHub.');
        setLoading(false);
      }
    } catch (err) {
      setError('Gagal menginisialisasi login GitHub OAuth.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-3 relative">
          {onBackToVisitor && (
            <button
              onClick={onBackToVisitor}
              className="absolute -top-2 left-0 text-slate-400 hover:text-white text-xs flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition"
              title="Kembali ke Mode Pengunjung Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pengunjung</span>
            </button>
          )}

          <img
            src={logoImg}
            alt="Badan Gizi Nasional Logo"
            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-amber-400/40 shadow-xl shadow-amber-500/10 hover:scale-105 transition"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              BADAN GIZI NASIONAL REPUBLIK INDONESIA
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">Portal Administrasi Terpadu</h1>
            <p className="text-xs text-slate-400 mt-1">
              Single Entry Point & Autentikasi Terpadu Keamanan Hak Akses Pengguna
            </p>
          </div>
        </div>

        {/* Security Banner */}
        <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold text-blue-100">Keamanan Terpadu Email Terdaftar</div>
            <p className="text-[11px] text-blue-300/90 leading-relaxed">
              Pengunjung diarahkan ke menu login ini untuk memastikan setiap akses link terproteksi berdasarkan email terdaftar dan hak akses pengguna.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Terdaftar / Username SSO</label>
            <input
              type="text"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              placeholder="contoh: dapurhafshawaty@gmail.com / admin.portal@instansi.go.id"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> {loading ? 'Memverifikasi Akses Email...' : 'Masuk Portal Terpadu'}
          </button>

          <div className="relative my-3 flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 font-semibold uppercase tracking-wider absolute">atau</span>
          </div>

          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 text-xs"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Masuk dengan GitHub Account
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">
            Pilih Profil Hak Akses Pengguna (Demo Password: <code className="text-blue-400 font-mono">password123</code>)
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            {/* Role 1: Admin Penuh */}
            <button
              onClick={() => handleQuickLogin('Admin Penuh', 'dapurhafshawaty@gmail.com')}
              className="p-3 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/60 rounded-xl text-left transition group flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-rose-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" /> 1. Admin Penuh
                  <span className="text-[10px] bg-rose-900/80 text-rose-200 px-1.5 py-0.2 rounded border border-rose-700">Akses Seluruh Fitur</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">dapurhafshawaty@gmail.com</div>
              </div>
              <span className="text-[10px] text-rose-400 font-medium group-hover:translate-x-1 transition">Masuk &rarr;</span>
            </button>

            {/* Role 2: Staff Kantor */}
            <button
              onClick={() => handleQuickLogin('Staff Kantor', 'staff.kantor@instansi.go.id')}
              className="p-3 bg-emerald-950/30 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-xl text-left transition group flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-400" /> 2. Staff Kantor
                  <span className="text-[10px] bg-emerald-900/80 text-emerald-200 px-1.5 py-0.2 rounded border border-emerald-700">Dashboard, e-Surat & Stock</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">staff.kantor@instansi.go.id</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium group-hover:translate-x-1 transition">Masuk &rarr;</span>
            </button>

            {/* Role 3: Distribusi */}
            <button
              onClick={() => handleQuickLogin('Distribusi', 'distribusi@instansi.go.id')}
              className="p-3 bg-sky-950/30 hover:bg-sky-900/50 border border-sky-800/60 rounded-xl text-left transition group flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-sky-300 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-sky-400" /> 3. Distribusi
                  <span className="text-[10px] bg-sky-900/80 text-sky-200 px-1.5 py-0.2 rounded border border-sky-700">Dashboard & Laporan BBM</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">distribusi@instansi.go.id</div>
              </div>
              <span className="text-[10px] text-sky-400 font-medium group-hover:translate-x-1 transition">Masuk &rarr;</span>
            </button>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              Info Kredensial SSO Terpadu
            </div>
            <p>
              Gunakan email terdaftar atau username dengan Password default: <span className="font-mono text-white font-bold bg-slate-800 px-1 py-0.5 rounded">password123</span>
            </p>
          </div>

          {onBackToVisitor && (
            <button
              onClick={onBackToVisitor}
              className="w-full py-2 bg-slate-800/60 hover:bg-slate-800 text-amber-300 border border-slate-700/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              Lihat Tampilan Pengunjung Website (Tanpa Login)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
