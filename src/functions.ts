import * as pathToRegexp from "path-to-regexp"

export interface PageDefinition<T> {
    path:string
    bootstrap?:()=>void,
    mount:()=>T,
    unmount:(target:T)=>void
}

export type ResolveLocation<T> = (pathname:string) => PageDefinition<T> | void 

export const createLocationResolver:<T>(pages:PageDefinition<T>[]) => ResolveLocation<T> = pages => (
    pathname => {
        for(let page of pages){
            if(pathMatcher(page.path)(pathname)){
                return page
            }
        }
    }
)

export const pathMatcher = (matcher : string) => {
    const key : pathToRegexp.Key[] = []
    const reg = pathToRegexp(matcher,key)
    return (url : string) => {
        const res = reg.exec(url)
        return res ? res.slice(1) : null
    }
}