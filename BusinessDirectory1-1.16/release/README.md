# Business Directory Ionic
This application categorizes businesses into their business/industry domain and provides a listing. Presents information about each business promoting their activity and includes various search filters enabling the easier finding of the business which the user is interested in.

## Run the app
Use `ionic serve` to run the app for a browser preview

or

use `ionic serve --lab` to run the app in a browser on two platforms at the same time.

### Add hooks
```bash
$ ionic hooks add
```

### Add a platform

```bash
$ ionic cordova platform add ios
```

Supported Cordova platforms:

```bash
$ ionic cordova platform add ios
$ ionic cordova platform add android
```

### Build the app

```bash
$ ionic cordova build ios
```

### Εmulate the app on simulator
iOS:

```bash
$ ionic cordova emulate ios
```

Android:

```bash
$ ionic cordova emulate android
```

For more information, see [Ionic CLI's instructions](https://ionicframework.com/docs/cli/).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

#### Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security.
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes.
* **ionic-plugin-keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **phonegap-plugin-push** - This plugin offers support to receive and handle native push notifications with a single unified API, and with no dependency on any other plugins. (https://github.com/phonegap/phonegap-plugin-push.git).
* **cordova-plugin-email** - The plugin provides access to the standard interface that manages the editing and sending an email message (https://github.com/katzer/cordova-plugin-email-composer.git).
* **cordova-plugin-x-socialsharing** - Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git).

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
