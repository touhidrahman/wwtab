import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface News {
  url: string;
  headline?: string;
  excerpt?: string;
  source?: string;
  iconUrl?: string;
  imageUrl?: string;
  country?: string;
  tags?: Array<string>;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsColletion: AngularFirestoreCollection<News>;

  private newsList: Observable<News[]>;

  constructor(private afs: AngularFirestore) {
    this.newsColletion = this.afs.collection<News>('news');

    this.newsList = this.newsColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getNewsList(): Observable<Array<News>> {
    return this.newsList;
  }

  getNews(id: string): Observable<News> {
    return this.newsColletion.doc<News>(id).valueChanges();
  }

  updateNews(id: string, news: News) {
    return this.newsColletion.doc(id).update(news);
  }

  addNews(news: News) {
    return this.newsColletion.add(news);
  }

  removeNews(id: string) {
    return this.newsColletion.doc(id).delete();
  }
}
