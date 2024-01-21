import { PER_PAGE } from '@/constants';
import { Entity } from '@/shared/domain/entity/entity';
import { RepositoryI } from './repository';

export type SearchProps = {
  page?: number;
  perPage?: number;
};

export type SearchResultProps<E extends Entity> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
};

export class SearchParams {
  protected _page: number;
  protected _perPage = PER_PAGE;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }
    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _perPage = value === (true as any) ? this._perPage : +value;
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage;
    }
    this._perPage = _perPage;
  }
}

export class SearchResult<E extends Entity> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;

  constructor(props: SearchResultProps<E>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E>,
> extends RepositoryI<E> {
  sortableFields: string[];

  search(props: SearchInput): Promise<SearchOutput>;
}
