import { useState } from "react";
import {Button, Typography} from "@mui/material";
import Layout from "../components/layout";
import withAuthHoc from "../lib/withAuthHoc";

const Main = ({user}) => {

    const [value, setValue] = useState(0);

    const handleClick = () => {
        setValue(value+1);
    }

    return (
        <Layout>
            <Typography variant="body1">Q&A</Typography>
            <div>{value}</div>
            <div>
                <Button variant="contained" onClick={handleClick}>Click</Button>
            </div>
        </Layout>
    )
}

export default withAuthHoc(Main);