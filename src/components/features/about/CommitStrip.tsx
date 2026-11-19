import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import GitChip from '@/components/ui/GitChip/GitChip'
import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'

type ProcessItem = { no: string; lead: string; em: string }

// 디자인 기준 1800 × 256 좌표. 가로 위치는 % 로 환산해 폭에 맞춰 늘어나고,
// 세로는 px 그대로 둬서 글자·칩이 화면 폭과 상관없이 서로 겹치지 않는다.
const W = 1800
const H = 256
const COMMITS = [
  { hash: 'a3f9c1', x: 57.67, dotY: 101, labelY: 34, labelW: 340 },
  { hash: '7b20e4', x: 524.33, dotY: 101, labelY: 34, labelW: 340 },
  { hash: 'c91d0f', x: 991, dotY: 161, labelY: 196, labelW: 300 },
  { hash: 'e4a7b2', x: 1457.67, dotY: 101, labelY: 34, labelW: 340 },
]
const HEAD_X = 1490.67
const BRANCH_LABEL_X = 766.67
const DRAW_DURATION = 2.6

const pctX = (x: number) => `${(x / W) * 100}%`
const pctY = (y: number) => `${y}px`
/** 선이 이 x 에 닿는 진행도(0~1) */
const reach = (x: number) => x / W

/** 선이 `at` 에 닿으면 떠오르며 나타난다 */
function Appear({
  progress,
  at,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>
  at: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const opacity = useTransform(progress, [at - 0.03, at], [0, 1])
  const y = useTransform(progress, [at - 0.03, at], [8, 0])
  return (
    <motion.div className={className} style={{ ...style, opacity, y }}>
      {children}
    </motion.div>
  )
}

/** 좁은 화면의 세로 커밋 목록 한 줄. 위 점에서 이 점까지 이어지는 선이 순서대로 그려진다 */
function MobileCommit({
  hash,
  no,
  phrase,
  index,
  count,
  progress,
  branch,
}: {
  hash: string
  no: string
  phrase: string
  index: number
  count: number
  progress: MotionValue<number>
  branch?: boolean
}) {
  const last = index === count - 1
  const at = index / (count - 1)
  const step = 1 / (count - 1)
  const lineScale = useTransform(progress, [at, at + step], [0, 1])
  const dotOpacity = useTransform(progress, [at - 0.05, at], [0, 1])

  return (
    <li className="flex gap-4">
      <div aria-hidden className="relative w-[18px] shrink-0 self-stretch">
        {!last && (
          <motion.span
            className="bg-brand absolute top-2.5 -bottom-2.5 left-2 w-0.5 origin-top"
            style={{ scaleY: lineScale }}
          />
        )}
        <motion.span
          className={`absolute top-[3px] left-0.5 size-3.5 rounded-full ${branch ? 'bg-accent' : 'bg-brand'}`}
          style={{ opacity: dotOpacity }}
        />
      </div>
      <div className={`flex min-w-0 flex-1 flex-col gap-1 ${last ? '' : 'pb-7'}`}>
        <span className="font-sans text-xs whitespace-pre uppercase opacity-60">
          {hash} · {no}
        </span>
        <span className="text-lg leading-normal font-medium">{phrase}</span>
      </div>
    </li>
  )
}

/**
 * '이렇게 일해요' 요약. 넓은 화면에서는 커밋 그래프, 좁은 화면에서는 목록으로 보여 준다.
 * 화면에 들어오면 main 선이 01 → 04 로 그려지고, 마지막에 HEAD 태그가 붙는다.
 */
export default function CommitStrip() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const items = t('process.items', { returnObjects: true }) as ProcessItem[]
  const phrase = (item: ProcessItem) => `${item.lead} ${item.em}`

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' })
  const progress = useMotionValue(shouldReduceMotion ? 1 : 0)
  const clipPath = useTransform(progress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)

  useEffect(() => {
    if (!inView || shouldReduceMotion) return
    const controls = animate(progress, 1, {
      duration: DRAW_DURATION,
      ease: [0.45, 0, 0.25, 1],
    })
    return () => controls.stop()
  }, [inView, shouldReduceMotion, progress])

  return (
    <section
      ref={ref}
      className="flex flex-col gap-5 px-5 pt-[72px] pb-6 lg:gap-12 lg:px-[min(4vw,60px)] lg:pt-20 lg:pb-[140px]"
    >
      <SectionTitle title={t('process.title')} />

      <ol className="font-ko flex flex-col wide:hidden">
        {items.map((item, index) => (
          <MobileCommit
            key={item.no}
            hash={COMMITS[index].hash}
            no={item.no}
            phrase={phrase(item)}
            index={index}
            count={items.length}
            progress={progress}
            // 03 은 feature 브랜치 위의 커밋이라 주황 점으로 구분한다
            branch={index === 2}
          />
        ))}
      </ol>

      <div
        className="relative hidden w-full wide:block"
        style={{ height: H }}
        role="img"
        aria-label={items.map(phrase).join(' → ')}
      >
        <motion.svg
          aria-hidden
          viewBox={`0 0 ${W} 300`}
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute top-0 left-0 w-full overflow-visible"
          style={{ height: 300, clipPath }}
        >
          <path d={`M0 110H${W}`} vectorEffect="non-scaling-stroke" />
          <path
            d="M533.333 110C633.333 110 633.333 170 755.556 170H1244.44C1366.67 170 1366.67 110 1466.67 110"
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>

        {COMMITS.map((commit, index) => {
          const at = reach(commit.x + 9)

          return (
            <div key={commit.hash}>
              <Appear
                progress={progress}
                at={at}
                className="bg-brand absolute size-[18px] rounded-full"
                style={{ left: pctX(commit.x), top: pctY(commit.dotY) }}
              >
                {null}
              </Appear>
              <Appear
                progress={progress}
                at={at + 0.02}
                className="font-ko absolute flex flex-col gap-1.5"
                style={{
                  left: pctX(commit.x),
                  top: pctY(commit.labelY),
                  width: commit.labelW,
                }}
              >
                <span className="font-sans text-sm whitespace-pre uppercase opacity-60">
                  {commit.hash} · {items[index].no}
                </span>
                <span className="text-lg leading-normal font-medium">
                  {phrase(items[index])}
                </span>
              </Appear>
            </div>
          )
        })}

        <Appear
          progress={progress}
          at={reach(BRANCH_LABEL_X)}
          className="absolute"
          style={{ left: pctX(BRANCH_LABEL_X), top: pctY(134) }}
        >
          <GitChip label="feature/fullstack" variant="outline" />
        </Appear>
        <Appear
          progress={progress}
          at={0.98}
          className="absolute"
          style={{ left: pctX(HEAD_X), top: pctY(97) }}
        >
          <GitChip label="HEAD → main" />
        </Appear>
      </div>
    </section>
  )
}
