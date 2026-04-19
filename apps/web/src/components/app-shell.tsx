import { LanguageSelect } from "@/components/language-select";
import { Logo } from "@/components/logo";
import { PeriodSelect } from "@/components/period-select";
import { SettingsDropdown } from "@/components/settings-dropdown";
import { AppBar } from "@/components/ui/app-bar";

export function AppShell({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <main {...props}>
      <AppBar position="fixed">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <PeriodSelect />
            <SettingsDropdown />
          </div>
        </div>
      </AppBar>
      <h1 className="mt-24 text-center text-2xl md:mt-32">
        Trending Repositories
      </h1>
      <div className="flex flex-1 px-4">
        <div className="container mx-auto mt-8 mb-4 overflow-hidden rounded-2xl border border-border bg-card md:mt-16">
          {children}
        </div>
      </div>
    </main>
  );
}
