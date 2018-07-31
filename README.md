# account


## Install

- `$ npm i`

> You need node > 8 and npm >= 5

## Dev

- `npm run dev`

> You must have the lib **frontend-commons**. As it's not available yet, install it via npm link ;)

> You must also set up the file `src/config.js`. 
### U2F

First add in `src/config.js` the `u2f` object, with value: 
```json
{
    "appId": "the url of the current app",
    "timeout": 1 // timeout value
}
```

Testing U2F can be complicated: the server must accept a U2F binding on the localhost domain. 
For that, the domain  must use the app id https://localhost.

In order to test U2F without having a physical device, the chrome extension 
[virtual-u2f](https://github.com/ProtonMail/virtual-u2f) can be used. This 
extension is only suitable for testing purposes. It is not possible to combine 
this extension with regular U2F token. 

Mac users can also try the [SoftU2F](https://github.com/github/SoftU2F) project (maintained by github, more secure than virtual-u2f). 
Linux users can try the equivalent [Rust U2F](https://github.com/danstiner/rust-u2f) project (unstable).  

