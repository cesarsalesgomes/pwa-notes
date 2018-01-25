// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyASv2ronkDnJceiCoChzzVNKlqMjpoftLg',
    authDomain: 'pwa-notes-8d0c4.firebaseapp.com',
    databaseURL: 'https://pwa-notes-8d0c4.firebaseio.com',
    projectId: 'pwa-notes-8d0c4',
    storageBucket: 'pwa-notes-8d0c4.appspot.com',
    messagingSenderId: '555260748621'
  }
};
