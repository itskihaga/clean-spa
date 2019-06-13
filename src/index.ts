import {createBrowserHistory} from "history"
import applySPA from "./applySPA"

const history = createBrowserHistory()
applySPA(
    history,
    [
        {
            path:"/",
            mount(){
                const newElm = document.createElement("div");
                newElm.innerText ="TOP"
                return newElm
            },
            unmount(target:HTMLElement){
                target.remove()
            }
        },
        {
            path:"/home",
            mount(){
                const newElm = document.createElement("div");
                newElm.innerText ="HOME"
                return newElm
            },
            unmount(target:HTMLElement){
                target.remove()
            }
        },
        {
            path:"/about",
            mount(){
                const newElm = document.createElement("div");
                newElm.innerText ="ABOUT"
                return newElm
            },
            unmount(target:HTMLElement){
                target.remove()
            }
        }
    ],
    (nextPage:HTMLElement)=>{
        const mountPoint = document.getElementById("mount")
        if(mountPoint){
            mountPoint.appendChild(nextPage)
        }
    }
)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",event =>{
        event.preventDefault()
        history.push(e.innerText)
    })
})
