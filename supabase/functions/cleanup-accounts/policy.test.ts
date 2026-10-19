import { test, expect } from "bun:test";
import { retainedUserId, shouldRemoveAccount } from "./policy";

test("preserves victor.alves@caseej.com even when an ID is in the removal set", () => {
  expect(shouldRemoveAccount({ id: "d3fe3398-ce5b-4ee0-b07b-00916b9a65f9", email: "victor.alves@caseej.com" })).toBe(false);
  expect(shouldRemoveAccount({ id: retainedUserId })).toBe(false);
});
test("removes the other accounts identified for the requested cleanup only", () => {
  expect(shouldRemoveAccount({ id: "d3fe3398-ce5b-4ee0-b07b-00916b9a65f9", email: "lucas.mancebo@caseej.com" })).toBe(true);
  expect(shouldRemoveAccount({ id: "new-unrelated-account", email: "new@caseej.com" })).toBe(false);
});