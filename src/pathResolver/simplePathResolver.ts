import {PathResolver} from "./index"
const pathResolver : PathResolver<undefined> = matcher => path => matcher == path ? {params:undefined} : false
export default pathResolver