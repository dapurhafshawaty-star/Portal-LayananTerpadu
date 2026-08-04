import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Boxes, 
  Activity, 
  ArrowUpRight, 
  Star, 
  ExternalLink, 
  Calendar, 
  Bell, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Search,
  Check,
  Fuel,
  LogIn,
  Eye,
  ShieldCheck,
  MessageSquare,
  Send,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import logoImg from '../assets/images/badan_gizi_logo_1785799692960.jpg';

interface DashboardViewProps {
  onNavigate: (path: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { user, notifications } = useAuth();
  const [stats, setStats] = useState({
    totalUser: 5,
    totalSurat: 5,
    totalBarang: 4,
    activityToday: 18
  });

  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [bbmStats, setBbmStats] = useState({
    totalPengeluaranBulanIni: 3450000,
    totalLiterBulanIni: 265.4,
    totalJarakTempuhBulanIni: 2850,
    rataRataKmLiter: 10.74,
    totalTransaksi: 8,
    efisiensiPerKendaraan: [
      { kendaraan: 'Toyota Avanza Veloz', platNomor: 'B 1234 PQA', kmLiterAktual: 11.2, standarKmLiter: 10, status: 'Normal' },
      { kendaraan: 'Mitsubishi L300 Box', platNomor: 'B 9876 CKR', kmLiterAktual: 7.8, standarKmLiter: 8, status: 'Tidak Normal' },
      { kendaraan: 'Daihatsu Gran Max Pick Up', platNomor: 'B 5543 DPK', kmLiterAktual: 10.5, standarKmLiter: 9.5, status: 'Normal' }
    ]
  });

  interface FeedbackItem {
    id: number;
    nama: string;
    kategori: 'Saran' | 'Kritik' | 'Apresiasi';
    pesan: string;
    tanggal: string;
    status: 'Ditinjau' | 'Direspon' | 'Terakomodasi';
  }

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 1,
      nama: 'Ahmad Subagja (Staff Logistik)',
      kategori: 'Saran',
      pesan: 'Mohon tambahkan pemindaian kode QR otomatis untuk stok opname gudang.',
      tanggal: '2026-08-04 10:15',
      status: 'Terakomodasi'
    },
    {
      id: 2,
      nama: 'Siti Rahma (Distribusi BBM)',
      kategori: 'Kritik',
      pesan: 'Kecepatan pemrosesan disposisi surat digital pada jam sibuk perlu ditingkatkan.',
      tanggal: '2026-08-03 14:30',
      status: 'Direspon'
    },
    {
      id: 3,
      nama: 'Pengunjung Portal',
      kategori: 'Apresiasi',
      pesan: 'Tampilan antarmuka sangat bersih, modern, dan mempermudah pencarian arsip.',
      tanggal: '2026-08-02 09:00',
      status: 'Ditinjau'
    }
  ]);
  const [newPesan, setNewPesan] = useState('');
  const [newKategori, setNewKategori] = useState<'Saran' | 'Kritik' | 'Apresiasi'>('Saran');
  const [newNama, setNewNama] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLogs = await fetch('/api/v1/activity-logs');
        const dataLogs = await resLogs.json();
        if (dataLogs.success && Array.isArray(dataLogs.data)) {
          setRecentLogs(dataLogs.data.slice(0, 5));
        }

        const resBbm = await fetch('/api/v1/bbm/dashboard');
        const dataBbm = await resBbm.json();
        if (dataBbm.success && dataBbm.data) {
          setBbmStats(dataBbm.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const addFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPesan.trim()) return;
    const author = newNama.trim() || (user ? `${user.nama} (${user.role})` : 'Pengunjung Portal');
    const newItem: FeedbackItem = {
      id: Date.now(),
      nama: author,
      kategori: newKategori,
      pesan: newPesan.trim(),
      tanggal: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Ditinjau'
    };
    setFeedbacks([newItem, ...feedbacks]);
    setNewPesan('');
    setNewNama('');
  };

  return (
    <div className="space-y-6">
      {/* Public Visitor Mode Info Banner */}
      {!user && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/80 rounded-xl text-amber-700 dark:text-amber-300 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>Tampilan Pengunjung Website (Akses Publik Dashboard)</span>
                <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-[10px] font-extrabold rounded uppercase tracking-wider">Public</span>
              </div>
              <p className="text-[11px] text-amber-800/90 dark:text-amber-300/90">
                Anda dapat melihat ringkasan dashboard & tautan aplikasi tanpa login. Untuk mengakses modul terproteksi, silakan login.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/login')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>Login Pengguna</span>
          </button>
        </div>
      )}

      {/* Welcome Hero Card */}
      <div className="p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={logoImg}
            alt="Badan Gizi Nasional Logo"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-400/60 shadow-lg shrink-0 hidden sm:block"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-amber-300 text-xs font-semibold rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Badan Gizi Nasional RI
              </span>
              <span className="text-xs text-blue-200">
                {user ? 'Selamat datang kembali,' : 'Mode Pengunjung Website'}
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-1">
              {user ? user.nama : 'Pengunjung Website'}
            </h2>
            <p className="text-xs text-blue-100 max-w-xl mt-1">
              Pintu utama terpadu untuk mengakses layanan <span className="font-semibold underline">e-Surat Digital</span>, <span className="font-semibold underline">Stock Opname</span>, dan <span className="font-semibold underline">Laporan BBM Kendaraan</span> secara terintegrasi dengan Single Sign-On (SSO).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!user && (
            <button
              onClick={() => onNavigate('/login')}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-900" /> Login Pengguna
            </button>
          )}
          <a
            href="https://e-surat-digital-1.ai.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-600" /> e-Surat
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </a>
          <a
            href="https://stock-opname-dapur-sppg.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-amber-400 text-slate-900 hover:bg-amber-300 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Boxes className="w-4 h-4 text-slate-900" /> Stock Opname
            <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
          </a>
          <button
            onClick={() => onNavigate('/bbm/laporan')}
            className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Fuel className="w-4 h-4 text-white" /> Laporan BBM
          </button>
        </div>
      </div>

      {/* Counter Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Users */}
        <div 
          onClick={() => onNavigate('/admin/users')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              User Portal
            </span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-lg group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {stats.totalUser} <span className="text-xs font-normal text-slate-400">Pengguna</span>
          </div>
          <div className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> SSO Active
          </div>
        </div>

        {/* Card 2: Total Surat */}
        <div 
          onClick={() => onNavigate('/esurat')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Surat
            </span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-lg group-hover:scale-110 transition">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {stats.totalSurat} <span className="text-xs font-normal text-slate-400">Dokumen</span>
          </div>
          <div className="mt-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium truncate">
            3 Masuk • 2 Keluar
          </div>
        </div>

        {/* Card 3: Total Barang */}
        <div 
          onClick={() => onNavigate('/stock')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Barang Gudang
            </span>
            <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-600 rounded-lg group-hover:scale-110 transition">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {stats.totalBarang} <span className="text-xs font-normal text-slate-400">SKU</span>
          </div>
          <div className="mt-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium truncate">
            1 Dibawah Stok Min
          </div>
        </div>

        {/* Card 4: Pengeluaran BBM */}
        <div 
          onClick={() => onNavigate('/bbm/laporan')}
          className="p-4 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/80 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group bg-gradient-to-br from-sky-50/50 to-transparent dark:from-sky-950/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              BBM Bulan Ini
            </span>
            <div className="p-2 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 rounded-lg group-hover:scale-110 transition">
              <Fuel className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            Rp {(bbmStats.totalPengeluaranBulanIni / 1000).toLocaleString('id-ID')}k
          </div>
          <div className="mt-1.5 text-[11px] text-sky-600 dark:text-sky-400 font-medium truncate">
            {bbmStats.totalLiterBulanIni} Liter • {bbmStats.rataRataKmLiter} KM/L
          </div>
        </div>

        {/* Card 5: Aktivitas Hari Ini */}
        <div 
          onClick={() => onNavigate('/admin/logs')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Aktivitas Hari Ini
            </span>
            <div className="p-2 bg-purple-50 dark:bg-purple-950 text-purple-600 rounded-lg group-hover:scale-110 transition">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-3">
            {stats.activityToday} <span className="text-xs font-normal text-slate-400">Event Logs</span>
          </div>
          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
            Centralized Audit Trail
          </div>
        </div>
      </div>

      {/* Analytics & Shortcuts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Trend Graphic & Shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" /> Grafik Penggunaan Sistem (e-Surat vs Stock Opname)
                </h3>
                <p className="text-xs text-slate-500">Volume transaksi 7 hari terakhir lintas modul</p>
              </div>
              <Badge variant="primary">Realtime Data</Badge>
            </div>

            {/* Visual Custom Chart Bars */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              {[
                { day: 'Senin', esurat: 45, stock: 30 },
                { day: 'Selasa', esurat: 60, stock: 45 },
                { day: 'Rabu', esurat: 80, stock: 65 },
                { day: 'Kamis', esurat: 55, stock: 50 },
                { day: 'Jumat', esurat: 90, stock: 75 },
                { day: 'Sabtu', esurat: 30, stock: 20 },
                { day: 'Minggu', esurat: 25, stock: 15 }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* e-Surat Bar */}
                    <div 
                      style={{ height: `${bar.esurat}%` }} 
                      className="w-1/2 bg-emerald-500 hover:bg-emerald-600 rounded-t transition-all group relative"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 rounded">
                        {bar.esurat}
                      </span>
                    </div>
                    {/* Stock Bar */}
                    <div 
                      style={{ height: `${bar.stock}%` }} 
                      className="w-1/2 bg-amber-500 hover:bg-amber-600 rounded-t transition-all group relative"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 rounded">
                        {bar.stock}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">Aktivitas e-Surat Digital</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">Aktivitas Stock Opname</span>
              </div>
            </div>
          </div>

          {/* BBM Fuel Report Summary Card */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/80 rounded-xl shadow-sm space-y-4 bg-gradient-to-br from-sky-50/30 via-white to-white dark:from-sky-950/20 dark:via-slate-900 dark:to-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Ringkasan Laporan BBM Kendaraan Operasional
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monitoring pengeluaran BBM & efisiensi armada distribusi bulan ini</p>
              </div>
              <button
                onClick={() => onNavigate('/bbm/laporan')}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1 shrink-0"
              >
                Lihat Laporan Lengkap &rarr;
              </button>
            </div>

            {/* Key BBM Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 rounded-xl">
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Pengeluaran BBM</div>
                <div className="text-base font-bold text-sky-700 dark:text-sky-300 mt-1">
                  Rp {bbmStats.totalPengeluaranBulanIni.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{bbmStats.totalTransaksi} Transaksi Pembelian</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-xl">
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Volume Konsumsi</div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {bbmStats.totalLiterBulanIni} <span className="text-xs font-normal text-slate-400">Liter</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pertalite & Solar</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-xl">
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Jarak Tempuh</div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {bbmStats.totalJarakTempuhBulanIni.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">KM</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rute Distribusi</div>
              </div>

              <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-xl">
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Rata-Rata Efisiensi</div>
                <div className="text-base font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                  {bbmStats.rataRataKmLiter} <span className="text-xs font-normal text-slate-400">KM/Liter</span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">&check; Diatas Standar</div>
              </div>
            </div>

            {/* Vehicle Efficiency Status */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Status Efisiensi Kendaraan Operasional:</span>
                <span className="text-[10px] text-slate-400 font-normal">Sesuai Standar Pabrikan KM/L</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {bbmStats.efisiensiPerKendaraan.slice(0, 3).map((v: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{v.kendaraan}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{v.platNomor} &bull; {v.kmLiterAktual} KM/L</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                      v.status === 'Normal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    }`}>
                      {v.status === 'Normal' ? 'Normal' : 'Perlu Servis'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Module Shortcuts Card */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Modul Favorit & Shortcut Cepat
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                href="https://e-surat-digital-1.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-left transition group block"
              >
                <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 flex items-center gap-1">
                  Buka e-Surat <ExternalLink className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-500">Web e-Surat Digital</div>
              </a>

              <a
                href="https://stock-opname-dapur-sppg.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 rounded-xl text-left transition group block"
              >
                <Boxes className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 flex items-center gap-1">
                  Hitung Opname <ExternalLink className="w-3 h-3 text-amber-500" />
                </div>
                <div className="text-[10px] text-slate-500">Web Stock Opname</div>
              </a>

              <button
                onClick={() => onNavigate('/bbm/laporan')}
                className="p-3 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 rounded-xl text-left transition group"
              >
                <Fuel className="w-6 h-6 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">Laporan BBM</div>
                <div className="text-[10px] text-slate-500">Efisiensi Konsumsi</div>
              </button>

              <button
                onClick={() => onNavigate('/master/terpadu')}
                className="p-3 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 rounded-xl text-left transition group"
              >
                <FileSpreadsheet className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">Master Pegawai</div>
                <div className="text-[10px] text-slate-500">Shared Master DB</div>
              </button>

              <button
                onClick={() => onNavigate('/docs/api')}
                className="p-3 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 rounded-xl text-left transition group"
              >
                <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">Swagger REST API</div>
                <div className="text-[10px] text-slate-500">OpenAPI Gateway</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Recent Activity & Reminders Widget */}
        <div className="space-y-6">
          {/* Saran dan Kritik Widget */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Saran dan Kritik
              </h3>
              <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                {feedbacks.length} Masukan
              </span>
            </div>

            {/* Form Input Saran & Kritik */}
            <form onSubmit={addFeedback} className="space-y-2.5">
              {!user && (
                <input
                  type="text"
                  placeholder="Nama Anda (Opsional)..."
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
              )}
              <div className="flex gap-2">
                <select
                  value={newKategori}
                  onChange={(e) => setNewKategori(e.target.value as any)}
                  className="px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300 font-medium shrink-0"
                >
                  <option value="Saran">Saran</option>
                  <option value="Kritik">Kritik</option>
                  <option value="Apresiasi">Apresiasi</option>
                </select>
                <input
                  type="text"
                  placeholder="Masukkan saran & kritik Anda..."
                  value={newPesan}
                  onChange={(e) => setNewPesan(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition shrink-0 flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </div>
            </form>

            {/* List Saran & Kritik */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                        item.kategori === 'Saran'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : item.kategori === 'Kritik'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {item.kategori}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {item.nama}
                      </span>
                    </div>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      item.status === 'Terakomodasi'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : item.status === 'Direspon'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    "{item.pesan}"
                  </p>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.tanggal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Cross-Module Activity Stream */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600" /> Recent Activity Stream
              </h3>
              <button 
                onClick={() => onNavigate('/admin/logs')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
              >
                Lihat Log <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log: any) => (
                <div key={log.id} className="text-xs border-b border-slate-100 dark:border-slate-800/60 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {log.namaUser}
                    </span>
                    <span className="text-[10px] text-slate-400">{log.jam}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    <span className="font-medium text-blue-600 dark:text-blue-400">[{log.modul}]</span> {log.aktivitas}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {log.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
