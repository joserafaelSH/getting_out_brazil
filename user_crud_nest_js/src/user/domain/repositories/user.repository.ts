import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repository/searchable-repository';
import { UserEntity } from '../user_entity/user.entity';

export namespace UserRepository {
  export class SearchParams extends DefaultSearchParams {}

  export class SearchResult extends DefaultSearchResult<UserEntity> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      UserEntity,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}
