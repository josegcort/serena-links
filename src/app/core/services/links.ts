import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LinksService {
  constructor(private firestore: Firestore) {}

  getLinks(): Observable<any[]> {
    const linksRef = collection(this.firestore, 'links');
    return collectionData(linksRef, { idField: 'id' });
  }
}