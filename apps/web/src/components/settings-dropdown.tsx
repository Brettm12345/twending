import { useRouter } from "@tanstack/react-router";
import { Key, Moon, Settings } from "lucide-react";
import { useState } from "react";

import { PersonalAccessTokenForm } from "@/components/personal-access-token-form";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { setThemeServerFn } from "@/lib/theme";
import { Route } from "@/routes/__root";

export function SettingsDropdown({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const { theme } = Route.useLoaderData();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");
	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<Drawer>
					<DrawerTrigger>
						<Button
							variant="outline"
							className={className}
							size="icon"
							{...props}
						>
							<Settings />
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Settings</DrawerTitle>
						</DrawerHeader>
						<Command className="bg-transparent">
							<CommandList>
								<CommandItem
									onSelect={() => {
										setThemeServerFn({
											data: theme === "light" ? "dark" : "light",
										}).then(() => {
											router.invalidate();
										});
									}}
								>
									<Moon />
									<span>Dark Mode</span>
									<Switch
										className="ml-auto"
										size="sm"
										checked={theme === "dark"}
										onCheckedChange={() => {
											router.invalidate();
										}}
									/>
								</CommandItem>
								<CommandItem onSelect={() => setOpen(true)}>
									<Key />
									<span>Personal Access Token</span>
								</CommandItem>
							</CommandList>
						</Command>
					</DrawerContent>
				</Drawer>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Settings</DrawerTitle>
						<DrawerDescription>
							Setup a personal access token
							<a
								href="https://github.com/settings/personal-access-tokens"
								target="_blank"
								rel="noopener noreferrer"
							>
								here
							</a>
						</DrawerDescription>
					</DrawerHeader>
					<PersonalAccessTokenForm onClose={() => setOpen(false)} />
				</DrawerContent>
			</Drawer>
		);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button
						variant="outline"
						className={className}
						size="icon"
						{...props}
					>
						<Settings />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Settings</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() =>
							setThemeServerFn({
								data: theme === "light" ? "dark" : "light",
							}).then(() => {
								router.invalidate();
							})
						}
					>
						<Moon />
						<span>Dark Mode</span>
						<Switch
							className="ml-auto"
							size="sm"
							checked={theme === "dark"}
							onCheckedChange={() => {
								router.invalidate();
							}}
						/>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Key />
							<span>Personal Access Token</span>
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Personal Access Token</DialogTitle>
					<DialogDescription>
						Setup a personal access token
						<a
							href="https://github.com/settings/personal-access-tokens"
							target="_blank"
							rel="noopener noreferrer"
						>
							here
						</a>
					</DialogDescription>
				</DialogHeader>
				<PersonalAccessTokenForm onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
