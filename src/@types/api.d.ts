export interface StructureDirectory {
    id: string;
    directoryName: string;
    baseSlug: string | null;
}

export interface StructureFile {
    id: string;
    baseSlug: string | null;
    fileName: string;
    fileSizeKB: number | null;
}
