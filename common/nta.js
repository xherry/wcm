const notice = () => {
	let phoneStatus = 'android';
	uni.getSystemInfo({
		success: res => {
			console.log(res)
			phoneStatus = res.platform
		}
	})
	if (phoneStatus == 'android') {
		var main = plus.android.runtimeMainActivity();
		var pkName = main.getPackageName();
		var uid = main.getApplicationInfo().plusGetAttribute("uid");
		var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
		var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
		// 未开通‘允许通知’  ，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
		if (!areNotificationsEnabled) {
			uni.showModal({
				title: '提示',
				content: '推送设置没有开启，请打开APP通知权限',
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						var Intent = plus.android.importClass('android.content.Intent');
						var Build = plus.android.importClass("android.os.Build");
						//android 8.0引导  
						if (Build.VERSION.SDK_INT >= 26) {
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
						} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra("app_package", pkName);
							intent.putExtra("app_uid", uid);
						} else { //(<21)其他--跳转到该应用管理的详情页
							var Settings = plus.android.importClass("android.provider.Settings");
							var Uri = plus.android.importClass("android.net.Uri");
							var intent = new Intent();
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							var uri = Uri.fromParts("package", main.getPackageName(), null);
							intent.setData(uri);
						}
						// 跳转到该应用的系统通知设置页  
						main.startActivity(intent);
					}
				}
			});
		}
	}

	// ios
	if (phoneStatus == 'ios') {
		var UIApplication = plus.ios.import("UIApplication");
		var app = UIApplication.sharedApplication();
		var enabledTypes = 0;
		if (app.currentUserNotificationSettings) {
			var settings = app.currentUserNotificationSettings();
			enabledTypes = settings.plusGetAttribute("types");
			console.log("enabledTypes1:" + enabledTypes);
			if (enabledTypes == 0) {
				plus.nativeUI.confirm("推送设置没有开启，是否去开启？", function(e) {
					if (e.index == 0) {
						var NSURL2 = plus.ios.import("NSURL");
						var setting2 = NSURL2.URLWithString("app-settings:");
						var application2 = UIApplication.sharedApplication();
						application2.openURL(setting2);
						plus.ios.deleteObject(setting2);
						plus.ios.deleteObject(NSURL2);
						plus.ios.deleteObject(application2);
					}
				}, {
					"buttons": ["Yes", "No"],
					"verticalAlign": "center"
				});
			}
			plus.ios.deleteObject(settings);
		} else {
			enabledTypes = app.enabledRemoteNotificationTypes();
			if (enabledTypes == 0) {
				console.log("推送未开启!");
			} else {
				console.log("已经开启推送功能!")
			}
			console.log("enabledTypes2:" + enabledTypes);
		}
		plus.ios.deleteObject(app);
	}
}

module.exports = {
	notice
}
