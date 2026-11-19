import { motion, useTransform, type MotionValue } from 'framer-motion'

import branchIcon from '@/assets/icons/branch-icon.svg'
import graphBranch from '@/assets/icons/graph-branch.svg'
import graphDot from '@/assets/icons/graph-dot.svg'
import graphLine from '@/assets/icons/graph-line.svg'
import GitChip from '@/components/ui/GitChip/GitChip'

// 디자인 기준 1620 × 776 좌표. x는 카드 영역 폭에 맞춰 % 로 환산한다.
const GRAPH_WIDTH = 1620
const MAIN_Y = 295

const COMMITS = [
  { hash: 'a3f9c1', x: 190, y: 287 },
  { hash: '7b20e4', x: 598, y: 287 },
  { hash: 'c91d0f', x: 1006, y: 352 },
  { hash: 'e4a7b2', x: 1414, y: 287 },
]
const BRANCH_LABEL_X = 836
const HEAD_X = 1372

// y 는 카드 높이(--card-h)에 비례해 따라간다
const py = (y: number) => `calc(var(--card-h, 776px) * ${y / 776})`
const pct = (x: number) => `${(x / GRAPH_WIDTH) * 100}%`

/** 선이 이 x 에 닿는 진행도(0~1) */
const reach = (x: number) => x / GRAPH_WIDTH

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
  const scale = useTransform(progress, [at - 0.03, at], [0.6, 1])
  return (
    <motion.div className={className} style={{ ...style, opacity, scale }}>
      {children}
    </motion.div>
  )
}

/** progress: main 선이 그려진 비율(0 = 시작, 1 = 04 지점 이후까지 전부) */
export default function CommitGraph({ progress }: { progress: MotionValue<number> }) {
  // 그려진 만큼만 보이게 오른쪽을 잘라낸다. 아직 지나가지 않은 구간은 흐린 선이 대신 보인다.
  const clipPath = useTransform(progress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)

  return (
    <div className="pointer-events-none absolute inset-0 hidden text-white wide:block">
      <img
        src={graphLine}
        alt=""
        className="absolute left-0 h-0.5 w-full opacity-25"
        style={{ top: py(MAIN_Y) }}
      />
      <img src={graphBranch} alt="" className="absolute inset-0 size-full opacity-25" />

      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <img
          src={graphLine}
          alt=""
          className="absolute left-0 h-0.5 w-full"
          style={{ top: py(MAIN_Y) }}
        />
        <img src={graphBranch} alt="" className="absolute inset-0 size-full" />
      </motion.div>

      {COMMITS.map((commit) => (
        <Appear
          key={commit.hash}
          progress={progress}
          at={reach(commit.x + 8)}
          className="absolute"
          style={{ left: pct(commit.x), top: py(commit.y) }}
        >
          <img src={graphDot} alt="" className="size-4" />
          <p className="absolute top-[18px] left-[22px] -translate-y-px text-xs uppercase">
            {commit.hash}
          </p>
        </Appear>
      ))}

      <Appear
        progress={progress}
        at={reach(BRANCH_LABEL_X)}
        className="absolute"
        style={{ left: pct(BRANCH_LABEL_X), top: py(324) }}
      >
        <div className="flex items-center gap-1.5 rounded-[4px] border border-white px-2 py-[3px] text-xs uppercase">
          <img src={branchIcon} alt="" className="h-3.5 w-3" />
          feature/fullstack
        </div>
      </Appear>

      {/* 04 에서 브랜치가 main 으로 합쳐지면 HEAD 태그가 붙는다 */}
      <Appear
        progress={progress}
        at={0.97}
        className="absolute"
        style={{ left: pct(HEAD_X), top: py(253) }}
      >
        <GitChip label="HEAD → main" />
      </Appear>
    </div>
  )
}
