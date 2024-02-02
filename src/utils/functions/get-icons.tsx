import Iconify from '@/components/atoms/icons/iconify'
import SvgColor from '@/components/atoms/icons/svg-color'

export const getIconify = (name: string) => <Iconify icon={name} width={24} />

export const getSVGIcon = (name: string) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
)
