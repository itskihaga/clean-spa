import {History} from "./index"

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