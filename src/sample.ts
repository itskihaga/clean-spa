
import createSPA from "@/brief"

const mountPoint = document.getElementById("mount")

if(!mountPoint){
    throw new Error()
}

const context = createSPA(
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
                path:"/about/:name?",
                mount(params){
                    const newElm = document.createElement("div");
                    newElm.innerText ="ABOUT " + (params[0] || "")
                    return {
                        mounted:newElm
                    }
                }
            }
        ],
        mountPoint
)

context.applyWindowEventListener(window)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",event =>{
        event.preventDefault()
        context.push(e.innerText)
    })
})
