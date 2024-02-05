import { useEffect, useState } from 'react'
import { getMessaging, getToken } from 'firebase/messaging'
import firebaseApp from '@/utils/firebase'
import { useSession } from 'next-auth/react'
import { CreateFCM } from '@/utils/apis/fcm-api'
import { useSnackbar } from '@/components/organisms/root/snackbar'

export default function useFcmToken() {
    const { data: session } = useSession()
    const { enqueueSnackbar } = useSnackbar()

    // STATES
    const [token, setToken] = useState('')
    const [notificationPermissionStatus, setNotificationPermissionStatus] =
        useState('')

    // USE EFFECT
    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (
                    typeof window !== 'undefined' &&
                    'serviceWorker' in navigator
                ) {
                    const messaging = getMessaging(firebaseApp)

                    // Retrieve the notification permission status
                    const permission = await Notification.requestPermission()
                    setNotificationPermissionStatus(permission)
                    // Check if permission is granted before retrieving the token
                    if (permission === 'granted') {
                        const currentToken = await getToken(messaging, {
                            vapidKey:
                                process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                        })
                        if (currentToken) {
                            await CreateFCM(session?.token, {
                                fcmToken: currentToken,
                                userId: session?.user?.id,
                            })
                            setToken(currentToken)
                        } else {
                            enqueueSnackbar(
                                'No registration token available. Request permission to generate one.',
                                {
                                    variant: 'warning',
                                },
                            )
                            console.log(
                                'No registration token available. Request permission to generate one.',
                            )
                        }
                    } else {
                        await Notification.requestPermission()
                        alert(
                            'Please allow notification to recieve alert for ticket requests.',
                        )
                    }
                }
            } catch (error) {
                enqueueSnackbar('An error occurred while retrieving token', {
                    variant: 'error',
                })
                console.log('An error occurred while retrieving token:', error)
            }
        }

        retrieveToken()
    }, [])

    return { fcmToken: token, notificationPermissionStatus }
}
