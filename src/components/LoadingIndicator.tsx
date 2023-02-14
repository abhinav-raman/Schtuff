import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";

const LoadingIndicator = () => {
	const isFetching = useIsFetching();
	const isMutationsFetching = useIsMutating();

	return (
		<div className="absolute bottom-0 right-0 p-8 text-[var(--primary-text-color)] dark:text-[var(--secondary-text-color)] sm:p-6">
			{isFetching + isMutationsFetching > 0 ? "Syncing changes..." : "Synced"}
		</div>
	);
};

export default LoadingIndicator;
