import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdmobfreeService } from '../services/admobfree.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  constructor(
    public newsService: NewsService,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private admobService: AdmobfreeService,
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

  onClickReadMore(news: News) {
    this.newsService.updateReadCount(news.id);

    this.openInBrowser(news.url);
  }

  openInBrowser(url: string) {
    this.iab.create(url, '_self', {
      zoom: 'no',
      hidenavigationbuttons: 'yes',
      toolbarcolor: '#3880ff',
    });
  }

  share(news: News) {
    const message = `${news.title} - Shared via "What the World is Talking About Bangladesh (WWTAB)" App`;
    this.socialSharing.share(message, news.title, news.image, news.url);
  }

  ngAfterViewInit() {
    this.admobService.showBanner();
  }
}
