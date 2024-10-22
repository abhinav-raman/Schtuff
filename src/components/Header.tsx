import { User } from "../utils/types";
import GoogleLoginBtn from "./GoogleLoginBtn";

import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContent";
import { ModeToggle } from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import ColorPicker from "./ColorPicker";

const Header = ({
    user,
    onMenuBtnClick,
}: {
    user: User | null;
    onMenuBtnClick: () => void;
}) => {
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

    return (
        <header className="header relative flex items-center justify-center rounded-lg border bg-transparent p-2 font-Britney sm:py-1">
            {user && (
                <button
                    className="absolute left-4 hidden aspect-square h-8 rounded-lg border-0 border-red-500 sm:block"
                    onClick={() => toggleSidebar()}
                >
                    <svg
                        className={`stroke-[var(--primary-text-color)] dark:stroke-[var(--secondary-text-color)] ${
                            isSidebarOpen ? "" : "rotate-180"
                        }`}
                        width="100%"
                        height="100%"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polyline
                            points="244 400 100 256 244 112"
                            style={{
                                fill: "none",
                                stroke: "inherit",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "48px",
                            }}
                        />
                        <line
                            style={{
                                fill: "none",
                                stroke: "inherit",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "48px",
                            }}
                            x1="120"
                            x2="412"
                            y1="256"
                            y2="256"
                        />
                    </svg>
                </button>
            )}
            <Button
                className="sm:bloc absolute right-4 hidden aspect-square h-8 rounded-lg border-0 border-red-500 sm:block"
                onClick={onMenuBtnClick}
            >
                <svg
                    className="stroke-[var(--primary-text-color)] dark:stroke-[var(--secondary-text-color)]"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_429_11066)">
                        <path
                            d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
                            stroke="inherit"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_429_11066">
                            <rect
                                width="24"
                                height="24"
                                fill="inherit"
                                transform="translate(0 0.000915527)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </Button>
            <h1 className="text-center text-4xl font-extrabold dark:text-[var(--secondary-text-color)] sm:text-3xl">
                Schtuff
            </h1>
            <div className="absolute right-2 flex gap-x-2">
                <ColorPicker />
                <ModeToggle />
                <GoogleLoginBtn user={user} />
            </div>
        </header>
    );
};

export default Header;
