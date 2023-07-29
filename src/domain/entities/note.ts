/**
 * Note entity
 * TODO change to interface
 */
export default class Note {
  /**
   * Note id
   */
  public id: number;

  /**
   * Note title
   */
  public title: string;

  /**
   * Note content
   */
  public content: JSON;

  /**
   * Note entity constructor
   *
   * @param title - note title
   * @param content - note content
   * @param id - note id
   */
  constructor(title: string, content: JSON, id = 0) {
    this.title = title;
    this.content = content;
    this.id = id;
  }
}
