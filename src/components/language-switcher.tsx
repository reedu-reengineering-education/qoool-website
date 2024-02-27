import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";

const languages = [
	{
		code: "en",
		name: "English",
	},
	{
		code: "de",
		name: "German",
	},
];

export default function LanguageSwitcher({
	currentLng,
}: Readonly<{
	currentLng: string;
}>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-labelledby="language"
					className="w-10 h-10 p-2"
					id="language"
					size="icon"
					variant="outline"
				>
					<GlobeIcon className="h-6 w-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2" align="end">
				{languages.map((language) => (
					<Link href={`/${language.code}`} key={language.code}>
						<DropdownMenuItem
							className={cn(language.code === currentLng ? "bg-muted/50" : "")}
						>
							{language.name}
						</DropdownMenuItem>
					</Link>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
