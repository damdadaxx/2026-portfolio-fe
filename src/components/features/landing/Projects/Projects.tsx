import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import plusIcon from '@/assets/icons/plus.svg'
import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import { PROJECTS } from '@/lib/constants/projects'
import {
  SCROLL_REVEAL_INITIAL,
  SCROLL_REVEAL_TRANSITION,
  SCROLL_REVEAL_VIEWPORT,
  SCROLL_REVEAL_WHILE_IN_VIEW,
} from '@/lib/motion/scrollReveal'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import ProjectRow from './ProjectRow'

// TODO: 프로젝트 전체 목록 페이지가 생기면 true로 전환
const SHOW_VIEW_MORE = false

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.1) } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Projects() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id="projects"
      className="overflow-x-hidden px-5 pt-18 pb-6 lg:p-[min(7vw,150px)]"
      initial={shouldReduceMotion ? undefined : SCROLL_REVEAL_INITIAL}
      whileInView={shouldReduceMotion ? undefined : SCROLL_REVEAL_WHILE_IN_VIEW}
      viewport={SCROLL_REVEAL_VIEWPORT}
      transition={SCROLL_REVEAL_TRANSITION}
    >
      <SectionTitle title={t('projects.title')} showAction={false} />

      <motion.div
        className="mt-8 flex flex-col lg:mt-25"
        variants={shouldReduceMotion ? undefined : listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={SCROLL_REVEAL_VIEWPORT}
      >
        {PROJECTS.map((project) => (
          <motion.div key={project.id} variants={shouldReduceMotion ? undefined : itemVariants}>
            <ProjectRow project={project} />
          </motion.div>
        ))}
      </motion.div>

      {SHOW_VIEW_MORE && (
        <div className="mt-8 flex justify-center lg:mt-25">
          <a href="#" className={cn('flex w-fit items-center gap-3', HOVER_UNDERLINE)}>
            <img src={plusIcon} alt="" className="size-6" />
            <span className="text-[13px] font-medium uppercase lg:text-lg lg:font-normal">
              {t('projects.viewMore')}
            </span>
          </a>
        </div>
      )}
    </motion.section>
  )
}
