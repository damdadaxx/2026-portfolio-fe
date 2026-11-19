import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

import { BODY, COLUMN_TITLE } from './styles'
import type { ColumnBlock } from './types'

/**
 * 제목 + 내용이 열로 놓이는 블록. 담당 범위(항목 목록)와 회고(문단)에 같이 쓴다.
 * 열 수는 블록 개수에 맞춘다.
 */
export default function ColumnBlocks({ columns }: { columns: ColumnBlock[] }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-10',
        columns.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
      )}
    >
      {columns.map((column, columnIndex) => {
        const base = columnIndex * 0.1

        return (
          <div key={column.title} className="flex flex-col gap-3.5">
            <h3 className={COLUMN_TITLE}>
              <SlideUp delay={base}>{column.title}</SlideUp>
            </h3>
            {column.items && (
              <ul className={BODY}>
                {column.items.map((item, index) => (
                  <li key={item}>
                    <SlideUp delay={base + 0.12 + index * 0.06}>· {item}</SlideUp>
                  </li>
                ))}
              </ul>
            )}
            {column.paragraphs && (
              <div className={cn(BODY, 'flex flex-col gap-[1.6em]')}>
                {column.paragraphs.map((paragraph, index) => (
                  <p key={paragraph}>
                    <SlideUp delay={base + 0.12 + index * 0.1}>{paragraph}</SlideUp>
                  </p>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
