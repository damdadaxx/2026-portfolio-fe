import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

import BrowserFrame from './BrowserFrame'
import Reveal from '@/components/ui/Reveal/Reveal'
import { BODY } from './styles'
import Tag from './Tag'
import type { CaseStudyContent } from './types'

/** 문제 → 원인 → 해결 → 결과 4단으로 쓴 문제 해결 케이스 목록 */
export default function ProblemCases({
  cases,
  labels,
  captures,
}: {
  cases: CaseStudyContent['problems']
  labels: CaseStudyContent['problemLabels']
  /** 케이스와 같은 순서의 캡처 이미지. 없는 케이스는 비워 둔다 */
  captures?: (string | undefined)[]
}) {
  const keys = ['problem', 'cause', 'fix', 'result'] as const

  return (
    <div className="flex flex-col">
      {cases.map((item, index) => (
        <article
          key={item.title}
          className={cn(
            'flex flex-col gap-6 py-10 lg:py-14',
            index === 0 && 'pt-0 lg:pt-0',
            index < cases.length - 1 && 'border-brand border-b',
            index === cases.length - 1 && 'pb-0 lg:pb-0',
          )}
        >
          <Reveal className="flex gap-1.5">
            {item.tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </Reveal>
          <h3 className="font-ko text-2xl leading-[1.5] tracking-[-0.48px] break-keep lg:text-[32px] lg:tracking-[-0.64px]">
            <SlideUp delay={0.08}>{item.title}</SlideUp>
          </h3>
          {keys.map((key, i) => (
            <div key={key} className="flex flex-col gap-1 lg:flex-row lg:gap-6">
              <p className="font-ko text-lg leading-normal font-medium text-brand lg:w-20 lg:shrink-0">
                <SlideUp delay={0.16 + i * 0.08}>{labels[i]}</SlideUp>
              </p>
              <p className={cn(BODY, 'min-w-0 flex-1')}>
                <SlideUp delay={0.2 + i * 0.08}>{item[key]}</SlideUp>
              </p>
            </div>
          ))}
          {captures?.[index] && (
            <Reveal className="flex flex-col gap-3">
              <div className="flex justify-center rounded-xl bg-[#eae8e1] px-4 py-8">
                <BrowserFrame className="max-w-[762px]">
                  <img
                    src={captures[index]}
                    alt={item.capture ?? ''}
                    className="aspect-[760/475] w-full object-cover object-top"
                  />
                </BrowserFrame>
              </div>
              {item.capture && (
                <p className="font-ko text-sm leading-normal font-medium opacity-75">
                  {item.capture}
                </p>
              )}
            </Reveal>
          )}
        </article>
      ))}
    </div>
  )
}
