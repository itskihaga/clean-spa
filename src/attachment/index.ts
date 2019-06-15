export interface Attachment<T> {
    attach:(instance : T ) => void ,
    detach?:(instance : T )=>void
}