import Layout from "./layout";
import { Box } from "@mui/material";
import { Oval } from 'react-loader-spinner';

export default function Spinner() {

    return (
        <Layout>
            <Box sx={{display:"flex", justifyContent:"center", minHeight: "10vh", alignItems: "center"}} >
                <Oval color="#2C4CFF" secondaryColor="#2C4CFF" height={80} width={80} strokeWidth={3} />
            </Box>
        </Layout>
    )

}