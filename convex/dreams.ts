import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDreams = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dreams").collect();
  },
});

export const addDream = mutation({
  args: {},
  handler: async (ctx) => {
    await ctx.db.insert("dreams", {
      title: "",
      editing: true,
      showEvents: false,
      events: [],
    });
  },
});

export const deleteDream = mutation({
  args: { id: v.id("dreams") },
  handler: async (ctx, args) => {
    await ctx.db.delete("dreams", args.id);
  },
});

export const changeDreamTitle = mutation({
  args: { id: v.id("dreams"), newTitle: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch("dreams", args.id, {
      title: args.newTitle,
      editing: false,
    });
  },
});

export const toggleEditing = mutation({
  args: { id: v.id("dreams") },
  handler: async (ctx, args) => {
    await ctx.db.patch("dreams", args.id, {
      editing: true,
    });
  },
});

export const toggleEvents = mutation({
  args: { id: v.id("dreams"), mode: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch("dreams", args.id, { showEvents: args.mode });
  },
});

export const reorderEvents = mutation({
  args: {
    id: v.id("dreams"),
    newEvents: v.array(v.object({ text: v.string(), id: v.number() })),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("dreams", args.id, { events: args.newEvents });
  },
});

export const addEvent = mutation({
  args: { id: v.id("dreams"), title: v.string() },
  handler: async (ctx, args) => {
    const dream = await ctx.db.get(args.id);
    if (dream) {
      const newEvent = { text: args.title, id: Date.now() };
      await ctx.db.patch("dreams", args.id, {
        events: [...(dream.events ?? []), newEvent],
      });
    } else return;
  },
});

export const deleteEvent = mutation({
  args: {
    dreamId: v.id("dreams"),
    eventId: v.number(),
  },
  handler: async (ctx, args) => {
    const dream = await ctx.db.get(args.dreamId);
    if (dream) {
      await ctx.db.patch("dreams", args.dreamId, {
        events: dream.events.filter((event) => event.id !== args.eventId),
      });
    }
  },
});
