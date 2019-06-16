import {History} from "zenra-spa"

export default ():History => (
    ({
        getPath(){
            return window.location.pathname
        },
        push(path:string){
            window.history.pushState(null,"",path)
        }
    })
)