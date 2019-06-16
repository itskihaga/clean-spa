import {PathResolver} from "./index"
import * as pathToRegexp from "path-to-regexp"
const pathResolver : PathResolver<string[]> = matcher => {
    const reg = pathToRegexp(matcher)
    return path => {
        const res = reg.exec(path)
        return res ? {params: res.slice(1)} : false
    }
}

export default pathResolver
