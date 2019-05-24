import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    this.newsService.init({ prepend: false });
  }

  loadNews(event): void {
    this.newsService.more();

    this.newsService.loading.subscribe(loading => {
      if (!loading) {
        event.target.complete();
      }
    })
  }

}
