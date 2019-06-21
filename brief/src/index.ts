import createSPA,{ComponentMapping,domAttachment,browserHistory} from "zenra-spa"


export default (components:ComponentMapping<HTMLElement>[],mountPoint:HTMLElement) => (
    createSPA({components,attachment:domAttachment(mountPoint),history :browserHistory(window)})
)