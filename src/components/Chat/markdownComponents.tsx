import React from "react";

export const markdownComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-500 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-2" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="ml-6 list-disc" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mb-2" {...props} />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="mb-2 list-decimal" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold" {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-gray-200 rounded px-1 py-0.5 font-mono" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-gray-800 text-white rounded p-4 overflow-x-auto" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2" {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-2xl font-bold my-4" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xl font-bold my-4" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-bold my-4" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className="text-md font-bold my-4" {...props} />,
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h5 className="text-sm font-bold my-4" {...props} />,
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h6 className="text-xs font-bold my-4" {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-4 border-gray-300" {...props} />,
};
