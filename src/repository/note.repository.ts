import type { Note, NoteCreationAttributes, NotePublicId } from '@domain/entities/note.js';
import type NoteStorage from '@repository/storage/note.storage.js';
import type { NoteCreatorId } from '@domain/entities/note.js';
import type { NoteList } from '@domain/entities/noteList.js';

/**
 * Repository allows accessing data from business-logic (domain) level
 */
export default class NoteRepository {
  /**
   * Note storage instance
   */
  public storage: NoteStorage;

  /**
   * Note repository constructor
   *
   * @param storage - storage for note
   */
  constructor(storage: NoteStorage) {
    this.storage = storage;
  }

  /**
   * Add note
   *
   * @param options - note adding options
   * @returns { Promise<Note> } added note
   */
  public async addNote(options: NoteCreationAttributes): Promise<Note> {
    return await this.storage.createNote(options);
  }

  /**
   * Update note content in a store using note public id
   *
   * @param publicId - note public id
   * @param content - new content
   * @returns Note on success, null on failure
   */
  public async updateNoteContentByPublicId(publicId: NotePublicId, content: Note['content']): Promise<Note | null> {
    return await this.storage.updateNoteContentByPublicId(publicId, content);
  }

  /**
   * Gets note by id
   *
   * @param id - note id
   * @returns { Promise<Note | null> } found note
   */
  public async getNoteById(id: Note['id']): Promise<Note | null> {
    return await this.storage.getNoteById(id);
  }

  /**
   * Gets note by hostname
   *
   * @param hostname - custom hostname
   * @returns { Promise<Note | null> } found note
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    return await this.storage.getNoteByHostname(hostname);
  }

  /**
   * Get note by public id
   *
   * @param publicId - public id
   * @returns { Promise<Note | null> } found note
   */
  public async getNoteByPublicId(publicId: NotePublicId): Promise<Note | null> {
    return await this.storage.getNoteByPublicId(publicId);
  }

  /**
   * Gets note list by creator id
   *
   * @param id - note creator id
   * @returns { Promise<NoteList | null> } note
   */
  public async getNoteListByCreatorId(id: NoteCreatorId): Promise<NoteList | null> {
    return await this.storage.getNoteListByCreatorId(id);
  }
}
