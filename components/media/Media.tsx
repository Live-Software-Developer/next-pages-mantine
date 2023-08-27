import { Box, Stack, Tabs, Title } from '@mantine/core'
import { IconPhoto, IconFile, IconFile3d, IconFiles } from '@tabler/icons'
import React from 'react'
import Images from './Images'


interface MediaProps {
    padding?: string,
    radius?: string,
}

const Media = (props: MediaProps) => {
    
    return (
        <>
            <Images {...props} />
        </>
    )
}

export default Media