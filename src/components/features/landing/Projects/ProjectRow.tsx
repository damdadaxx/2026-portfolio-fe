import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import PillButton from '@/components/ui/PillButton/PillButton'
import type { Project } from '@/lib/constants/projects'

function Tag({ label }: { label: string }) {
  return (
    <div className="border-brand flex h-6 items-center rounded-[10px] border px-1.5 lg:h-8 lg:px-2">
      <p className="text-[14px] whitespace-nowrap lg:text-lg">{label}</p>
    </div>
  )
}

export default function ProjectRow({ project }: { project: Project }) {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'
  const name = isKo ? project.name.ko : project.name.en

  const buttonRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-brand relative flex min-w-0 flex-col gap-2.5 border-y py-4 lg:min-h-[90px] lg:flex-row lg:items-center lg:gap-0 lg:border-t lg:py-4"
    >
      <div className="flex items-start justify-between text-[14px] lg:contents lg:text-lg">
        <p className="lg:w-[clamp(4rem,7vw,8.5625rem)] lg:shrink-0">{project.id}</p>
        <p className="lg:hidden">{project.period}</p>
      </div>
      <p className="min-w-0 text-[28px] tracking-[-0.56px] lg:w-[clamp(10rem,21vw,25.625rem)] lg:shrink-0 lg:text-[clamp(1.5rem,2.1vw,2.5rem)] lg:tracking-[-0.8px]">
        {name}
      </p>
      <p className="hidden text-lg lg:block lg:w-[clamp(8rem,14vw,17.0625rem)] lg:shrink-0">
        {project.period}
      </p>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <span
        ref={buttonRef}
        className="absolute top-0 left-0 hidden lg:block"
        style={{
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <PillButton presentational label={t('projects.viewProject')} className="bg-cream" />
      </span>
    </a>
  )
}
