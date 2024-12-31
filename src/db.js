import { Database } from "bun:sqlite";
import { DATABASE_PATH } from "./config";

const db = new Database(DATABASE_PATH);

// Initialize database
db.run(`
  CREATE TABLE IF NOT EXISTS tracks (
    id TEXT,
    played_at TEXT,
    name TEXT,
    artist TEXT,
    all_artists TEXT,
    album_name TEXT,
    album_type TEXT,
    release_date TEXT,
    duration_ms INTEGER,
    explicit BOOLEAN,
    popularity INTEGER,
    context_type TEXT,
    context_uri TEXT,
    PRIMARY KEY (id, played_at)
  )
`);

export function saveTracks(tracks) {
    const stmt = db.prepare(`
        INSERT OR IGNORE INTO tracks (
            id, played_at, name, artist, all_artists, album_name,
            album_type, release_date, duration_ms, explicit, 
            popularity, context_type, context_uri
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    db.transaction(() => {
        tracks.forEach((item) => {
            stmt.run(
                item.track.id,
                item.played_at,
                item.track.name,
                item.track.artists[0].name,
                item.track.artists.map((artist) => artist.name).join(", "),
                item.track.album.name,
                item.track.album.album_type,
                item.track.album.release_date,
                item.track.duration_ms,
                item.track.explicit,
                item.track.popularity,
                item.context?.type || null,
                item.context?.uri || null
            );
        });
    })();
}

export function getLastTimestamp() {
    const row = db
        .query("SELECT MAX(played_at) AS last_played FROM tracks")
        .get();
    return row?.last_played ? new Date(row.last_played).getTime() : 0;
}
