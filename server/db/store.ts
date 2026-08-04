/**
 * Central Enterprise Store & Memory DB
 * Provides mock relational datasets for Core DB, Shared DB, and Module DBs.
 */

import { 
  User, 
  RolePermission, 
  MenuItem, 
  MasterPegawai, 
  MasterDivisi, 
  MasterJabatan, 
  MasterGudang, 
  MasterKategori, 
  MasterInstansi, 
  SuratMasuk, 
  SuratKeluar, 
  Disposisi, 
  TemplateSurat, 
  MasterBarang, 
  StockMovement, 
  StockOpnameSession, 
  NotificationItem, 
  ActivityLog, 
  PortalSettings,
  MasterKendaraan,
  LaporanBbm
} from '../../src/types';

export const JWT_SECRET = process.env.JWT_SECRET || 'portal-administrasi-terpadu-super-secret-jwt-key-2026';

// --- INITIAL DATA STORE ---
export const initialUsers: User[] = [
  {
    id: 'USR-001',
    nama: 'Dr. H. Ahmad Pratama, M.Kom',
    username: 'superadmin',
    email: 'admin.portal@instansi.go.id',
    role: 'Admin Penuh',
    divisi: 'Teknologi Informasi & Komunikasi',
    jabatan: 'Kepala Pusat Data & Sistem Informasi',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    lastLogin: new Date().toISOString(),
    createdAt: '2026-01-01T08:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-001-USER',
    nama: 'Pengelola Dapur Hafshawaty',
    username: 'dapurhafshawaty',
    email: 'dapurhafshawaty@gmail.com',
    role: 'Admin Penuh',
    divisi: 'Direksi & Administrasi Utama',
    jabatan: 'Administrator Utama Portal',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    lastLogin: new Date().toISOString(),
    createdAt: '2026-01-01T08:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-009',
    nama: 'Siti Aminah, S.AP',
    username: 'staff_kantor',
    email: 'staff.kantor@instansi.go.id',
    role: 'Staff Kantor',
    divisi: 'Sekretariat & Operasional Kantor',
    jabatan: 'Staf Administrasi & Inventaris',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    lastLogin: new Date(Date.now() - 1800000).toISOString(),
    createdAt: '2026-01-10T09:30:00Z',
    emailVerified: true
  },
  {
    id: 'USR-010',
    nama: 'Rudi Hermawan',
    username: 'distribusi_bbm',
    email: 'distribusi@instansi.go.id',
    role: 'Distribusi',
    divisi: 'Logistik & Armada Distribusi',
    jabatan: 'Koordinator Distribusi & BBM Kendaraan',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2026-01-12T10:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-002',
    nama: 'Siti Rahmawati, S.STP',
    username: 'admin',
    email: 'siti.rahmawati@instansi.go.id',
    role: 'Admin',
    divisi: 'Sekretariat / Tata Usaha',
    jabatan: 'Head of Administrative Services',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2026-01-10T09:30:00Z',
    emailVerified: true
  },
  {
    id: 'USR-003',
    nama: 'Budi Santoso, S.E.',
    username: 'operator_surat',
    email: 'budi.santoso@instansi.go.id',
    role: 'Operator',
    divisi: 'Sekretariat / Tata Usaha',
    jabatan: 'Staf Registrasi e-Surat',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastLogin: new Date(Date.now() - 7200000).toISOString(),
    createdAt: '2026-01-15T11:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-004',
    nama: 'Ahmad Fauzi, S.T.',
    username: 'operator_stock',
    email: 'ahmad.fauzi@instansi.go.id',
    role: 'Operator',
    divisi: 'Logistik & Perlengkapan',
    jabatan: 'Staf Opname Gudang Central',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    lastLogin: new Date(Date.now() - 10800000).toISOString(),
    createdAt: '2026-01-18T08:15:00Z',
    emailVerified: true
  },
  {
    id: 'USR-005',
    nama: 'Drs. Bambang Hariyanto, M.Si',
    username: 'supervisor',
    email: 'bambang.hariyanto@instansi.go.id',
    role: 'Supervisor',
    divisi: 'Keuangan & Aset',
    jabatan: 'Kabid Pengawasan Aset',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    lastLogin: new Date(Date.now() - 14400000).toISOString(),
    createdAt: '2026-02-01T10:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-006',
    nama: 'Rina Wijaya, S.E., M.M.',
    username: 'manager',
    email: 'rina.wijaya@instansi.go.id',
    role: 'Manager',
    divisi: 'Perencanaan & Evaluasi',
    jabatan: 'Manager Perencanaan Strategic',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    createdAt: '2026-02-05T14:20:00Z',
    emailVerified: true
  },
  {
    id: 'USR-007',
    nama: 'Eko Prasetyo, S.Kom',
    username: 'staff',
    email: 'eko.prasetyo@instansi.go.id',
    role: 'Staff',
    divisi: 'Teknologi Informasi & Komunikasi',
    jabatan: 'Staf Support IT',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    lastLogin: new Date(Date.now() - 172800000).toISOString(),
    createdAt: '2026-02-10T09:00:00Z',
    emailVerified: true
  },
  {
    id: 'USR-008',
    nama: 'Maya Indah, S.Sos',
    username: 'viewer',
    email: 'maya.indah@instansi.go.id',
    role: 'Viewer',
    divisi: 'Hubungan Masyarakat',
    jabatan: 'Analis Publikasi Data',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    lastLogin: new Date(Date.now() - 259200000).toISOString(),
    createdAt: '2026-02-12T11:30:00Z',
    emailVerified: true
  }
];

