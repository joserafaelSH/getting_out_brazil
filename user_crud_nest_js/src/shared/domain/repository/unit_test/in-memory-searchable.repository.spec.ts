import { Entity } from '../../entity/entity';
import { InMemorySearchableRepository } from '../in-memory-searchable.repository';
import { SearchParams, SearchResult } from '../searchable-repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository;

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository();
  });

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
        new StubEntity({ name: 'd', price: 50 }),
        new StubEntity({ name: 'e', price: 50 }),
      ];

      let itemsPaginated = await sut['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await sut['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await sut['applyPaginate'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await sut['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe('search method', () => {
    it('should apply only pagination when the other params are null', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 });
      const items = Array(16).fill(entity);
      sut.items = items;

      const params = await sut.search(new SearchParams());
      expect(params).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          currentPage: 1,
          perPage: 15,
        }),
      );
    });

    it('should apply paginate', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'TeSt', price: 50 }),
      ];
      sut.items = items;

      let params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
        }),
      );
      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[0], items[1]],
          total: 4,
          currentPage: 1,
          perPage: 2,
        }),
      );

      params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 3,
        }),
      );
      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 4,
          currentPage: 2,
          perPage: 3,
        }),
      );
    });
  });
});
