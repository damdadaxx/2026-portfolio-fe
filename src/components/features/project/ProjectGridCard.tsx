import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import weblling from '@/assets/images/project-logos/weblling.png'
import miqube from '@/assets/images/project-logos/miqube.png'
import sonaks from '@/assets/images/project-logos/sonaks.png'
import popofesta from '@/assets/images/project-logos/popofesta.png'
import vuno from '@/assets/images/project-logos/vuno.png'
import socialstock from '@/assets/images/project-logos/socialstock.png'
import alpha from '@/assets/images/project-logos/alpha.png'
import pagoe from '@/assets/images/project-logos/pagoe.png'
import docthru from '@/assets/images/project-logos/docthru.png'
import forestOfStudy from '@/assets/images/project-logos/forest-of-study.png'
import kTest from '@/assets/images/project-logos/k-test.png'
import milim from '@/assets/images/project-logos/milim.png'
import minters from '@/assets/images/project-logos/minters.png'
import moving from '@/assets/images/project-logos/moving.png'
import nanum from '@/assets/images/project-logos/nanum.png'
import newmata from '@/assets/images/project-logos/newmata.png'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import type { Project } from '@/lib/constants/projects'
import { cn } from '@/utils/cn'

const LOGOS: Record<string, string> = {
  moving,
  'k-test': kTest,
  docthru,
  'forest-of-study': forestOfStudy,
  minters,
  nanum,
  newmata,
  milim,
  weblling,
  miqube,
  sonaks,
  popofesta,
  vuno,
  socialstock,
  alpha,
  pagoe,
}

/** 썸네일 오른쪽 위 링크 표시. PC 에서 호버하면 라벨이 있는 알약으로 펼쳐진다 */
function LinkBadge({ caseStudy, label }: { caseStudy: boolean; label: string }) {
  return (
    <span
      className={cn(
        'absolute top-3.5 right-3.5 flex h-9 items-center rounded-full border-[1.5px] border-brand transition-colors duration-200 ease-out motion-reduce:transition-none',
        caseStudy ? 'bg-brand text-white' : 'bg-cream text-brand',
        'group-hover:bg-brand group-hover:text-white',
      )}
    >
      <span className="font-ko max-w-0 overflow-hidden text-sm leading-normal font-medium whitespace-nowrap opacity-0 transition-[max-width,opacity,padding] duration-200 ease-out group-hover:max-w-40 group-hover:pl-3.5 group-hover:opacity-100 motion-reduce:transition-none">
        {label}
      </span>
      <span className="grid size-[33px] shrink-0 place-items-center">
        {caseStudy ? (
          <ArrowRightIcon className="h-[9px] w-3.5" />
        ) : (
          <ExternalLinkIcon className="size-[18px]" />
        )}
      </span>
    </span>
  )
}

export default function ProjectGridCard({ project }: { project: Project }) {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isKo = i18n.language === 'ko'
  const copy = t(`projects.items.${project.slug}`, { returnObjects: true }) as {
    kind: string
    desc: string
    role: string
  }
  const name = isKo ? project.name.ko : project.name.en
  const period = project.members
    ? `${project.period} · ${t('projects.members', { count: project.members })}`
    : project.period

  const body = (
    <>
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="border-brand bg-cream relative aspect-[435/237] w-full overflow-hidden rounded-lg border-[1.5px]"
      >
        <div className="absolute inset-0 grid place-items-center">
          <img
            src={LOGOS[project.slug]}
            alt=""
            style={{ width: `${project.logoWidth}%` }}
            className="transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
        <LinkBadge
          caseStudy={!!project.caseStudy}
          label={t(project.caseStudy ? 'projects.caseStudy' : 'projects.visitSite')}
        />
      </motion.div>

      <SlideUp delay={0.1}>
        <div className="font-ko flex flex-wrap items-center gap-2">
          <p className="text-lg leading-normal font-medium">{name}</p>
          <span className="border-brand/40 rounded-[4px] border px-2 py-0.5 text-sm leading-normal font-medium whitespace-nowrap">
            {copy.kind}
          </span>
          {project.caseStudy && (
            <span className="bg-brand rounded-[4px] px-2 py-0.5 text-sm leading-normal font-medium whitespace-nowrap text-white">
              {t('projects.caseStudy')}
            </span>
          )}
        </div>
      </SlideUp>

      {copy.desc && (
        <SlideUp delay={0.18}>
          <p className="font-ko text-lg leading-[1.6] tracking-[-0.18px] break-keep">
            {copy.desc}
          </p>
        </SlideUp>
      )}

      {(copy.role || period) && (
        <SlideUp delay={0.26}>
          <div className="border-brand/40 flex items-center justify-between gap-3 border-t pt-2.5 text-sm">
            <p className="font-ko leading-normal font-medium">{copy.role}</p>
            <p className="font-sans whitespace-nowrap uppercase opacity-70">{period}</p>
          </div>
        </SlideUp>
      )}

      <SlideUp delay={0.34}>
        <div className="flex min-h-6 flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border-brand flex h-6 items-center rounded-lg border px-1.5 font-sans text-sm whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </SlideUp>
    </>
  )

  const className = 'group flex min-w-0 flex-col gap-3'
  const inner = project.caseStudy ? (
    <Link to={`/project/${project.slug}`} className={className}>
      {body}
    </Link>
  ) : project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  )

  return <li className="min-w-0">{inner}</li>
}
