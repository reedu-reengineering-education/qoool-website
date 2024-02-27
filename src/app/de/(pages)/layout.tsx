import { TracingBeam } from "@/components/animated/tracing-beam";

export default function SubLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="max-w-2xl mx-auto">
				<TracingBeam>{children}</TracingBeam>
			</div>
		</>
	);
}
