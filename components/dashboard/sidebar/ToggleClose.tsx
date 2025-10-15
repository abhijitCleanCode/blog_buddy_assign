import React from 'react'
import { useSidebar } from '@/providers/sidebar-provider'
import { ChevronRight } from 'lucide-react';

const ToggleClose = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        >
            <div className='flex items-center p-3'>
                <div className='grid size-10 place-content-center'>
                    <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
                {isOpen && (
                    <span
                        className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        Close
                    </span>
                )}
            </div>
        </button>
    )
}

export default ToggleClose
