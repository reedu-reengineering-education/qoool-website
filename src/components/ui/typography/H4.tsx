interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function H4(props: Props) {
	return (
		<h4
			className="scroll-m-20 text-xl font-semibold tracking-tight py-2"
			{...props}
		>
			{props.children}
		</h4>
	);
}
