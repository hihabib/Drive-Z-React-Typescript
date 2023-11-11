import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import {v4 as uuidV4} from "uuid";

interface ShowFilesProps {
    files: string[] | []
}
const ShowFiles = ({files}:ShowFilesProps) => {
    return (
        <>
            <SectionTitle title={"Files"}/>
            <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                {files && files.map((file, index) => (<Col key={`${index}-${file}`}>
                    <Directory id={uuidV4()} dirName={file}/>
                </Col>))}
            </Row>
        </>
    );
};

export default ShowFiles;