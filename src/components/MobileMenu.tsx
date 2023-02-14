import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { User } from "../utils/types";
import ThemeSwitcher from "./ThemeSwitcher";

const MobileMenu = ({
	showMenu,
	user,
}: {
	showMenu: boolean;
	user: User | null;
}) => {
	return (
		<aside
			className={`absolute left-0 z-10 h-full w-full bg-stone-600/80 p-4 text-[var(--secondary-text-color)] backdrop-blur-sm ${
				showMenu ? "left-0" : "left-[100vw]"
			}`}
		>
			<div className="flex w-full justify-between ">
				{user ? (
					<div>
						<Image
							src={user.image || ""}
							alt={user.name || ""}
							height={60}
							width={60}
							className="-z-10 rounded-full"
						/>
						<h3 className="mt-2 text-lg">Welcome {user.name} !!</h3>
					</div>
				) : (
					<button
						className="w-fit rounded-lg border-2 border-[var(--secondary-text-color)] p-2 outline-none"
						onClick={() => signIn("google")}
					>
						Continue with Google
					</button>
				)}
				<ThemeSwitcher />
			</div>
			{user && (
				<button
					className="mt-4 w-fit rounded-lg border-2 border-[var(--secondary-text-color)] p-2 outline-none"
					onClick={() => signOut()}
				>
					Logout
				</button>
			)}
		</aside>
	);
};

export default MobileMenu;
