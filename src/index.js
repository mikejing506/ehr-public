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
import About from './pages/about'
import RunnerIndex from './pages/runner_main'

var f = localStorage.getItem('f')

render((
  <HashRouter>
    <Switch>
      <Route exact path='/' component={f ? Index : First} />
      <Route path='/index' component={Index} />
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
      <Route path='/about' component={About} />
      <Route path='/runner' component={RunnerIndex} />
    </Switch>
  </HashRouter>
  ), document.querySelector('#root'))
