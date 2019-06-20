
import {PathResolver} from "./pathResolver"
import {ComponentMapping,Component,ComponentInstance} from "./index"
import {resolvePromiseOrFunctionOrObject} from "./util"

export interface ComponentManager<T,P> {
    resolve(path:string):PathResolver.Result<P>,
    mount(params:P):ComponentInstance<T,P> | Promise<ComponentInstance<T,P>>,
    path:string
}

export default <T,P>({path,component}:ComponentMapping<T,P>,resolver:PathResolver<P>):ComponentManager<T,P> => {
    const resolve = resolver(path);
    let buf : Component<T,P> | void;
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


