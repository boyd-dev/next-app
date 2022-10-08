import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../lib/sessionOption";

export default withIronSessionApiRoute(
    logout,
    sessionOption
);

async function logout(req, res) {
    // 쿠키에 있는 세션 정보를 삭제한다.
    req.session.destroy();
    res.redirect("/");
}