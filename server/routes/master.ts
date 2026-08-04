import { Router, Request, Response } from 'express';
import { dbStore } from '../db/store';

const router = Router();

// Master Pegawai
router.get('/pegawai', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.pegawai });
});

router.post('/pegawai', (req: Request, res: Response): void => {
  const newPeg = { id: `PEG-${String(dbStore.pegawai.length + 1).padStart(3, '0')}`, ...req.body };
  dbStore.pegawai.unshift(newPeg);
  dbStore.addLog('ADMIN', 'System Administrator', 'Master Data', 'Tambah Pegawai', `Menambahkan pegawai '${newPeg.nama}'`, req.ip);
  res.status(201).json({ success: true, data: newPeg });
});

router.put('/pegawai/:id', (req: Request, res: Response): void => {
  const index = dbStore.pegawai.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    dbStore.pegawai[index] = { ...dbStore.pegawai[index], ...req.body };
    res.json({ success: true, data: dbStore.pegawai[index] });
  } else {
    res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan.' });
  }
});

router.delete('/pegawai/:id', (req: Request, res: Response): void => {
  const index = dbStore.pegawai.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const deleted = dbStore.pegawai.splice(index, 1)[0];
    res.json({ success: true, data: deleted });
  } else {
    res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan.' });
  }
});

// Master Divisi
router.get('/divisi', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.divisi });
});

router.post('/divisi', (req: Request, res: Response): void => {
  const newDiv = { id: `DIV-${String(dbStore.divisi.length + 1).padStart(3, '0')}`, ...req.body };
  dbStore.divisi.unshift(newDiv);
  res.status(201).json({ success: true, data: newDiv });
});

// Master Jabatan
router.get('/jabatan', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.jabatan });
});

// Master Gudang
router.get('/gudang', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.gudang });
});

router.post('/gudang', (req: Request, res: Response): void => {
  const newGdg = { id: `GDG-${String(dbStore.gudang.length + 1).padStart(3, '0')}`, ...req.body };
  dbStore.gudang.unshift(newGdg);
  res.status(201).json({ success: true, data: newGdg });
});

// Master Kategori
router.get('/kategori', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.kategori });
});

// Master Instansi
router.get('/instansi', (req: Request, res: Response): void => {
  res.json({ success: true, data: dbStore.instansi });
});

export default router;
