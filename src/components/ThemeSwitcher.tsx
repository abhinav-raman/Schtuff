import { useContext, useState } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";

import { ThemeColors, ThemeContext, THEMES } from "../context/ThemeContext";

const ThemeSwitcher = () => {
	const themeContext = useContext(ThemeContext);
	const darkThemeCpntext = useContext(DarkThemeContext);
	const [openList, setOpenList] = useState(false);

	return (
		<div className="cursor-pointer">
			<div className="flex h-auto w-auto gap-4">
				<div
					className={`relative flex aspect-square h-4 overflow-hidden rounded-full border border-black duration-100 hover:rotate-180 dark:flex-row-reverse sm:h-8 sm:hover:rotate-0 sm:focus:rotate-180`}
					onClick={() => darkThemeCpntext.toggleTheme()}
				>
					<div className="absolute -left-1/2 aspect-square h-full bg-stone-800" />
					<div className="absolute left-1/2 aspect-square h-full bg-white" />
				</div>
				<div
					className={`relative aspect-square h-4 rounded-full border border-black sm:h-8`}
					style={{ backgroundColor: ThemeColors[themeContext.theme] }}
					onClick={() => setOpenList(!openList)}
				>
					{openList && (
						<>
							<div
								id="underlay"
								className="fixed top-0 left-0 z-10 h-screen w-screen bg-transparent"
								onClick={() => setOpenList(!openList)}
							/>
							<div
								id="theme-select"
								className={`absolute -top-[5px] -left-[5px] z-50 w-6 outline outline-1 outline-neutral-900 backdrop-blur sm:w-10`}
							>
								{Object.values(THEMES)
									.filter((value) => value !== themeContext.theme)
									.map((value) => (
										<div key={value} className="aspect-square h-6 p-1 sm:h-10">
											<div
												key={value}
												className={`aspect-aquare h-4 rounded-full border border-black sm:h-8`}
												style={{ backgroundColor: ThemeColors[value] }}
												onClick={() => {
													themeContext.changeTheme(value);
													setOpenList(!openList);
												}}
											></div>
										</div>
									))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ThemeSwitcher;
