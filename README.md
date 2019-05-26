# Build

## Production

    $ ionic cordova build android --prod --release

    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Documents/Keys/playstore/my-release-key.keystore ~/Codes/2019/wwtab/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

    $ ${ANDROID_SDK_ROOT}/build-tools/29.0.0-rc3/zipalign -v 4 ~/Codes/2019/wwtab/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ~/Downloads/wwtab-1-0-0.apk
