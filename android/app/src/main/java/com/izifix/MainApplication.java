package com.mobile.izifix;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// lib
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import cl.json.RNSharePackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.centaurwarchief.smslistener.SmsListenerPackage;
//import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

// Debugging
// import android.os.Bundle;
// import com.facebook.react.modules.network.ReactCookieJarContainer;
// import com.facebook.stetho.Stetho;
// import okhttp3.OkHttpClient;
// import com.facebook.react.modules.network.OkHttpClientProvider;
// import com.facebook.stetho.okhttp3.StethoInterceptor;
// import java.util.concurrent.TimeUnit;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RCTSplashScreenPackage(),
            new RNSharePackage(),
            new ImagePickerPackage(),
            new RNDeviceInfo(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new SmsListenerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // Debugging
    // Stetho.initializeWithDefaults(this);
    // OkHttpClient client = new OkHttpClient.Builder()
    //   .connectTimeout(0, TimeUnit.MILLISECONDS)
    //   .readTimeout(0, TimeUnit.MILLISECONDS)
    //   .writeTimeout(0, TimeUnit.MILLISECONDS)
    //   .cookieJar(new ReactCookieJarContainer())
    //   .addNetworkInterceptor(new StethoInterceptor())
    //   .build();
    // OkHttpClientProvider.replaceOkHttpClient(client);
  }
}
