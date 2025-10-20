"use client";

import React, { useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
    const [tab, setTab] = useState<"edit" | "preview">("edit");

    return (
        <div className="w-full">
            {/* <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                <TabsList className="mb-3">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                    <Textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Write your blog content in markdown"
                        className="min-h-[300px] font-mono text-sm"
                    />
                </TabsContent>

                <TabsContent value="preview">
                    <div className='prose dark:prose-invert max-w-none p-3 border rounded-md'>
                        {value.trim() ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                {value}
                            </ReactMarkdown>
                        ) : (<p className='text-muted-foreground'>Nothing to preview yet</p>)}
                    </div>
                </TabsContent>
            </Tabs> */}
        </div>
    )
}

export default MarkdownEditor;
