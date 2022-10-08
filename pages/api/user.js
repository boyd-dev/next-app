import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../lib/sessionOption";

// request 를 받아서 쿠키에 저장된 세션정보를 가져온 후 설정된 암호로 복호화
export default withIronSessionApiRoute(
    async function getUserSession(req, res) {
        const user = req.session.user;

        if (user) {
            res.json({"name": user.name, "email": user.email, isLogged: true});
        } else {
            res.json({isLogged: false});
        }
    },
    sessionOption
);
