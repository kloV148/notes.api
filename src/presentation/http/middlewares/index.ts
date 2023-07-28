import initAuth from '@presentation/http/middlewares/auth.js';
import { preHandlerHookHandler } from 'fastify';
import { DomainServices } from '@domain/index.js';

/**
 * Middlewares interface
 */
export interface Middlewares {
  /**
   * Auth middleware
   */
  auth: preHandlerHookHandler;
}

/**
 * Init middlewares
 *
 * @param services - domain services
 * @returns { Middlewares } - middlewares
 */
export default (services: DomainServices): Middlewares => {
  /**
   * Init middlewares
   */
  const auth = initAuth(services.authService);

  return {
    auth,
  };
};
