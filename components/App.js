// App.js
// by Gavin Smith
// CS4242 Assignment 03
import { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

function itemClasses(href, router) {
  let clist = ['item']
  if (router.pathname === href) {
    clist.push('active')
  }
  return clist.join(' ')
}

function App({children, router}) {
  return (
    <div>
      <div className="ui menu fixed top mainmenu">
        <Link href="/">
          <a className={"item header"}>
            CS4242 Project 03
          </a>
        </Link>
        <Link href="/8-puzzle">
          <a className={itemClasses('/8-puzzle', router)}>
            8-Puzzle
          </a>
        </Link>
        <Link href='/string-matching'>
          <a className={itemClasses('/string-matching', router)}>
            String Matching
          </a>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default withRouter(App)
