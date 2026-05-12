export default interface BaseCrudInterface<T> {

    index(): Promise<T[]>
    indexWith(relationships: string[]): Promise<T[]>
    show(id:number | string): Promise<T | null>
    showWith(id: number | string, relationships: string[]): Promise<T | null>
    store(payload: Partial<T>): Promise<T>
    update(id: number | string, payload: Partial<T>): Promise<T>
    delete(id: number | string): Promise<boolean>
}