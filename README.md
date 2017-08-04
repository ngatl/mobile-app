## ngATL Conference app

Prerequisites: `npm i -g nativescript`

### Setup

1. `git clone https://github.com/ngatl/colmena.git`
2. `cd colmena; npm i -g lerna; npm i`
3. `INITDB=1 npm run dev:api` - that should get the api running
4. `cd ..`
5. `git clone https://github.com/ngatl/mobile-app.git`
6. `cd mobile-app`
7. Copy `.env.template` to `.env` and modify BACKEND_REPO_PATH with the absolute path to your `colmena/packages/admin-lb-sdk-ns/src` directory as seen in [example path](https://github.com/ngatl/mobile-app/blob/master/.env.template#L1)
8. `npm i`
9. You should be setup now

### Run

```
tns run ios --emulator
// ...or
tns run android --emulator
```