export const initialRoles: RolePermission[] = [
  {
    role: 'Admin Penuh',
    description: 'Akses penuh tanpa batas ke seluruh fitur aplikasi, master data, user management, dan cloud settings.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: true,
      activityLogs: true,
      settings: true,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true }
  },
  {
    role: 'Staff Kantor',
    description: 'Mengakses Menu Dashboard Utama, e-Surat Digital, dan Stock Opname.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: 'Distribusi',
    description: 'Mengakses Dashboard Utama dan Laporan BBM Kendaraan.',
    modulesAccess: {
      dashboard: true,
      esurat: false,
      stockOpname: false,
      bbm: true,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: 'Super Admin',
    description: 'Akses penuh tanpa batas ke seluruh modul, master data, audit logs, dan konfigurasi portal.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: true,
      activityLogs: true,
      settings: true,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true }
  },
  {
    role: 'Admin',
    description: 'Akses pengelolaan operasional, master data, e-Surat, dan Stock Opname.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: 'Operator',
    description: 'Akses entri data surat masuk/keluar, transaksi stok masuk/keluar, dan fisik opname.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: 'Supervisor',
    description: 'Pengawasan, verifikasi surat, disposisi, dan persetujuan stok penyesuaian.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: 'Manager',
    description: 'Akses laporan, persetujuan level tinggi, analisis aktivitas, dan dashboard eksekutif.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: true
    },
    actions: { canCreate: false, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: 'Staff',
    description: 'Menerima disposisi surat, mengajukan permintaan barang, dan melihat status dokumen.',
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: false }
  },
  {
    role: 'Viewer',
    description: 'Hanya dapat melihat ringkasan dashboard dan laporan publik tanpa hak modifikasi.',
    modulesAccess: {
      dashboard: true,
      esurat: false,
      stockOpname: false,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true }
  }
];

export const initialMenus: MenuItem[] = [
  {
    id: 'MNU-001',
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    color: '#3B82F6',
    order: 1,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Staff Kantor', 'Distribusi', 'Super Admin', 'Admin', 'Operator', 'Supervisor', 'Manager', 'Staff', 'Viewer'],
    isActive: true
  },
  {
    id: 'MNU-002',
    title: 'e-Surat Digital',
    path: '/esurat',
    icon: 'Mail',
    color: '#10B981',
    order: 2,
    targetModule: 'esurat',
    requiredRole: ['Admin Penuh', 'Staff Kantor', 'Super Admin', 'Admin', 'Operator', 'Supervisor', 'Manager', 'Staff'],
    isActive: true
  },
  {
    id: 'MNU-003',
    title: 'Stock Opname',
    path: '/stock',
    icon: 'Boxes',
    color: '#F59E0B',
    order: 3,
    targetModule: 'stock',
    requiredRole: ['Admin Penuh', 'Staff Kantor', 'Super Admin', 'Admin', 'Operator', 'Supervisor', 'Manager', 'Staff'],
    isActive: true
  },
  {
    id: 'MNU-003-BBM',
    title: 'Laporan BBM Kendaraan',
    path: '/bbm/laporan',
    icon: 'Fuel',
    color: '#0284C7',
    order: 4,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Distribusi', 'Super Admin', 'Admin', 'Supervisor', 'Manager'],
    isActive: true
  },
  {
    id: 'MNU-004',
    title: 'Master Data Terpadu',
    path: '/master-data',
    icon: 'Database',
    color: '#8B5CF6',
    order: 5,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Super Admin', 'Admin', 'Supervisor', 'Manager'],
    isActive: true
  },
  {
    id: 'MNU-005',
    title: 'Manajemen Pengguna',
    path: '/admin/users',
    icon: 'Users',
    color: '#EC4899',
    order: 6,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Super Admin', 'Admin'],
    isActive: true
  },
  {
    id: 'MNU-006',
    title: 'Menu Dinamis',
    path: '/admin/menus',
    icon: 'Menu',
    color: '#06B6D4',
    order: 7,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Super Admin'],
    isActive: true
  },
  {
    id: 'MNU-007',
    title: 'Log Aktivitas Central',
    path: '/admin/logs',
    icon: 'FileText',
    color: '#64748B',
    order: 8,
    targetModule: 'portal',
    requiredRole: ['Admin Penuh', 'Super Admin', 'Admin', 'Supervisor', 'Manager'],
    isActive: true
  },
  {
    id: 'MNU-008',
    title: 'Dokumentasi REST API',
    path: '/docs/api',
    icon: 'Code2',
    color: '#14B8A6',
    order: 8,
    targetModule: 'portal',
    isActive: true
  },
  {
    id: 'MNU-009',
    title: 'Arsitektur Enterprise',
    path: '/docs/architecture',
    icon: 'BookOpen',
    color: '#6366F1',
    order: 9,
    targetModule: 'portal',
    isActive: true
  },
  {
    id: 'MNU-010',
    title: 'Pengaturan Portal',
    path: '/admin/settings',
    icon: 'Settings',
    color: '#EF4444',
    order: 10,
    targetModule: 'portal',
    requiredRole: ['Super Admin'],
    isActive: true
  }
];

