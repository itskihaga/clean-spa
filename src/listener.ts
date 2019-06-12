
import {LocationListener } from "history"
import path from "./path"

export interface PageInfo {
    path:string
    bootstrap?:()=>void,
    mount:(element:HTMLElement)=>void,
    unmount:(element:HTMLElement)=>void
}

export default (pages:PageInfo[],serveElement:()=>HTMLElement):LocationListener => {

    let current : PageInfo | null = null

    return location => {
        for(let page of pages){
            if(path(page.path)(location.pathname)){
                if(current){
                    current.unmount(serveElement())
                }
                page.mount(serveElement())
                current = page
            }
        }
    }
}