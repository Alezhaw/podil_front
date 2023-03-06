export interface IInitialState {

}

export interface IAction<T=any> {
    type:string,
    payload?:T
    groupId?: string,
}