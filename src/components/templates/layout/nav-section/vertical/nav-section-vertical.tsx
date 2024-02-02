import { memo, useState, useCallback } from 'react'
// @mui
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
//
import { NavSectionProps, NavListProps, NavConfigProps } from '../types'
import { navVerticalConfig } from '../config'
import { StyledSubheader } from './styles'

import NavList from './nav-list'

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }: NavSectionProps) {
    return (
        <Stack sx={sx} {...other}>
            {data.map((group, index) => (
                <Group
                    key={index}
                    items={group.items}
                    config={navVerticalConfig(config)}
                />
            ))}
        </Stack>
    )
}

export default memo(NavSectionVertical)

// ----------------------------------------------------------------------

type GroupProps = {
    subheader?: string
    items: NavListProps[]
    config: NavConfigProps
}

function Group({ items, config }: GroupProps) {
    const [open, setOpen] = useState(true)

    const handleToggle = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    const renderContent = items.map(list => (
        <NavList
            key={list.title + list.path}
            data={list}
            depth={1}
            hasChild={!!list.children}
            config={config}
        />
    ))

    return (
        <List disablePadding sx={{ px: 2 }}>
            {renderContent}
        </List>
    )
}
