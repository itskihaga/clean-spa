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
        },
        mountPoint(){
            const tag = document.getElementById("home")
            if(tag){
                return tag;
            }
            throw new Error("homeがない");
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
        },
        mountPoint(){
            const tag = document.getElementById("about")
            if(tag){
                return tag;
            }
            throw new Error("aboutがない");
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
        },
        mountPoint(){
            const tag = document.getElementById("top")
            if(tag){
                return tag;
            }
            throw new Error("topがない");
        }
    }
])
listener(history.location,"PUSH")
history.listen(listener)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",() =>{
        history.push(e.innerText)
    })
})
