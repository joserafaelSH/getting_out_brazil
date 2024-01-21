import { validate as uuidValidate } from 'uuid';
import { Entity } from '../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  it('should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = 'e9153fdb-ece9-4b9f-add2-1694ed48391e';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toStrictEqual('e9153fdb-ece9-4b9f-add2-1694ed48391e');
  });

  it('should convert a entity to js object', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = 'e9153fdb-ece9-4b9f-add2-1694ed48391e';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
