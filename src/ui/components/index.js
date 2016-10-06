/* only for building vux.css */
import Style from '../styles/index.vue' // eslint-disable-line

import Badge from './badge'
import Divider from './divider'
import Loading from './loading'
import Ripple from './ripple'
import Spinner from './spinner'
import Toast from './toast'
import ViewBox from './view-box'
import XHeader from './x-header'
import { XNumber } from './x-number'
import { XInput } from './x-input'


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
  Badge,
  Button,
  ButtonRow,
  ButtonArea,
  Box,
  BoxItem,
  Checkbox,
  Checker,
  CheckerItem,
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
  XNumber,
  XInput,
}

module.exports = ui
