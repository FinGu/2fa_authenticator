# 2fa_authenticator
WIP 2fa authenticator app made in Typescript using Expo ( React native )

Secrets data is stored locally, using expo's securestore.

No databases are used

To compile
- `npm i`
- `npx expo run:android` or for iOS `npx expo run:ios`

Supports 
- Adding and managing secrets and getting timed tokens
- Copying those to clipboard
- Basic settings

Missing and planned
- Adding secrets using QR codes
- Importing and exporting data in JSON format
- Dark mode
