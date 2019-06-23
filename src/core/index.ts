import {ComponentInstance,Config} from "zenra-spa"
import createManager,{ComponentManager} from "./componentManager"

export default <T>({components,attachment,history}:Config<T>)=> {
    
    const managers : ComponentManager<T>[] = components.map(createManager)
    let current : {id:number,instance:ComponentInstance<T>} | void
    let resolving : {id:number} | void

    const change = async (pathTo:string) => {
        for(let {resolve,load,id} of managers) {
            const res = resolve(pathTo)
            if(res){
                const {params} = res
                resolving = {id}
                if(current){
                    const {instance} = current
                    if(id === current.id && instance.update){
                        instance.update(params);
                        return true;
                    }
                    instance.unmount && instance.unmount()
                    attachment.detach && attachment.detach(instance.mounted)
                    current = undefined
                }
                const {mount} = await load()
                if(id === resolving.id){
                    const instance = mount(params)
                    attachment.attach(instance.mounted)
                    current = {
                        id,
                        instance
                    }
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