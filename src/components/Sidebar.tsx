import { useEffect, useState } from "react";
import { SidebarType } from "../utils/types";

const Sidebar = ({ onEnter, children, isEnterSuccess }: SidebarType) => {
	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		if (isEnterSuccess) {
			setInputValue("");
		}
	}, [isEnterSuccess]);

	return (
		<aside
			id="collections-list"
			className={`relative max-h-screen w-1/2 snap-center overflow-auto border-r border-gray-700/20 pb-60 dark:border-gray-700/80 sm:min-w-[90%]`}
		>
			<div className="scroll-m-2s sticky top-0 z-10 h-10 py-2 px-4">
				<input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Enter") {
							onEnter(inputValue);
						}
					}}
					className="dark-[var(--primary-bg-color)] static h-full w-full rounded-md 
            p-2 text-sm 
            text-[var(--primary-text-color)] outline-0 focus:shadow-input dark:bg-stone-600 
            dark:text-[var(--secondary-text-color)]"
				/>
			</div>
			{children}
		</aside>
	);
};

export default Sidebar;
