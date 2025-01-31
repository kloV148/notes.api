import type { FastifyReply, FastifyRequest } from 'fastify';
import { isEmpty } from '@infrastructure/utils/empty.js';

/**
 * Policy to check does user have permission to access note
 *
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 */
export default async function notePublicOrUserInTeam(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { userId } = request;

  /**
   * If note or noteSettings not resolved, we can't check permissions
   */
  if (isEmpty(request.note) || isEmpty(request.noteSettings)) {
    return await reply.notAcceptable('Note not found');
  };

  const { creatorId } = request.note;
  const { isPublic } = request.noteSettings;

  /**
   * If note is public, everyone can access it
   * If note is private, only creator can access it
   */
  if (isPublic === false && creatorId !== userId) {
    return await reply.forbidden();
  }
}
