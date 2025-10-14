import React from 'react'
import SheetMenu from './sidebar/SheetMenu'

const DashboardNavbar = () => {
  return (
    <div className="sticky top-0 z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
            <div className="flex items-center space-x-4 lg:space-x-0">
                <SheetMenu />
                <h1 className="font-bold">Blog Buddy</h1>
            </div>
        </div>
    </div>
  )
}

export default DashboardNavbar;
