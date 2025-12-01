import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { AbstractName } from "../../../src/adap-b04/names/AbstractName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { StringName } from "../../../src/adap-b04/names/StringName";


describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const m: string = "null or undefined";

    IllegalArgumentException.assert("hurray!" != null);
    expect(() => IllegalArgumentException.assert(false, m)).toThrow(new IllegalArgumentException(m));

    MethodFailedException.assert("hurray!" != null);
    expect(() => MethodFailedException.assert(false, m)).toThrow(new MethodFailedException(m));

    InvalidStateException.assert("hurray!" != null);
    expect(() => InvalidStateException.assert(false, m)).toThrow(new InvalidStateException(m));
  });

});

describe("StringArrayName Tests", () => {
  it("test if constructor is safe", () => {
    expect(() => new StringArrayName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName("not an array" as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName([1 as any])).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName(["Hallo", "Welt"], "abc")).toThrow(IllegalArgumentException);
  });
});

describe("StringName Tests", () => {
  it("test if constructor is safe", () => {
    expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("abc", "too long" as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("abc", "" as any)).toThrow(IllegalArgumentException);
  });
});

// -----------------------------------------------------------
//  setComponent
// -----------------------------------------------------------
describe("StringArrayName – setComponent", () => {
  it("properly sets component", () => {
    const n = new StringArrayName(["a", "b"], ".");
    n.setComponent(1, "x");
    expect(n.getComponent(1)).toBe("x");
  });

  it("fails on invalid index", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.setComponent(2, "x")).toThrow(IllegalArgumentException);
  });

  it("fails on non-string", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.setComponent(0, 123 as any)).toThrow(MethodFailedException);
  });
});






// -----------------------------------------------------------
//  StringArrayName ⋅ Valid Construction
// -----------------------------------------------------------
describe("StringArrayName – Constructor", () => {
  it("constructs correctly with valid input", () => {
    const n = new StringArrayName(["a", "b", "c"], ".");
    expect(n.getNoComponents()).toBe(3);
    expect(n.getComponent(0)).toBe("a");
    expect(n.getDelimiterCharacter()).toBe(".");
  });

  it("rejects empty array", () => {
    const n = new StringArrayName([], ".");
    expect(n.getNoComponents()).toBe(0);
  });
});

// -----------------------------------------------------------
//  getComponent
// -----------------------------------------------------------
describe("StringArrayName – getComponent", () => {
  it("fails on invalid index", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.getComponent(1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
  });
});

// -----------------------------------------------------------
//  setComponent
// -----------------------------------------------------------
describe("StringArrayName – setComponent", () => {
  it("properly sets component", () => {
    const n = new StringArrayName(["a", "b"], ".");
    n.setComponent(1, "x");
    expect(n.getComponent(1)).toBe("x");
  });

  it("fails on invalid index", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.setComponent(2, "x")).toThrow(IllegalArgumentException);
  });

  it("fails on non-string", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.setComponent(0, 123 as any)).toThrow(MethodFailedException);
  });
});


// -----------------------------------------------------------
//  append
// -----------------------------------------------------------
describe("StringArrayName – append", () => {
  it("appends correctly", () => {
    const n = new StringArrayName(["a"], ".");
    n.append("b");
    expect(n.getComponent(1)).toBe("b");
    expect(n.getNoComponents()).toBe(2);
  });

  it("fails on non-string", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.append(42 as any)).toThrow(MethodFailedException);
  });
});

// -----------------------------------------------------------
//  remove
// -----------------------------------------------------------
describe("StringArrayName – remove", () => {
  it("removes correctly", () => {
    const n = new StringArrayName(["a", "b", "c"], ".");
    n.remove(1);
    expect(n.asString()).toBe("a.c".replace(/\./g, n.getDelimiterCharacter()));
  });

  it("fails on invalid index", () => {
    const n = new StringArrayName(["a"], ".");
    expect(() => n.remove(1)).toThrow(IllegalArgumentException);
  });
});

// -----------------------------------------------------------
//  concat
// -----------------------------------------------------------
describe("StringArrayName – concat", () => {
  it("concatenates two names", () => {
    const a = new StringArrayName(["x", "y"], ".");
    const b = new StringArrayName(["1", "2"], ".");
    a.concat(b);
    expect(a.asString()).toBe("x.y.1.2".replace(/\./g, a.getDelimiterCharacter()));
  });

  it("fails when other is not a Name", () => {
    const a = new StringArrayName(["x"], ".");
    expect(() => a.concat(null as any)).toThrow();
  });
});






describe("StringName – constructor", () => {
  it("constructs valid names", () => {
    const n = new StringName("a.b.c", ".");
    expect(n.getNoComponents()).toBe(3);
    expect(n.getComponent(1)).toBe("b");
  });

  it("fails if delimiter is missing or invalid", () => {
    expect(() => new StringName("abc", "" as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("abc", "..")).toThrow(IllegalArgumentException);
  });
});

// -----------------------------------------------------------
// getComponent
// -----------------------------------------------------------
describe("StringName – getComponent", () => {
  it("gets components correctly", () => {
    const n = new StringName("x:y:z", ":");
    expect(n.getComponent(2)).toBe("z");
  });

  it("fails on invalid index", () => {
    const n = new StringName("x:y", ":");
    expect(() => n.getComponent(5)).toThrow();
  });
});

// -----------------------------------------------------------
// setComponent
// -----------------------------------------------------------
describe("StringName – setComponent", () => {
  it("sets a component", () => {
    const n = new StringName("a.b.c", ".");
    n.setComponent(1, "B");
    expect(n.getComponent(1)).toBe("B");
  });

  it("fails on invalid index", () => {
    const n = new StringName("a.b", ".");
    expect(() => n.setComponent(5, "x")).toThrow();
  });
});

// -----------------------------------------------------------
// insert
// -----------------------------------------------------------
describe("StringName – insert", () => {
  it("inserts new components", () => {
    const n = new StringName("a.b", ".");
    n.insert(1, "X");
    expect(n.asString()).toBe("a.X.b");
  });

  it("fails on invalid index", () => {
    const n = new StringName("a.b", ".");
    expect(() => n.insert(99, "x")).toThrow();
  });
});

// -----------------------------------------------------------
// append
// -----------------------------------------------------------
describe("StringName – append", () => {
  it("appends correctly", () => {
    const n = new StringName("a", ".");
    n.append("b");
    expect(n.asString()).toBe("a.b");
  });

  it("fails on invalid input", () => {
    const n = new StringName("a", ".");
    expect(() => n.append(123 as any)).toThrow(MethodFailedException);
  });
});

// -----------------------------------------------------------
// remove
// -----------------------------------------------------------
describe("StringName – remove", () => {
  it("removes element", () => {
    const n = new StringName("a.b.c", ".");
    n.remove(1);
    expect(n.getNoComponents()).toBe(2);
    expect(n.asString()).toBe("a.c");
  });

  it("fails on invalid index", () => {
    const n = new StringName("a.b", ".");
    expect(() => n.remove(99)).toThrow();
  });
});