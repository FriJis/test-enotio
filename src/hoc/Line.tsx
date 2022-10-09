import styled from '@emotion/styled'
import { Box, BoxProps } from '@mui/system'

export const LineStyled = styled((props: BoxProps) => <Box {...props}></Box>)(
    () => ({
        height: '40px',
        width: '5px',
        borderRadius: '5px',
        marginRight: '14px',
    })
)
