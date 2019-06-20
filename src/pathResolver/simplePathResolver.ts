import {PathResolver} from "zenra-spa"
const pathResolver : PathResolver<undefined> = matcher => path => matcher == path ? {params:undefined} : false
export default pathResolver