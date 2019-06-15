
import createSPA,{ComponentDefinition} from "./index"
import createAttachment from "./attachment/dom"
import createHistory from "./history/browserHistory"
import pathResolver from "./pathResolver/simplePathResolver"

const mountPoint = document.getElementById("mount")

if(!mountPoint){
    throw new Error()
}

const context = createSPA<HTMLElement>(

        [
            {
                path:"/",
                mount(){
                    const newElm = document.createElement("div");
                    newElm.innerText ="TOP"
                    return {
                        mounted:newElm
                    }
                }
            },
            {
                path:"/home",
                mount(){
                    const newElm = document.createElement("div");
                    newElm.innerText ="HOME"
                    return {
                        mounted:newElm
                    }
                }
            },
            {
                path:"/about",
                mount(){
                    const newElm = document.createElement("div");
                    newElm.innerText ="ABOUT"
                    return {
                        mounted:newElm
                    }
                }
            }
        ],
        createAttachment(mountPoint),
        {
            history:createHistory(),
            pathResolver
        }
)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",event =>{
        event.preventDefault()
        context.push(e.innerText)
    })
})
