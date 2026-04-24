"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

interface InlineMathProps {
  children: string;
}

export default function InlineMath({ children }: InlineMathProps) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
