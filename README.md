## ngATL Conference app

Prerequisites: `npm i -g nativescript`

### Setup

1. `git clone https://github.com/NathanWalker/colmena`  - you’ll need to use this fork until further notice - a PR will be posted to main repo soon
2. `cd ngatl/mobile-app; git fetch origin; git pull`
3. Open `tools/install.js` and modify line#13 with the absolute path to your colmena admin-lb-sdk/src directory as seen in example path right below that line
4. `npm i`
5. You should be setup now

### Run

```
tns run ios --emulator
// ...or
tns run android --emulator
```


