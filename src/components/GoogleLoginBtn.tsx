import { signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const Popup = dynamic(() => import("reactjs-popup"), { ssr: false });
const Image = dynamic(() => import("next/image"));

import googleLogo from "../assets/images/google-icon-logo.svg";
import { User } from "../utils/types";
import "reactjs-popup/dist/index.css";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const GoogleLoginBtn = ({ user }: { user: User | null }) => {
    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        src={user.image || ""}
                        alt={user.name || ""}
                        height={36}
                        width={36}
                        className="rounded-full"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="min-w-60"
                    side="bottom"
                    align="end"
                >
                    <DropdownMenuLabel className="p-2">
                        {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="w-full cursor-pointer align-baseline"
                            onClick={() => signOut()}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
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
