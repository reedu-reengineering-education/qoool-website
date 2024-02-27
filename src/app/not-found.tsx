import NotFoundImage from "@/assets/images/undraw_page_not_found_re_e9o6.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="flex gap-12 items-center flex-wrap">
				<Image
					className="mx-auto"
					src={NotFoundImage}
					width={400}
					height={400}
					alt="Not Found Image"
				/>
				<div className="flex gap-12 items-center flex-col justify-between w-full md:w-fit">
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						Not found - 404!
					</h3>
					<Link href="/">
						<Button>Back Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
