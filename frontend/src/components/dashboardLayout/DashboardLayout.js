import React from 'react'
import SideBarNav from './sidebarNav'

export const DashboardLayout = (props) => {
  return (
    <div>

    <SideBarNav/>
    {props.children}
    </div>
  )
}
