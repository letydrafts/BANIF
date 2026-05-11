import type { LucidModel, LucidRow } from '@adonisjs/lucid/types/model'
import type BaseRepositoryInterface from './interfaces/base_repository_interface.ts'

export abstract class BaseRepository<T extends LucidRow>
    implements BaseRepositoryInterface<T> {

    constructor(protected model: LucidModel) {}

    async all(): Promise<T[]> {
        return this.model.all() as Promise<T[]>
    }

    async allWith(relationships: string[]): Promise<T[]> {
        const query = this.model.query()

        relationships.forEach((relation) => {
            query.preload(relation.trim() as any)
        })

        return query as unknown as Promise<T[]>
    }
        
    async find(id: number | string): Promise<T | null> {
        return this.model.find(id) as Promise<T | null>
    }

    async findWith(id: number | string, relationships: string[]): Promise<T | null> {
        const query = this.model.query().where('id', id)

        relationships.forEach((relation) => {
            query.preload(relation.trim() as any)
        })

        const results = await query
        return (results[0] as T) ?? null
    }

    async create(payload: Partial<T>): Promise<T> {
        return this.model.create(payload) as Promise<T>
    }

    async update(id: number | string, payload: Partial<T>): Promise<T> {
        const record = await this.model.find(id)

        if(!record) {
            throw new Error('Record with id ${id} not found')
        }

        record.merge(payload)

        return record.save() as Promise<T>
    }

    async delete(id: number | string): Promise<boolean> {
        const record = await this.model.find(id)

        if(!record) return false

        try{
            await record.delete()
            return true
        } catch (error) {
            console.error('Error deleting record with id ${id}:', error)
            return false
        }
    }

    async paginate(page: number, limit: number){
        return this.model.query().paginate(page, limit)
    }

    protected query() {
        return this.model.query()
    }
}