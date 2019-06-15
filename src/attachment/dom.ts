import {Attachment}from "./index"
export default (mountPoint:HTMLElement):Attachment<HTMLElement> => {
    return {
        attach(elm){
            mountPoint.appendChild(elm)
        },
        detach(elm){
            mountPoint.removeChild(elm)
        }
    }
}