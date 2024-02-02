// ----------------------------------------------------------------------

export type SettingsValueProps = {
    themeStretch: boolean
    themeMode: 'light' | 'dark'
    themeLayout: 'vertical' | 'horizontal' | 'mini'
}

export type SettingsContextProps = SettingsValueProps & {
    // Update
    onUpdate: (name: string, value: string | boolean) => void
}
