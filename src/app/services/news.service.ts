import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, scan, tap, take } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface News {
  id?: string;
  url: string;
  title?: string;
  description?: string;
  image?: string;
  source?: string;
  icon?: string;
  country?: string;
  tags?: Array<string>;
  createdAt?: Date;
  readCount?: number;
  doc?: QueryDocumentSnapshot<News>;
}

export interface QueryConfig {
  orderBy?: string;
  limit?: number;
  prepend?: boolean;
  reverse?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _collectionName = 'news';
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject<News[]>([]);
  private query: QueryConfig;

  data: Observable<Array<News>>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore) { }

  init(options?: any) {
    this.query = {
      limit: 5,
      prepend: false,
      orderBy: 'createdAt',
      reverse: true, // createdAt desc = newest articles first
      ...options
    };

    const firstBatch = this.afs.collection(this._collectionName, ref => {
      return ref
        .limit(this.query.limit)
        .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc');
    });

    this.mapAndUpdate(firstBatch);

    this.data = this._data.asObservable().pipe(
      scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      }));
  }

  more() {
    const cursor = this.getCursor();

    if (!cursor) { return }

    const more = this.afs.collection(this._collectionName, ref => {
      return ref
        .limit(this.query.limit)
        .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
        .startAfter(cursor);
    });

    this.mapAndUpdate(more);
  }

  getNewsList(): Observable<Array<News>> {
    return this.data;
  }

  updateReadCount(id: string) {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.afs.collection<News>(this._collectionName).doc(id).update({ readCount: increment });
  }

  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  private mapAndUpdate(collection: AngularFirestoreCollection<any>) {
    if (this._done.value || this._loading.value) { return; }

    // loading
    this._loading.next(true);

    // map snapshot with doc ref (needed for cursor)
    return collection.snapshotChanges().pipe(
      tap(arr => {
        let values = arr.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const doc = snapshot.payload.doc;
          const id = snapshot.payload.doc.id;
          return {
            id,
            doc,
            ...data,
            createdAt: new Date(data.createdAt.seconds * 1000),
          };
        });

        // if prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values;

        // update source with new values
        this._data.next(values);
        this._loading.next(false);
        if (!values.length) {
          this._done.next(true);
        }
      }),

      // take only one call and complete
      take(1),
    ).subscribe();
  }
}
