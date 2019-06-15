export type PathResolver<P> = (matcher:string) => (path:string) => PathResolver.Result<P>

export namespace PathResolver {
    export type Result<P> = {
        params:P
    } | false
}