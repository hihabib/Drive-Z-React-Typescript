import SectionTitle from "../SectionTitle/SectionTitle.tsx";
import {Col, Row} from "react-bootstrap";
import Directory from "../Directory/Directory.tsx";
import {StructureItems} from "../../@types/api";

interface ShowDirectoryProps {
    folders: StructureItems[],
    isEmpty: boolean,
    addSelectedItem: (id:string) => void
    isSelected: (id:string) => boolean
}

const ShowDirectories = ({folders, isEmpty, addSelectedItem, isSelected}: ShowDirectoryProps) => {
    return (<>
        {!isEmpty && (<>
                <SectionTitle title={"Folders"}/>
                <Row lg={4} md={3} sm={2} xs={1} className={'g-3'}>
                    {folders && folders.map((folder) => (<Col key={folder.id}>
                        <Directory isSelected={isSelected} addSelectedItem={addSelectedItem} id={folder.id} dirName={folder.name}/>
                    </Col>))}
                </Row>
            </>

        )}
    </>)

};

export default ShowDirectories;