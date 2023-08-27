import React from 'react'
import { Editor } from '@monaco-editor/react';
import { getTheme } from '../../config/config';
import { useMantineTheme } from '@mantine/core';

const CustomMonacoEditor = (props: any) => {
    const { value, language, onChange } = props
    const [loaded, setLoaded] = React.useState(false)
    const theme = useMantineTheme()

    React.useEffect(() => {
        setLoaded(true)
    }, [])
    return (
        <div>
            {language}
            <Editor
                // label={field['label']}
                value={value}
                language={language ?? "javascript"}
                onChange={(e) => {
                    const value = e
                    onChange(value)
                }}
                theme={getTheme(theme) ? "vs-dark" : "light"}
                height={300}
            />
        </div>
    )
}

export default CustomMonacoEditor