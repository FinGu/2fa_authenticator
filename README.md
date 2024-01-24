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
- Basic settings and QR code scanning
- Importing and exporting data in JSON format

Missing and planned
- Dark mode

![preview](https://private-user-images.githubusercontent.com/50637180/297482686-e70188e9-4c49-4e79-b176-5dc997e701d9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU1MTgzNTUsIm5iZiI6MTcwNTUxODA1NSwicGF0aCI6Ii81MDYzNzE4MC8yOTc0ODI2ODYtZTcwMTg4ZTktNGM0OS00ZTc5LWIxNzYtNWRjOTk3ZTcwMWQ5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTE3VDE5MDA1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU5NzUwYWM4NTBkNGM4ODQyYWRhNjgyNjdkODkwMGE5NzljMzA2ZDE1YTZlYTI1YjU1OWE5NDZhYTY0MzI5OTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.3CQTawYJe3XC4OO74VWr2GHIlNg1NvyQdnmS7UqlO60)
