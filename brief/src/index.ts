import createSPA,{ComponentDefinition} from "zenra-spa"
import createAttachment from "./attachment/domAttachment"
import createHistory from "./history/browserHistory"
import pathResolver,{Params} from "./pathResolver/regexpPathResolver"

export default (components:ComponentDefinition<HTMLElement,Params>[],mountPoint:HTMLElement) => (
    createSPA(components,createAttachment(mountPoint),{
        history:createHistory(),
        pathResolver:pathResolver
    })
)