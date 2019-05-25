import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public newsService: NewsService,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
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

  share(news: News) {
    const message = `${news.title} - Shared via "What the World is Talking About Bangladesh (WWTAB)" App`;
    this.socialSharing.share(message, news.title, news.image, news.url);
  }
}
