import {ComponentInstance,Config} from "zenra-spa"
import createManager,{ComponentManager} from "./componentManager"

export default <T>({components,attachment,history}:Config<T>)=> {
    
    const managers : ComponentManager<T>[] = components.map(component => createManager(component))
    let current : {path:string,instance:ComponentInstance<T>} | void

    const change = async (pathTo:string) => {
        for(let {resolve,mount,path} of managers) {
            const res = resolve(pathTo)
            if(res){
                current && current.instance.unmount && current.instance.unmount()
                current && attachment.detach && attachment.detach(current.instance.mounted)
                const {params} = res
                const instance = await mount(params)
                attachment.attach(instance.mounted)
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