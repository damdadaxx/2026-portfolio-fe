import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { type RefObject, useCallback, useEffect } from 'react'

const EXIT_FROM = 1.4
const EXIT_TO = 1

/**
 * 섹션이 화면에 들어오고 나가는 정도(0~1).
 * entry: 섹션 윗변이 화면 아래 끝 → 위 끝까지 올라오는 동안 0 → 1
 * exit:  섹션 아랫변이 화면 높이의 1.4배 → 1배 위치까지 올라오는 동안 0 → 1 (고정이 풀리기 직전 구간)
 */
export function useSectionEdges(ref: RefObject<HTMLElement | null>): {
  entry: MotionValue<number>
  exit: MotionValue<number>
} {
  const entry = useMotionValue(0)
  const exit = useMotionValue(0)
  const { scrollY } = useScroll()

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const vh = window.innerHeight
    const { top, bottom } = el.getBoundingClientRect()
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1)
    entry.set(clamp((vh - top) / vh))
    // 색이 급하게 바뀌지 않도록 양 끝에서 천천히 변하는 곡선(smoothstep)을 입힌다
    const t = clamp((EXIT_FROM * vh - bottom) / ((EXIT_FROM - EXIT_TO) * vh))
    exit.set(t * t * (3 - 2 * t))
  }, [ref, entry, exit])

  useMotionValueEvent(scrollY, 'change', update)

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  return { entry, exit }
}