export const initialPegawai: MasterPegawai[] = [
  { id: 'PEG-001', nip: '198504122010121001', nama: 'Dr. H. Ahmad Pratama, M.Kom', email: 'admin.portal@instansi.go.id', telepon: '081234567890', divisiId: 'DIV-001', divisiNama: 'Teknologi Informasi & Komunikasi', jabatanId: 'JAB-001', jabatanNama: 'Kepala Pusat Data & Sistem Informasi', status: 'Aktif' },
  { id: 'PEG-002', nip: '199002152015032002', nama: 'Siti Rahmawati, S.STP', email: 'siti.rahmawati@instansi.go.id', telepon: '081298765432', divisiId: 'DIV-002', divisiNama: 'Sekretariat / Tata Usaha', jabatanId: 'JAB-002', jabatanNama: 'Head of Administrative Services', status: 'Aktif' },
  { id: 'PEG-003', nip: '199208202018011003', nama: 'Budi Santoso, S.E.', email: 'budi.santoso@instansi.go.id', telepon: '081377889900', divisiId: 'DIV-003', divisiNama: 'Logistik & Perlengkapan', jabatanId: 'JAB-003', jabatanNama: 'Staf Opname Gudang Central', status: 'Aktif' },
  { id: 'PEG-004', nip: '198211052008041002', nama: 'Drs. Bambang Hariyanto, M.Si', email: 'bambang.hariyanto@instansi.go.id', telepon: '081122334455', divisiId: 'DIV-004', divisiNama: 'Keuangan & Aset', jabatanId: 'JAB-004', jabatanNama: 'Kabid Pengawasan Aset', status: 'Aktif' },
  { id: 'PEG-005', nip: '198806122012022001', nama: 'Rina Wijaya, S.E., M.M.', email: 'rina.wijaya@instansi.go.id', telepon: '081566778899', divisiId: 'DIV-005', divisiNama: 'Perencanaan & Evaluasi', jabatanId: 'JAB-005', jabatanNama: 'Manager Perencanaan Strategic', status: 'Aktif' }
];

export const initialDivisi: MasterDivisi[] = [
  { id: 'DIV-001', kode: 'TIK', nama: 'Teknologi Informasi & Komunikasi', kepalaDivisi: 'Dr. H. Ahmad Pratama, M.Kom', keterangan: 'Pengelola Infrastruktur IT, Server, & Aplikasi Enterprise' },
  { id: 'DIV-002', kode: 'TU', nama: 'Sekretariat / Tata Usaha', kepalaDivisi: 'Siti Rahmawati, S.STP', keterangan: 'Pengelola Persuratan, Arsip, & Administrasi Umum' },
  { id: 'DIV-003', kode: 'LOG', nama: 'Logistik & Perlengkapan', kepalaDivisi: 'Ahmad Fauzi, S.T.', keterangan: 'Pengelola Pergudangan, Aset, & Stock Opname' },
  { id: 'DIV-004', kode: 'KEU', nama: 'Keuangan & Aset', kepalaDivisi: 'Drs. Bambang Hariyanto, M.Si', keterangan: 'Pengelolaan Anggaran, Akuntansi, & Verifikasi Aset' },
  { id: 'DIV-005', kode: 'REN', nama: 'Perencanaan & Evaluasi', kepalaDivisi: 'Rina Wijaya, S.E., M.M.', keterangan: 'Perencanaan Program Kerja & Monitoring Kinerja' }
];

export const initialJabatan: MasterJabatan[] = [
  { id: 'JAB-001', kode: 'KAPUS', nama: 'Kepala Pusat Data & Sistem Informasi', level: 1 },
  { id: 'JAB-002', kode: 'HEAD-TU', nama: 'Head of Administrative Services', level: 2 },
  { id: 'JAB-003', kode: 'STAF-LOG', nama: 'Staf Opname Gudang Central', level: 4 },
  { id: 'JAB-004', kode: 'KABID-ASET', nama: 'Kabid Pengawasan Aset', level: 2 },
  { id: 'JAB-005', kode: 'MGR-REN', nama: 'Manager Perencanaan Strategic', level: 3 }
];

