export interface History {
    getPath():string,
    push(path:string):void,
    watch?(onPathChange:()=>void):void
}