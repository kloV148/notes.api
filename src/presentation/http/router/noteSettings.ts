import type { FastifyPluginCallback } from 'fastify';
import type NoteService from '@domain/service/note.js';
import type { NotePublicId } from '@domain/entities/note.js';
import type NotesSettings from '@domain/entities/notesSettings.js';
import type { Middlewares } from '@presentation/http/middlewares/index.js';
import notEmpty from '@infrastructure/utils/notEmpty.js';

/**
 * Get note by id options
 */
interface GetNoteByIdOptions {
  /**
   * Note id
   */
  id: NotePublicId;
}

/**
 * Interface for the note router.
 */
interface NoteRouterOptions {
  /**
   * Note service instance
   */
  noteService: NoteService,

  /**
   * Middlewares
   */
  middlewares: Middlewares,
}

/**
 * Note router plugin
 *
 * @param fastify - fastify instance
 * @param opts - empty options
 * @param done - callback
 */
const NoteRouter: FastifyPluginCallback<NoteRouterOptions> = (fastify, opts, done) => {
  /**
   * Get note service from options
   */
  const noteService = opts.noteService;

  /**
   * Get noteSettings by id
   *
   * @todo move to the NoteSettings Router
   */
  fastify.get<{
    Params: GetNoteByIdOptions,
    Reply: NotesSettings
  }>('/:id/settings', async (request, reply) => {
    const params = request.params;
    /**
     * TODO: Validate request params
     */
    const { id } = params;

    const noteSettings = await noteService.getNoteSettingsByPublicId(id);

    /**
     * Check if note does not exist
     */
    if (!notEmpty(noteSettings)) {
      return fastify.notFound(reply, 'Note settings not found');
    }

    return reply.send(noteSettings);
  });

  /**
   * Patch noteSettings by note public id
   */
  fastify.patch<{
    Body: Partial<NotesSettings>,
    Params: GetNoteByIdOptions,
    Reply: NotesSettings,
  }>('/:id/settings', { preHandler: [opts.middlewares.authRequired, opts.middlewares.withUser] }, async (request, reply) => {
    const noteId = request.params.id;

    /**
     * TODO: check is user collaborator
     */

    const updatedNoteSettings = await noteService.patchNoteSettings(request.body, noteId);

    if (updatedNoteSettings === null) {
      return fastify.notFound(reply, 'Note settings not found');
    }

    return reply.send(updatedNoteSettings);
  });

  done();
};

export default NoteRouter;