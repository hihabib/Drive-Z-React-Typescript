import Directory from "../../components/Directory/Directory.tsx";
import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import {Col, Row} from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle/SectionTitle.tsx";
import {v4 as uuidV4} from 'uuid'
import useStructure from "../../context/StructureContext/useStructure.tsx";
import {useEffect} from "react";
import axios from "axios";
import {StructureActionType} from "../../reducers/structureReducer.ts";

const Home = () => {
    const {structures: {folders}, dispatch} = useStructure();
    useEffect(() => {
        (async () => {
            const {data: folders} = await axios.get("http://localhost:8080/api/v1/tree/folders-tree/habibulislam");
            dispatch({type: StructureActionType.setFolders, payload: folders})
        })()
    }, []);

    return (<div>
            <PageTitle>My Drive</PageTitle>
            <SectionTitle title={"Folders"}/>
            <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                {folders && folders.map((folder, index) => (<Col key={`${index}-${folder}`}>
                        <Directory id={uuidV4()} dirName={folder}/>
                    </Col>))}
            </Row>
        </div>);
};

export default Home;