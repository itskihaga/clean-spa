import * as pathToRegexp from "path-to-regexp"
import { Params } from "zenra-spa"
 
export type PathResolver = (matcher:string) => (path:string) => PathResolver.Result
export namespace PathResolver {
    export type Result = {
        params:Params
    } | false
}

const pathResolver : PathResolver = matcher => {
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
