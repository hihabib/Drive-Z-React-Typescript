import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import File from "../File/File.tsx";
import {StructureItems} from "../../@types/api";
import useStructure from "../../hooks/useStructure.ts";

const ShowFiles = () => {
    const {isEmpty, files} = useStructure();
    return (<>
        {!isEmpty.files && (<>
                <SectionTitle title={"Files"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {files && files.map((file) => (<Col key={file.id}>
                        <File id={file.id} fileName={file.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>);
};

export default ShowFiles;