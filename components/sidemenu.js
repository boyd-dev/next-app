import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function SideMenu({flag, toggleDrawer}) {

    return (
        <Drawer anchor="left" open={flag} onClose={toggleDrawer(false)}>
            <Box sx={{width: "250px"}} component="nav" onClick={toggleDrawer(false)}>
                <List>
                    <Link href="/">
                        <ListItemButton key="0">
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText>HOME</ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link href="/qna">
                        <ListItemButton key="0">
                            <ListItemIcon><HelpIcon/></ListItemIcon>
                            <ListItemText>Q&A</ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link href="/knowhow">
                        <ListItemButton key="0">
                            <ListItemIcon><LocalLibraryIcon/></ListItemIcon>
                            <ListItemText>지식나눔</ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link href="/plaza">
                        <ListItemButton key="0">
                            <ListItemIcon><PeopleIcon/></ListItemIcon>
                            <ListItemText>사는 이야기</ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link href="/study">
                        <ListItemButton key="0">
                            <ListItemIcon><SchoolIcon/></ListItemIcon>
                            <ListItemText>모임/스터디</ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link href="/notice">
                        <ListItemButton key="0">
                            <ListItemIcon><CampaignIcon/></ListItemIcon>
                            <ListItemText>공지사항</ListItemText>
                        </ListItemButton>
                    </Link>
                </List>
            </Box>
        </Drawer>
    )
}