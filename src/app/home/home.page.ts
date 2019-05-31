import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';
import { AdmobfreeService } from '../services/admobfree.service';
import { Plugins } from '@capacitor/core';

const { Browser, Share } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  constructor(
    public newsService: NewsService,
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

  async onClickReadMore(news: News) {
    this.newsService.updateReadCount(news.id);

    await Browser.open({ url: news.url, toolbarColor: '#3880ff' });
  }

  async share(news: News) {
    await Share.share({
      title: `${news.title}`,
      text: `${news.title} - Shared via "What the World is Talking About Bangladesh (WWTAB)" App`,
      url: news.url,
      dialogTitle: 'Share news',
    });
  }

  ngAfterViewInit() {
    this.admobService.showBanner();
  }
}
