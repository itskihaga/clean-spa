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

### Config 

#### component
`components` configuration is definition about UI Components and path.  
You can specify `component` as 1:`Component` , 2:function returning `Component` or 3:function returning Promise of `Component`  
if you specify it as '3', the function will be called at once on the first time when the component is called by router.  
`Component` must define how to create UI element.  
You implement `mount` function returning `ComponentInstance` on your `Component` definition.  
`ComponentInstance` is warpper instance of UI element.  

#### attachment
`attachment` configuration is definition how to attach and detach UI Component to your application when routing.
You can specify it as `Attachment`.  
`attach` function of `Attachment` is called when router pick an UI component to render (as generally) by current current path statement  

#### history
`history` configuration is logic that SPA and current path statement work together.
You can specify it as `History`.  
`getPath` function of `History` gets currernt path statement.  
`push` function changes currernt path statement and push the history.  
`watch` function sets a listenr on change of currernt path statement.  
