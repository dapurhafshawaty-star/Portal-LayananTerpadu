import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { dbStore } from './store';

let firestoreDb: any = null;
let isConnected = false;
let configData: any = null;

export function getFirestoreDb() {
  if (firestoreDb) return firestoreDb;

  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const app = !getApps().length ? initializeApp(configData) : getApp();
      firestoreDb = configData.firestoreDatabaseId 
        ? getFirestore(app, configData.firestoreDatabaseId)
        : getFirestore(app);
      isConnected = true;
      console.log('🔥 Connected to Google Cloud Firestore:', configData.projectId, configData.firestoreDatabaseId);
    }
  } catch (err) {
    console.error('⚠️ Could not initialize Firestore:', err);
  }
  return firestoreDb;
}

export function getCloudInfo() {
  getFirestoreDb();
  return {
    isConnected,
    projectId: configData?.projectId || 'chromatic-reference-lt3g1',
    databaseId: configData?.firestoreDatabaseId || 'default',
    authDomain: configData?.authDomain || '',
    appId: configData?.appId || ''
  };
}

// Sync helper functions to write changes to Firestore in realtime
export async function syncSaveDoc(collectionName: string, docId: string, data: any) {
  try {
    const db = getFirestoreDb();
    if (!db) return;
    const cleanData = JSON.parse(JSON.stringify(data));
    await setDoc(doc(db, collectionName, docId), cleanData, { merge: true });
  } catch (err) {
    console.error(`⚠️ Error writing ${collectionName}/${docId} to Firestore:`, err);
  }
}

export async function syncDeleteDoc(collectionName: string, docId: string) {
  try {
    const db = getFirestoreDb();
    if (!db) return;
    await deleteDoc(doc(db, collectionName, docId));
  } catch (err) {
    console.error(`⚠️ Error deleting ${collectionName}/${docId} from Firestore:`, err);
  }
}

// Collections to manage and keep realtime synchronized
const SYNCED_COLLECTIONS = [
  { key: 'users', coll: 'users' },
  { key: 'pegawai', coll: 'pegawai' },
  { key: 'divisi', coll: 'divisi' },
  { key: 'jabatan', coll: 'jabatan' },
  { key: 'gudang', coll: 'gudang' },
  { key: 'kategori', coll: 'kategori' },
  { key: 'instansi', coll: 'instansi' },
  { key: 'kendaraan', coll: 'kendaraan' },
  { key: 'laporanBbm', coll: 'laporanBbm' }
];

export async function initFirestoreSync() {
  const db = getFirestoreDb();
  if (!db) return;

  for (const item of SYNCED_COLLECTIONS) {
    try {
      const collRef = collection(db, item.coll);
      const snapshot = await getDocs(collRef);

      if (snapshot.empty) {
        // Seed initial data to Cloud Firestore if collection is empty
        const initialItems = (dbStore as any)[item.key];
        if (Array.isArray(initialItems) && initialItems.length > 0) {
          console.log(`🌱 Seeding ${initialItems.length} items to Firestore collection '${item.coll}'...`);
          for (const docData of initialItems) {
            const docId = docData.id || `DOC-${Date.now()}`;
            await setDoc(doc(db, item.coll, docId), JSON.parse(JSON.stringify(docData)));
          }
        }
      } else {
        // Load data from Firestore into dbStore
        const docsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        (dbStore as any)[item.key] = docsData;
        console.log(`📥 Loaded ${docsData.length} items from Firestore '${item.coll}'`);
      }

      // Realtime listener for snapshot updates
      onSnapshot(collRef, (sn) => {
        if (!sn.empty) {
          const updated = sn.docs.map(d => ({ id: d.id, ...d.data() }));
          (dbStore as any)[item.key] = updated;
        }
      }, (err) => {
        console.warn(`Firestore listener warning for ${item.coll}:`, err.message);
      });

    } catch (err) {
      console.error(`⚠️ Error syncing collection ${item.coll}:`, err);
    }
  }
}
