import createSPA,{ComponentDefinition} from "@/index"
import createAttachment from "@/attachment/dom"
import createHistory from "@/history/browserHistory"
import pathResolver,{Params} from "@/pathResolver/regexpPathResolver"

export default (components:ComponentDefinition<HTMLElement,Params>[],mountPoint:HTMLElement) => (
    createSPA(components,createAttachment(mountPoint),{
        history:createHistory(),
        pathResolver:pathResolver
    })
)