export const initialGudang: MasterGudang[] = [
  { id: 'GDG-001', kode: 'GDG-CENTRAL', nama: 'Gudang Utama Central Enterprise', lokasi: 'Gedung A Lantai Dasar, Kompleks Perkantoran Pusat', penanggungJawab: 'Budi Santoso, S.E.', status: 'Aktif' },
  { id: 'GDG-002', kode: 'GDG-ATK', nama: 'Gudang ATK & Cetakan', lokasi: 'Gedung B Ruang 102', penanggungJawab: 'Dewi Lestari, A.Md', status: 'Aktif' },
  { id: 'GDG-003', kode: 'GDG-IT', nama: 'Gudang Perangkat Hardware TIK', lokasi: 'Gedung Server Lantai 2', penanggungJawab: 'Ahmad Pratama, M.Kom', status: 'Aktif' }
];

export const initialKategori: MasterKategori[] = [
  { id: 'KAT-001', kode: 'ATK', nama: 'Alat Tulis Kantor (ATK)', deskripsi: 'Pena, kertas, spidol, ordner, map, dan perlengkapan meja' },
  { id: 'KAT-002', kode: 'HARDWARE', nama: 'Perangkat Keras IT & Elektronik', deskripsi: 'Laptop, PC, Monitor, Printer, UPS, Scanner' },
  { id: 'KAT-003', kode: 'CETAKAN', nama: 'Bahan Cetak & Formulir', deskripsi: 'Formulir resmi, amplop ber-kop, sertifikat, brosur' },
  { id: 'KAT-004', kode: 'KONSUMABEL', nama: 'Bahan Habis Pakai & Kebersihan', deskripsi: 'Toner printer, baterai, cairan pembersih, tissue' }
];

export const initialInstansi: MasterInstansi[] = [
  { id: 'INS-001', kode: 'KEMENKEU', nama: 'Kementerian Keuangan Republik Indonesia', alamat: 'Jl. Dr. Wahidin Raya No.1, Jakarta Pusat', telepon: '021-3841000', email: 'humas@kemenkeu.go.id', kontakPerson: 'Bapak Sugeng S.' },
  { id: 'INS-002', kode: 'BKN', nama: 'Badan Kepegawaian Negara', alamat: 'Jl. Mayor Jendral Sutoyo No.12, Cililitan, Jakarta Timur', telepon: '021-80882815', email: 'info@bkn.go.id', kontakPerson: 'Ibu Ratna M.' },
  { id: 'INS-003', kode: 'PEMPROV', nama: 'Pemerintah Provinsi DKI Jakarta', alamat: 'Jl. Medan Merdeka Selatan No.8-9, Jakarta Pusat', telepon: '021-3822222', email: 'sekretariat@jakarta.go.id', kontakPerson: 'Drs. Hendra W.' }
];

// --- e-Surat Sample Data ---
export const initialSuratMasuk: SuratMasuk[] = [
  {
    id: 'SM-2026-001',
    nomorSurat: '102/KEMENKEU/07/2026',
    nomorAgenda: 'AGD-2026-089',
    pengirim: 'Kementerian Keuangan Republik Indonesia',
    perihal: 'Undangan Koordinasi Penganggaran & Sinkronisasi Sistem Informasi Terpadu',
    tanggalSurat: '2026-07-25',
    tanggalTerima: '2026-07-28',
    sifat: 'Penting',
    status: 'Proses Disposisi',
    ringkasan: 'Permohonan kehadiran pada Rapat Koordinasi Nasional Integrasi Layanan Digital.',
    fileUrl: '/docs/surat-undangan-kemenkeu.pdf',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-001'
  },
  {
    id: 'SM-2026-002',
    nomorSurat: '450/BKN/SEC/2026',
    nomorAgenda: 'AGD-2026-090',
    pengirim: 'Badan Kepegawaian Negara',
    perihal: 'Pemberitahuan Audit Kepatuhan Data Pegawai Enterprise',
    tanggalSurat: '2026-07-27',
    tanggalTerima: '2026-07-29',
    sifat: 'Biasa',
    status: 'Baru',
    ringkasan: 'Pelaksanaan sinkronisasi Master Data Pegawai periode Semester II.',
    fileUrl: '/docs/surat-bkn-audit.pdf',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-002'
  },
  {
    id: 'SM-2026-003',
    nomorSurat: '088/PEMPROV/DKI/2026',
    nomorAgenda: 'AGD-2026-085',
    pengirim: 'Pemerintah Provinsi DKI Jakarta',
    perihal: 'Kerjasama Layanan Publik & Pertukaran Data Antar Moda',
    tanggalSurat: '2026-07-20',
    tanggalTerima: '2026-07-21',
    sifat: 'Sangat Rahasia',
    status: 'Diarsipkan',
    ringkasan: 'Kesepakatan bersama integrasi API Gateway antar instansi.',
    fileUrl: '/docs/mou-dki.pdf',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-003'
  }
];

