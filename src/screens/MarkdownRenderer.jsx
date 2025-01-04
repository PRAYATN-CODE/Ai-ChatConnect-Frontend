import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownRenderer = ({ content }) => (
    <ReactMarkdown
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code
                        className={`rounded-lg scrollbar-hide text-base ${className}`}
                        {...props}>
                        {children}
                    </code>
                );
            },
        }}
    >
        {content}
    </ReactMarkdown>
);

export default MarkdownRenderer;
