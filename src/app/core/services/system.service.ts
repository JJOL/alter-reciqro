import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { Router } from '@angular/router';

/**
 * Calls Cache KEY
 */
const CALLS_CACHE_NAME = 'calls';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

    calls: any[];

    constructor(private firedb: AngularFirestore, private router: Router) {
      this.calls = this.loadCalls();
      this.clearCache();
    }
    /**
     * Description: Proxy Firestore.collection
     * @param  {string} keyPath
     * @param  {QueryFn} queryFn?
     * @returns AngularFirestoreCollection
     */
    collection<T = unknown>(keyPath: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
      this.registerCall(keyPath);
      return this.firedb.collection<T>(keyPath, queryFn);
    }
    /**
     * Description: Proxy Firestore.doc
     * @param  {string} keyPath
     * @returns AngularFirestoreDocument
     */
    doc<T = unknown>(keyPath: string): AngularFirestoreDocument<T> {
      this.registerCall(keyPath);
      return this.firedb.doc<T>(keyPath);
    }

    /**
     * Description: Registers a call
     * @param  {string} key
     */
    registerCall(key:string) {
      this.calls.push({
        key: key,
        date: new Date(),
        url: this.router.url
      });

      localStorage.setItem(CALLS_CACHE_NAME, JSON.stringify(this.calls));
    }

    
    /**
     * Description: Returns a list of calls made
     * @returns any[]
     */
    getCalls(): any[] {
      this.calls = this.loadCalls();
      return [...this.calls];
    }

    /**
     * Description: Loads calls from cache
     * @returns any[]
     */
    loadCalls(): any[] {
      let saved = localStorage.getItem(CALLS_CACHE_NAME);
      let calls: any[];
      if (saved) {
        calls = JSON.parse(saved);
      } else {
        calls = [];
      }
      return calls;
    }

    
    /**
     * Description: Clears cache calls
     */
    clearCache() {
      localStorage.removeItem(CALLS_CACHE_NAME);
    }

    
}