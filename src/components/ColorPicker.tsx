import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const COLORS = { green: "#dcfce7", blue: "#dbeafe", pink: "#ffe4e6" } as const;

const ColorPicker = () => {
    const [color, setColor] = useState<string>(COLORS["blue"]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                style={{ background: color }}
                className="h-9 w-9 rounded-lg"
            />
            <DropdownMenuContent className="flex flex-col p-0" align="end">
                {(Object.keys(COLORS) as Array<keyof typeof COLORS>).map(
                    (colorKey) => (
                        <DropdownMenuItem key={colorKey} className="px-2 pt-2">
                            <Button
                                className="w-full h-8"
                                style={{ background: COLORS[colorKey] }}
                                onClick={() => setColor(COLORS[colorKey])}
                            />
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ColorPicker;
