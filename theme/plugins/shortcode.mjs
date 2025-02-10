import jsonify from "./shortcodes/jsonify.mjs"
import svg from "./shortcodes/svg.mjs"

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(jsonify)
    eleventyConfig.addPlugin(svg)
}