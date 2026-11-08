'use client';

import { useAppPreferences } from "@/components/layout/app-preferences-provider";

type PagePlaceholderProps = {
  title: string;
  description?: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  const { t } = useAppPreferences();

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">{t("freshCart")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t(title)}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        {description ? t(description) : t("placeholderDescription")}
      </p>
    </main>
  );
}
