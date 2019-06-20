import createSPA,{ComponentMapping,domAttachment,browserHistory,regexpPathResolver} from "zenra-spa"
import {Params} from "../../src/pathResolver/regexpPathResolver"

export default (components:ComponentMapping<HTMLElement,Params>[],mountPoint:HTMLElement) => (
    createSPA(components,domAttachment(mountPoint),{
        history:browserHistory(window),
        pathResolver:regexpPathResolver
    })
)