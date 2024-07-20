package com.bhagvadgeeta.live
import android.app.AlarmManager
import android.content.Intent
import android.os.Build
import android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM
import androidx.annotation.RequiresApi
import androidx.core.content.getSystemService
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class PermissionManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "PermissionManager"

    @RequiresApi(Build.VERSION_CODES.S)
    @ReactMethod fun AlarmPermission(promise: Promise) {
        val alarmManager: AlarmManager = (reactApplicationContext.getSystemService<AlarmManager>())!!

        when {
            // If permission is granted, proceed with scheduling exact alarms.
            alarmManager.canScheduleExactAlarms() -> {
                promise.resolve(true)
            }
            else -> {
                promise.reject("Permission Denied")
            }
        }
    }

}
