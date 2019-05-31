// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // test firebase config
  // firebaseConfig: {
  //   apiKey: "AIzaSyAi7nEjTzgO7tHkkk4ZAQF1HEmMoICe6CQ",
  //   authDomain: "dev-test-thd.firebaseapp.com",
  //   databaseURL: "https://dev-test-thd.firebaseio.com",
  //   projectId: "dev-test-thd",
  //   storageBucket: "dev-test-thd.appspot.com",
  //   messagingSenderId: "476194911587",
  //   appId: "1:476194911587:web:2353d4f092e5c8c1"
  // },
  // prod firebase config
  firebaseConfig: {
    apiKey: "AIzaSyCBkLRDzYSwD05ci_sSttQ7AbwAaiWoHfc",
    authDomain: "wwtabapp.firebaseapp.com",
    databaseURL: "https://wwtabapp.firebaseio.com",
    projectId: "wwtabapp",
    storageBucket: "wwtabapp.appspot.com",
    messagingSenderId: "862151947581",
    appId: "1:862151947581:web:8c2d8d1ec38830ef"
  },
  // Google test ad IDs
  admobIds: {
    AppId: "",
    Banner: "ca-app-pub-3940256099942544/6300978111",
    Interstitial: "ca-app-pub-3940256099942544/1033173712",
    Interstitial_Video: "ca-app-pub-3940256099942544/8691691433",
    Rewarded_Video: "ca-app-pub-3940256099942544/5224354917",
    Native_Advanced: "ca-app-pub-3940256099942544/2247696110",
    Native_Advanced_Video: "ca-app-pub-3940256099942544/1044960115",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
