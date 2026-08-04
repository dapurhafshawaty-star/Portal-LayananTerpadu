import React, { useState, useEffect } from 'react';
import { Boxes, Plus, Search, QrCode, AlertTriangle, CheckCircle, Barcode } from 'lucide-react';
import { MasterBarang, MasterKategori, MasterGudang } from '../../types';
import { Badge } from '../../components/common/Badge';

export const MasterBarangView: React.FC = () => {
  const [items, setItems] = useState<MasterBarang[]>([]);
  const [kategoriList, setKategoriList] = useState<MasterKategori[]>([]);
  const [gudangList, setGudangList] = useState<MasterGudang[]>([]);
  const [filter, setFilter] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<MasterBarang | null>(null);

  const [form, setForm] = useState({
    namaBarang: '',
    kategoriId: 'KAT-001',
    gudangId: 'GDG-001',
    satuan: 'Pcs',
    stokMinimal: 10,
    stokSekarang: 25,
    hargaSatuan: 150000
  });

  const fetchData = async () => {
    try {
      const res1 = await fetch('/api/v1/stock/barang');
      const d1 = await res1.json();
      if (d1.success) setItems(d1.data);

      const res2 = await fetch('/api/v1/master/kategori');
      const d2 = await res2.json();
      if (d2.success) setKategoriList(d2.data);

      const res3 = await fetch('/api/v1/master/gudang');
      const d3 = await res3.json();
      if (d3.success) setGudangList(d3.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/stock/barang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setIsAddOpen(false);
        setForm({ namaBarang: '', kategoriId: 'KAT-001', gudangId: 'GDG-001', satuan: 'Pcs', stokMinimal: 10, stokSekarang: 25, hargaSatuan: 150000 });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter(i =>
    i.namaBarang.toLowerCase().includes(filter.toLowerCase()) ||
    i.kodeBarang.toLowerCase().includes(filter.toLowerCase()) ||
    i.barcode.includes(filter)
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-600" /> Modul Stock Opname: Master Barang Gudang
          </h2>
          <p className="text-xs text-slate-500">
            Pengelolaan SKU barang, batas stok minimal, barcode EAN-13 & cetak label QR Code
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah Barang Baru
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nama barang, kode SKU, atau nomor barcode..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              <th className="p-3">Kode SKU & Barcode</th>
              <th className="p-3">Nama Barang</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Gudang</th>
              <th className="p-3">Stok Minimal</th>
              <th className="p-3">Stok Saat Ini</th>
              <th className="p-3">Harga Satuan</th>
              <th className="p-3 text-right">Label QR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {filteredItems.map((item) => {
              const isLow = item.stokSekarang <= item.stokMinimal;
              return (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{item.kodeBarang}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Barcode className="w-3 h-3" /> {item.barcode}
                    </div>
                  </td>
                  <td className="p-3 font-medium text-slate-900 dark:text-slate-100 max-w-xs">{item.namaBarang}</td>
                  <td className="p-3">{item.kategoriNama}</td>
                  <td className="p-3">{item.gudangNama}</td>
                  <td className="p-3">{item.stokMinimal} {item.satuan}</td>
                  <td className="p-3">
                    <span className={`font-bold ${isLow ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {item.stokSekarang} {item.satuan}
                    </span>
                    {isLow && (
                      <span className="ml-1 px-1.5 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[9px] rounded font-bold">
                        LOW
                      </span>
                    )}
                  </td>
                  <td className="p-3">Rp {item.hargaSatuan.toLocaleString('id-ID')}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedQR(item)}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-medium text-[11px] inline-flex items-center gap-1"
                    >
                      <QrCode className="w-3.5 h-3.5 text-amber-600" /> Cetak QR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Tambah Master Barang Gudang</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Nama Barang</label>
                <input
                  type="text"
                  required
                  placeholder="Nama spesifikasi barang"
                  value={form.namaBarang}
                  onChange={(e) => setForm({ ...form, namaBarang: e.target.value })}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Kategori</label>
                  <select
                    value={form.kategoriId}
                    onChange={(e) => setForm({ ...form, kategoriId: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  >
                    {kategoriList.map(k => (
                      <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Gudang Lokasi</label>
                  <select
                    value={form.gudangId}
                    onChange={(e) => setForm({ ...form, gudangId: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  >
                    {gudangList.map(g => (
                      <option key={g.id} value={g.id}>{g.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Satuan</label>
                  <input
                    type="text"
                    required
                    value={form.satuan}
                    onChange={(e) => setForm({ ...form, satuan: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Stok Minimal</label>
                  <input
                    type="number"
                    required
                    value={form.stokMinimal}
                    onChange={(e) => setForm({ ...form, stokMinimal: Number(e.target.value) })}
                    className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Stok Awal</label>
                  <input
                    type="number"
                    required
                    value={form.stokSekarang}
                    onChange={(e) => setForm({ ...form, stokSekarang: Number(e.target.value) })}
                    className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Harga Satuan (Rp)</label>
                <input
                  type="number"
                  required
                  value={form.hargaSatuan}
                  onChange={(e) => setForm({ ...form, hargaSatuan: Number(e.target.value) })}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold"
                >
                  Simpan Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Label QR & Barcode Fisik</h3>
            <div className="p-4 bg-white border border-slate-200 rounded-xl inline-block shadow-inner">
              <img src={selectedQR.qrCodeUrl} alt="QR Code" className="w-40 h-40 mx-auto" />
              <div className="font-mono text-xs font-bold text-slate-900 mt-2">{selectedQR.kodeBarang}</div>
              <div className="text-[10px] text-slate-500">{selectedQR.barcode}</div>
            </div>
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {selectedQR.namaBarang}
            </div>
            <button
              onClick={() => setSelectedQR(null)}
              className="w-full py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg"
            >
              Tutup Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
