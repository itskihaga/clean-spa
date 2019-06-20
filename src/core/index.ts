import {ComponentMapping,Attachment,History,ComponentInstance,PathResolver} from "zenra-spa"
import createManager,{ComponentManager} from "./componentManager"

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