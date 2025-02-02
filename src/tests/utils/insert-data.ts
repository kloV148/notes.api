import type SequelizeOrm from '@repository/storage/postgres/orm/index.js';
import users from '../test-data/users.json';
import userSessions from '../test-data/user-sessions.json';
import notes from '../test-data/notes.json';
import noteSettings from '../test-data/notes-settings.json';

/**
 * Fills in the database with users data
 *
 * @param db - SequelizeOrm instance
 */
async function insertUsers(db: SequelizeOrm): Promise<void> {
  for (const user of users) {
    await db.connection.query(`INSERT INTO public.users (id, email, name, "created_at") VALUES (${user.id}, '${user.name}', '${user.email}', '${user.created_at}')`);
  }
}

/**
 * Fills in the database with user sessions
 *
 * @param db - SequelizeOrm instance
 */
async function insertUserSessions(db: SequelizeOrm): Promise<void> {
  for (const userSession of userSessions) {
    await db.connection.query(`INSERT INTO public.user_sessions (id, "user_id", "refresh_token", "refresh_token_expires_at") VALUES (${userSession.id}, ${userSession.user_id}, '${userSession.refresh_token}', '${userSession.refresh_token_expires_at}')`);
  }
}
/**
 * Fills in the database with notes datas
 *
 * @param db - SequelizeOrm instance
 */
async function insertNotes(db: SequelizeOrm): Promise<void> {
  for (const note of notes) {
    await db.connection.query(`INSERT INTO public.notes (id, "public_id", "creator_id", "created_at", "updated_at") VALUES (${note.id}, '${note.public_id}', '${note.creator_id}', '${note.created_at}', '${note.updated_at}')`);
  }
}

/**
 * Fills in the database with notes settings data
 *
 * @param db - SequelizeOrm instance
 */
async function insertNoteSettings(db: SequelizeOrm): Promise<void> {
  for (const noteSetting of noteSettings) {
    await db.connection.query(`INSERT INTO public.note_settings (id, "note_id", "custom_hostname", "is_public") VALUES (${noteSetting.id}, '${noteSetting.note_id}', '${noteSetting.custom_hostname}', ${noteSetting.is_public})`);
  }
}


/**
 * Fills in the database with test data
 *
 * @param db - SequelizeOrm instance
 */
export async function insertData(db: SequelizeOrm): Promise<void> {
  await insertUsers(db);
  await insertUserSessions(db);
  await insertNotes(db);
  await insertNoteSettings(db);
}

