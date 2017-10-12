package com.mobile.izifix;

import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;
//import android.widget.ImageView;
import android.os.Bundle;
//import android.util.Log;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Izifix";
    }

    @Override
	protected void onCreate(Bundle savedInstanceState) {
	    RCTSplashScreen.openSplashScreen(this);   //open splashscreen
	    //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
	    super.onCreate(savedInstanceState);
	}
    // @Override
    // public void finish() { // fix bug push notification
        
    //     //Log.v("MainActivity", "sdfsdf");
    //     if( android.os.Build.VERSION.SDK_INT >= 21 ) {
    //         super.finishAndRemoveTask();
    //     }else {
    //         super.finish();
    //     }
    //     android.os.Process.killProcess( android.os.Process.myPid() );
    // }
}