export const initialSuratKeluar: SuratKeluar[] = [
  {
    id: 'SK-2026-001',
    nomorSurat: '005/PORTAL-TIK/SK/VII/2026',
    tujuan: 'Kementerian Keuangan Republik Indonesia',
    perihal: 'Konfirmasi Kehadiran & Penyampaian Laporan Kesiapan Portal Terpadu',
    tanggalSurat: '2026-07-29',
    pembuat: 'Siti Rahmawati, S.STP',
    statusApproval: 'Disetujui',
    approver: 'Dr. H. Ahmad Pratama, M.Kom',
    templateId: 'TMP-001',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SK-2026-001',
    fileUrl: '/docs/sk-005-kemenkeu.pdf'
  },
  {
    id: 'SK-2026-002',
    nomorSurat: '006/PORTAL-LOG/SK/VII/2026',
    tujuan: 'PT Nusa Logistics Enterprise',
    perihal: 'Permohonan Pengadaan Barang & Stock Refill Gudang Central',
    tanggalSurat: '2026-07-30',
    pembuat: 'Budi Santoso, S.E.',
    statusApproval: 'Menunggu Approval',
    approver: 'Drs. Bambang Hariyanto, M.Si',
    templateId: 'TMP-002',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SK-2026-002'
  }
];

export const initialDisposisi: Disposisi[] = [
  {
    id: 'DSP-001',
    suratMasukId: 'SM-2026-001',
    nomorSurat: '102/KEMENKEU/07/2026',
    pengirimDisposisi: 'Dr. H. Ahmad Pratama, M.Kom (Kepala Pusat)',
    penerimaDisposisi: 'Sekretariat / Tata Usaha & Divisi TIK',
    instruksi: 'Harap siapkan materi presentasi arsitektur SSO dan API Gateway sebelum rapat tgl 5 Agustus.',
    sifat: 'Segera',
    batasWaktu: '2026-08-03',
    status: 'Dalam Proses',
    catatanPenerima: 'Materi sedang disusun oleh tim pengembangan.',
    tanggalDisposisi: '2026-07-28 14:00'
  }
];

export const initialTemplateSurat: TemplateSurat[] = [
  {
    id: 'TMP-001',
    nama: 'Surat Undangan / Konfirmasi Resmi',
    kategori: 'Surat Keluar Dinamis',
    formatNomor: '{URUT}/PORTAL-{DIVISI}/SK/{BULAN-ROMAWI}/{TAHUN}',
    isiHeader: 'PORTAL ADMINISTRASI TERPADU ENTERPRISE\nSEKRETARIAT UTAMA PUSAT DATA',
    isiBody: 'Dengan hormat, sehubungan dengan {PERIHAL}, kami menyampaikan konfirmasi kehadiran tim...',
    isiFooter: 'Demikian disampaikan, atas perhatian dan kerjasamanya diucapkan terima kasih.'
  },
  {
    id: 'TMP-002',
    nama: 'Surat Permohonan Pengadaan & Stock Refill',
    kategori: 'Logistik',
    formatNomor: '{URUT}/PORTAL-LOG/SK/{BULAN-ROMAWI}/{TAHUN}',
    isiHeader: 'DIVISI LOGISTIK & PERLENGKAPAN GUDANG CENTRAL',
    isiBody: 'Guna menunjang operasional, bersama ini kami mengajukan permohonan pengadaan barang...',
    isiFooter: 'Mengetahui, Kepala Pusat Data & Sistem Informasi.'
  }
];

