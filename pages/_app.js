import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import Head from "next/head";
import useUser from "../lib/useUser";
import Context from "../lib/appContext";
import TopMenu from "../components/topmenu";

function MyApp({ Component, pageProps }) {

    // 페이지 요청이 들어올 때마다 쿠키에 저장된 사용자 정보를 확인한다.
    const user = useUser();

    return (
      <>
          <Head>
              <title>Hello, Next.js!</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width,initial-scale=1"/>
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <CssBaseline/>
          {/* 하위 페이지에서 사용자 정보를 참조할 필요가 있을 때 활용할 수 있도록 컨텍스트 API 로 전달 */}
          <Context.Provider value={user}>
              <TopMenu/>
              <Component {...pageProps} />
          </Context.Provider>
      </>
    )
}

export default MyApp
