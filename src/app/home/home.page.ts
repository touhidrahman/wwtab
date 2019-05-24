import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  newsList: Array<News>;
  page = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsList().subscribe(res => this.newsList = res);
  }

  loadNews(event): void {

  }

}
