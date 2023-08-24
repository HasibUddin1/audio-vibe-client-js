import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = `Audio Hub | ${title}`
    }, [title])
}

export default useTitle;