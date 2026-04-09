import day1Md from '../day1/day1.md?raw'
import day2Md from '../day2/day2.md?raw'
import day3Md from '../day3/day3.md?raw'
import readmeMd from '../README.md?raw'

export type DocItem = {
  id: string
  title: string
  content: string
}

/** 新增文档：在此 import 并 push 一项即可在侧栏显示 */
export const docs: DocItem[] = [
  { id: 'day1', title: 'Day 1 操作指南', content: day1Md },
  { id: 'day2', title: 'Day 2 学习计划', content: day2Md },
  { id: 'day3', title: 'Day 3 学习计划', content: day3Md },
  { id: 'readme', title: '项目说明 (README)', content: readmeMd },
]

/** 首页重定向与非法 docId 回退时使用 */
export const defaultDocId = docs[0]?.id ?? 'day1'
