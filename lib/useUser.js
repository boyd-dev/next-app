import {useEffect, useState} from "react";
import fetchUserSession from "./fetchSession";

// 쿠키에 저장된 사용자 세션 정보를 가져온다.
// _app.js 에서 호출하므로 URL 을 직접 입력하는 경우 항상 실행된다.
export default function useUser() {

    const [user, setUser] = useState({});

    useEffect(() => {
        //fetchSession().then(console.log);
        fetchUserSession().then(setUser);
    }, []);

    return user;
}