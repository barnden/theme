function createEntry(heading, details = true) {
    const { slug, text, children } = heading
    const result = []
    details = details && children?.length

    result.push(`<li class="nav-item">`)

    if (details) {
        result.push(`<details open>`)
        result.push(`<summary>`)
    }

    result.push(`<a class="nav-link" href="${slug}">${text}</a>`)

    if (details)
        result.push(`</summary>`)

    if (children?.length) {
        result.push(`<ul>`)
        result.push(...children.map(child => createEntry(child, false)))
        result.push(`</ul>`)
    }
    if (details)
        result.push(`</details>`)

    result.push(`</li>`)

    return result.join("")
}

function getHeadings(content) {
    const regex = /<h(\d).*tabindex="-1".*><a class="header-anchor" href="(.*)">§<\/a>(.*)<\/h\d>/g

    if (content === undefined)
        return []

    const matches = Array.from(content.matchAll(regex))

    if (matches.length == 0)
        return []

    const headings = []

    for (const match of matches) {
        const { 1: level, 2: slug, 3: text } = match

        const heading = {
            level: level,
            slug: slug,
            text: text,
            parent: headings.length,
            children: []
        }

        if (level >= 5)
            continue

        headings.push(heading)

        if (level == 2)
            continue

        for (let i = headings.length; --i >= 0;) {
            if (headings[i].level != level - 1)
                continue

            heading.parent = i
            break
        }
    }

    return headings
}

export default async function (eleventyConfig, options) {
    eleventyConfig.addFilter('toc', content => {
        const headings = getHeadings(content)

        if (headings.length == 0)
            return undefined

        const roots = []
        for (const [i, heading] of Object.entries(headings)) {
            const { parent } = heading

            if (parent == i) {
                roots.push(heading)
                continue
            }

            headings[parent].children.push(heading)
        }

        const result = []

        result.push(`<ul class="contents flex-column">`)
        result.push(...roots.map(heading => createEntry(heading, true)))
        result.push("</ul>")

        return result.join("")
    })
}