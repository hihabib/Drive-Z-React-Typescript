import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import useStructure from "../../hooks/useStructure.ts";
import {memo} from "react";


const ShowDirectories = () => {
    const {isEmpty, folders} = useStructure();

    return (<>
        {!isEmpty.folders && (<>
                <SectionTitle title={"Folders"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {folders && folders.map((folder) => (<Col key={folder.id}>
                        <Directory id={folder.id} dirName={folder.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>)

};

export default ShowDirectories;