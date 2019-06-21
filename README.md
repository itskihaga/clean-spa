## Zenra SPA is...
Zenra SPA is light weight & clean & dependency injectable SPA Library 

### Usage
```
npm i zenra-spa
```

```ts
import createSPA,{browserHistory,domAttachment} from "zenra-spa"

const createElement = (text) => {
    const newElm = document.createElement("div");
    newElm.innerText = text;
    return newElm
}

const {push} = createSPA(
    {
        components:[
            {
                path:"/",
                component:{
                    mount(){
                        return {
                            mounted:createElement("TOP")
                        }
                    }
                }
            },
            {
                path:"/home",
                component:() => ({
                    mount(){
                        return {
                            mounted:createElement("HOME")
                        }
                    }
                })
            },
            {
                path:"/about/:name?",
                component:{
                    mount(params){
                        return {
                            mounted:createElement("ABOUT " + (params.name || ""))
                        }
                    }
                }
            },
            {
                path:"/load",
                component(){
                    return new Promise(res=> {
                        setTimeout(res,1000,{
                            mount(){
                                return {
                                    mounted:createElement("LOADED")
                                }
                            }
                        })
                    })
                }
            }
        ],
        attachment:domAttachment(document.createElement("div")),
        history: browserHistory(window)
    }
)

document.querySelectorAll("a").forEach(e =>{
    e.addEventListener("click",event =>{
        event.preventDefault()
        push(e.pathname)
    })
})

```
