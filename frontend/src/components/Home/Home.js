import React from 'react'
import HeaderHome from './Headerhome'
import Quicksearch from './Quicksearch'
import Wallpaper from './Wallpaper'

export default function Home() {
  return (
    <div>
        <HeaderHome/>
        <Wallpaper/>
        <Quicksearch/>
    </div>
  )
}
