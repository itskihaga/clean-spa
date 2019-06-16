## Zenra SPA is...
Zenra SPA is light weight & clean & dependency injectable SPA Library 

### Usage
```
npm i zenra-spa
```

```js

import createSPA from "zenra-spa/brief"

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
                    newElm.innerText ="ABOUT " + (params.name || "")
                    return {
                        mounted:newElm
                    }
                }
            }
        ],
        mountPoint
)

```
