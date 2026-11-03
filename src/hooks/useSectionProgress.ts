import { type MotionValue, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion'
import { type RefObject, useCallback, useEffect } from 'react'

/**
 * 고정(pin) 구간이 있는 섹션의 스크롤 진행도(0~1).
 * 0: 섹션 윗변이 화면 아래에서 올라오기 시작 → 1: 고정이 풀리는 순간(윗변이 -pinVh 만큼 올라감).
 * 섹션은 [position: sticky 내용 + pinVh 높이의 빈 공간] 구조여야 한다.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  pinVh: number,
): MotionValue<number> {
  const progress = useMotionValue(0)
  const { scrollY } = useScroll()

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const vh = window.innerHeight
    const { top } = el.getBoundingClientRect()
    const total = vh * (1 + pinVh / 100)
    progress.set(Math.min(Math.max((vh - top) / total, 0), 1))
  }, [ref, pinVh, progress])

  useMotionValueEvent(scrollY, 'change', update)

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  return progress
}
