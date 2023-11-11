import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import {v4 as uuidV4} from "uuid";
import File from "../File/File.tsx";

interface ShowFilesProps {
    files: string[] | []
}

const ShowFiles = ({files}: ShowFilesProps) => {
    return (<>
            <SectionTitle title={"Files"}/>
            <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                {files && files.map((file, index) => (<Col key={`${index}-${file}`}>
                    <File id={uuidV4()} fileName={file}/>
                </Col>))}
            </Row>
        </>);
};

export default ShowFiles;