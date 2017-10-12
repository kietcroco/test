#croco
-keep class android.support.v4.app.** { *; }
#-keep interface android.support.v4.app.** { *; }
#-keep class com.actionbarsherlock.** { *; }
#-keep interface com.actionbarsherlock.** { *; }
#-keep class com.android.volley.** { *; }
#-keep interface com.android.volley.** { *; }
#-keep class org.apache.commons.logging.**
#-keepattributes *Annotation*
#-dontwarn org.apache.**
#-keepattributes Annotation,EnclosingMethod,Signature
#-keepnames class com.fasterxml.jackson.* { *; }
#-dontwarn com.fasterxml.jackson.databind.
#-keep class org.codehaus.* { *; }
#-keepclassmembers public final enum org.codehaus.jackson.annotate.JsonAutoDetect$Visibility {
#public static final org.codehaus.jackson.annotate.JsonAutoDetect$Visibility *; }
#-keep android.net.http.**
#-keep org.apache.**
-dontwarn com.facebook.**