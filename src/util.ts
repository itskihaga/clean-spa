
type PromiseOrFunctionOrObject<T> = (()=>Promise<T>) | (()=>T) | T | Promise<T>

export const resolvePromiseOrFunctionOrObject = <T>(tag:PromiseOrFunctionOrObject<T>):Promise<T>=> {
    if(tag instanceof Function) {
        const res = tag()
        return res instanceof Promise ? res : Promise.resolve(res)
    } else {
        return Promise.resolve(tag)
    }
}