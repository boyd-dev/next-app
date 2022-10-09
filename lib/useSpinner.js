import {useEffect, useState} from "react";
import router from "next/router";

export default function useSpinner() {

    const [spin, setSpin] = useState(false);

    useEffect(() => {
        const start = () => {
            setSpin(true);
        }
        const end = () => {
            setSpin(false);
        }
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);

        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        }
    }, []);

    return spin;
}