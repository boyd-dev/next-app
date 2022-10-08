import {Box, Container} from "@mui/material";
import Image from "next/image";
import NaverLogin from "../../public/login_naver.png";
import GoogleLogin from "../../public/login_google.png";
import GithubLogin from "../../public/login_github.png";
import AuthURL from "../../lib/authUrl";

import Layout from "../../components/layout";

export default function Login() {

    const handleClick = async (e) => {
        window.location.href = AuthURL(e.target.dataset.item);
    }

    return (
        <Layout>
            <Container>
                <Box sx={{display:"flex", justifyContent:"center", padding:"20px"}}>
                    <a onClick={handleClick} style={{cursor: "pointer"}}>
                        <Image src={GoogleLogin} alt="Google" width={80} height={78} data-item="google"/>
                    </a>
                    <a onClick={handleClick} style={{cursor: "pointer"}}>
                        <Image src={NaverLogin} alt="Naver" width={80} height={78} data-item="naver"/>
                    </a>
                    <a onClick={handleClick} style={{cursor: "pointer"}}>
                        <Image src={GithubLogin} alt="Github" width={80} height={78} data-item="github"/>
                    </a>
                </Box>

            </Container>
        </Layout>
    )
}

