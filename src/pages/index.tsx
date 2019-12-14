import 'style.css'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import AppBar from 'components/appBar'
import RepoList, { RepoListProps } from 'components/repoList'
import { makeOption } from 'components/select'
import SelectLanguage from 'components/selectLanguage'
import SelectPeriod from 'components/selectPeriod'
import { useRepos } from 'hooks/useRepos'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { memo } from 'react'
import Loader from 'react-loader-spinner'
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
      <Head>
        <title>Twending - Yet another GitHub trending application</title>
      </Head>
      <main className="flex flex-col items-center justify-center p-8 pt-24">
        <AppBar>
          <SelectPeriod onChange={setPeriod} value={period} />
          <SelectLanguage onChange={setLanguage} value={language} />
        </AppBar>
        <h1 className="mt-6 text-2xl text-center">Trending Repositories</h1>
        <RepoList repos={repos} />
        <div className="mt-4">
          {loading ? (
            <Loader type="Rings" color="white" />
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

export default memo(Home);
