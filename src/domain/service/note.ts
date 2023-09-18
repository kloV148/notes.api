import type { Note, NotePublicId } from '@domain/entities/note.js';
import type NoteRepository from '@repository/note.repository.js';
import { createPublicId } from '@infrastructure/utils/id.js';

/**
 * Note service
 */
export default class NoteService {
  /**
   * Note repository
   */
  public repository: NoteRepository;

  /**
   * Note service constructor
   *
   * @param repository - note repository
   */
  constructor(repository: NoteRepository) {
    this.repository = repository;
  }

  /**
   * Adds note
   *
   * @param content - note content
   * @param creatorId - note creator
   * @returns { Note } added note object
   */
  public async addNote(content: JSON, creatorId: Note['creatorId']): Promise<Note> {
    return await this.repository.addNote({
      publicId: createPublicId(),
      content,
      creatorId,
    });
  }

  /**
   * Gets note by id
   *
   * @param id - note id
   * @returns { Promise<Note | null> } note
   */
  public async getNoteById(id: NotePublicId): Promise<Note | null> {
    return await this.repository.getNoteByPublicId(id);
  }

  /**
   * Gets note by custom hostname
   *
   * @param hostname - hostname
   * @returns { Promise<Note | null> } note
   */
  public async getNoteByHostname(hostname: string): Promise<Note | null> {
    return await this.repository.getNoteByHostname(hostname);
  }
}
