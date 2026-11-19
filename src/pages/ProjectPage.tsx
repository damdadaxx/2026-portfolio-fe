import { useEffect, useMemo, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import ProjectFilter from '@/components/features/project/ProjectFilter'
import ProjectGridCard from '@/components/features/project/ProjectGridCard'
import ProjectGridSkeleton from '@/components/features/project/ProjectGridSkeleton'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PROJECTS, type ProjectKind } from '@/lib/constants/projects'

type Filter = 'all' | ProjectKind

// 처음과 한 번에 더 불러올 때 모두 이 줄 수만큼 보여준다
const ROWS_PER_PAGE = 2
// 다음 묶음을 불러오는 것처럼 보이도록 스켈레톤을 잠깐 보여준다
const LOAD_DELAY_MS = 600

export default function ProjectPage() {
  const { t } = useTranslation()
  // 그리드 열 수 (grid-cols-1 / sm:2 / lg:3 / wide:4 와 같게 유지)
  const wide = useMediaQuery('(min-width: 94rem)')
  const lg = useMediaQuery('(min-width: 64rem)')
  const sm = useMediaQuery('(min-width: 40rem)')
  const columns = wide ? 4 : lg ? 3 : sm ? 2 : 1

  const [filter, setFilter] = useState<Filter>('all')
  const [rows, setRows] = useState(ROWS_PER_PAGE)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const counts = useMemo(() => {
    const team = PROJECTS.filter((p) => p.kind === 'team').length
    return { all: PROJECTS.length, team, work: PROJECTS.length - team }
  }, [])
  const filtered = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.kind === filter)),
    [filter],
  )
  const limit = rows * columns
  const remaining = filtered.length - limit

  // 그리드 아래가 보이면 다음 묶음을 불러온다
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || remaining <= 0 || loading) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setLoading(true),
      { rootMargin: '200px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [remaining, loading])

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => {
      setRows((value) => value + ROWS_PER_PAGE)
      setLoading(false)
    }, LOAD_DELAY_MS)
    return () => clearTimeout(timer)
  }, [loading])

  const options = (['all', 'team', 'work'] as const).map((value) => ({
    value,
    label: t(`projects.filter.${value}`, { count: counts[value] }),
  }))

  return (
    <>
      <section className="flex flex-col gap-5 px-5 pt-18 pb-6 lg:gap-8 lg:px-[min(4vw,60px)] lg:pt-30 lg:pb-10">
        <SectionTitle title={t('projects.title')} />
        <p className="font-ko max-w-[1200px] text-[15px] leading-[1.6] tracking-[-0.15px] break-keep lg:text-[clamp(1.125rem,1.25vw,1.5rem)] lg:tracking-[-0.24px]">
          <SlideUp delay={0.1}>
            <Trans
              t={t}
              i18nKey="projects.description"
              values={{ work: counts.work, team: counts.team }}
              components={{ br: <br /> }}
            />
          </SlideUp>
        </p>

        <div className="border-brand flex items-end justify-between border-t pt-8 lg:pt-12">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase">
              <SlideUp delay={0.15}>{t('projects.countLabel')}</SlideUp>
            </p>
            <p
              aria-live="polite"
              className="font-display text-[42px] leading-[44px] lg:text-[120px] lg:leading-[115px]"
            >
              <SlideUp key={filtered.length} delay={0.2}>
                {filtered.length}
              </SlideUp>
            </p>
          </div>
          <div className="pb-3">
            <ProjectFilter
              value={filter}
              options={options}
              label={t('projects.filter.label')}
              onChange={(value) => {
                setFilter(value)
                setRows(ROWS_PER_PAGE)
                setLoading(false)
              }}
            />
          </div>
        </div>
      </section>

      <section className="px-5 pt-4 pb-24 lg:px-[min(4vw,60px)] lg:pb-40">
        <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 wide:grid-cols-4">
          {filtered.slice(0, limit).map((project) => (
            <ProjectGridCard key={project.id} project={project} />
          ))}
          {loading &&
            Array.from({ length: Math.min(remaining, columns) }, (_, i) => (
              <ProjectGridSkeleton key={i} />
            ))}
        </ul>
        <div ref={sentinelRef} aria-hidden className="h-px" />
      </section>
    </>
  )
}
