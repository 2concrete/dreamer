import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDreams = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dreams").collect();
  },
});

export const saveDreams = mutation({
  args: {
    dreams: v.array(
      v.object({
        title: v.string(),
        editing: v.boolean(),
        showEvents: v.boolean(),
        events: v.array(v.object({ text: v.string(), id: v.number() })),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existingDreams = await ctx.db.query("dreams").collect();

    for (const dream of existingDreams) {
      await ctx.db.delete(dream._id);
    }

    for (const dream of args.dreams) {
      await ctx.db.insert("dreams", dream);
    }
  },
});
