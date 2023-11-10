import Directory from "../../components/Directory/Directory.tsx";
import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import {Stack} from "react-bootstrap";

const Home = () => {
    return (
        <div>
            <PageTitle>My Drive</PageTitle>
            <div className={'d-flex '}>
                <Directory dirName={'Hello world'}/>

            </div>
        </div>
    );
};

export default Home;