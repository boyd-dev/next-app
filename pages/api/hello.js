// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOption} from "../../lib/sessionOption";

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default withIronSessionApiRoute(
    async function handler(req, res) {
      const user = req.session.user;

      // 권한 검사
      if (user) {
        res.status(200).json({ name: 'John Doe' })
      } else {
        res.json({});
      }
    },
    sessionOption
);