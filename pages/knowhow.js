import { Typography } from "@mui/material";
import Layout from "../components/layout";
import withAuthHoc from "../lib/withAuthHoc";

const Main = ({user}) => {

    return (
        <Layout>
            <Typography variant="body1">지식나눔</Typography>
        </Layout>
    )
}

export default withAuthHoc(Main);