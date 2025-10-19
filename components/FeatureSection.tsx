import React from 'react'
import { Badge } from './ui/badge'
import { Book, Calendar, UsersRound } from 'lucide-react'

const FeatureSection = () => {
    return (
        <div className='w-full'>
            <div className="container mx-auto">
                <div className='flex gap-4 py-20 lg:py-40 flex-col items-start'>
                    <div>
                        <Badge>Story Time</Badge>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                            Why Readers Love Our Story?
                        </h2>
                    </div>

                    <div className="flex gap-10 pt-12 flex-col w-full">
                        <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                            <div className="flex flex-row gap-6 w-full items-start">
                                <Book className="w-4 h-4 mt-2 text-primary" />
                                <div className="flex flex-col gap-1">
                                    <p>Original Fiction</p>
                                    <p className="text-muted-foreground text-sm">
                                        Dive into the hand crafted story full of mystery.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6 w-full items-start">
                                <Calendar className="w-4 h-4 mt-2 text-primary" />
                                <div className="flex flex-col gap-1">
                                    <p>Weekly Chapters</p>
                                    <p className="text-muted-foreground text-sm">
                                        New updates every week.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6 w-full items-start">
                                <UsersRound className="w-4 h-4 mt-2 text-primary" />
                                <div className="flex flex-col gap-1">
                                    <p>Readers Community</p>
                                    <p className="text-muted-foreground text-sm">
                                        Join a passionate community of readers and writers who love story.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureSection