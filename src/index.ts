import createSPA from "./core"
export default createSPA

export interface Component<T,P> {
    mount(params:P):ComponentInstance<T,P>,
}

export type ComponentMapping<T,P> = {
    path:string,
    component:Component<T,P> | (() => Component<T,P>) | (() => Promise<Component<T,P>>)
}

export interface ComponentInstance<T,P> {
    unmount?():void
    setParams?(params:P):void,
    mounted:T
}

export interface Config<P> {
    history:History,
    pathResolver:PathResolver<P>,
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

export type PathResolver<P> = (matcher:string) => (path:string) => PathResolver.Result<P>

export namespace PathResolver {
    export type Result<P> = {
        params:P
    } | false
}

export * from "./attachment"
export * from "./pathResolver"
export * from "./history"


