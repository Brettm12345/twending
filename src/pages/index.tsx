import 'style.css'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import AppBar from 'components/appBar'
import Head from 'components/head'
import Loading from 'components/loading'
import Root, { RepoListProps } from 'components/repoList'
import { makeOption } from 'components/select'
import SelectLanguage from 'components/selectLanguage'
import SelectPeriod from 'components/selectPeriod'
import * as task from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'
import { fetchRepos, useRepos } from 'hooks/useRepos'
import { NextPage } from 'next'
import React from 'react'
import { cn } from 'ts-classnames'
import { LanguageOption, PeriodOption } from 'types'
import createPersistedState from 'use-persisted-state'

const usePeriod = createPersistedState("period");
const useLanguage = createPersistedState("language");

const Home: NextPage<RepoListProps> = () => {
  const [period, setPeriod] = usePeriod<PeriodOption>({
    label: "Monthly",
    value: "month"
  });

  const [language, setLanguage] = useLanguage<LanguageOption>(
    makeOption("All Languages")
  );

  const { repos, fetchMore, loading } = useRepos({
    period: period.value,
    language: language.value
  });

  return (
    <>
      <Head />
      <main
        className={cn(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "pt-24",
          "mb-10"
        )}
      >
        <AppBar>
          <SelectLanguage
            isLoading={loading}
            onChange={setLanguage as any}
            value={language}
          />
          <SelectPeriod
            isLoading={loading}
            onChange={setPeriod as any}
            value={period}
          />
        </AppBar>
        <h1 className={cn("mt-6", "text-2xl", "text-center")}>
          Trending Repositories
        </h1>
        <Root repos={repos} />
        <div className={cn("mt-6")}>
          {loading ? (
            <Loading />
          ) : (
            <button className={cn("btn", "btn-blue")} onClick={fetchMore}>
              Load next {period.value}
            </button>
          )}
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = pipe(
  fetchRepos(),
  task.map(repos => ({ repos }))
);

export default Home;
