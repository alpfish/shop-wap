> http://mint-ui.github.io/docs/#!/zh-cn2/popup

# Overview
mint-popup is a popup component for vue.js

# Installation
First, install `mint-popup` from npm:
```bash
$ npm install mint-popup
```

Import it:
```Javascript
require ('mint-popup/lib/index.css');

// ES6 mudule
import Popup from 'mint-popup';

// CommonJS
const Popup = require('mint-popup').default;
```

Register component:
```Javascript
Vue.component('popup', Popup);
```

# Example

`position` defines the location of the popup. If it's `bottom`, when you switch on the popup, it'll slide into the screen from the bottom and become fixed at the bottom. The sliding animation alters with `position`, and you don't need to configure it manually.

Bind `v-model` with one of your vue instance variables. Toggle it to switch on/off the popup.

```html
<mt-popup
  v-model="popupVisible"
  position="bottom">
  ...
</mt-popup>
```

If the `position` attribute is omitted, the popup will be located at the center of the viewport (and of course you can relocate it using CSS). In this case, you may want to set its popup-transition attribute to `popup-fade` so that it'll have a fading effect when switched on/off.

```html
<mt-popup
  v-model="popupVisible"
  popup-transition="popup-fade">
  ...
</mt-popup>
```

# API
| option | description | type | acceptable values | default |
|------|-------|---------|-------|--------|
| position | location of the popup. If omitted, the popup will be centered  | String | 'top'<br>'right'<br>'bottom'<br>'left' | |
| pop-transition | CSS transition of the popup. Configurable only when `position` is omitted | String | 'popup-fade' | |
| modal | if a modal pops with the popup | Boolean | | true |
| closeOnClickModal | if the popup turns off when the modal is clicked | Boolean | | true |

# Slot
| name | description |
|------|--------|
| - | content of the popup |

# License
MIT