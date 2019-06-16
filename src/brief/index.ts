import createSPA,{ComponentDefinition} from "@/index"
import createAttachment from "@/attachment/dom"
import createHistory from "@/history/browserHistory"
import pathResolver from "@/pathResolver/regexpPathResolver"

export default (components:ComponentDefinition<HTMLElement,{[key:string]:string}>[],mountPoint:HTMLElement) => (
    createSPA(components,createAttachment(mountPoint),{
        history:createHistory(),
        pathResolver:pathResolver
    })
)