import { signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const Popup = dynamic(() => import("reactjs-popup"), { ssr: false });
const Image = dynamic(() => import("next/image"));

import googleLogo from "../assets/images/google-icon-logo.svg";
import { User } from "../utils/types";
import "reactjs-popup/dist/index.css";

const GoogleLoginBtn = ({ user }: { user: User | null }) => {
	if (user) {
		return (
			<Popup
				trigger={
					<button className="relative flex aspect-square h-9 overflow-hidden rounded-full sm:h-7">
						<Image
							src={user.image || ""}
							alt={user.name || ""}
							height={40}
							width={40}
							className="-z-10 rounded-full"
						/>
					</button>
				}
				position="bottom right"
			>
				<p
					className="w-fit cursor-pointer align-baseline"
					onClick={() => signOut()}
				>
					Logout
					<svg
						className="ml-[2px] -mt-[2px] inline"
						fill="none"
						height="20"
						viewBox="0 0 24 24"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
							stroke="inherit"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				</p>
			</Popup>
		);
	}
	return (
		<button
			className="flex rounded-full bg-gray-600/20 p-2"
			onClick={() => signIn("google")}
		>
			<p className="tex-base flex">
				<span className="relative h-5 w-5">
					<Image src={googleLogo} alt="google" layout="fill" />
				</span>
			</p>
		</button>
	);
};

export default GoogleLoginBtn;
