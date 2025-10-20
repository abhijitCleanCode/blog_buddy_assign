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
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
            {content}
        </ReactMarkdown>
    )
}

export default ContentRenderer
