import { Router, Request, Response } from 'express';
import { dbStore } from '../db/store';
import { MasterBarang, StockMovement, StockOpnameSession } from '../../src/types';

const router = Router();

// --- MASTER BARANG ---
router.get('/barang', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.barang });
});

router.post('/barang', (req: Request, res: Response): void => {
  const { namaBarang, kategoriId, gudangId, satuan, stokMinimal, stokSekarang, hargaSatuan } = req.body;

  if (!namaBarang || !kategoriId || !gudangId) {
    res.status(400).json({ success: false, message: 'Nama Barang, Kategori, dan Gudang wajib diisi.' });
    return;
  }

  const kat = dbStore.kategori.find(k => k.id === kategoriId);
  const gdg = dbStore.gudang.find(g => g.id === gudangId);

  const newBarang: MasterBarang = {
    id: `BRG-${String(dbStore.barang.length + 1).padStart(3, '0')}`,
    kodeBarang: `BRG-${kat?.kode || 'GEN'}-${String(dbStore.barang.length + 1).padStart(3, '0')}`,
    namaBarang,
    kategoriId,
    kategoriNama: kat?.nama || 'Umum',
    gudangId,
    gudangNama: gdg?.nama || 'Gudang Utama Central',
    satuan: satuan || 'Pcs',
    stokMinimal: Number(stokMinimal) || 10,
    stokSekarang: Number(stokSekarang) || 0,
    hargaSatuan: Number(hargaSatuan) || 0,
    barcode: `8991001${Date.now().toString().slice(-6)}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-${Date.now()}`
  };

  dbStore.barang.unshift(newBarang);
  dbStore.addLog('USER', 'Staf Opname', 'Stock Opname', 'Tambah Master Barang', `Menambahkan barang baru: ${namaBarang}`, req.ip);

  res.status(201).json({ success: true, message: 'Master Barang berhasil disimpan', data: newBarang });
});

// --- STOCK MOVEMENT (IN / OUT) ---
router.get('/movements', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.stockMovements });
});

router.post('/movements', (req: Request, res: Response): void => {
  const { jenis, barangId, jumlah, referensiNota, keterangan, petugas } = req.body;
  const item = dbStore.barang.find(b => b.id === barangId);

  if (!item) {
    res.status(400).json({ success: false, message: 'Barang tidak ditemukan.' });
    return;
  }

  const qty = Number(jumlah);
  if (jenis === 'Keluar' && item.stokSekarang < qty) {
    res.status(400).json({ success: false, message: `Stok tidak mencukupi! Stok saat ini ${item.stokSekarang} ${item.satuan}` });
    return;
  }

  // Update item balance
  if (jenis === 'Masuk') {
    item.stokSekarang += qty;
  } else {
    item.stokSekarang -= qty;
  }

  const movement: StockMovement = {
    id: `MOV-${String(dbStore.stockMovements.length + 1).padStart(3, '0')}`,
    jenis,
    barangId,
    kodeBarang: item.kodeBarang,
    namaBarang: item.namaBarang,
    jumlah: qty,
    gudangId: item.gudangId,
    gudangNama: item.gudangNama,
    referensiNota: referensiNota || `REF-${Date.now().toString().slice(-6)}`,
    keterangan: keterangan || `Transaksi Stok ${jenis}`,
    tanggal: new Date().toISOString().replace('T', ' ').slice(0, 16),
    petugas: petugas || 'Budi Santoso, S.E.'
  };

  dbStore.stockMovements.unshift(movement);
  dbStore.addLog('USER', petugas || 'Staf Opname', 'Stock Opname', `Stok ${jenis}`, `Transaksi Stok ${jenis} ${qty} ${item.satuan} - ${item.namaBarang}`, req.ip);

  if (item.stokSekarang <= item.stokMinimal) {
    dbStore.addNotification('Stock Opname', 'Peringatan Stok Minimal!', `Stok barang "${item.namaBarang}" mencapai batas minimal (${item.stokSekarang} ${item.satuan}).`, 'warning', '/stock');
  }

  res.status(201).json({ success: true, message: `Transaksi Stok ${jenis} Berhasil`, data: { movement, barangUpdated: item } });
});

// --- STOCK OPNAME SESSIONS & ADJUSTMENT ---
router.get('/opname-sessions', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.opnameSessions });
});

router.post('/opname-sessions', (req: Request, res: Response): void => {
  const { gudangId, petugas, items, catatanGeneral } = req.body;
  const gdg = dbStore.gudang.find(g => g.id === gudangId);

  const session: StockOpnameSession = {
    id: `SOP-2026-${String(dbStore.opnameSessions.length + 1).padStart(3, '0')}`,
    kodeOpname: `SOP-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
    tanggal: new Date().toISOString().split('T')[0],
    gudangId: gudangId || 'GDG-001',
    gudangNama: gdg?.nama || 'Gudang Utama Central Enterprise',
    petugas: petugas || 'Budi Santoso, S.E. & Team',
    status: 'Selesai',
    items: items || [],
    catatanGeneral: catatanGeneral || 'Sesi perhitungan fisik opname tercatat.'
  };

  // Process adjustments to master barang stocks
  if (Array.isArray(items)) {
    items.forEach((it: any) => {
      const b = dbStore.barang.find(x => x.id === it.barangId);
      if (b && typeof it.stokFisik === 'number') {
        b.stokSekarang = it.stokFisik;
      }
    });
  }

  dbStore.opnameSessions.unshift(session);
  dbStore.addLog('USER', petugas || 'Tim Opname', 'Stock Opname', 'Finisih Opname Physical', `Menyelesaikan Sesi Stock Opname Kode: ${session.kodeOpname}`, req.ip);
  dbStore.addNotification('Stock Opname', 'Stock Opname Physical Selesai', `Sesi opname ${session.kodeOpname} telah diproses dan stok telah disesuaikan.`, 'success', '/stock');

  res.status(201).json({ success: true, message: 'Sesi Stock Opname dan Penyesuaian Stok Berhasil Disimpan', data: session });
});

export default router;
