import {createBrowserHistory} from "history"
import createListener from "./listener"

const history = createBrowserHistory()
const listener = createListener([
    {
        path:"/home",
        mount(elm){
            const newElm = document.createElement("div");
            newElm.innerText ="HOME"
            elm.appendChild(newElm)
        },
        unmount(elm){
            while (elm.firstChild) elm.removeChild(elm.firstChild);
        }
    },
    {
        path:"/about",
        mount(elm){
            const newElm = document.createElement("div");
            newElm.innerText ="ABOUT"
            elm.appendChild(newElm)
        },
        unmount(elm){
            while (elm.firstChild) elm.removeChild(elm.firstChild);
        }
    },
    {
        path:"/",
        mount(elm){
            const newElm = document.createElement("div");
            newElm.innerText ="TOP"
            elm.appendChild(newElm)
        },
        unmount(elm){
            while (elm.firstChild) elm.removeChild(elm.firstChild);
        }
    }
],()=>{
    const mountPoint = document.getElementById("mount")
    if(mountPoint){
        return mountPoint
    }
    throw new Error()
})
listener(history.location,"PUSH")
history.listen(listener)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",event =>{
        event.preventDefault()
        history.push(e.innerText)
    })
})
