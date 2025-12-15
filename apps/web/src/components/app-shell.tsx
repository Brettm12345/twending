import { LanguageSelect } from "@/components/language-select";
import { Logo } from "@/components/logo";
import { PeriodSelect } from "@/components/period-select";
import { SettingsDropdown } from "@/components/settings-dropdown";
import { AppBar } from "@/components/ui/app-bar";

export function AppShell({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <main {...props}>
      <AppBar position="fixed">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <PeriodSelect />
          <SettingsDropdown />
        </div>
      </AppBar>
      <h1 className="text-2xl text-center mt-24 md:mt-32">
        Trending Repositories
      </h1>
      <div className="flex px-4 flex-1">
        <div className="container mx-auto rounded-2xl bg-card mt-8 md:mt-16 mb-4 border border-border overflow-hidden">
          {children}
        </div>
      </div>
    </main>
  );
}
