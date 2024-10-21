import { useEffect, useState } from "react";
import { SidebarType } from "../utils/types";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";

const Sidebar = ({
    titleText,
    isEnterSuccess,
    isLoading,
    onEnter,
    children,
}: SidebarType) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (isEnterSuccess) {
            setInputValue("");
        }
    }, [isEnterSuccess]);

    return (
        <Card
            id="collections-list"
            className="relative box-border max-h-screen w-1/2 snap-center overflow-auto pb-20"
        >
            <div className="scroll-m-2s sticky top-0 z-10 overflow-x-hidden bg-background">
                <div className="p-4 pb-0">
                    <h2 className="text-lg font-medium">{titleText}</h2>
                </div>
                <div
                    className={twMerge(
                        "flex h-12 w-[calc(100%+2.6rem)] gap-x-2 p-2 transition-all duration-500",
                        inputValue && "w-full"
                    )}
                >
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (e.key === "Enter" && inputValue) {
                                onEnter(inputValue);
                            }
                        }}
                        className="w-full rounded-lg transition-all"
                    />
                    <Button
                        className="w-10 rounded-lg"
                        size={"icon"}
                        disabled={!inputValue || isLoading}
                    >
                        {isLoading ? <ReloadIcon className="animate-spin" /> : <ChevronRightIcon />}
                    </Button>
                </div>
            </div>
            {children}
        </Card>
    );
};

export default Sidebar;
