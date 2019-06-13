import {History,Location} from "history"
import {PageDefinition,createLocationResolver} from "./functions"

export default <T>(history:History,pages:PageDefinition<T>[],recieveNext:(element:T)=>void):void => {
    const resolveLocation = createLocationResolver(pages)
    let current : {
        def:PageDefinition<T>,
        mounted:T
    } | void
    const onLocationChange : (location:Location) => void = location =>{
        const next = resolveLocation(location.pathname)
        if(next && !(current && current.def.path == next.path)){
            current && current.def.unmount(current.mounted)
            const mounted = next.mount()
            recieveNext(mounted)
            current = {
                def:next,
                mounted
            }
        }
    }
    onLocationChange(history.location)
    history.listen(onLocationChange)
}