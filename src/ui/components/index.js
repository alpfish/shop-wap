/* only for building vux.css */
import Style from '../styles/index.vue' // eslint-disable-line

import Alert from './alert'
import Badge from './badge'
import Confirm from './confirm'
import Currency from './currency'
import Dialog from './dialog'
import Divider from './divider'
import Loading from './loading'
import Ripple from './ripple'
import Spinner from './spinner'
import Toast from './toast'
import ViewBox from './view-box'
import XHeader from './x-header'
import { XImg } from './x-img'
import { XInput } from './x-input'
import { XNumber } from './x-number'

// Flex 布局
import { Box, BoxItem } from './box'
// 列表
import { List, ListItem, ListLabel} from './list'
// 按钮
import { Button, ButtonRow, ButtonArea, FloatButton } from './button'
// 表单
import { Checkbox, Switch, Textfield, } from './forms'
import { Checker, CheckerItem } from './checker'
// 图标
import { Icon, IconButton } from './icon'
// 底部导航
import { Tabbar, TabbarItem } from './tabbar'

const ui = {
  Alert,
  Badge,
  Button,
  ButtonRow,
  ButtonArea,
  Box,
  BoxItem,
  Checkbox,
  Checker,
  CheckerItem,
  Confirm,
  Currency,
  Dialog,
  Divider,
  FloatButton,
  Icon,
  IconButton,
  List,
  ListItem,
  ListLabel,
  Loading,
  Ripple,
  Spinner,
  Switch,
  Textfield,
  Tabbar,
  TabbarItem,
  Toast,
  ViewBox,
  XHeader,
  XImg,
  XInput,
  XNumber,
}

module.exports = ui
