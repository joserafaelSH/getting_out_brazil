import { Entity } from '../entity/entity';
import { InMemoryRepository } from './in-memory.repository';
import {
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from './searchable-repository';

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsPaginated = await this.applyPaginate(
      this.items,
      props.page,
      props.perPage,
    );
    return new SearchResult({
      items: itemsPaginated,
      total: this.items.length,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return items.slice(start, limit);
  }
}
