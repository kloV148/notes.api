import type { DatabaseConfig } from '@infrastructure/config/index.js';
import NoteStorage from './storage/note.storage.js';
import NoteSettingsStorage from './storage/noteSettings.storage.js';
import NoteRepository from './note.repository.js';
import NoteSettingsRepository from './noteSettings.repository.js';
import Orm from './storage/postgres/orm/index.js';
import UserSessionRepository from '@repository/userSession.repository.js';
import UserSessionStorage from '@repository/storage/userSession.storage.js';
import EditorToolsStorage from '@repository/storage/editorTools.storage.js';
import UserStorage from '@repository/storage/user.storage.js';
import GoogleApiTransport from '@repository/transport/google-api/index.js';
import UserRepository from '@repository/user.repository.js';
import AIRepository from './ai.repository.js';
import OpenAIApi from './transport/openai-api/index.js';
import EditorToolsRepository from '@repository/editorTools.repository.js';

/**
 * Interface for initiated repositories
 */
export interface Repositories {
  /**
   * Note repository instance
   */
  noteRepository: NoteRepository,

  /**
   * Note settings repository instance
   */
  noteSettingsRepository: NoteSettingsRepository,

  /**
   * User session repository instance
   */
  userSessionRepository: UserSessionRepository,

  /**
   * User repository instance
   */
  userRepository: UserRepository,

  /**
   * AI repository instance
   */
  aiRepository: AIRepository
  editorToolsRepository: EditorToolsRepository,
}

/**
 * Initiate repositories
 *
 * @param databaseConfig - database config
 */
export async function init(databaseConfig: DatabaseConfig): Promise<Repositories> {
  const orm = new Orm(databaseConfig);

  /**
   * Test the connection by trying to authenticate
   */
  await orm.authenticate();

  /**
   * Create storage instances
   */
  const userStorage = new UserStorage(orm);
  const noteSettingsStorage = new NoteSettingsStorage(orm);
  const noteStorage = new NoteStorage(orm, noteSettingsStorage.model);
  const userSessionStorage = new UserSessionStorage(orm);
  const editorToolsStorage = new EditorToolsStorage(orm);

  /**
   * Prepare db structure
   */
  await userStorage.model.sync();
  await noteStorage.model.sync();
  await noteSettingsStorage.model.sync();
  await userSessionStorage.model.sync();
  await editorToolsStorage.model.sync();

  /**
   * Create transport instances
   */
  const googleApiTransport = new GoogleApiTransport();
  const openaiApiTransport = new OpenAIApi();

  /**
   * Create repositories
   */
  const noteRepository = new NoteRepository(noteStorage);
  const noteSettingsRepository = new NoteSettingsRepository(noteSettingsStorage);
  const userSessionRepository = new UserSessionRepository(userSessionStorage);
  const userRepository = new UserRepository(userStorage, googleApiTransport);
  const aiRepository = new AIRepository(openaiApiTransport);
  const editorToolsRepository = new EditorToolsRepository(editorToolsStorage);

  return {
    noteRepository,
    noteSettingsRepository,
    userSessionRepository,
    userRepository,
    aiRepository,
    editorToolsRepository,
  };
}
