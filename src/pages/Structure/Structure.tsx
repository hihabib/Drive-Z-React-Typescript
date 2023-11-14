import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import ShowDirectories from "../../components/ShowDirectories/ShowDirectories.tsx";
import EmptyDirectory from "../../components/EmptyDirectory/EmptyDirectory.tsx";
import useStructure from "../../hooks/useStructure.ts";
import ShowFiles from "../../components/ShowFiles/ShowFiles.tsx";

const Structure = () => {
    const {isEmpty, isDirNotFound, directories, files} = useStructure();

    return (<div>
        {isDirNotFound ? "Page Not Found" : (<>
                <PageTitle>My Drive</PageTitle>
                {isEmpty.files && isEmpty.directories ? <EmptyDirectory/> : (<>
                    <ShowDirectories directories={directories} isEmptyDirectory={isEmpty.directories}/>
                    <ShowFiles files={files} isEmptyFile={isEmpty.files}/>
                </>)}
            </>)}
    </div>);
};

export default Structure;