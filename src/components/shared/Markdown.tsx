import { Link, Text, chakra } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  children: string;
  className?: string;
};

const Markdown = ({ children, className }: Props) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node, ...props }) => <Link {...props} isExternal />,
        p: ({ node, ...props }) => <Text {...props} className={className} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default chakra(Markdown);
