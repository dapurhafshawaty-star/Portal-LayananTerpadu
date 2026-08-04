import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/auth/LoginView';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Views
import { DashboardView } from './views/DashboardView';
import { SuratMasukView } from './views/esurat/SuratMasukView';
import { SuratKeluarView } from './views/esurat/SuratKeluarView';
import { DisposisiView } from './views/esurat/DisposisiView';
import { ArsipDigitalView } from './views/esurat/ArsipDigitalView';
import { MasterBarangView } from './views/stock/MasterBarangView';
import { StockMovementView } from './views/stock/StockMovementView';
import { StockOpnameView } from './views/stock/StockOpnameView';
import { MasterDataView } from './views/master/MasterDataView';
import { UserManagementView } from './views/admin/UserManagementView';
import { DynamicMenuView } from './views/admin/DynamicMenuView';
import { RolePermissionView } from './views/admin/RolePermissionView';
import { ActivityLogsView } from './views/admin/ActivityLogsView';
import { PortalSettingsView } from './views/admin/PortalSettingsView';
import { InstallationDocView } from './views/docs/InstallationDocView';
import { NewModuleGuideView } from './views/docs/NewModuleGuideView';
import { LaporanBbmView } from './views/bbm/LaporanBbmView';

const PortalMain: React.FC = () => {
  const { user, isAuthenticated, isAuthLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-3 text-xs font-semibold tracking-wider uppercase text-slate-400">
          Memuat Single Sign-On Portal...
        </div>
      </div>
    );
  }

  // If explicit login path requested, show LoginView
  if (currentPath === '/login') {
    return <LoginView onBackToVisitor={() => setCurrentPath('/dashboard')} />;
  }

  const checkAccess = (path: string): boolean => {
    // Unauthenticated Visitors
    if (!user) {
      // Visitors can access Dashboard and Docs
      if (path === '/dashboard' || path.startsWith('/docs')) return true;
      return false; // Protected routes require login
    }

    const role = user.role;

    // Admin Penuh & Super Admin have full access
    if (role === 'Admin Penuh' || role === 'Super Admin' || role === 'Admin') return true;

    // Dashboard is accessible to all logged in users
    if (path === '/dashboard') return true;

    // Staff Kantor
    if (role === 'Staff Kantor') {
      return path.startsWith('/esurat') || path.startsWith('/stock') || path === '/dashboard';
    }

    // Distribusi
    if (role === 'Distribusi') {
      return path.startsWith('/bbm') || path === '/dashboard';
    }

    // Role specific default fallback
    if (path.startsWith('/esurat') || path.startsWith('/stock')) {
      return ['Operator', 'Supervisor', 'Manager', 'Staff'].includes(role);
    }
    if (path.startsWith('/bbm')) {
      return ['Supervisor', 'Manager'].includes(role);
    }
    if (path.startsWith('/admin')) {
      return false;
    }

    return true;
  };

  const renderView = () => {
    if (!checkAccess(currentPath)) {
      if (!user) {
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-7A9 9 0 113 12a9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1.5 max-w-md">
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                Mode Pengunjung Website
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                Akses Memerlukan Login Pengguna
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Anda sedang mengakses portal sebagai <span className="font-bold text-slate-800 dark:text-slate-200">Pengunjung Website</span>. Halaman <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">{currentPath}</code> terproteksi dan memerlukan login hak akses terdaftar.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setCurrentPath('/login')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                Login Pengguna Sekarang
              </button>
              <button
                onClick={() => setCurrentPath('/dashboard')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition"
              >
                Kembali ke Dashboard Utama
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-7A9 9 0 113 12a9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1.5 max-w-md">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Akses Ditolak (403 Forbidden)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Hak akses akun Anda (<span className="font-semibold text-rose-500">{user.role}</span>) tidak diizinkan untuk membuka halaman <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">{currentPath}</code>.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 max-w-md text-left space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-200">Ketentuan Hak Akses Anda:</div>
            {user.role === 'Staff Kantor' && (
              <p>&bull; Mengakses Dashboard Utama, e-Surat Digital, dan Stock Opname.</p>
            )}
            {user.role === 'Distribusi' && (
              <p>&bull; Mengakses Dashboard Utama dan Laporan BBM Kendaraan.</p>
            )}
            {user.role !== 'Staff Kantor' && user.role !== 'Distribusi' && (
              <p>&bull; Terbatas sesuai modul yang diberikan administrator.</p>
            )}
          </div>
          <button
            onClick={() => setCurrentPath('/dashboard')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Kembali ke Dashboard Utama
          </button>
        </div>
      );
    }

    switch (currentPath) {
      case '/dashboard':
        return <DashboardView onNavigate={(path) => setCurrentPath(path)} />;
      case '/esurat/masuk':
      case '/esurat':
        return <SuratMasukView />;
      case '/esurat/keluar':
        return <SuratKeluarView />;
      case '/esurat/disposisi':
        return <DisposisiView />;
      case '/esurat/arsip':
        return <ArsipDigitalView />;
      case '/stock/barang':
      case '/stock':
        return <MasterBarangView />;
      case '/stock/mutasi':
        return <StockMovementView />;
      case '/stock/opname':
        return <StockOpnameView />;
      case '/master/terpadu':
      case '/master-data':
        return <MasterDataView />;
      case '/admin/users':
        return <UserManagementView />;
      case '/admin/menus':
        return <DynamicMenuView />;
      case '/admin/roles':
        return <RolePermissionView />;
      case '/admin/logs':
        return <ActivityLogsView />;
      case '/admin/settings':
        return <PortalSettingsView />;
      case '/docs/instalasi':
        return <InstallationDocView />;
      case '/docs/modul-baru':
        return <NewModuleGuideView />;
      case '/bbm/laporan':
        return <LaporanBbmView />;
      default:
        return <DashboardView onNavigate={(path) => setCurrentPath(path)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={(path) => setCurrentPath(path)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentPath={currentPath}
          onNavigate={(path) => setCurrentPath(path)}
          isOpen={!sidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderView()}
          </div>
        </main>
      </div>

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(url) => {
          setIsSearchOpen(false);
          setCurrentPath(url);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortalMain />
    </AuthProvider>
  );
}
