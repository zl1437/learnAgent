import readmeMd from '../README.md?raw'

export type DocItem = {
  id: string
  title: string
  content: string
}

type MarkdownModuleMap = Record<string, string>

const dayMarkdownFiles = import.meta.glob('../docs/day*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as MarkdownModuleMap

function getDayNumber(id: string): number {
  const matched = id.match(/^day(\d+)$/i)
  return matched ? Number(matched[1]) : Number.POSITIVE_INFINITY
}

function getTitleFromMarkdown(id: string, content: string): string {
  const firstHeading = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return firstHeading ?? id
}

const dayDocs: DocItem[] = Object.entries(dayMarkdownFiles)
  .map(([filePath, content]) => {
    const matched = filePath.match(/\/(day\d+)\.md$/i)
    const id = matched?.[1]?.toLowerCase()
    if (!id) return null

    return {
      id,
      title: getTitleFromMarkdown(id, content),
      content,
    }
  })
  .filter((doc): doc is DocItem => Boolean(doc))
  .sort((a, b) => getDayNumber(a.id) - getDayNumber(b.id))

export const docs: DocItem[] = [
  ...dayDocs,
  { id: 'readme', title: '项目说明 (README)', content: readmeMd },
]

/** 首页重定向与非法 docId 回退时使用 */
export const defaultDocId = docs[0]?.id ?? 'day1'
