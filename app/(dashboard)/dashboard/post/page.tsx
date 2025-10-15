import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const Page = () => {
    return (
        <section>
            <div className='flex items-center justify-between mb-16'>
                <article className=''>
                    <h1 className='header'>Posts</h1>
                </article>

                <Button
                    className="bg-blue-100 text-white hover:bg-blue-600"
                >
                    <Plus color="#fff" size={24} /> Add post
                </Button>
            </div>
        </section>
    )
}

export default Page