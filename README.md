From root directory (where your package.json is located) run "npm i"

Then fill environments files with correct data
UDID - your device ID (when a device attached run "adb devices" from cmd)
UDIDEM - your emulator device ID usually "emulator-5554"
EMAIL - email for logging in the application
PASSWORD - your password for your account
BOT_ID - your telegram bot id, get it from @BotFather
CHAT_ID - chat ID that will send you notification (get it from @getmyid_bot for example or by another means)
CHARLES_PATH - path to a directory where session's logs are stored (string)

Create emulator from Android Studio (Pixel 4, API 33)
Charles Proxy - enable "mirror" function

To run "test" suite enter "npm run test" in a terminal
To run "notifyr" suite enter "npm run notifyr" in a terminal
To run "notifye" suite enter "npm run notifye" in a terminal, launch your emulator and make sure it has T-mobile switched on
To run "intercept" suite enter "npm run intercept" in a terminal, launch your emulator, 
enter correct path to Charles Proxy binary in lines 25 and 81 of intercepr.js file, enter Local IP-address in line 65 of wifi.page.js file,
change the emulator time-zone to Yekaterinburg if needed 
