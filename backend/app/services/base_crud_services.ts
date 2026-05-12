import type { BaseRepository } from '../repositories/base_repository.ts'
import type BaseCrudInterface from './interfaces/base_crud_interface.ts'
import type { LucidRow } from '@adonisjs/lucid/types/model'

export class BaseCrudService<T extends LucidRow, R extends BaseRepository<T>>
    implements BaseCrudInterface<T> {

    constructor(protected repository: R) {}

    async index(): Promise<T[]> {
        return this.repository.all()
    }

    async indexWith(relationships: string[]): Promise<T[]> {
        return this.repository.allWith(relationships)
    }

    async show(id: number | string): Promise<T | null> {
        return this.repository.find(id)
    }

    async showWith(id: number | string, relationships: string[]): Promise<T | null> {
        return this.repository.findWith(id, relationships)
    }

    async store(payload: Partial<T>): Promise<T> {
        return this.repository.create(payload)
    }

    async update(id: number | string, payload: Partial<T>): Promise<T> {
        return this.repository.update(id, payload)
    }

    async delete(id: number | string): Promise<boolean> {
        return this.repository.delete(id)
    }
}