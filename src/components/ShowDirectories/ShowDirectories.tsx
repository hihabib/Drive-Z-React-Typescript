import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import {FilesAndFolder} from "../../@types/api";

interface ShowDirectoryProps {
    folders: FilesAndFolder[],
    isEmpty: boolean
}

const ShowDirectories = ({folders, isEmpty}: ShowDirectoryProps) => {
    return (<>
        {!isEmpty && (<>
                <SectionTitle title={"Folders"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {folders && folders.map((folder, index) => (<Col key={folder.id}>
                        <Directory id={`${index}-${folder}`} dirName={folder.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>)

};

export default ShowDirectories;