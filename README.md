This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Simple Next.js App 
1. 로그인 처리
- Next.js를 사용한 간단한 OAUTH2 로그인 예제 입니다. 인증 공급자는 구글, 깃허브, 네이버를 사용할 수 있습니다. 각 서비스의 설정은 
`env.local`에 있습니다.

- 인증 공급자가 호출하는 콜백 URL은 Next.js의 API 라우트인 `/api/oauth2/callback`으로 설정되어 있기 때문에 호출할 콜백 URL은 
로컬 호스트를 기준으로 `http://localhost:3000/api/oauth2/callback` 이 됩니다.

- `tokenUrl.js`에서 사용자 정보를 처리합니다. 액세스 토큰을 받은 후에 인증 공급자가 제공하는 사용자 정보 API를 호출하여 사용자 정보를 받습니다. 닉네임(또는 아이디)와 이메일 등의 정보를 
받아서 데이터베이스(여기서는 MySQL)에 저장합니다. 저장하는 정보는 아래와 같습니다.  

  - 사용자 고유번호
  - 이메일
  - 닉네임(또는 아이디)
  - Access Token
  - Refresh Token
  
  리프레시 토큰은 데이터베이스에 저장하지만 이 예제에서는 사용하지 않습니다. 액세스 토큰으로 로그인 여부를 판단하는 경우 액세스 토큰을 세션에 저장하고 만료되면 리프레시 토큰을 이용하여 재로그인 단계 없이 세션이 갱신되도록 구성할 수도 있겠습니다.
사용자가 명시적으로 로그아웃을 하면 쿠키에 저장된 세션으르 삭제하므로 다시 로그인해야 합니다.

2. 세션 정보
- 이 예제에서는 JWT와 유사하게 동작하는 [iron-session](https://www.npmjs.com/package/iron-session) 패키지를 사용합니다. iron-session은 서버에서 
저장되는 세션은 아닙니다. 로그인을 하면 사용자 정보(name, email)를 웹브라우저 쿠키에 암호화하여 저장합니다. 서버로 요청이 들어오면 `_app.js`에서 쿠키를 읽는 API 라우트 `/api/user`를 실행하여 
복호화하고 사용자 정보를 리턴합니다. 리턴된 사용자 정보는 클라이언트 측에서 컨텍스트 API를 통해 공유되거나 컴포넌트의 props를 통해 전달됩니다.

- 로그인을 해야(또는 권한이 있는) 볼 수 있는 페이지는 `withAuthHoc.js`으로 래핑하여 세션 정보를 검사한 후 로그인 페이지로 이동할 지 아니면 요청된 페이지를 리턴할지 결정합니다. 로그인하지 않아도 
볼 수 있는 페이지에서 사용자 정보가 필요한 경우에는 컨텍스트 API를 통해 가져올 수 있습니다.

  ```javascript
  const Main = ({user}) => {

    return (
        <Layout>
            <Typography variant="body1">지식나눔</Typography>
        </Layout>
    )
  }
  // 로그인된 사용자만 볼 수 있는 페이지
  export default withAuthHoc(Main);
  ```

  ```javascript
  export default function Home() {

    // useContext로 사용자 정보 참조
    const user = useContext(Context);

    return (
        <Layout>
            <main className={styles.main}>
                <h3 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h3>
            </main>
            {
                (Object.keys(user).length && user.isLogged)
                    ?
                    <Typography variant="h6">
                        로그인 사용자: {user.email}
                    </Typography>
                    :null
            }
        </Layout>
    )
  }
  ```

- 이 예제에서는 쿠키 만료 시간을 액세스 토큰과 같게 1 시간(구글 기준)으로 설정하여 액세스 토큰이 만료되면 로그인 세션도 사라지게 됩니다.

3. API 라우트
- Next.js는 API 라우트 기능으로 API 호출을 처리할 수 있습니다. 로그인된 사용자의 API 요청만 처리하기 위해서는 iron-session에서 제공하는 
`withIronSessionApiRoute`를 사용합니다. 이 컴포넌트로 래핑하면 요청으로부터 `req.session` 정보를 취득할 수 있으므로 
권한이 있는 요청인지 판별할 수 있습니다. 

  ```javascript
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
  ```