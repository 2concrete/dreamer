import { query } from "./_generated/server";

export const getDreams = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dreams").collect();
  },
});

export const addDream = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dreams").collect();
  },
});

export const deleteDream = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dreams").collect();
  },
});
