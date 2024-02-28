interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function P(props: Props) {
  return (
    <p className="leading-7 pb-2" {...props}>
      {props.children}
    </p>
  )
}
