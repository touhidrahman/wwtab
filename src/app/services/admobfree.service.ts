import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';

const { AdMob } = Plugins;

/**
 * https://github.com/rahadur/capacitor-admob
 */
@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {

  bannerOptions: AdOptions = {
    adId: environment.admobIds.Banner,
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
  }

  constructor(private platform: Platform) {
    AdMob.initialize(environment.admobIds.AppId);
  }

  showBanner() {
    this.platform.ready().then(() => {
      AdMob.showBanner(this.bannerOptions)
        .then(value => console.log(value), err => console.error(err));

      // Subscibe Banner Event Listener
      AdMob.addListener('onAdLoaded', (info: boolean) => {
        console.log("Banner Ad Loaded");
      });
    })
      .then(e => console.log(e));
  }

  hideBannerr() {
    this.platform.ready().then(() => {
      // this.adMobFree.banner.hide().catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

  loadInterstitial() {
    this.platform
      .ready()
      .then(() => {

      })
  }

  showInterstitial() {
    this.platform
      .ready()
      .then(() => {

      })
  }

  showRewardVideo() {
    this.platform
      .ready()
      .then(() => {

      });
  }
}
