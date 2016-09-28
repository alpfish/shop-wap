/* only for building vux.css */
import Style from '../style/index.vue' // eslint-disable-line

import Badge from './badge'
import Loading from './loading'
import Ripple from './ripple'
import Spinner from './spinner'
import Textfield from './textfield'
import Toast from './toast'
import ViewBox from './view-box'
import XHeader from './x-header'

import { Button, ButtonRow, ButtonArea, FloatButton } from './button'
import { Icon, IconButton } from './icon'
import { Tabbar, TabbarItem } from './tabbar'

const ui = {
  Badge,
  Button,
  ButtonRow,
  ButtonArea,
  FloatButton,
  Icon,
  IconButton,
  Loading,
  Ripple,
  Spinner,
  Textfield,
  Tabbar,
  TabbarItem,
  Toast,
  ViewBox,
  XHeader,
}

module.exports = ui