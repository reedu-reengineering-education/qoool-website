interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function H3(props: Props) {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight py-4"
      {...props}
    >
      {props.children}
    </h3>
  )
}
