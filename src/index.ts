import createSPA from "./core"
export default createSPA

export type Params = {[key:string]:string | undefined}

export interface Component<T> {
    mount(params:Params):ComponentInstance<T>,
}

export type ComponentMapping<T> = {
    path:string,
    component:Component<T> | (() => Component<T>) | (() => Promise<Component<T>>)
}

export interface ComponentInstance<T> {
    unmount?():void
    setParams?(params:Params):void,
    mounted:T
}

export interface Attachment<T> {
    attach:(instance : T ) => void ,
    detach?:(instance : T )=>void
}

export interface History {
    getPath():string,
    push(path:string):void,
    watch?(onPathChange:()=>void):void
}

export interface Config<T> {
    components:ComponentMapping<T>[],
    attachment:Attachment<T>,
    history:History
}

export * from "./attachment"
export * from "./history"


