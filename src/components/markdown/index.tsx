import { ImageProps } from "next/image";
import { Options, default as ReactMarkdown } from "react-markdown";
import { MdxImage } from "../mdx/mdx-image";
import H1 from "../ui/typography/H1";
import H2 from "../ui/typography/H2";
import H3 from "../ui/typography/H3";
import H4 from "../ui/typography/H4";
import P from "../ui/typography/P";

export default function Markdown(props: Readonly<Options>) {
	return (
		<ReactMarkdown
			components={{
				h1: ({ children }) => <H1>{children}</H1>,
				h2: ({ children }) => <H2>{children}</H2>,
				h3: ({ children }) => <H3>{children}</H3>,
				h4: ({ children }) => <H4>{children}</H4>,
				p: ({ children }) => <P>{children}</P>,
				blockquote: ({ children }) => (
					<blockquote className="mt-6 border-l-2 pl-6 italic">
						{children}
					</blockquote>
				),
				ul: ({ children }) => (
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
				),
				ol: ({ children }) => (
					<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
				),
				code: ({ children }) => (
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
						{children}
					</code>
				),
				img: (props) => (
					<div className="w-full aspect-video relative">
						<MdxImage
							{...(props as ImageProps)}
							fill
							className="object-contain"
							placeholder="empty"
						/>
					</div>
				),
				a: ({ children, href }) => (
					<a href={href} className="text-primary underline">
						{children}
					</a>
				),
			}}
			{...props}
		/>
	);
}
