import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<Props = any> {
  public readonly id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this.id = id ?? uuidv4();
  }

  toJSON(): Required<{ id: string } & Props> {
    const ret = {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;

    return ret;
  }
}
