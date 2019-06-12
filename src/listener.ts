
import {LocationListener } from "history"
import path from "./path"

export interface PageInfo {
    path:string
    bootstrap?:()=>void,
    mount:(element:HTMLElement)=>void,
    unmount:(element:HTMLElement)=>void,
    mountPoint():HTMLElement
}

export default (pages:PageInfo[]):LocationListener => {

    let current : PageInfo | null = null

    return location => {
        for(let page of pages){
            if(path(page.path)(location.pathname)){
                if(current){
                    current.unmount(current.mountPoint())
                }
                page.mount(page.mountPoint())
                current = page
            }
        }
    }
}