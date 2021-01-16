export enum DataServiceType {
  http = 'HTTP',
  firebase = 'FIREBASE',
  backendless = 'BACKENDLESS',
}

export const Config = {
  apiUrl: 'assets/data/data.json',
  // export const apiUrl = 'https://xxxxxx.s3.amazonaws.com/xxxxx/data.json';

  mapApiKey: 'xxxxxxxxxx',

  backendlessConfig: {
    appId: 'xxxxxxxxxxxxxxxxxxxx',
    appKey: 'xxxxxxxxxxxxxxxxxxxx',
  },

  DATA_SERVICE: DataServiceType.http,

  sender_id: 'xxxxxxxxxx',
  oneSignalAppId: 'xxxxxxxxxx',

  wordpressApiUrl: 'https://demo.titaniumtemplates.com/wordpress/?json=1',
  drupalApiUrl: 'https://demo.titaniumtemplates.com/drupal/rest/views/rest_api',

  firebase: {
    apiKey: 'xxxxxxxxxxx',
    authDomain: 'xxxxxx-xxxxx-xxx.firebaseapp.com',
    databaseURL: 'https://xxxx-xxxxxx-xxxxx.firebaseio.com',
    projectId: 'xxxxx-xxxx-xxxx',
    storageBucket: 'xxxxx-xxxxx-xxxxxx.appspot.com',
    messagingSenderId: '123456678',

  },
};
