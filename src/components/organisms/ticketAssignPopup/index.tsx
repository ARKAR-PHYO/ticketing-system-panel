'use client'

import { Dialog, DialogContent, DialogTitle } from '@mui/material'

interface TicketAssignPopupProps {
    open: boolean
    onClose: VoidFunction
}

export default function TicketAssignPopup({
    open,
    onClose,
}: TicketAssignPopupProps) {
    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 620 },
            }}
        >
            <DialogTitle>Ticket Assign</DialogTitle>
            <DialogContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
                eveniet, hic ut asperiores culpa vero, explicabo minima
                repellendus iste placeat dolores. Magnam dolore repellat sequi
                iusto fugit! Distinctio, natus nisi!
            </DialogContent>
        </Dialog>
    )
}
