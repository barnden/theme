export default async function (eleventyConfig) {
    eleventyConfig.addShortcode("jsonify", JSON.stringify)
}