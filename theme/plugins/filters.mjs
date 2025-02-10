import date from "./filters/date.mjs"
import summary from "./filters/summary.mjs"
import toc from "./filters/toc.mjs"

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(date)
    eleventyConfig.addPlugin(summary)
    eleventyConfig.addPlugin(toc)
}