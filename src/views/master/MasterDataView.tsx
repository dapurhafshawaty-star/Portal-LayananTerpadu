import React, { useState, useEffect } from 'react';
import { Database, Plus, Users, Building, Warehouse, Tag, Landmark, Search } from 'lucide-react';
import { MasterPegawai, MasterDivisi, MasterJabatan, MasterGudang, MasterKategori, MasterInstansi } from '../../types';
import { Badge } from '../../components/common/Badge';

export const MasterDataView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pegawai' | 'divisi' | 'jabatan' | 'gudang' | 'kategori' | 'instansi'>('pegawai');

  const [pegawai, setPegawai] = useState<MasterPegawai[]>([]);
  const [divisi, setDivisi] = useState<MasterDivisi[]>([]);
  const [jabatan, setJabatan] = useState<MasterJabatan[]>([]);
  const [gudang, setGudang] = useState<MasterGudang[]>([]);
  const [kategori, setKategori] = useState<MasterKategori[]>([]);
  const [instansi, setInstansi] = useState<MasterInstansi[]>([]);

  const fetchMaster = async () => {
    try {
      const r1 = await fetch('/api/v1/master/pegawai'); setPegawai((await r1.json()).data || []);
      const r2 = await fetch('/api/v1/master/divisi'); setDivisi((await r2.json()).data || []);
      const r3 = await fetch('/api/v1/master/jabatan'); setJabatan((await r3.json()).data || []);
      const r4 = await fetch('/api/v1/master/gudang'); setGudang((await r4.json()).data || []);
      const r5 = await fetch('/api/v1/master/kategori'); setKategori((await r5.json()).data || []);
      const r6 = await fetch('/api/v1/master/instansi'); setInstansi((await r6.json()).data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMaster();
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-600" /> Master Data Terpadu Enterprise (Shared Database)
        </h2>
        <p className="text-xs text-slate-500">
          Pusat referensi master data bersama yang digunakan oleh e-Surat Digital, Stock Opname, dan Manajemen Pengguna
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pegawai')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'pegawai' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Master Pegawai ({pegawai.length})
        </button>
        <button
          onClick={() => setActiveTab('divisi')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'divisi' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building className="w-4 h-4" /> Master Divisi ({divisi.length})
        </button>
        <button
          onClick={() => setActiveTab('gudang')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'gudang' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Warehouse className="w-4 h-4" /> Master Gudang ({gudang.length})
        </button>
        <button
          onClick={() => setActiveTab('kategori')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'kategori' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Tag className="w-4 h-4" /> Kategori Barang ({kategori.length})
        </button>
        <button
          onClick={() => setActiveTab('instansi')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'instansi' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4" /> Instansi Mitra ({instansi.length})
        </button>
      </div>

      {/* Content per Tab */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-x-auto">
        {activeTab === 'pegawai' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-3">NIP</th>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Email & Kontak</th>
                <th className="p-3">Divisi</th>
                <th className="p-3">Jabatan</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pegawai.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold">{p.nip}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{p.nama}</td>
                  <td className="p-3">{p.email}<div className="text-[10px] text-slate-400">{p.telepon}</div></td>
                  <td className="p-3">{p.divisiNama}</td>
                  <td className="p-3">{p.jabatanNama}</td>
                  <td className="p-3"><Badge variant="success">{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'divisi' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-3">Kode</th>
                <th className="p-3">Nama Divisi</th>
                <th className="p-3">Kepala Divisi</th>
                <th className="p-3">Keterangan Fungsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {divisi.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-purple-600">{d.kode}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{d.nama}</td>
                  <td className="p-3">{d.kepalaDivisi || '-'}</td>
                  <td className="p-3 text-slate-500">{d.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'gudang' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-3">Kode Gudang</th>
                <th className="p-3">Nama Gudang</th>
                <th className="p-3">Lokasi Fisik</th>
                <th className="p-3">Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {gudang.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-600">{g.kode}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{g.nama}</td>
                  <td className="p-3 text-slate-500">{g.lokasi}</td>
                  <td className="p-3">{g.penanggungJawab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'kategori' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-3">Kode</th>
                <th className="p-3">Nama Kategori</th>
                <th className="p-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {kategori.map((k) => (
                <tr key={k.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-blue-600">{k.kode}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{k.nama}</td>
                  <td className="p-3 text-slate-500">{k.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'instansi' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <th className="p-3">Kode</th>
                <th className="p-3">Nama Instansi Partner</th>
                <th className="p-3">Alamat</th>
                <th className="p-3">Kontak & Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {instansi.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-indigo-600">{ins.kode}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{ins.nama}</td>
                  <td className="p-3 text-slate-500 max-w-xs">{ins.alamat}</td>
                  <td className="p-3">{ins.email}<div className="text-[10px] text-slate-400">{ins.telepon} • {ins.kontakPerson}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
