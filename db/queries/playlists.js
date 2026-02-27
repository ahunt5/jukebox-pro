import db from "#db/client";

export async function createPlaylist(userid, name, description) {
  const sql = `
  INSERT INTO playlists
    (user_id, name, description)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [userid, name, description]);
  return playlist;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistsByUserId(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE user_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}

export async function getPlaylistsByTrackId(id) {
  const sql = `
  SELECT playlists.*
  FROM playlists
    JOIN playlists_tracks ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists_tracks.track_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}
