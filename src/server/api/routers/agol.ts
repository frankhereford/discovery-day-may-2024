import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let data = {
  id: 1,
  name: "Hello World",
};

export const agolRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ bbox: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Extent: ${input.bbox}`,
      };
    }),
});
