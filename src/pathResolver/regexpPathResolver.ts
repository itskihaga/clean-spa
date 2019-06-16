import {PathResolver} from "./index"
import * as pathToRegexp from "path-to-regexp"



export type Params = {[key:string]:string | undefined}
const pathResolver : PathResolver<Params> = matcher => {
    const keys :pathToRegexp.Key[] = []
    const reg = pathToRegexp(matcher,keys)
    return path => {
        const res = reg.exec(path)
        if(!res) {
            return false
        }
        const params : {[key:string]:string} = {}
        keys.forEach((e,i)=> {
            params[e.name] = res[i + 1]
            
        })
        return {params}
    }
}

export default pathResolver
