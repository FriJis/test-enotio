import styled from '@emotion/styled'
import { Accordion, AccordionProps } from '@mui/material'

export const AccordionStyled = styled((props: AccordionProps) => (
    <Accordion disableGutters square {...props} />
))(() => ({
    borderRadius: '40px',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    borderBottom: 0,
    marginTop: '32px',
    boxShadow: '-8px -8px 20px 0px #FFFFFF0D',
}))
