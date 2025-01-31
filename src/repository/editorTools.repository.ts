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
  public async addTool(editorTool: EditorTool): Promise<EditorTool> {
    const createdEditorTool = await this.storage.addTool(editorTool);

    return createdEditorTool;
  }

  /**
   * Get bunch of tools by their ids
   *
   * @param editorToolIds - unique tool ids
   */
  public async getToolsByIds(editorToolIds: EditorTool['id'][]): Promise<EditorTool[]> {
    const tools = await this.storage.getToolsByIds(editorToolIds);

    return tools;
  }

  /**
   * Get all default tools
   */
  public async getDefaultTools(): Promise<EditorTool[]> {
    return await this.storage.getDefaultTools();
  }

  /**
   * Get all editor tools
   */
  public async getTools(): Promise<EditorTool[]> {
    const editorTools = await this.storage.getTools();

    return editorTools;
  }
}
