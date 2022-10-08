import qs from "qs";
import {insertUser} from "./db";

// 사용자 정보에 접근할 수 있는 액세스 토큰을 발급받는다.
// state 값에 따라 각 인증 공급자를 구분한다.
const GetUserFromAccessToken = async (state, code) => {

    let params = {};
    let user = {};
    let result = "";

    switch (state) {

        case "google" :

            params = {
                client_id: process.env.CLIENT_ID_GOOGLE,
                client_secret: process.env.CLIENT_SECRET_GOOGLE,
                redirect_uri: process.env.REDIRECT_URL_GOOGLE,
                grant_type: "authorization_code",
                code
            };

            // 구글은 POST 로 전송
            result = await (await fetch(process.env.TOKEN_URI_GOOGLE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })).json();

            /*
            console.log(`ACCESS_TOKEN=${result.access_token}`);
            console.log(`REFRESH_TOKEN=${result.refresh_token}`);
            */

            // TODO 에러 처리
            const u = await (await fetch(process.env.USERINFO_API_GOOGLE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + result.access_token
                }
            })).json();

            //console.log(u);

            if (u.hasOwnProperty("error")) {
                throw new Error(`Error: ${u.error} : ${u.error_description}`);
            }

            user = {name: u.name, email: u.email}

            // 사용자 정보를 T_USER 에 저장한다.
            try {
                await insertUser(
                    {
                        id: u.sub,
                        email: u.email,
                        name: u.name,
                        accessToken: result.access_token,
                        refreshToken: result.refresh_token
                    });
            } catch (error) {
                throw new Error(`Error: insertUser: ${error.message}`);
            }

            break;

        case "naver" :

            params = qs.stringify({
                client_id: process.env.CLIENT_ID_NAVER,
                client_secret: process.env.CLIENT_SECRET_NAVER,
                grant_type: "authorization_code",
                code
            });

            // 네이버는 GET 으로 전송
            result = await (await fetch(process.env.TOKEN_URI_NAVER + "?" + params)).json();

            const uu = await (await fetch(process.env.USERINFO_API_NAVER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + result.access_token
                }
            })).json();

            //console.log(uu);
            // uu.response.id 네이버 고유식별번호
            // uu.response.nickname
            // uu.response.gender
            if (uu.resultcode === "00") {
                user = {name: uu.response.nickname, email: uu.response.email}

                try {
                    await insertUser(
                        {
                            id: uu.response.id,
                            email: uu.response.email,
                            name: uu.response.nickname,
                            accessToken: result.access_token,
                            refreshToken: result.refresh_token
                        });
                } catch (error) {
                    throw new Error(`Error: insertUser: ${error.message}`);
                }

            } else {
                throw new Error(`Error: ${state} : ${uu.resultcode}`);
            }

            break;

        case "github":

            params = {
                client_id: process.env.CLIENT_ID_GITHUB,
                client_secret: process.env.CLIENT_SECRET_GITHUB,
                code
            };

            result = await (await fetch(process.env.TOKEN_URI_GITHUB, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(params)
            })).json();

            //console.log(result);

            try {
                const gh = await (await fetch(process.env.USERINFO_API_GITHUB, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + result.access_token
                    }
                })).json();

                //console.log(gh);

                if (gh.hasOwnProperty("message")) {
                    throw new Error(`Error: ${gh.message}`);
                }

                user = {name: gh.login, email: gh.email}

                try {
                    await insertUser(
                        {
                            id: gh.id,
                            email: gh.email,
                            name: gh.login,
                            accessToken: result.access_token,
                            refreshToken: null // TODO 현재 깃허브는 리프레시 토큰을 제공하지 않음
                        });
                } catch (error) {
                    throw new Error(`Error: insertUser: ${error.message}`);
                }

            } catch (error) {
                throw new Error(error.message);
            }

            break;

        default:
    }

    return user;

}

export default GetUserFromAccessToken;