import dayjs from 'dayjs'
import * as task from 'fp-ts/lib/Task'
import * as taskEither from 'fp-ts/lib/TaskEither'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'
import fetch from 'isomorphic-fetch'
import { flatten, map } from 'ramda'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'
import { Period, Repo } from 'types'

import * as remoteData from '@devexperts/remote-data-ts'

import {
  GithubResponse,
  transformResponse
} from '../data/github'
import { Language } from '../data/languages'

const BASE_URL =
  "https://api.github.com/search/repositories?sort=stars&order=desc&q=";

interface FetchReposOptions {
  /** @default month */
  period?: Period;
  /** @default 0 */
  page?: number;
  language?: Language;
}

const transformDate = (period: Period) => (value: number) =>
  dayjs()
    .subtract(value, period)
    .format("YYYY-MM-DD");

const fetchGithubRepos = ({
  period = "month",
  page = 0,
  language = "All Languages"
}: FetchReposOptions = {}) =>
  pipe(
    [
      language === "All Languages" ? "" : `language:${language} `,
      pipe(
        [page + 1, page],
        map(transformDate(period)),
        ([from, to]) => `created:${from}..${to}`
      )
    ],
    ([lang, dateRange]) => `${BASE_URL}${lang}${dateRange}`,
    query => async () =>
      pipe(
        await fetch(query),
        response => response.json().then(GithubResponse.decode)
      )
  );

const fetchRepos = flow(
  fetchGithubRepos,
  taskEither.map(transformResponse)
);

type Repos = remoteData.RemoteData<t.Errors, Repo[]>;

type UseReposOptions = Omit<FetchReposOptions, "page">;
interface UseReposResult {
  repos: Repos;
  loading: boolean;
  fetchMore: () => Promise<void>;
}

type UseRepos = (options?: UseReposOptions) => UseReposResult;

export const useRepos: UseRepos = (options = {}) => {
  const page = useNumber(0);
  const loading = useBoolean(false);
  const [repos, setRepos] = useState<Repos>(remoteData.initial);

  const getRepos = pipe(
    fetchRepos({ ...options, page: page.value }),
    task.map(remoteData.fromEither)
  );

  const fetchMore = async () => {
    loading.setTrue();
    page.increase();
    pipe(
      remoteData.combine(repos, await getRepos()),
      remoteData.map(flatten),
      setRepos
    );
    loading.setFalse();
  };

  useEffect(() => {
    setRepos(remoteData.pending);
    (async () => {
      pipe(
        await getRepos(),
        setRepos
      );
    })();
  }, [options.language, options.period]);

  return {
    fetchMore,
    loading: loading.value,
    repos
  };
};
