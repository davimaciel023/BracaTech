import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private readonly db = inject(Firestore);


  docRef<T>(path: string) {
    return doc(this.db, path) as any as import('firebase/firestore').DocumentReference<T>;
  }


  colRef<T>(path: string) {
    return collection(this.db, path) as any as import('firebase/firestore').CollectionReference<T>;
  }


  async get<T>(path: string) {
    const snap = await getDoc(this.docRef<T>(path));
    return snap.exists() ? (snap.data() as T) : null;
  }


  set<T>(path: string, data: T) {
    return setDoc(this.docRef<T>(path), data as any, { merge: true });
  }


  update<T>(path: string, data: Partial<T>) {
    return updateDoc(this.docRef<T>(path), data as any);
  }


  async queryBy<T>(path: string, field: string, op: any, value: any) {
    const q = query(this.colRef<T>(path), where(field as any, op, value));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      id: d.id, ...(d.data() as any)
    })) as (T & { id: string })[];
  }
}
