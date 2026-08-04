import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Shield, LogOut, Menu, UserCheck, LogIn, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import logoImg from '../../assets/images/badan_gizi_logo_1785799692960.jpg';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onNavigate?: (path: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar = () => {},
  onNavigate = (_path: string) => {},
  darkMode = false,
  onToggleDarkMode = () => {}
}) => {
  const { user, notifications, logout, settings } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
        {/* Left Section: Mobile Menu Toggle & App Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Toggle Menu Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onNavigate('/dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src={logoImg}
              alt="Badan Gizi Nasional Logo"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/50 shadow-md group-hover:scale-105 transition"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate max-w-[130px] min-[400px]:max-w-[200px] sm:max-w-none">
                {settings.namaPortal || 'Portal Administrasi Terpadu'}
              </h1>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wider uppercase block truncate">
                Badan Gizi Nasional RI
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Global Search Trigger Button */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-medium flex items-center justify-between border border-slate-200 dark:border-slate-700 transition"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Cari surat, barang, pegawai, atau dokumen...</span>
            </div>
            <span className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded text-[10px] font-mono shadow-xs border border-slate-200 dark:border-slate-700">
              Ctrl + K
            </span>
          </button>
        </div>

        {/* Right Section: Utilities, Theme, Notifications & User Avatar */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>
            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              onNavigate={onNavigate}
            />
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* User Profile / Visitor Login Button */}
          {!user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold rounded-lg border border-amber-200 dark:border-amber-800">
                <Eye className="w-3 h-3 text-amber-500" /> Mode Pengunjung
              </span>
              <button
                onClick={() => onNavigate('/login')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login Pengguna</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <img
                  src={user.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={user.nama}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {user.nama}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {user.role}
                  </div>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-3 z-50">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {user.nama}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        user.role === 'Admin Penuh' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                        user.role === 'Staff Kantor' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                        user.role === 'Distribusi' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-[10px] text-slate-400">{user.divisi}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('/admin/users');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-slate-400" /> Profil & Akses Saya
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('/admin/settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-slate-400" /> Keamanan Portal
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Single Sign-Out (Logout)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
