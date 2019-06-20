import {Attachment}from "zenra-spa"
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