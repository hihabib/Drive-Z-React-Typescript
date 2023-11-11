export enum StructureActionType {
    setFolders = 'SET_FOLDERS'
}
export interface StructureAction {
    type: StructureActionType,
    payload: string | string[] | ({type: string[], values: string[]})[]
}
export interface IStructureState {
    folders: string[]
}
export const structureReducer = (state:IStructureState, action: StructureAction) => {
    switch (action.type) {
        case StructureActionType.setFolders:
            if(!Array.isArray(action.payload)){
                return state;
            }
            action.payload.forEach(element => {
                if('string' !== typeof element){
                    return state;
                }
            })
            return {...state, folders: [...action.payload]} as  IStructureState
        default:
            return state;
    }
}