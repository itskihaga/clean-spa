import {History} from "./index"

export default ():History => (
    ({
        getPath(){
            return window.location.pathname
        },
        back() {
            window.history.back()
        },
        forward() {
            window.history.forward()
        },
        push(path:string){
            window.history.pushState(null,"",path)
        }
    })
)