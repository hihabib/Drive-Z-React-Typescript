import Directory from "../../components/Directory/Directory.tsx";
import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <div>
            <PageTitle>My Drive</PageTitle>
            <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory dirName={'Hello world'}/>
                </Col>

            </Row>
        </div>
    );
};

export default Home;