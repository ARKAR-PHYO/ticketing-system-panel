import { useState, useEffect, useCallback } from 'react'
// @mui
import Collapse from '@mui/material/Collapse'
// routes
import { usePathname } from '@/routes/hooks'
import { useActiveLink } from '@/routes/hooks/use-active-link'
//
import { NavListProps, NavConfigProps } from '../types'
import NavItem from './nav-item'

// ----------------------------------------------------------------------

type NavListRootProps = {
    data: NavListProps
    depth: number
    hasChild: boolean
    config: NavConfigProps
    hidden?: boolean
}

export default function NavList({
    data,
    depth,
    hasChild,
    config,
    hidden = false,
}: NavListRootProps) {
    const pathname = usePathname()

    const active = useActiveLink(data.path, hasChild)

    const externalLink = data.path.includes('http')

    const [open, setOpen] = useState(active)

    useEffect(() => {
        if (!active) {
            handleClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const handleToggle = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            {!hidden && (
                <NavItem
                    item={data}
                    depth={depth}
                    open={open}
                    active={active}
                    externalLink={externalLink}
                    onClick={handleToggle}
                    config={config}
                    hidden={hidden}
                />
            )}

            {hasChild && (
                <Collapse in={open} unmountOnExit>
                    <NavSubList
                        data={data.children}
                        depth={depth}
                        config={config}
                        hidden={hidden}
                    />
                </Collapse>
            )}
        </>
    )
}

// ----------------------------------------------------------------------

type NavListSubProps = {
    data: any
    depth: number
    config: NavConfigProps
    hidden?: boolean
}

function NavSubList({ data, depth, config, hidden }: NavListSubProps) {
    return (
        <>
            {data &&
                data().map((list: any) => (
                    <NavList
                        key={list.title + list.path}
                        data={list}
                        depth={depth + 1}
                        hasChild={!!list.children}
                        config={config}
                        hidden={hidden}
                    />
                ))}
        </>
    )
}
