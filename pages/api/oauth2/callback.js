import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../../lib/sessionOption";
import GetUserFromAccessToken from "../../../lib/tokenUrl";

// 인증 서비스 공급자가 호출해주는 콜백 /api/oauth2/callback
const oauth2Callback = async function (req, res) {

    // iron-session 설정
    try {
        req.session.user = await GetUserFromAccessToken(req.query.state, req.query.code);
        await req.session.save();
        res.redirect("/");

    } catch (err) {
        console.log(err.message);
        res.json({error: err.message, state: req.query.state});
    }
}

export default withIronSessionApiRoute(
    oauth2Callback,
    sessionOption
)
