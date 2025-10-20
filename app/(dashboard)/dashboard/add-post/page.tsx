"use client"

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { SkeletonForm } from "@/components/skeleton";

const LazyFormAddPost = dynamic(() => import("@/components/dashboard/pages/post/FormAddPost"), {
 ssr: false, loading: () => <SkeletonForm />
})

const Page = () => {

  return (
    <section>
      <div className="flex items-center justify-between mb-16">
        <article>
          <h1 className="header">Create Post</h1>
        </article>
      </div>

    <Suspense fallback={<SkeletonForm />}>
      <LazyFormAddPost />
      </Suspense>
    </section>
  )
}

export default Page
