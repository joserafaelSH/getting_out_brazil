import * as t from "bun:test";
import { Entity } from "../entity";

t.describe("Entity class unit tests", () => {
  type Props = {
    name: string;
  };

  class Test extends Entity<Props> {
    constructor(props: Props) {
      super(props);
    }
  }

  let sut: Test;

  t.beforeAll(() => {
    sut = new Test({ name: "test" });
  });

  t.it("should create a new Entity instance", () => {
    t.expect(sut).toBeInstanceOf(Entity);
  });

  t.it("should return the id", () => {
    t.expect(sut.id).toBeDefined();
  });

  t.it("should return the props", () => {
    t.expect(sut.props).toBeDefined();
  });

  t.it("should return the props name", () => {
    t.expect(sut.props.name).toBe("test");
  });

  t.it("should return the props name using toJson function", () => {
    t.expect(sut.toJSON()).toEqual({ id: sut.id, name: "test" });
  });
});
