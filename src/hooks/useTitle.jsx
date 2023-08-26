import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = `Audio Vibe | ${title}`
    }, [title])
}

export default useTitle;