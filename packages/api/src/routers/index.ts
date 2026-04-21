import { z } from "zod";
import { publicProcedure, router } from "../index";
import type { RepositoryResponse } from "../types";

const periodSchema = z.enum(["daily", "weekly", "monthly", "yearly"]);

function buildQueryString(params: Record<string, string>) {
  return Object.entries(params)
    .map(([key, value]) => `${key}:${value}`)
    .join("+");
}
// We cannot use a URLSearchParams object here because it will encode the values
function buildSearchParamsString(params: Record<string, string>) {
  return `${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
}

function buildUrl({
  queryString,
  searchParams,
}: {
  queryString: Record<string, string>;
  searchParams: Record<string, string>;
}) {
  return `https://api.github.com/search/repositories?${buildSearchParamsString({
    q: buildQueryString(queryString),
    ...searchParams,
  })}`;
}

function subDays(date: Date, days: number) {
  const milliseconds = days * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() - milliseconds);
}
function subWeeks(date: Date, weeks: number) {
  return subDays(date, weeks * 7);
}
function subMonths(date: Date, months: number) {
  return subDays(date, months * 30);
}
function subYears(date: Date, years: number) {
  return subDays(date, years * 365);
}

function subtractPeriod(
  period: z.infer<typeof periodSchema>,
  date: Date,
  amount: number = 1,
) {
  switch (period) {
    case "daily":
      return subDays(date, amount);
    case "monthly":
      return subMonths(date, amount);
    case "weekly":
      return subWeeks(date, amount);
    case "yearly":
      return subYears(date, amount);
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
      const startDate = subtractPeriod(
        period,
        new Date(),
        cursor ? cursor + 1 : 1,
      );
      const endDate = subtractPeriod(period, new Date(), cursor ?? 0);

      const url = buildUrl({
        queryString: {
          language,
          created: [startDate, endDate]
            .map((date) => date.toISOString())
            .join(".."),
        },
        searchParams: {
          sort: "stars",
          order: "desc",
          per_page: "30",
        },
      });

      const response = await fetch(url, {
        headers: input.publicAccessToken
          ? {
              Authorization: `Bearer ${input.publicAccessToken}`,
            }
          : undefined,
      });
      const data = (await response.json()) as RepositoryResponse;
      return {
        repositories: data.items,
        nextCursor: (cursor ?? 0) + 1,
      };
    }),
});
export type AppRouter = typeof appRouter;
