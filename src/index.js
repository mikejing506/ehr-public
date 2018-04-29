import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import Index from './pages/index'
import Login from './pages/login'
import Reg from './pages/reg'
import Reg_stp2 from './pages/reg_stp2'
import Drive from './pages/drive'
import Order from './pages/order'
import OrderDitail from './pages/order_ditail'
import PreOrder from './pages/preorder'
import PreOrderCW from './pages/preorder_cw'
import PreOrderGD from './pages/preorder_gd'
import PreOrderFD from './pages/preorder_fd'
import PreOrderCC from './pages/preorder_cc'
import PreOrderCUS from './pages/preorder_cus'
import First from './pages/first'
import AccInfo from './pages/ainfo'
import ChangeInfo from './pages/changeinfo'
import ChangePwd from './pages/changepwd'
import About from './pages/about'
import Setting from './pages/setting';
import RunnerIndex from './pages/runner_main'
import RunnerNew from './pages/runner_new'
import RunnerOrder from './pages/runner_order'
import RunnerOrderDitail from './pages/runner_ditail'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import changeinfo from './pages/changeinfo'



Date.prototype.Format = function (fmt) { // author: meizz 
  var o = {
    'M+': this.getMonth() + 1, // 月份 
    'd+': this.getDate(), // 日 
    'h+': this.getHours(), // 小时 
    'm+': this.getMinutes(), // 分 
    's+': this.getSeconds(), // 秒 
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度 
    'S': this.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

window.list = []

Array.prototype.remove = function (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

render((
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Index} />
      <Route path='/first' component={First} />
      <Route path='/login' component={Login} />
      <Route path='/reg' component={Reg} />
      <Route path='/reg_stp2' component={Reg_stp2} />
      <Route path='/drive/:id' component={Drive} />
      <Route path='/order' component={Order} />
      <Route path='/preorder/:id' component={PreOrder} />
      <Route path='/preorder_cw' component={PreOrderCW} />
      <Route path='/preorder_gd' component={PreOrderGD} />
      <Route path='/preorder_fd' component={PreOrderFD} />
      <Route path='/preorder_cc' component={PreOrderCC} />
      <Route path='/preorder_cus' component={PreOrderCUS} />
      <Route path='/order_ditail/:id' component={OrderDitail} />
      <Route path='/accinfo' component={AccInfo} />
      <Route path='/changeinfo' component={ChangeInfo} />
      <Route path='/changepwd' component={ChangePwd} />
      <Route path='/setting' component={Setting} />
      <Route path='/about' component={About} />
      <Route path='/runner' component={RunnerIndex} />
      <Route path='/runner_new/:id' component={RunnerNew} />
      <Route path='/runner_order' component={RunnerOrder} />
      <Route path='/runner_ditail/:id' component={RunnerOrderDitail} />
    </Switch>
  </HashRouter>
  ), document.querySelector('#root'))
