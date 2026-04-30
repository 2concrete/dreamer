import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  dreams: defineTable({
    title: v.string(),
    editing: v.boolean(),
    showEvents: v.boolean(),
    events: v.array(v.object({ text: v.string(), id: v.number() })),
  }),
});
