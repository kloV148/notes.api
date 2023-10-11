/**
 * Note internal id. Used to query Note by internal API
 */
export type NoteInternalId = number;

/**
 * Id visible for users. Used to query Note by public API
 */
export type NotePublicId = string;

/**
 * Id from DataBase. Used to query Note by User (creator) id
 */
export type NoteCreatorId = number;

/**
 * Note entity
 */
export interface Note {
  /**
   * Note id
   */
  id: NoteInternalId;

  /**
   * Note public id
   */
  publicId: NotePublicId;

  /**
   * Note content
   */
  content: JSON;

  /**
   * Note creator id
   */
  creatorId: NoteCreatorId;
}


/**
 * Notes creation attributes, omitting id, because it's generated by database
 */
export type NoteCreationAttributes = Omit<Note, 'id'>;
