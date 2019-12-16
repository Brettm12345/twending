import 'style.css'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import AppBar from 'components/appBar'
import Head from 'components/head'
import Loading from 'components/loading'
import RepoList, { RepoListProps } from 'components/repoList'
import { makeOption } from 'components/select'
import SelectLanguage from 'components/selectLanguage'
import SelectPeriod from 'components/selectPeriod'
import { useRepos } from 'hooks/useRepos'
import { NextPage } from 'next'
import React, { memo } from 'react'
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
      <main className="flex flex-col items-center justify-center pt-24 mb-10">
        <AppBar>
          <SelectPeriod onChange={setPeriod} value={period} />
          <SelectLanguage onChange={setLanguage} value={language} />
        </AppBar>
        <h1 className="mt-6 text-2xl text-center">Trending Repositories</h1>
        <RepoList repos={repos} />
        <div className="mt-6">
          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-blue" onClick={fetchMore}>
              Load next {period.value}
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
