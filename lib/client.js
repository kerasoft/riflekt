import sanityClient from '@sanity/client'
import { useNextSanityImage } from 'next-sanity-image'

export const client = sanityClient({
    projectId: 'l06ua8k9',
    dataset: 'production',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    apiVersion: '2022-10-08',
    ignoreBrowserTokenWarning: true,
})

export const SanityImage = (img) => {
    return useNextSanityImage(client, img)
}
