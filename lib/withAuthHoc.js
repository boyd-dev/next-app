import {useEffect, useState} from "react";
import Login from "../pages/login";
import fetchUserSession from "./fetchSession";

// 로그인 해야 볼 수 있는 페이지를 래핑하는 컴포넌트
const withAuthHoc = (Component) => {

    // eslint-disable-next-line react/display-name
    return () => {

        const [user, setUser] = useState({});

        useEffect(()=> {
            fetchUserSession().then(setUser);
        },[]);

        if (!user.isLogged) {
            //return null;
            return (
                <Login/>
            )
        } else {
            return (
                // 사용자 정보를  props 로 전달한다. useContext 를 쓸 필요가 없다.
                //
                <Component user={user}/>
            )
        }
    }
}

export default withAuthHoc;