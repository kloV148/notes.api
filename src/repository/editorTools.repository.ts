import type EditorToolsStorage from '@repository/storage/editorTools.storage.js';
import type EditorTool from '@domain/entities/editorTools.js';

/**
 * Repository allows accessing data from business-logic (domain) level
 */
export default class EditorToolsRepository {
  public storage: EditorToolsStorage;

  /**
   * @param storage - repository storage
   */
  constructor(storage: EditorToolsStorage) {
    this.storage = storage;
  }

  /**
   * @param editorTool - all editor tool data
   */
  public async addTools(editorTool: EditorTool): Promise<EditorTool> {
    const createdEditorTool = await this.storage.addTool(editorTool);

    return createdEditorTool;
  }

  /**
   * Get all editor tools
   */
  public async getTools(): Promise<EditorTool[]> {
    const editorTools = await this.storage.getTools();

    return editorTools;
  }
}