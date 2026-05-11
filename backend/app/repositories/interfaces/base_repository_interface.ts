export default interface BaseRepositoryInterface<T> {
    all(): Promise<T[]>
    allWith(relationships: string[]): Promise<T[]>
    find(id: number | string): Promise<T | null>
    findWith(id: number | string, relationships: string[]): Promise<T | null>
    create(payload: Partial<T>): Promise<T>
    update(id: number | string, payload: Partial<T>): Promise<T>
    delete(id: number | string): Promise<boolean>
}