/**
 * Notes settings entity
 */
export default interface NotesSettings {
  /**
   * Just unique property identifier
   */
  id: number;

  /**
   * Related note id
   */
  noteId: number;

  /**
   * Custom hostname
   */
  customHostname: string;

  /**
   * Public id
   */
  publicId: string;

  /**
   * Is note public
   */
  enabled: boolean;
}
