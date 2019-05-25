import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public newsService: NewsService,
    private iab: InAppBrowser,
  ) { }

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

  openInBrowser(url: string) {
    // let browser = new InAppBrowser(url, '_blank');
    this.iab.create(url, '_self');
  }

}
