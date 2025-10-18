import React from "react"

import FormAddPost from "@/components/dashboard/pages/post/FormAddPost";

const Page = () => {

  return (
    <section>
      <div className="flex items-center justify-between mb-16">
        <article>
          <h1 className="header">Create Post</h1>
        </article>
      </div>

      <FormAddPost />
    </section>
  )
}

export default Page
