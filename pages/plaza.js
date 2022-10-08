import { Typography } from "@mui/material";
import Layout from "../components/layout";
import axios from "axios";

const Main = ({data}) => {

    return (
        <Layout>
            <Typography variant="body1">사는 이야기</Typography>
            <Typography variant="h5">{data.title}</Typography>
        </Layout>
    )
}

export default Main;


// API 를 통해 외부 데이터 가져오기
export const getStaticProps = async function (context) {

    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    return {
        props: {
            data: response.data
        }
    }

}
