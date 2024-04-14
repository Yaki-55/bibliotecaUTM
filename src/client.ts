import { createClient } from '@sanity/client'

export default createClient({
    projectId: "5rc1pjr5",
    dataset: "production",
    useCdn: true,
    apiVersion: '2021-03-25',
})