// --- Stock Opname Sample Data ---
export const initialMasterBarang: MasterBarang[] = [
  { id: 'BRG-001', kodeBarang: 'BRG-ATK-001', namaBarang: 'Kertas HVS A4 80gsm PaperOne (Box)', kategoriId: 'KAT-001', kategoriNama: 'Alat Tulis Kantor (ATK)', gudangId: 'GDG-002', gudangNama: 'Gudang ATK & Cetakan', satuan: 'Box', stokMinimal: 15, stokSekarang: 42, hargaSatuan: 225000, barcode: '8991001200301', qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-ATK-001' },
  { id: 'BRG-002', kodeBarang: 'BRG-IT-002', namaBarang: 'Laptop Enterprise Intel i7 16GB RAM 512GB SSD', kategoriId: 'KAT-002', kategoriNama: 'Perangkat Keras IT & Elektronik', gudangId: 'GDG-003', gudangNama: 'Gudang Perangkat Hardware TIK', satuan: 'Unit', stokMinimal: 5, stokSekarang: 18, hargaSatuan: 16500000, barcode: '8991001200402', qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-IT-002' },
  { id: 'BRG-003', kodeBarang: 'BRG-IT-003', namaBarang: 'Barcode & QR Scanner Wireless Wireless 2D', kategoriId: 'KAT-002', kategoriNama: 'Perangkat Keras IT & Elektronik', gudangId: 'GDG-001', gudangNama: 'Gudang Utama Central Enterprise', satuan: 'Unit', stokMinimal: 4, stokSekarang: 3, hargaSatuan: 1250000, barcode: '8991001200503', qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-IT-003' },
  { id: 'BRG-004', kodeBarang: 'BRG-CTK-004', namaBarang: 'Map Stopmap Folio Ber-Kop Instansi (Pack 50)', kategoriId: 'KAT-003', kategoriNama: 'Bahan Cetak & Formulir', gudangId: 'GDG-002', gudangNama: 'Gudang ATK & Cetakan', satuan: 'Pack', stokMinimal: 20, stokSekarang: 85, hargaSatuan: 85000, barcode: '8991001200604', qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-CTK-004' }
];

export const initialStockMovements: StockMovement[] = [
  { id: 'MOV-001', jenis: 'Masuk', barangId: 'BRG-001', kodeBarang: 'BRG-ATK-001', namaBarang: 'Kertas HVS A4 80gsm PaperOne (Box)', jumlah: 20, gudangId: 'GDG-002', gudangNama: 'Gudang ATK & Cetakan', referensiNota: 'PO-LOG-2026-088', keterangan: 'Pengadaan Rutin Triwulan III', tanggal: '2026-07-28 10:00', petugas: 'Budi Santoso, S.E.' },
  { id: 'MOV-002', jenis: 'Keluar', barangId: 'BRG-002', kodeBarang: 'BRG-IT-002', namaBarang: 'Laptop Enterprise Intel i7 16GB RAM 512GB SSD', jumlah: 2, gudangId: 'GDG-003', gudangNama: 'Gudang Perangkat Hardware TIK', referensiNota: 'REQ-TIK-2026-012', keterangan: 'Penyerahan Laptop Kerja Pegawai Baru', tanggal: '2026-07-29 14:30', petugas: 'Ahmad Pratama, M.Kom' }
];

export const initialStockOpnameSessions: StockOpnameSession[] = [
  {
    id: 'SOP-2026-001',
    kodeOpname: 'SOP-JULI-2026-GDG1',
    tanggal: '2026-07-31',
    gudangId: 'GDG-001',
    gudangNama: 'Gudang Utama Central Enterprise',
    petugas: 'Budi Santoso, S.E. & Team Audit',
    status: 'Sedang Berjalan',
    items: [
      { barangId: 'BRG-003', kodeBarang: 'BRG-IT-003', namaBarang: 'Barcode & QR Scanner Wireless Wireless 2D', stokSistem: 4, stokFisik: 3, selisih: -1, catatan: '1 unit sedang dipinjam divisi TIK tanpa nota' }
    ],
    catatanGeneral: 'Opname rutin bulanan area gudang central.'
  }
];

// --- Central Notifications & Logs ---
export const initialNotifications: NotificationItem[] = [
  { id: 'NTF-001', modul: 'e-Surat', judul: 'Surat Masuk Baru Received', pesan: 'Surat Masuk 102/KEMENKEU/07/2026 perlu tindak lanjut disposisi.', tipe: 'info', isRead: false, createdAt: '2026-07-31 09:15', linkUrl: '/esurat' },
  { id: 'NTF-002', modul: 'Stock Opname', judul: 'Peringatan Stok Minimal!', pesan: 'Barang "Barcode & QR Scanner Wireless Wireless 2D" berada di bawah batas stok minimal (3/4 unit).', tipe: 'warning', isRead: false, createdAt: '2026-07-31 10:30', linkUrl: '/stock' },
  { id: 'NTF-003', modul: 'e-Surat', judul: 'Approval Surat Keluar', pesan: 'Surat Keluar 005/PORTAL-TIK/SK/VII/2026 telah disetujui oleh Kepala Pusat.', tipe: 'success', isRead: true, createdAt: '2026-07-30 16:00', linkUrl: '/esurat' },
  { id: 'NTF-004', modul: 'Stock Opname', judul: 'Stock Opname Selesai', pesan: 'Sesi Stock Opname SOP-JULI-2026-GDG1 berhasil dicatat.', tipe: 'info', isRead: true, createdAt: '2026-07-29 11:20', linkUrl: '/stock' }
];

export const initialActivityLogs: ActivityLog[] = [
  { id: 'LOG-001', userId: 'USR-001', namaUser: 'Dr. H. Ahmad Pratama, M.Kom', modul: 'SSO & Auth', aktivitas: 'User Login Single Sign-On', detail: 'Login berhasil via SSO Portal Gateway', tanggal: '2026-07-31', jam: '08:00:12', browser: 'Chrome 126.0 (Windows 11)', ipAddress: '10.240.1.45', status: 'Sukses' },
  { id: 'LOG-002', userId: 'USR-002', namaUser: 'Siti Rahmawati, S.STP', modul: 'e-Surat Digital', aktivitas: 'Proses Disposisi Surat', detail: 'Meneruskan Surat Masuk 102/KEMENKEU/07/2026 ke TIK', tanggal: '2026-07-31', jam: '09:20:05', browser: 'Firefox 127.0 (macOS)', ipAddress: '10.240.1.88', status: 'Sukses' },
  { id: 'LOG-003', userId: 'USR-003', namaUser: 'Budi Santoso, S.E.', modul: 'Stock Opname', aktivitas: 'Input Stock Opname Physical', detail: 'Mencatat hasil hitung fisik BRG-IT-003 selisih -1 unit', tanggal: '2026-07-31', jam: '10:35:40', browser: 'Edge 125.0 (Windows 11)', ipAddress: '10.240.2.12', status: 'Sukses' },
  { id: 'LOG-004', userId: 'USR-001', namaUser: 'Dr. H. Ahmad Pratama, M.Kom', modul: 'Master Data', aktivitas: 'Update Master Gudang', detail: 'Mengubah penanggung jawab Gudang Central', tanggal: '2026-07-30', jam: '15:10:00', browser: 'Chrome 126.0 (Windows 11)', ipAddress: '10.240.1.45', status: 'Sukses' }
];

export const initialSettings: PortalSettings = {
  namaPortal: 'Portal Administrasi Terpadu',
  deskripsi: 'Single Entry Point Enterprise & Module Integration Gateway (e-Surat & Stock Opname)',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
  theme: 'light',
  primaryColor: '#2563EB',
  smtpHost: 'smtp.instansi.go.id',
  smtpPort: 587,
  smtpUser: 'notifications@instansi.go.id',
  maintenanceMode: false,
  sessionTimeoutMinutes: 120,
  rateLimitPerMin: 100
};

// --- Initial Master Kendaraan & Laporan BBM ---
export const initialKendaraan: MasterKendaraan[] = [
  {
    id: 'KND-001',
    namaKendaraan: 'Mobil Operasional Avanza',
    platNomor: 'B 1234 RFS',
    jenisKendaraan: 'Mobil Operasional',
    standarKmLiter: 12,
    status: 'Aktif'
  },
  {
    id: 'KND-002',
    namaKendaraan: 'Mobil Box Isuzu Traga',
    platNomor: 'B 9876 POS',
    jenisKendaraan: 'Mobil Box',
    standarKmLiter: 9,
    status: 'Aktif'
  },
  {
    id: 'KND-003',
    namaKendaraan: 'Motor Operasional Honda Beat',
    platNomor: 'B 3456 TIK',
    jenisKendaraan: 'Motor',
    standarKmLiter: 40,
    status: 'Aktif'
  },
  {
    id: 'KND-004',
    namaKendaraan: 'Ambulance Hino Dutro',
    platNomor: 'B 7788 SPP',
    jenisKendaraan: 'Ambulance',
    standarKmLiter: 8,
    status: 'Aktif'
  },
  {
    id: 'KND-005',
    namaKendaraan: 'Bus Jemputan Staf Isuzu',
    platNomor: 'B 1122 SPP',
    jenisKendaraan: 'Bus',
    standarKmLiter: 7,
    status: 'Aktif'
  }
];

export const initialLaporanBbm: LaporanBbm[] = [
  {
    id: 'BBM-202608-001',
    tanggalPembelian: '2026-08-01',
    kendaraanId: 'KND-001',
    kendaraanNama: 'Mobil Operasional Avanza',
    platNomor: 'B 1234 RFS',
    jenisBbm: 'Pertamax',
    kmAwal: 42100,
    kmAkhir: 42520,
    jarakTempuh: 420,
    hargaBbm: 451500,
    jumlahLiter: 35.0,
    kmLiterAktual: 12.0,
    standarKmLiter: 12,
    statusPemakaian: 'Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Pemakaian Wajar',
    userInput: 'Ahmad Fauzi, S.T.',
    timestamp: '2026-08-01T09:15:00.000Z'
  },
  {
    id: 'BBM-202608-002',
    tanggalPembelian: '2026-08-02',
    kendaraanId: 'KND-002',
    kendaraanNama: 'Mobil Box Isuzu Traga',
    platNomor: 'B 9876 POS',
    jenisBbm: 'Solar',
    kmAwal: 85300,
    kmAkhir: 85660,
    jarakTempuh: 360,
    hargaBbm: 306000,
    jumlahLiter: 45.0,
    kmLiterAktual: 8.0,
    standarKmLiter: 9,
    statusPemakaian: 'Tidak Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Boros',
    userInput: 'Budi Santoso, S.E.',
    timestamp: '2026-08-02T10:30:00.000Z'
  },
  {
    id: 'BBM-202608-003',
    tanggalPembelian: '2026-08-02',
    kendaraanId: 'KND-003',
    kendaraanNama: 'Motor Operasional Honda Beat',
    platNomor: 'B 3456 TIK',
    jenisBbm: 'Pertalite',
    kmAwal: 12400,
    kmAkhir: 12568,
    jarakTempuh: 168,
    hargaBbm: 42000,
    jumlahLiter: 4.0,
    kmLiterAktual: 42.0,
    standarKmLiter: 40,
    statusPemakaian: 'Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Pemakaian Wajar',
    userInput: 'Eko Prasetyo, S.Kom',
    timestamp: '2026-08-02T14:10:00.000Z'
  },
  {
    id: 'BBM-202607-001',
    tanggalPembelian: '2026-07-28',
    kendaraanId: 'KND-001',
    kendaraanNama: 'Mobil Operasional Avanza',
    platNomor: 'B 1234 RFS',
    jenisBbm: 'Pertamax',
    kmAwal: 41650,
    kmAkhir: 42100,
    jarakTempuh: 450,
    hargaBbm: 470850,
    jumlahLiter: 36.5,
    kmLiterAktual: 12.33,
    standarKmLiter: 12,
    statusPemakaian: 'Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Pemakaian Wajar',
    userInput: 'Ahmad Fauzi, S.T.',
    timestamp: '2026-07-28T16:20:00.000Z'
  },
  {
    id: 'BBM-202607-002',
    tanggalPembelian: '2026-07-25',
    kendaraanId: 'KND-004',
    kendaraanNama: 'Ambulance Hino Dutro',
    platNomor: 'B 7788 SPP',
    jenisBbm: 'Pertamina Dex',
    kmAwal: 31200,
    kmAkhir: 31520,
    jarakTempuh: 320,
    hargaBbm: 634200,
    jumlahLiter: 42.0,
    kmLiterAktual: 7.62,
    standarKmLiter: 8,
    statusPemakaian: 'Tidak Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Boros',
    userInput: 'Dr. H. Ahmad Pratama, M.Kom',
    timestamp: '2026-07-25T11:45:00.000Z'
  },
  {
    id: 'BBM-202607-003',
    tanggalPembelian: '2026-07-20',
    kendaraanId: 'KND-005',
    kendaraanNama: 'Bus Jemputan Staf Isuzu',
    platNomor: 'B 1122 SPP',
    jenisBbm: 'Solar',
    kmAwal: 98100,
    kmAkhir: 98520,
    jarakTempuh: 420,
    hargaBbm: 394400,
    jumlahLiter: 58.0,
    kmLiterAktual: 7.24,
    standarKmLiter: 7,
    statusPemakaian: 'Normal',
    uploadStruk: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    statusStruk: 'Ter-upload',
    keterangan: 'Pemakaian Wajar',
    userInput: 'Budi Santoso, S.E.',
    timestamp: '2026-07-20T08:00:00.000Z'
  }
];

// In-Memory Database Controller Singleton
class EnterpriseDataStore {
  public users: User[] = [...initialUsers];
  public roles: RolePermission[] = [...initialRoles];
  public menus: MenuItem[] = [...initialMenus];
  public pegawai: MasterPegawai[] = [...initialPegawai];
  public divisi: MasterDivisi[] = [...initialDivisi];
  public jabatan: MasterJabatan[] = [...initialJabatan];
  public gudang: MasterGudang[] = [...initialGudang];
  public kategori: MasterKategori[] = [...initialKategori];
  public instansi: MasterInstansi[] = [...initialInstansi];
  public suratMasuk: SuratMasuk[] = [...initialSuratMasuk];
  public suratKeluar: SuratKeluar[] = [...initialSuratKeluar];
  public disposisi: Disposisi[] = [...initialDisposisi];
  public templates: TemplateSurat[] = [...initialTemplateSurat];
  public barang: MasterBarang[] = [...initialMasterBarang];
  public stockMovements: StockMovement[] = [...initialStockMovements];
  public opnameSessions: StockOpnameSession[] = [...initialStockOpnameSessions];
  public kendaraan: MasterKendaraan[] = [...initialKendaraan];
  public laporanBbm: LaporanBbm[] = [...initialLaporanBbm];
  public notifications: NotificationItem[] = [...initialNotifications];
  public activityLogs: ActivityLog[] = [...initialActivityLogs];
  public settings: PortalSettings = { ...initialSettings };

  public addLog(userId: string, namaUser: string, modul: string, aktivitas: string, detail?: string, ipAddress = '127.0.0.1', status: 'Sukses' | 'Gagal' = 'Sukses') {
    const now = new Date();
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      userId,
      namaUser,
      modul,
      aktivitas,
      detail: detail || aktivitas,
      tanggal: now.toISOString().split('T')[0],
      jam: now.toTimeString().split(' ')[0],
      browser: 'Web Browser / REST Client',
      ipAddress,
      status
    };
    this.activityLogs.unshift(newLog);
  }

  public addNotification(modul: NotificationItem['modul'], judul: string, pesan: string, tipe: NotificationItem['tipe'] = 'info', linkUrl?: string) {
    const now = new Date();
    const newNtf: NotificationItem = {
      id: `NTF-${Date.now()}`,
      modul,
      judul,
      pesan,
      tipe,
      isRead: false,
      createdAt: `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`,
      linkUrl
    };
    this.notifications.unshift(newNtf);
  }
}

export const dbStore = new EnterpriseDataStore();
