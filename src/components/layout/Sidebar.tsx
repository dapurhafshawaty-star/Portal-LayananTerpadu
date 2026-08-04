import React from 'react';
import * as Icons from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MenuItem } from '../../types';
import logoImg from '../../assets/images/badan_gizi_logo_1785799692960.jpg';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, isOpen }) => {
  const { user, menus } = useAuth();

  // Helper function to render dynamic Lucide icon
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    const IconComponent = (Icons as any)[iconName] || Icons.Circle;
    return <IconComponent className={className} />;
  };

  // Filter menus based on user role
  const allowedMenus = menus.filter(m => {
    if (!m.isActive) return false;
    if (!m.requiredRole || m.requiredRole.length === 0) return true;
    if (!user) return false;
    return m.requiredRole.includes(user.role);
  });

  return (
    <aside className={`w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-64'
    } fixed md:static inset-y-0 left-0 z-40`}>
      {/* Portal Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={logoImg}
            alt="Badan Gizi Nasional Logo"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400/50 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">
              BADAN GIZI NASIONAL
            </div>
            <div className="text-[10px] text-slate-400">
              Portal Administrasi Terpadu
            </div>
          </div>
        </div>
      </div>

      {/* User Status Card */}
      {!user ? (
        <div className="p-3 bg-slate-800/80 m-3 rounded-xl border border-slate-700/80 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold shrink-0">
              <Icons.Eye className="w-4 h-4" />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-slate-100 truncate">
                Pengunjung Website
              </div>
              <div className="text-[10px] text-amber-400 font-medium truncate">
                Mode Akses Publik
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/login')}
            className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <Icons.LogIn className="w-3.5 h-3.5" />
            <span>Login Pengguna</span>
          </button>
        </div>
      ) : (
        <div className="p-3 bg-slate-800/60 m-3 rounded-xl border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-2.5">
            <img
              src={user.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user.nama}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-semibold text-slate-100 truncate">
                {user.nama}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                {user.email}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-700/50">
            <span className="px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] bg-blue-950 text-blue-300 border border-blue-800">
              {user.role}
            </span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Email Terverifikasi
            </span>
          </div>
        </div>
      )}

      {/* Navigation Menu Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {!user ? (
          /* Visitor Mode Navigation: Show only Dashboard Utama button */
          <button
            onClick={() => onNavigate('/dashboard')}
            className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
              currentPath === '/dashboard'
                ? 'bg-blue-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Icons.LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Dashboard Utama</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-amber-950 text-amber-300 border border-amber-800">
              Publik
            </span>
          </button>
        ) : (
          /* Logged In Navigation: Dynamic Database Driven Menu */
          <>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              MENU UTAMA (DATABASE DRIVEN)
            </div>

            {allowedMenus.map((menu: MenuItem) => {
              const isActive = currentPath === menu.path || currentPath.startsWith(`${menu.path}/`);

              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    if (menu.targetModule === 'stock' || menu.path === '/stock' || menu.path.includes('stock')) {
                      window.open('https://stock-opname-dapur-sppg.ai.studio/', '_blank');
                    } else if (menu.targetModule === 'esurat' || menu.path === '/esurat' || menu.path.includes('esurat')) {
                      window.open('https://e-surat-digital-1.ai.studio', '_blank');
                    } else {
                      onNavigate(menu.path);
                    }
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span style={{ color: isActive ? '#FFFFFF' : menu.color }}>
                      {renderIcon(menu.icon, 'w-4 h-4')}
                    </span>
                    <span>{menu.title}</span>
                  </div>

                  {/* Module Tag Badges */}
                  {menu.targetModule === 'esurat' && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      e-Surat
                    </span>
                  )}

                  {menu.targetModule === 'stock' && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      Stock
                    </span>
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
        Single Sign-On SSO JWT Enabled
        <br />
        Integrasi e-Surat & Stock Opname
      </div>
    </aside>
  );
};
