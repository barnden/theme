import { getSingletonHighlighter } from "shiki"
import { bundledLanguages } from "shiki/langs"

export default async function (eleventyConfig, options) {
    // We can't have an async highlight functon, so load the TextMate grammar objects for _all_ supported languages
    // At run-time (highlight-time?), dynamically add the language if not found
    const languages = Object.fromEntries(
        await Promise.all(
            Object.entries(bundledLanguages)
                .map(async ([language, loadTextMate]) => [language, (await loadTextMate()).default])
        )
    )

    // Use singleton so we don't reconstruct a highlighter object everytime we reload 11ty config.
    const highlighter = await getSingletonHighlighter({ themes: options?.themes ?? [options?.theme] })

    eleventyConfig.on('eleventy.before', async _ => {
        eleventyConfig.amendLibrary('md', mdLib => mdLib.set({
            highlight: (code, lang) => {
                if (!highlighter.getLoadedLanguages().includes(lang)) {
                    if (!languages.hasOwnProperty(lang)) {
                        if (lang !== "plain")
                            console.log(`[shiki] Could not find language "${lang}"; falling back to "text".`)

                        lang = "text"
                    } else {
                        console.log(`[shiki] Loading language ${lang}`)
                        highlighter.loadLanguageSync(languages[lang])
                    }
                }

                return highlighter.codeToHtml(code.trimEnd(), { ...options, lang: lang })
            }
        }))
    })
}