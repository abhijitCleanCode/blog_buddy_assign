import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'
import Menu from './Menu'

const SheetMenu = () => {
    return (
        <Sheet>
            {/* sidebar trigger */}
            <SheetTrigger className="lg:hidden" asChild>
                <Button variant="outline" className='h-8' size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>

            {/* sidebar */}
            <SheetContent className='sm:w-72 px-3 h-full flex flex-col' side="left">
                {/* sidebar header */}
                <SheetHeader>
                    <Button
                        variant="link"
                        className="flex justify-center items-center pb-2 pt-1"
                        asChild
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Logo />
                            <SheetTitle className="font-bold text-lg">Blog Buddy</SheetTitle>
                        </Link>
                    </Button>
                </SheetHeader>

                {/* sidebar content */}
                <Menu isOpen={true} />
            </SheetContent>
        </Sheet>
    )
}

export default SheetMenu