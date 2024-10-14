import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    return [
        {
            url: 'https://xn--e1affem4a4d.com/',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/price',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/faq',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/feedback',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/profile',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/search',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/contacts',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/terms',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: 'https://xn--e1affem4a4d.com/dashboard/politics',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
    ]
}