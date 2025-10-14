import React from 'react'
import Logo from './Logo'

const TitleSection = ({ open }: { open: boolean }) => {
    return (
        <div className='mb-6 dark:border-gray-800'>
            <div className='flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'>
                <div className='flex items-center gap-2'>
                    <Logo />

                    {open && (
                        <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                            <div className='flex items-center gap-2'>
                                <div>
                                    <span className='block text-[18px] font-semibold text-gray-900 dark:text-gray-100'>
                                        Blog Buddy
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TitleSection
