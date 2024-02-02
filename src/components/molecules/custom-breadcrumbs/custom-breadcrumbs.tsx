// @mui
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
//
import { CustomBreadcrumbsProps } from './types'
import LinkItem from './link-item'
import Iconify from '@/components/atoms/icons/iconify/iconify'

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
    links,
    action,
    heading,
    moreLink,
    activeLast,
    sx,
    ...other
}: CustomBreadcrumbsProps) {
    const lastLink = links[links.length - 1].name

    return (
        <Box>
            <Box>
                {/* HEADING */}
                {heading && (
                    <Typography variant='h4' gutterBottom>
                        {heading}
                    </Typography>
                )}

                {/* BREADCRUMBS */}
                {!!links.length && (
                    <Breadcrumbs separator={<Separator />} {...other}>
                        {links.map(link => (
                            <LinkItem
                                key={link.name || ''}
                                link={link}
                                activeLast={activeLast}
                                disabled={link.name === lastLink}
                            />
                        ))}
                    </Breadcrumbs>
                )}
            </Box>

            {/* MORE LINK */}
            {!!moreLink && (
                <Box sx={{ mt: 2 }}>
                    {moreLink.map(href => (
                        <Link
                            key={href}
                            href={href}
                            variant='body2'
                            target='_blank'
                            rel='noopener'
                            sx={{ display: 'table' }}
                        >
                            {href}
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    )
}

// ----------------------------------------------------------------------

function Separator() {
    return (
        <Iconify
            icon={'material-symbols:chevron-right'}
            sx={{
                color: 'text.disabled',
            }}
        />
    )
}
