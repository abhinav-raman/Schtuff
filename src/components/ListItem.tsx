import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";

const ListItem = ({
    itemId,
    isActive,
    title,
    isDeletable,
    onClickHandler,
    onDeleteClickHandler,
}: {
    itemId: number;
    isActive: boolean;
    title: string;
    isDeletable: boolean;
    onClickHandler: () => void;
    onDeleteClickHandler: () => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={itemId}
            className={twMerge(
                "m-2 flex h-10 w-[calc(100%-1rem)] justify-between rounded-lg p-2 transition-colors duration-200 hover:bg-foreground/10",
                isActive && "bg-foreground text-background hover:bg-foreground"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClickHandler}
        >
            <p
                key={itemId}
                title={title}
                className="cursor-default overflow-hidden text-ellipsis text-left text-base"
            >
                {title}
            </p>
            {isActive && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <DotsVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="right">
                        <DropdownMenuItem
                            onClick={onDeleteClickHandler}
                            className="flex justify-between text-base font-semibold text-destructive hover:text-destructive"
                        >
                            Delete
                            <TrashIcon className="text-destructive" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};

export default ListItem;
