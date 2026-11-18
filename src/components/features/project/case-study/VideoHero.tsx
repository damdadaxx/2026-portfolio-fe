import { useTranslation } from 'react-i18next'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'

import BrowserFrame from './BrowserFrame'
import LoopVideo from './LoopVideo'
import Reveal from './Reveal'

/** 반복 재생되는 대표 영상과, 자동 재생 안내·원본 영상 링크 한 줄 */
export default function VideoHero({
  videoId,
  title,
  placeholder,
}: {
  /** 없으면 영상 대신 자리 표시만 보여 주고, 안내 줄도 그리지 않는다 */
  videoId?: string
  title: string
  placeholder?: string
}) {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-4 px-5 pb-6 lg:px-[min(4vw,60px)] lg:pb-10">
      <Reveal>
        <BrowserFrame size="lg">
          {videoId ? (
            <LoopVideo videoId={videoId} title={title} />
          ) : (
            <div className="font-ko grid aspect-video w-full place-items-center bg-[#e8e7e2] px-4 text-center text-sm leading-normal font-medium opacity-60">
              {placeholder}
            </div>
          )}
        </BrowserFrame>
      </Reveal>

      {videoId && (
        <Reveal
          delay={0.1}
          className="font-ko flex flex-wrap items-center justify-between gap-3"
        >
          <p className="flex items-center gap-2 text-sm leading-normal font-medium opacity-75">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
            {t('caseStudy.ui.videoStatus')}
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand hover:bg-brand flex h-[46px] items-center gap-2 rounded-lg border pr-4 pl-5 text-sm leading-normal font-medium whitespace-nowrap transition-colors duration-200 hover:text-white motion-reduce:transition-none"
          >
            {t('caseStudy.ui.watchVideo')}
            <span className="grid size-6 place-items-center">
              <ArrowRightIcon className="h-[11px] w-[17px]" />
            </span>
          </a>
        </Reveal>
      )}
    </section>
  )
}
