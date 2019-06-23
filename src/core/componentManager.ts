
import {ComponentMapping,Component,ComponentInstance,Params} from "zenra-spa"
import {resolvePromiseOrFunctionOrObject} from "../util"
import pathResolver,{PathResolver} from "./regexpPathResolver"

export interface ComponentManager<T> {
    resolve(path:string):PathResolver.Result,
    id:number,
    load():Promise<Component<T>> | Component<T>
}

export default <T>({path,component}:ComponentMapping<T>,id:number):ComponentManager<T> => {
    const resolve = pathResolver(path);
    let buf : Component<T> | void;
    return {
        resolve,
        load() {
            if(buf){
                return buf
            }
            return resolvePromiseOrFunctionOrObject(component).then(e =>{
                buf = e;
                return buf
            })
        },
        id
    }
}


