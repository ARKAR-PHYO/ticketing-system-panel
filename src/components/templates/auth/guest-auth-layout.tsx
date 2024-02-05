import { Box } from '@mui/material'
import Image from 'next/image'
import background from '../../../../public/assets/images/sign-in-bg.jpg'

type Props = {
    children: React.ReactNode
}

const GuestAuthLayout = ({ children }: Props) => {
    return (
        <Box className='relative w-full h-screen bg-gray-800/50'>
            <Box className='absolute inset-0 w-full max-h-screen transform -z-10'>
                <Image
                    src={background}
                    alt='sign-in-bg'
                    placeholder='blur'
                    quality={100}
                    fill
                    sizes='100vw'
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </Box>
            {children}
        </Box>
    )
}

export default GuestAuthLayout
