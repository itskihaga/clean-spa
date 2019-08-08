import { Params } from "zenra-spa"
import matcherToPathResolver from "../lib/matcherToPathRsolver"
 
export type PathResolver = (matcher:string) => (path:string) => PathResolver.Result
export namespace PathResolver {
    export type Result = {
        params:Params
    } | false
}

const pathResolver : PathResolver = matcher => {

    const pathResolver = matcherToPathResolver(matcher);

    return path => {
        const params = pathResolver(path);
        return params ? {params} : false
    }
    
}

export default pathResolver
