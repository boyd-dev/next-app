import qs from "qs";

// 인증 서비스 공급자 로그인 URL
const AuthURL = (value) => {

    let queryStr = "";
    let url = "";

    switch (value) {

        case "google":
            queryStr = qs.stringify({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL_GOOGLE,
                response_type: "code",
                scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
                access_type: "offline", // 구글의 경우 최초 요청시에만 리프레시 토큰이 리턴된다.
                state: encodeURI("google") // 콜백 호출시 각 인증 서비스 공급자를 구분하기 위해 state 를 이용한다.
            });

            url = process.env.NEXT_PUBLIC_AUTH_URI_GOOGLE + "?" + queryStr;
            break;

        case "naver":
            queryStr = qs.stringify({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID_NAVER,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL_NAVER,
                response_type: "code",
                state: encodeURI("naver")
            });

            url = process.env.NEXT_PUBLIC_AUTH_URI_NAVER + "?" + queryStr;
            break;

        case "github" :
            queryStr = qs.stringify({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID_GITHUB,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL_GITHUB,
                scope: "user",
                state: encodeURI("github")
            });

            url = process.env.NEXT_PUBLIC_AUTH_URI_GITHUB + "?" + queryStr;
            break;

        default:
            url = "/";

    }

    return url;
}

export default AuthURL;