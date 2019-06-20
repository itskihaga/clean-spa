import createSPA,{ComponentMapping,Component as _Component} from "zenra-spa"
import createAttachment from "./attachment/domAttachment"
import createHistory from "./history/browserHistory"
import pathResolver,{Params} from "./pathResolver/regexpPathResolver"

export type Component = _Component<HTMLElement,Params>

export default (components:ComponentMapping<HTMLElement,Params>[],mountPoint:HTMLElement) => (
    createSPA(components,createAttachment(mountPoint),{
        history:createHistory(window),
        pathResolver
    })
)