import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import PushNotification from 'react-native-push-notification';

export default class PushNotificationConfig {
  static configure(onRegister, onNotification) {
    /* PushNotification.configure({
      onRegister: function (token) {
        // Called when the push token is generated
        console.log('Device Token:', token.token);
        // You can send the token to your server for individual device registration
        // Make sure to store the token associated with the user/device in your backend
        if (onRegister) {
          onRegister(token.token);
        }
      },
      onNotification: function (notification) {
        // Called when a remote or local notification is opened or received
        console.log('Notification:', notification);
        if (onNotification) {
          onNotification(notification);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Must call the following to initialize PushNotificationIOS
    PushNotificationIOS.setApplicationIconBadgeNumber(0); */
  }
}
