
import createSPA, { browserHistory, domAttachment } from "zenra-spa"

const createElement = (text: string) => {
    const newElm = document.createElement("div");
    newElm.innerText = text;
    return newElm
}

const mountPoint = document.getElementById("mount")

if (mountPoint) {
    const { push } = createSPA(
        {
            components: [
                {
                    path: "/",
                    component: {
                        mount() {
                            return {
                                mounted: createElement("TOP")
                            }
                        }
                    }
                },
                {
                    path: "/home",
                    component: () => ({
                        mount() {
                            return {
                                mounted: createElement("HOME")
                            }
                        }
                    })
                },
                {
                    path: "/update/:param?",
                    component: {
                        mount(params) {
                            const mounted = createElement("UPDATE " + (params.param || ""))
                            return {
                                mounted,
                                update(params) {
                                    mounted.innerText = `UPDATE ${(params.param || "")}
                                        Component updated without remounting.`
                                }
                            }
                        }
                    }
                },
                {
                    path: "/load",
                    component() {
                        return new Promise(res => {
                            setTimeout(res, 1000, {
                                mount() {
                                    return {
                                        mounted: createElement("LOADED")
                                    }
                                }
                            })
                        })
                    }
                }
            ],
            attachment: domAttachment(mountPoint),
            history: browserHistory(window)
        }
    )

    const nav = document.getElementById("nav")
    if (nav) {
        ["/", "/home", "/update", "/update/hoge", "/load"].forEach(e => {
            const a = document.createElement("a")
            a.href = e;
            a.innerText = e;
            a.addEventListener("click", event => {
                event.preventDefault()
                push(e)
            })
            nav.appendChild(a);
        })
    }
}

