import Head from 'next/head'
import React from 'react'
import { SEPARATOR } from '../../config/constants'

export interface SEOHeaderProps {
    url: string
    title: string
    description: string
    keywords: string
    image: string
    twitter_card: string
    schema?: any
}

const SEOHeader = (props: SEOHeaderProps) => {
    const { url, title, description, keywords, image, twitter_card, schema } = props

    return (
        <Head>
            <title>{`${SEPARATOR} ${title}`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content={twitter_card} />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head>
    )
}

export default SEOHeader