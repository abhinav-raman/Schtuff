import { signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import googleLogo from "../assets/images/google-icon-logo.svg";
import { User } from "../utils/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";

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
                        className="rounded-lg"
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
                            className="flex w-full cursor-pointer justify-between align-baseline"
                            onClick={() => signOut()}
                        >
                            Logout
                            <ExitIcon />
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
