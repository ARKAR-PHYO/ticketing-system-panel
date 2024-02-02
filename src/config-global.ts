// routes
import { paths } from '@/routes/paths'

// API
// ----------------------------------------------------------------------

export const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER
export const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
export const NEXT_AUTH_URL = process.env.NEXTAUTH_URL

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root // as '/dashboard'

export const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

export const AAS_CRM_API_BaseURL =
    process.env.NEXT_PUBLIC_AAS_CRM_API_BaseURL || ''
export const AAS_CRM_API_USERNAME =
    process.env.NEXT_PUBLIC_AAS_CRM_API_USERNAME || ''
export const AAS_CRM_API_PASSWORD =
    process.env.NEXT_PUBLIC_AAS_CRM_API_PASSWORD || ''
