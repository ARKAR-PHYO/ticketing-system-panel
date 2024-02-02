import { memo, useState, useCallback } from 'react'
// @mui
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
//
import { NavSectionProps, NavConfigProps } from '../types'
import { navVerticalConfig } from '../config'
import { INavItem } from '../../config-navigation'

import NavList from './nav-list'

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }: NavSectionProps) {
    return (
        <Stack sx={sx} {...other}>
            {data.map((group, index) => (
                <Group
                    key={index}
                    items={group}
                    config={navVerticalConfig(config)}
                />
            ))}
        </Stack>
    )
}

export default memo(NavSectionVertical)

// ----------------------------------------------------------------------

type GroupProps = {
    items: INavItem
    config: NavConfigProps
    hidden?: boolean
}

function Group({ items, config, hidden = false }: GroupProps) {
    const renderContent = items.items.map(list => (
        <NavList
            key={list.title + list.path}
            data={list}
            depth={1}
            hasChild={!!list.children}
            config={config}
            hidden={hidden}
        />
    ))

    return (
        <List disablePadding sx={{ px: 2 }}>
            {renderContent}
        </List>
    )
}
