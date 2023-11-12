export const getExtension = (fileName:string):string => {
    const splitFileName = fileName.split(".");
    return splitFileName[splitFileName.length - 1];
}