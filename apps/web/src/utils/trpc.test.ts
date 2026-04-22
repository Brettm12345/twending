import { describe, expect, it } from "vitest";

import { TRPCProvider, useTRPC, useTRPCClient } from "./trpc";

describe("trpc context", () => {
  it("exposes the TRPCProvider, useTRPC and useTRPCClient bindings", () => {
    expect(TRPCProvider).toBeTypeOf("function");
    expect(useTRPC).toBeTypeOf("function");
    expect(useTRPCClient).toBeTypeOf("function");
  });
});
