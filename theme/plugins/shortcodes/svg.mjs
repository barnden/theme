import fs from "fs"
import path from "path"
import { renderSVG } from "../assets/latex.mjs"

async function read(parentDirectory, svgPath, options = {}) {
    const { name, ext } = path.parse(svgPath)

    if (ext !== ".svg")
        return `<span style="background: #f00;color: #fff;">invalid file extension provided</span>`

    svgPath = svgPath + (ext ? "" : ".svg")

    const filePath = svgPath.startsWith("./")
        ? path.join(parentDirectory, svgPath)
        : path.join("__generated", "assets", svgPath)


    const { dir } = path.parse(filePath)
    const texPath = path.join(dir, name + '.tex')

    if (fs.existsSync(texPath)) {
        await renderSVG(texPath, Object.assign(options, {
            generatedPath: "./"
        }))

    }

    if (!fs.existsSync(filePath)) {
        return `<span style="background: #f00;color: #fff;">invalid path ${filePath}</span>`
    }

    const data = fs.readFileSync(filePath, err => err ? console.error(err) : null)

    return data
}

export default async function (eleventyConfig, options = {}) {
    eleventyConfig.addShortcode("svg", async function (svgPath, caption) {
        const parentDirectory = path.dirname(this.page.inputPath)
        const data = await read(parentDirectory, svgPath, options)

        return `<figure><div class="flex justify-center">${data}</div></figure>`
    })
}