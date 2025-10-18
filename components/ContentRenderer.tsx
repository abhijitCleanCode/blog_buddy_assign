import React from 'react'

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface contentRendererProps {
    content: string;
}

const ContentRenderer = ({ content }: contentRendererProps) => {
    return (
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
        />
    )
}

export default ContentRenderer
