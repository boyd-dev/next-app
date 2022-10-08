import {
    AppBar, Avatar,
    Box, IconButton,
    Stack, Toolbar,Typography
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";
import {useContext, useState} from "react";
import Context from "../lib/appContext";
import SideMenu from "./sidemenu";

function TopMenu() {

    const user = useContext(Context);

    const [flag, setFlag] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setFlag(open);
    };

    const openLeftMenu = () => {
        setFlag(true);
    }

    return (
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}>
                            <IconButton color="inherit" aria-label="menu" onClick={openLeftMenu}>
                                <Menu/>
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: { xs: 1, md: 1}, display: { xs: 'flex', md: 'block' } }}>
                            <Typography variant="h6">
                                Test App
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <Stack direction="row" spacing={4}>
                                <Link href="/">
                                    <a><Typography>HOME</Typography></a>
                                </Link>
                                <Link href="/qna">
                                    <a><Typography>Q&A</Typography></a>
                                </Link>
                                <Link href="/knowhow">
                                    <a><Typography>지식나눔</Typography></a>
                                </Link>
                                <Link href="/plaza">
                                    <a><Typography>사는 이야기</Typography></a>
                                </Link>
                                <Link href="/study">
                                    <a><Typography>모임/스터디</Typography></a>
                                </Link>
                                <Link href="/notice">
                                    <a><Typography>공지사항</Typography></a>
                                </Link>
                            </Stack>
                        </Box>

                        <Link href="/">
                            <IconButton color="inherit">
                                <HomeIcon/>
                            </IconButton>
                        </Link>

                        {user.isLogged?
                            <>
                                <Avatar></Avatar>
                                <Link href="/api/logout">
                                    <IconButton color="inherit">
                                        <LogoutIcon/>
                                    </IconButton>
                                </Link>
                            </>
                            :
                            <>
                                <Typography variant="h6">Login</Typography>
                                <Link href="/login">
                                    <IconButton color="inherit">
                                        <LoginIcon/>
                                    </IconButton>
                                </Link>
                            </>
                        }
                    </Toolbar>
                </AppBar>
                <SideMenu flag={flag} toggleDrawer={toggleDrawer}/>
            </Box>
        </>
    )
}

export default TopMenu
