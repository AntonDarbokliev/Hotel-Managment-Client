import { useState } from "react";

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestWithLoading = async (callback: () => Promise<any>) => {
        setIsLoading(true);
        const result = await callback();
        setIsLoading(false);
        return result;
    };

    return {
        isLoading,
        requestWithLoading,
    };
};
