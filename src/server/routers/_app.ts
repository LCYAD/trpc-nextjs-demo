import { router } from '../trpc';
import { personRouter } from './person';

export const appRouter = router({
  person: personRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
