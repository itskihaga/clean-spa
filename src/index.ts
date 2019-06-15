import { History } from "./history"
import {PathResolver} from "./pathResolver"
import {Attachment}from "./attachment"

export interface ComponentDefinition<T,P> {
    load?():void,
    mount(params:P):ComponentInstance<T,P>,
    path:string
}

export interface ComponentInstance<T,P> {
    unmount?():void
    setParams?(params:P):void,
    mounted:T
}

export namespace PathResolver {
    export type Result<P> = {
        params:P,
        matches:true
    } | {
        matches:false
    }
}

export interface Config<P> {
    history:History,
    pathResolver:PathResolver<P>,
}

export default <T,P = undefined>(components:ComponentDefinition<T,P>[],{attach,detach}:Attachment<T>,{history,pathResolver}:Config<P>) => {
    
    const resolvers = components.map(c => {
        const resolver = pathResolver(c.path)
        return (path:string) => {
            const res = resolver(path)
            return res ? {params:res.params,component:c} : false
        }
    })

    let current : {definition:ComponentDefinition<T,P>,instance:ComponentInstance<T,P>} | void

    const _push = (path:string) => {
       
        for(let resolve of resolvers) {
            const res = resolve(path)
            if(res){
                const {component,params} = res
                const instance = component.mount(params)
                current && current.instance.unmount && current.instance.unmount()
                current && detach && detach(current.instance.mounted)
                attach(instance.mounted)
                current = {
                    definition:component,
                    instance
                }
            } 
        }
    }
    const push = (path:string) => {
        history.push(path)
        _push(path)
    }

    _push(history.getPath())

    return {
        push
    }
}