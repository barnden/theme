export default async function (eleventyConfig) {
    eleventyConfig.addFilter('summarize', post => {
        const content = post.replace(/(<([^>]+)>)/gi, "");
        return content.substr(0, content.lastIndexOf("", 200)) + "...";
    })
}