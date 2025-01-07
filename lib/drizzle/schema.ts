import {
 integer,
 pgTable,
 text,
 timestamp,
 varchar,
 serial,
 primaryKey,
 boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { randomBytes } from "crypto";

export const trackTable = pgTable("tracks", {
 id: serial("id").primaryKey(),
 title: varchar("title"),
 name: varchar("name").notNull(),
 slug: varchar("slug").notNull().unique(),
 body: text("body"),
 duration: integer("duration"),
 coverId: integer("cover_id")
  .notNull()
  .references(() => mediaTable.id),
 playableId: integer("playable_id").references(() => mediaTable.id),
 artistId: integer("artist_id")
  .notNull()
  .references(() => artistTable.id),
 albumId: integer("album_id").references(() => albumTable.id),
 createdAt: timestamp("created_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
 updatedAt: timestamp("updated_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
});

export const artistTable = pgTable("artists", {
 id: serial("id").primaryKey(),
 name: varchar("name").notNull(),
 fullName: varchar("full_name"),
 slug: varchar("slug").notNull().unique(),
 backgroundId: integer("background_id").references(() => mediaTable.id, {
  onDelete: "set null",
  onUpdate: "cascade",
 }),
 profileId: integer("profile_id").references(() => mediaTable.id),
 createdAt: timestamp("created_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
 updatedAt: timestamp("updated_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
});

export const albumTable = pgTable("albums", {
 id: serial("id").primaryKey(),
 name: varchar("name").notNull(),
 slug: varchar("slug").notNull().unique(),
 artistId: integer("artist_id")
  .notNull()
  .references(() => artistTable.id),
 coverId: integer("cover_id")
  .notNull()
  .references(() => mediaTable.id),

 createdAt: timestamp("created_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
 updatedAt: timestamp("updated_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
});

export const mediaTable = pgTable("medias", {
 id: serial("id").primaryKey(),
 storeKey: varchar("storeKey").notNull(),
 name: varchar("name"),
 mime: varchar("mime", { length: 16 }),
 placeholder: varchar("placeholder"),
 createdAt: timestamp("created_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
 updatedAt: timestamp("updated_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
});

export const playlistTable = pgTable("playlists", {
 id: serial("id").primaryKey(),
 ownerId: integer("owner_id") /*.references(()=> Todo add users)*/,
 publicKey: varchar("public_key")
  .unique()
  .notNull()
  .$default(() => randomBytes(16).toString("base64url")),
 name: varchar("name").notNull(),
 backgroundId: integer("background_id").references(() => mediaTable.id),
 isPublic: boolean("is_public").notNull().default(false),
 createdAt: timestamp("created_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
 updatedAt: timestamp("updated_at", {
  mode: "date",
  withTimezone: true,
 }).defaultNow(),
});

export const playlistToTrackTable = pgTable(
 "playlist_track",
 {
  trackId: integer("track_id")
   .notNull()
   .references(() => trackTable.id, { onDelete: "cascade" }),
  playlistId: integer("playlist_id")
   .notNull()
   .references(() => playlistTable.id, { onDelete: "cascade" }),
 },
 (t) => ({ pk: primaryKey({ columns: [t.trackId, t.playlistId] }) }),
);

export const artistToTrackTable = pgTable(
 "artist_track",
 {
  trackId: integer("track_id")
   .notNull()
   .references(() => trackTable.id),
  artistId: integer("artist_id")
   .notNull()
   .references(() => artistTable.id),
 },
 (t) => ({
  pk: primaryKey({ columns: [t.trackId, t.artistId] }),
 }),
);

export const trackRelations = relations(trackTable, ({ one, many }) => ({
 artist: one(artistTable, {
  references: [artistTable.id],
  fields: [trackTable.artistId],
 }),
 cover: one(mediaTable, {
  references: [mediaTable.id],
  fields: [trackTable.coverId],
 }),
 playable: one(mediaTable, {
  references: [mediaTable.id],
  fields: [trackTable.playableId],
 }),
 album: one(albumTable, {
  references: [albumTable.id],
  fields: [trackTable.albumId],
 }),
 artists: many(artistToTrackTable),
 playlists: many(playlistToTrackTable),
}));
export const playlistRelations = relations(playlistTable, ({ many }) => ({
 tracks: many(playlistToTrackTable),
}));

export const playlistToTrackRelations = relations(
 playlistToTrackTable,
 ({ one }) => ({
  track: one(trackTable, {
   fields: [playlistToTrackTable.trackId],
   references: [trackTable.id],
  }),
  playlist: one(playlistTable, {
   fields: [playlistToTrackTable.playlistId],
   references: [playlistTable.id],
  }),
 }),
);

export const artistRelations = relations(artistTable, ({ one, many }) => ({
 backgroundImage: one(mediaTable, {
  references: [mediaTable.id],
  fields: [artistTable.backgroundId],
 }),
 profileImage: one(mediaTable, {
  references: [mediaTable.id],
  fields: [artistTable.profileId],
 }),
 tracks: many(trackTable),
}));

export const artistToTrackRelations = relations(
 artistToTrackTable,
 ({ one }) => ({
  track: one(trackTable, {
   fields: [artistToTrackTable.trackId],
   references: [trackTable.id],
  }),
  artist: one(artistTable, {
   fields: [artistToTrackTable.artistId],
   references: [artistTable.id],
  }),
 }),
);
