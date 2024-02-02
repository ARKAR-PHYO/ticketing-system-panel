'use client'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

type Props = {
    children: React.ReactNode
}

export default function LocalizationProvider({ children }: Props) {
    return (
        <MuiLocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
        </MuiLocalizationProvider>
    )
}
