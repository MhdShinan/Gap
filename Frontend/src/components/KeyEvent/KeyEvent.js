import { useEffect } from "react";

const useEnterKeyListener = (callback) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                callback(e);
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [callback]);
};

export default useEnterKeyListener;
