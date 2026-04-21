import { act, renderHook } from "@testing-library/react";
import { Provider } from "jotai";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  useLanguage,
  useLanguageValue,
  useSetLanguage,
} from "@/atoms/language";
import { usePeriod, usePeriodValue, useSetPeriod } from "@/atoms/period";
import {
  usePersonalAccessToken,
  usePersonalAccessTokenValue,
  useSetPersonalAccessToken,
} from "@/atoms/personal-access-token";

function Wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

describe("storage atoms", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads and updates language through all language hooks", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    const { result } = renderHook(
      () => {
        const [language, setLanguage] = useLanguage();
        const languageValue = useLanguageValue();
        const setLanguageOnly = useSetLanguage();

        return {
          language,
          setLanguage,
          languageValue,
          setLanguageOnly,
        };
      },
      { wrapper: Wrapper },
    );

    expect(result.current.language).toBe("TypeScript");
    expect(result.current.languageValue).toBe("TypeScript");

    act(() => {
      result.current.setLanguage("Rust");
    });
    expect(result.current.languageValue).toBe("Rust");

    act(() => {
      result.current.setLanguageOnly("Go");
    });
    expect(result.current.language).toBe("Go");
  });

  it("reads and updates period through all period hooks", () => {
    localStorage.setItem("period", JSON.stringify("weekly"));

    const { result } = renderHook(
      () => {
        const [period, setPeriod] = usePeriod();
        const periodValue = usePeriodValue();
        const setPeriodOnly = useSetPeriod();

        return {
          period,
          setPeriod,
          periodValue,
          setPeriodOnly,
        };
      },
      { wrapper: Wrapper },
    );

    expect(result.current.period).toBe("weekly");
    expect(result.current.periodValue).toBe("weekly");

    act(() => {
      result.current.setPeriod("monthly");
    });
    expect(result.current.periodValue).toBe("monthly");

    act(() => {
      result.current.setPeriodOnly("yearly");
    });
    expect(result.current.period).toBe("yearly");
  });

  it("reads and updates personal access token through all token hooks", () => {
    localStorage.setItem("personalAccessToken", JSON.stringify("abc123"));

    const { result } = renderHook(
      () => {
        const [personalAccessToken, setPersonalAccessToken] =
          usePersonalAccessToken();
        const personalAccessTokenValue = usePersonalAccessTokenValue();
        const setPersonalAccessTokenOnly = useSetPersonalAccessToken();

        return {
          personalAccessToken,
          setPersonalAccessToken,
          personalAccessTokenValue,
          setPersonalAccessTokenOnly,
        };
      },
      { wrapper: Wrapper },
    );

    expect(result.current.personalAccessToken).toBe("abc123");
    expect(result.current.personalAccessTokenValue).toBe("abc123");

    act(() => {
      result.current.setPersonalAccessToken("new-token");
    });
    expect(result.current.personalAccessTokenValue).toBe("new-token");

    act(() => {
      result.current.setPersonalAccessTokenOnly(null);
    });
    expect(result.current.personalAccessToken).toBeNull();
  });
});
