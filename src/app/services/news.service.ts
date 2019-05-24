import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, scan, tap, take } from 'rxjs/operators';

export interface News {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  source?: string;
  icon?: string;
  country?: string;
  tags?: Array<string>;
  createdAt?: number;
  doc?: QueryDocumentSnapshot<News>;
}

export interface QueryConfig {
  field?: string; // field to orderBy
  limit: number; // limit per query
  prepend: boolean;
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
      ...options
    };

    const firstBatch = this.afs.collection(this._collectionName, ref => {
      return ref.limit(this.query.limit);
    });

    this.mapAndUpdate(firstBatch);

    this.data = this._data.asObservable().pipe(
      scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      }));
  }

  more() {
    const cursor = this.getCursor();

    const more = this.afs.collection(this._collectionName, ref => {
      return ref.limit(this.query.limit).startAfter(cursor);
    });

    this.mapAndUpdate(more);
  }

  getNewsList(): Observable<Array<News>> {
    return this.data;
  }

  // getNews(id: string): Observable<News> {
  //   return this.newsColletion.doc<News>(id).valueChanges();
  // }

  // updateNews(id: string, news: News) {
  //   return this.newsColletion.doc(id).update(news);
  // }

  // addNews(news: News) {
  //   return this.newsColletion.add(news);
  // }

  // removeNews(id: string) {
  //   return this.newsColletion.doc(id).delete();
  // }

  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return current[current.length - 1].doc;
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
          return { id, ...data, doc };
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
