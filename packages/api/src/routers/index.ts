import { subDays, subMonths, subWeeks, subYears } from "date-fns";
import { Octokit } from "octokit";
import { z } from "zod";
import { publicProcedure, router } from "../index";

const periodSchema = z.enum(["daily", "weekly", "monthly", "yearly"]);

function getPeriodFn(period: z.infer<typeof periodSchema>) {
  switch (period) {
    case "daily":
      return subDays;
    case "monthly":
      return subMonths;
    case "weekly":
      return subWeeks;
    case "yearly":
      return subYears;
  }
}

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  listRepositories: publicProcedure
    .input(
      z.object({
        language: z.string(),
        period: periodSchema,
        cursor: z.number().optional(),
        publicAccessToken: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { language, period, cursor } = input;
      const octokit = new Octokit({
        auth: input.publicAccessToken,
      });
      const periodFn = getPeriodFn(period) ?? subDays;
      const startDate = periodFn(new Date(), cursor ? cursor + 1 : 1);
      const endDate = periodFn(new Date(), cursor ?? 0);

      const repositories = await octokit.rest.search.repos({
        q: `language:${language}+created:${startDate.toISOString()}..${endDate.toISOString()}`,
        sort: "stars",
        order: "desc",
      });
      return {
        repositories: repositories.data.items,
        nextCursor: (cursor ?? 0) + 1,
      };
    }),
});
export type AppRouter = typeof appRouter;
