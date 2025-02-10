export default async function (eleventyConfig) {
    eleventyConfig.addFilter('parseDate', content => {
        const date = new Date(content)
        return date.toLocaleString('en-GB', { day: "numeric", month: "short", year: "numeric" })
    })
}