import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

    calls: any[];

    constructor(private firedb: AngularFirestore, private router: Router) {
      this.calls = this.loadCalls();
    }

    collection<T = unknown>(keyPath: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
      this.registerCall(keyPath);
      return this.firedb.collection<T>(keyPath, queryFn);
    }

    doc<T = unknown>(keyPath: string): AngularFirestoreDocument<T> {
      this.registerCall(keyPath);
      return this.firedb.doc<T>(keyPath);
    }

    registerCall(key:string) {
      this.calls.push({
        key: key,
        date: new Date(),
        url: this.router.url
      });

        

      localStorage.setItem('calls', JSON.stringify(this.calls));
    }

    getCalls() {
      this.calls = this.loadCalls();
      return [...this.calls];
    }

    loadCalls(): any[] {
      let saved = localStorage.getItem('calls');
      let calls: any[];
      if (saved) {
        calls = JSON.parse(saved);
      } else {
        calls = [];
      }
      return calls;
    }

    
}