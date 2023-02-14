import { createContext, useState } from "react";

export const SidebarContext = createContext({
	isSidebarOpen: false,
	toggleSidebar: () => {},
});

export const SidebarContextProvider = ({ children }: any) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	function toggleSidebar() {
		setIsSidebarOpen(!isSidebarOpen);
	}
	return (
		<SidebarContext.Provider
			value={{
				isSidebarOpen,
				toggleSidebar,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};
