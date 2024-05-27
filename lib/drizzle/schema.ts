import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  pgEnum,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// export const userRole = pgEnum("user_role", ["admin", "basic"]);
// export const userTable = pgTable("users", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: varchar("name"),
//   email: varchar("email").notNull().unique(),
//   password: varchar("password", { length: 128 }).notNull(),
//   createdAt: timestamp("created_at", {
//     mode: "date",
//     withTimezone: true,
//   }).defaultNow(),
//   updatedAt: timestamp("updated_at", {
//     mode: "date",
//     withTimezone: true,
//   }).defaultNow(),
//   verifiedAt: timestamp("verified_at", { mode: "date", withTimezone: true }),
// });

// export const sessionTable = pgTable("session", {
//   id: text("id").primaryKey(),
//   userId: varchar("user_id", { length: 36 })
//     .notNull()
//     .references(() => userTable.id),
//   expiresAt: timestamp("expires_at", {
//     withTimezone: true,
//     mode: "date",
//   }).notNull(),
//   ip: varchar("ip", { length: 15 }),
//   userAgent: varchar("user_agent"),
// });
//

export const trackTable = pgTable("tracks", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  body: text("body"),
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
}));
// export const artistTracks =
export const artistRelations = relations(artistTable, ({ one, many }) => ({
  backgroundImage: one(mediaTable, {
    references: [mediaTable.id],
    fields: [artistTable.backgroundId],
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
