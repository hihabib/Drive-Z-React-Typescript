import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import ShowDirectories from "../../components/ShowDirectories/ShowDirectories.tsx";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";
import EmptyFolder from "../../components/EmptyFolder/EmptyFolder.tsx";
import useStructure from "../../hooks/useStructure.ts";

const Structure = () => {

    const {isEmpty, isDirNotFound, files, folders, addSelectedItem, isSelected} = useStructure();

    return (<div>
        {isDirNotFound ? "Page Not Found" : (
            <>

        <PageTitle>My Drive</PageTitle>
                {isEmpty.files && isEmpty.folders ? <EmptyFolder/> : (<>
                    <ShowDirectories isSelected={isSelected} addSelectedItem={addSelectedItem} isEmpty={isEmpty.folders} folders={folders}/>
                    <ShowFiles isSelected={isSelected} addSelectedItem={addSelectedItem} isEmpty={isEmpty.files} files={files}/>
                </>)}
            </>
        )}
    </div>);
};

export default Structure;