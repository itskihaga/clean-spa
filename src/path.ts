import * as pathToRegexp from "path-to-regexp"

export default (matcher : string) => {
    const key : pathToRegexp.Key[] = []
    const reg = pathToRegexp(matcher,key)
    return (url : string) => {
        const res = reg.exec(url)
        if(!res){
            return null;
        }
        const variables : {[key:string]:string}= {};
        key.forEach((e,i)=>{
            variables[e.name] = res[i + 1]
        })
        return variables
    }
}