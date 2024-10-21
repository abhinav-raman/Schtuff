
import { ReloadIcon } from "@radix-ui/react-icons";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const LoadingIndicator = () => {
    const isFetching = useIsFetching();
    const isMutationsFetching = useIsMutating();

    return (
        <div className="absolute bottom-0 right-0 p-8 text-foreground/60 sm:p-6">
            {isFetching + isMutationsFetching > 0 && (
                <ReloadIcon className="animate-spin h-8 w-8" />
            )}
        </div>
    );
};

export default LoadingIndicator;
