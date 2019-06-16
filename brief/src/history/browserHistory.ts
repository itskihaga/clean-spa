import {History} from "zenra-spa"

export default (window:Window):History => (

    ({
        getPath(){
            return window.location.pathname
        },
        push(path){
            window.history.pushState(null,"",path)
        },
        watch(onPathChange){
            window.addEventListener("popstate",onPathChange)
        }
    })
)