
import {ComponentMapping,Component,ComponentInstance,Params} from "zenra-spa"
import {resolvePromiseOrFunctionOrObject} from "../util"
import pathResolver,{PathResolver} from "./regexpPathResolver"

export interface ComponentManager<T> {
    resolve(path:string):PathResolver.Result,
    mount(params:Params):ComponentInstance<T> | Promise<ComponentInstance<T>>,
    path:string
}

export default <T>({path,component}:ComponentMapping<T>):ComponentManager<T> => {
    const resolve = pathResolver(path);
    let buf : Component<T> | void;
    return {
        resolve,
        async mount(params){
            if(buf){
                return buf.mount(params)
            }
            return await resolvePromiseOrFunctionOrObject(component).then(e =>{
                buf = e;
                return e.mount(params)
            })
        },
        path
    }
}


