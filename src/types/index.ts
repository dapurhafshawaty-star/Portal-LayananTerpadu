/**
 * Portal Administrasi Terpadu - Enterprise Domain Types
 */

export type UserRole = 
  | 'Admin Penuh'
  | 'Staff Kantor'
  | 'Distribusi'
  | 'Super Admin'
  | 'Admin'
  | 'Operator'
  | 'Supervisor'
  | 'Manager'
  | 'Staff'
  | 'Viewer';

export interface User {
  id: string;
  nama: string;
  username: string;
  email: string;
  role: UserRole;
  divisi: string;
  jabatan: string;
  status: 'Aktif' | 'Nonaktif';
  foto?: string;
  lastLogin?: string;
  createdAt: string;
  emailVerified?: boolean;
}

export interface RolePermission {
  role: UserRole;
  description: string;
  modulesAccess: {
    dashboard: boolean;
    esurat: boolean;
    stockOpname: boolean;
    bbm: boolean;
    masterData: boolean;
    userManagement: boolean;
    dynamicMenu: boolean;
    activityLogs: boolean;
    settings: boolean;
    apiDocs: boolean;
  };
  actions: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    canExport: boolean;
  };
}

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: string; // Lucide icon identifier
  color?: string; // CSS color or Tailwind class
  order: number;
  targetModule: 'portal' | 'esurat' | 'stock' | 'external';
  requiredRole?: UserRole[];
  parentId?: string;
  isActive: boolean;
}

