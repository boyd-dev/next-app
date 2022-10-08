import {Box} from "@mui/material";

export default function Layout({ children }) {

    return (

        <Box sx={{ border: "1px dashed grey", padding: "5px" }}>
            {children}
        </Box>
    )
}
