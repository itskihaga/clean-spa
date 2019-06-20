import { History } from "./history"
import {PathResolver} from "./pathResolver"
import {Attachment}from "./attachment"
import createManager,{ComponentManager}from "./componentManager"

export * from "./attachment"
export * from "./pathResolver"
export * from "./history"

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

export default <T,P = undefined>(components:ComponentMapping<T,P>[],{attach,detach}:Attachment<T>,{history,pathResolver}:Config<P>)=> {
    
    const managers : ComponentManager<T,P>[] = components.map(component => createManager(component,pathResolver))
    let current : {path:string,instance:ComponentInstance<T,P>} | void

    const change = async (pathTo:string) => {
        for(let {resolve,mount,path} of managers) {
            const res = resolve(pathTo)
            if(res){
                current && current.instance.unmount && current.instance.unmount()
                current && detach && detach(current.instance.mounted)
                const {params} = res
                const instance = await mount(params)
                attach(instance.mounted)
                current = {
                    path,
                    instance
                }
                return true;
            }
        }
        return false;
    }

    history.watch && history.watch(()=>change(history.getPath()))
    change(history.getPath())

    return {
        push(path:string){
            history.push(path)
            change(path)
        }
    }
}