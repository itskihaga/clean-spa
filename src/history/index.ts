export interface History {
    getPath():string,
    push(path:string):void,
    back():void,
    forward():void
}