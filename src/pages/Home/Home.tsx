import Directory from "../../components/Directory/Directory.tsx";
import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import {Col, Row} from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle/SectionTitle.tsx";
import {v4 as uuidV4} from 'uuid'
const Home = () => {
    return (
        <div>
            <PageTitle>My Drive</PageTitle>
            <SectionTitle title={"Folders"}/>
            <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>
                <Col>
                    <Directory id={uuidV4()} dirName={'Hello world'}/>
                </Col>

            </Row>
        </div>
    );
};

export default Home;