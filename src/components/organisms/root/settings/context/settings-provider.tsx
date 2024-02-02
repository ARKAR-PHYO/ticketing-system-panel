"use client";

import { useMemo, useCallback } from "react";
// hooks
import { useLocalStorage } from "@/hooks/use-local-storage";
//
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsValueProps) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings]
  );

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
    }),
    [onUpdate, settings]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
