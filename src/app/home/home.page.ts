import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsService, News } from '../services/news.service';
import { AdmobfreeService } from '../services/admobfree.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { Browser, Share, PushNotifications } = Plugins;

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

    // push notification init
    PushNotifications.register();
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      localStorage.setItem('token', token.value);
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      alert(JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      });
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
