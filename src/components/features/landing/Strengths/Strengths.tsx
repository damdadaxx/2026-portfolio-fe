import { useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSectionProgress } from '@/hooks/useSectionProgress'
import { cn } from '@/utils/cn'

import CommitGraph from './CommitGraph'
import ProcessCard, { type ProcessItem } from './ProcessCard'

// 섹션을 고정해 두는 길이. 카드가 채워지는 동안(진입)과 고정 구간 모두에서 진행된다.
const PIN_VH = 150
const LINE_START = 0.5
const LINE_END = 0.92

export default function Strengths() {
  const { t } = useTranslation()
  const items = t('process.items', { returnObjects: true }) as ProcessItem[]
  const shouldReduceMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 94rem)')
  const pinned = wide && !shouldReduceMotion

  const trackRef = useRef<HTMLElement>(null)
  const progress = useSectionProgress(trackRef, PIN_VH)
  const complete = useMotionValue(1)
  const drawn = useTransform(progress, [LINE_START, LINE_END], [0, 1])

  return (
    <section ref={trackRef} id="about" className="relative z-20">
      <div
        className={cn(
          'flex flex-col gap-8 px-5 py-18 lg:gap-16 lg:px-[min(7vw,150px)] lg:py-40',
          // 고정되는 동안 제목+카드가 한 화면(vh)에 들어오도록 카드 높이를 화면에 맞춘다
          pinned && 'sticky top-0 lg:gap-12 lg:py-[6vh]',
        )}
      >
        <SectionTitle
          title={t('process.title')}
          action={{ label: t('process.action'), href: '/about' }}
        />

        <div
          style={
            pinned
              ? ({
                  '--card-h': 'clamp(460px, calc(100vh - 12vh - 176px), 776px)',
                } as React.CSSProperties)
              : undefined
          }
          className="relative mx-auto grid w-full max-w-[1620px] grid-cols-1 gap-3 lg:grid-cols-2 wide:flex"
        >
          {items.map((item, index) => (
            <ProcessCard
              key={item.no}
              item={item}
              index={index}
              progress={pinned ? progress : undefined}
              lineProgress={pinned ? drawn : undefined}
            />
          ))}
          <CommitGraph progress={pinned ? drawn : complete} />
        </div>
      </div>

      {pinned && <div aria-hidden style={{ height: `${PIN_VH}vh` }} />}
    </section>
  )
}
