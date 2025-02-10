import fs from "fs"
import path from "path"

function read(relpath) {
    const { ext } = path.parse(relpath)
    relpath = relpath + (ext ? "" : ".svg")

    const file = path.join("__generated", "assets", relpath)

    if (!fs.existsSync(file))
        return `<span style="background: #f00;color: #fff;">invalid path <span style="color: #0f0">__generated/assets/</span>${relpath}</span>`

    const data = fs.readFileSync(file, err => err ? console.error(err) : null)

    return data
}

export default async function (eleventyConfig) {
    eleventyConfig.addShortcode("svg", (relpath, caption) => {
        const result = []
        const data = read(relpath)

        result.push(`<figure>`)
        result.push(`<div class="flex justify-center">`)
        result.push(data)
        result.push(`</div>`)
        result.push(`</figure>`)

        return result.join('')
    })
}