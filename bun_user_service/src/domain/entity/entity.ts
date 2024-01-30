import { createId } from "@paralleldrive/cuid2";

export abstract class Entity<Props> {
  public readonly id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this.id = id ?? createId();
  }

  toJSON(): Required<{ id: string } & Props> {
    const ret = {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;

    return ret;
  }
}
