import { trpc } from '@/lib/trpc/trpc-client'
import React from 'react'

const ViewCategory = () => {
    const { data: categories, isLoading: loadingCategories } = trpc.categories.getAll.useQuery()
    console.log(categories);

    return (
        <div>ViewCategory</div>
    )
}

export default ViewCategory
