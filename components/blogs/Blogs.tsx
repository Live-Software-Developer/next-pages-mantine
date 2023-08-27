import React, { useRef } from 'react'
import BlogCardVertical, { BlogProps } from './BlogCardVertical'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay';

interface BlogsProps {
    articles: any
}

const Blogs = (props: BlogsProps) => {
    const { articles } = props
    const blogs_autoplay = useRef(Autoplay({ delay: 2000 }));
    return (
        <Carousel
            slideSize="33.333333%"
            slideGap="md"
            align="start"
            controlSize={42}
            breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%' },
            ]}
            withIndicators={false}
            withControls={true}
            withKeyboardEvents={true}
            loop
            plugins={[blogs_autoplay.current]}
            onMouseEnter={blogs_autoplay.current.stop}
            onMouseLeave={blogs_autoplay.current.reset}>
            {articles.map((article: BlogProps, i: number) => (
                <Carousel.Slide key={`article_${i}`}>
                    <BlogCardVertical {...article} />
                </Carousel.Slide>
            ))}
        </Carousel>
    )
}

export default Blogs