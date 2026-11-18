import { useTranslation } from 'react-i18next'

import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import SlideUp from '@/components/ui/SlideUp/SlideUp'

import Tag from '../project/case-study/Tag'

// 기술 이름은 고유명사라 번역하지 않는다. 이력서 기술 스택 기준 초안이다.
const SKILLS: { label: string; tags: string[] }[] = [
  {
    label: 'Frontend',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Styled-components',
      'TanStack Query',
      'Zustand',
    ],
  },
  {
    label: 'Backend',
    tags: [
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Supabase',
      'Zod',
      'Socket.IO',
      'Redis',
      'MongoDB',
    ],
  },
  {
    label: 'Test · Deploy',
    tags: ['Jest', 'Lighthouse', 'Vercel', 'AWS', 'GitHub Actions'],
  },
  { label: 'Collaboration', tags: ['Git', 'GitHub', 'Notion', 'Figma', 'Discord'] },
  { label: 'Etc.', tags: ['Three.js', 'Photoshop', 'Illustrator'] },
]

export default function SkillsList() {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-5 px-5 pt-[72px] pb-6 lg:gap-14 lg:px-[min(4vw,60px)] lg:py-[120px]">
      <SectionTitle title={t('aboutPage.skills.title')} />

      <div className="flex flex-col">
        {SKILLS.map((row, index) => (
          <div
            key={row.label}
            className="border-brand flex flex-col gap-3 border-b py-5 lg:flex-row lg:items-center lg:gap-12 lg:py-7"
          >
            <p className="font-sans text-sm uppercase lg:text-lg lg:w-[min(16vw,312px)] lg:shrink-0">
              <SlideUp delay={index * 0.05}>{row.label}</SlideUp>
            </p>
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5 lg:gap-2">
              {row.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
