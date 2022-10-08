import styles from '../styles/Home.module.css'
import {Typography} from "@mui/material";
import Layout from "../components/layout";
import {useContext} from "react";
import Context from "../lib/appContext";

export default function Home() {

    // 로그인하지 않아도 볼 수 있지만 로그인 한 경우에는 사용자 정보가 필요한 경우 useContext 로 사용자 정보를 참조하자
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

