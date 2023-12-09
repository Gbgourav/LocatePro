package com.locatepro

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import androidx.annotation.NonNull
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import android.content.IntentFilter
import android.os.BatteryManager

@ReactModule(name = BatteryOptimizationCheckModule.NAME)
class BatteryOptimizationCheckModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "BatteryOptimizationCheck"
    }

    private val reactContext: ReactApplicationContext = reactContext

    @ReactMethod
    fun isBatteryOptEnabled(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val packageName = reactContext.packageName
            val pm = reactContext.getSystemService(Context.POWER_SERVICE) as PowerManager
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                promise.resolve(true)
                return
            }
        }
        promise.resolve(false)
    }

    @ReactMethod
    fun isPowerSaveModeEnabled(promise: Promise) {
        val pm = reactContext.getSystemService(Context.POWER_SERVICE) as PowerManager
        promise.resolve(pm.isPowerSaveMode)
    }


    @ReactMethod
    fun getBatteryPercentage(promise: Promise) {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val batteryStatus: Intent? = reactContext.registerReceiver(null, filter)

        val level: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

        val batteryPercentage = (level.toFloat() / scale.toFloat()) * 100

        promise.resolve(batteryPercentage.toInt())
    }

    override fun getName(): String {
        return NAME
    }
}
