import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import ShowDirectories from "../../components/ShowDirectories/ShowDirectories.tsx";
import EmptyDirectory from "../../components/EmptyDirectory/EmptyDirectory.tsx";
import useStructure from "../../hooks/useStructure.ts";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";
import GeneralContextMenu from "../../components/GeneralContextMenu/GeneralContextMenu.tsx";
import {useContextMenu} from "react-contexify";
import {MouseEvent} from "react";

const Structure = () => {
    const {isEmpty, isDirNotFound, directories, files} = useStructure();
    const {show} = useContextMenu({
        id: 'test'
    })
    const displayGeneralContextMenu = (event: MouseEvent<HTMLElement>) => {
        show({event})
    }
    return (<div>
        {isDirNotFound ? "Page Not Found" : (<>
            <PageTitle>My Drive</PageTitle>
            {isEmpty.files && isEmpty.directories ? <EmptyDirectory/> : (<div onContextMenu={displayGeneralContextMenu}>
                <ShowDirectories directories={directories} isEmptyDirectory={isEmpty.directories}/>
                <ShowFiles files={files} isEmptyFile={isEmpty.files}/>
                <GeneralContextMenu id={"test"}/>
            </div>)}
        </>)}
    </div>);
};

export default Structure;
