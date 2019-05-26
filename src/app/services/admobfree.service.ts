import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {

  constructor(private platform: Platform, private adMobFree: AdMobFree) { }

  showBanner() {
    this.platform.ready().then(() => {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: environment.admobIds.Banner,
        autoShow: false,
      };

      this.adMobFree.banner.config(bannerConfig);
      this.adMobFree.banner.prepare().then(() => {
        this.adMobFree.banner.show();
      })
        .catch(e => console.log(e))
    })
      .then(e => console.log(e));
  }

  hideBannerr() {
    this.platform.ready().then(() => {
      this.adMobFree.banner.hide().catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

  loadInterstitial() {
    this.platform
      .ready()
      .then(() => {
        this.adMobFree.interstitial.config({
          id: environment.admobIds.Interstitial,
          autoShow: false,
        });
        this.adMobFree.interstitial.prepare();
      })
  }

  showInterstitial() {
    this.platform
      .ready()
      .then(() => {
        this.adMobFree.interstitial.config({
          id: environment.admobIds.Interstitial,
          autoShow: false,
        });
        this.adMobFree.interstitial
          .isReady()
          .then(() => this.adMobFree.interstitial.show());
      })
  }

  showRewardVideo() {
    this.platform
      .ready()
      .then(() => {
        this.adMobFree.rewardVideo.config({
          id: environment.admobIds.Rewarded_Video,
          autoShow: false,
        });
        this.adMobFree.rewardVideo
          .prepare()
          .then(() => {
            this.adMobFree.rewardVideo
              .isReady()
              .then(() => this.adMobFree.rewardVideo.show());
          });
      });
  }
}
