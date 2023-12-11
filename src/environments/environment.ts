// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Point to your API server
  apiHost: 'http://localhost:3000/api/v1',
  // Google reCAPTCHA enterprise key
  recaptchaKey: '6LdzY5olAAAAAEeQt85YUNJIa-OcjTqm05Yw7eiJ',
  // License token; IMPORTANT
  licenseToken: 'Q29weXJpZ2h0IMKpIDIwMjMgYnkgTGFuY2UgQ3Jpc2FuZyAoWGFwaWVyMTQp',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