export interface MasterPegawai {
  id: string;
  nip: string;
  nama: string;
  email: string;
  telepon: string;
  divisiId: string;
  divisiNama: string;
  jabatanId: string;
  jabatanNama: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface MasterDivisi {
  id: string;
  kode: string;
  nama: string;
  kepalaDivisi?: string;
  keterangan?: string;
}

export interface MasterJabatan {
  id: string;
  kode: string;
  nama: string;
  level: number;
}

export interface MasterGudang {
  id: string;
  kode: string;
  nama: string;
  lokasi: string;
  penanggungJawab: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface MasterKategori {
  id: string;
  kode: string;
  nama: string;
  deskripsi?: string;
}

export interface MasterInstansi {
  id: string;
  kode: string;
  nama: string;
  alamat: string;
  telepon: string;
  email: string;
  kontakPerson: string;
}

// --- e-Surat Digital Domain ---
export interface SuratMasuk {
  id: string;
  nomorSurat: string;
  nomorAgenda: string;
  pengirim: string;
  perihal: string;
  tanggalSurat: string;
  tanggalTerima: string;
  sifat: 'Biasa' | 'Penting' | 'Rahasia' | 'Sangat Rahasia';
  status: 'Baru' | 'Proses Disposisi' | 'Selesai' | 'Diarsipkan';
  fileUrl?: string;
  qrCodeUrl?: string;
  ringkasan?: string;
}

export interface SuratKeluar {
  id: string;
  nomorSurat: string;
  tujuan: string;
  perihal: string;
  tanggalSurat: string;
  pembuat: string;
  statusApproval: 'Draft' | 'Menunggu Approval' | 'Disetujui' | 'Ditolak';
  approver?: string;
  templateId?: string;
  qrCodeUrl?: string;
  fileUrl?: string;
}

export interface Disposisi {
  id: string;
  suratMasukId: string;
  nomorSurat: string;
  pengirimDisposisi: string;
  penerimaDisposisi: string; // Divisi or Pegawai
  instruksi: string;
  sifat: 'Biasa' | 'Penting' | 'Segera';
  batasWaktu: string;
  status: 'Pending' | 'Dalam Proses' | 'Selesai';
  catatanPenerima?: string;
  tanggalDisposisi: string;
}

export interface TemplateSurat {
  id: string;
  nama: string;
  kategori: string;
  formatNomor: string;
  isiHeader: string;
  isiBody: string;
  isiFooter: string;
}

// --- Stock Opname Domain ---
export interface MasterBarang {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  kategoriId: string;
  kategoriNama: string;
  gudangId: string;
  gudangNama: string;
  satuan: string;
  stokMinimal: number;
  stokSekarang: number;
  hargaSatuan: number;
  barcode: string;
  qrCodeUrl?: string;
}

export interface StockMovement {
  id: string;
  jenis: 'Masuk' | 'Keluar';
  barangId: string;
  kodeBarang: string;
  namaBarang: string;
  jumlah: number;
  gudangId: string;
  gudangNama: string;
  referensiNota: string;
  keterangan: string;
  tanggal: string;
  petugas: string;
}

export interface StockOpnameSession {
  id: string;
  kodeOpname: string;
  tanggal: string;
  gudangId: string;
  gudangNama: string;
  petugas: string;
  status: 'Draft' | 'Sedang Berjalan' | 'Selesai' | 'Dibatalkan';
  items: {
    barangId: string;
    kodeBarang: string;
    namaBarang: string;
    stokSistem: number;
    stokFisik: number;
    selisih: number;
    catatan: string;
  }[];
  catatanGeneral?: string;
}

// --- Central Features ---
export interface NotificationItem {
  id: string;
  modul: 'e-Surat' | 'Stock Opname' | 'System' | 'Master Data';
  judul: string;
  pesan: string;
  tipe: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  namaUser: string;
  modul: string;
  aktivitas: string;
  detail?: string;
  tanggal: string;
  jam: string;
  browser: string;
  ipAddress: string;
  status: 'Sukses' | 'Gagal';
}

export interface PortalSettings {
  namaPortal: string;
  deskripsi: string;
  logoUrl: string;
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  maintenanceMode: boolean;
  sessionTimeoutMinutes: number;
  rateLimitPerMin: number;
}

export type JenisBbm = 
  | 'Pertalite'
  | 'Pertamax'
  | 'Pertamax Turbo'
  | 'Solar'
  | 'Dexlite'
  | 'Pertamina Dex';

export interface MasterKendaraan {
  id: string;
  namaKendaraan: string;
  platNomor: string;
  jenisKendaraan: 'Mobil Operasional' | 'Mobil Box' | 'Motor' | 'Ambulance' | 'Bus' | 'Truk';
  standarKmLiter: number;
  status: 'Aktif' | 'Perbaikan' | 'Nonaktif';
}

export interface LaporanBbm {
  id: string;
  tanggalPembelian: string; // YYYY-MM-DD
  kendaraanId: string;
  kendaraanNama: string;
  platNomor: string;
  jenisBbm: JenisBbm;
  kmAwal: number;
  kmAkhir: number;
  jarakTempuh: number; // kmAkhir - kmAwal
  hargaBbm: number; // in Rupiah
  jumlahLiter: number; // Decimal (e.g. 8.53)
  kmLiterAktual: number; // jarakTempuh / jumlahLiter (2 decimals)
  standarKmLiter: number;
  statusPemakaian: 'Normal' | 'Tidak Normal';
  uploadStruk?: string; // image base64 or URL
  statusStruk: 'Ter-upload' | 'Belum Upload';
  keterangan: 'Pemakaian Wajar' | 'Boros';
  userInput: string;
  timestamp: string; // ISO DateTime
}

export interface BbmDashboardSummary {
  totalPengeluaranBulanIni: number;
  totalLiterBulanIni: number;
  totalJarakTempuhBulanIni: number;
  rataRataKmLiter: number;
  totalTransaksi: number;
  pengeluaranPerBulan: { bulan: string; totalRupiah: number; totalLiter: number }[];
  efisiensiPerKendaraan: { kendaraan: string; platNomor: string; kmLiterAktual: number; standarKmLiter: number; status: string }[];
  kendaraanTerboros: { kendaraan: string; platNomor: string; totalBorosCount: number; avgKmLiter: number; totalRupiah: number }[];
}

export interface GlobalSearchResult {
  id: string;
  type: 'Surat Masuk' | 'Surat Keluar' | 'Barang' | 'Pegawai' | 'Dokumen';
  modul: 'e-Surat' | 'Stock Opname' | 'Master Data';
  title: string;
  subtitle: string;
  badge: string;
  targetView: string;
}
