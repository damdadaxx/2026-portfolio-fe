import { useTranslation } from 'react-i18next'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import Reveal from '@/components/ui/Reveal/Reveal'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { SOCIAL_LINKS } from '@/lib/constants/socials'
import { cn } from '@/utils/cn'

const GITHUB_URL = SOCIAL_LINKS.find((social) => social.label === 'GitHub')?.href ?? '#'

export default function AboutIntro() {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <section className="font-ko flex flex-col items-start gap-4 px-5 pt-[72px] pb-6 lg:gap-9 lg:px-[min(4vw,60px)] lg:pt-[140px] lg:pb-[120px]">
      <h1
        className={cn(
          isKo
            ? 'font-display-ko text-[40px] leading-[1.15] tracking-[-0.4px] lg:text-[clamp(4rem,5vw,6rem)] lg:tracking-[-0.96px]'
            : 'font-display text-[40px] leading-[1.1] lg:text-[clamp(3rem,4.2vw,5rem)] lg:leading-[0.96]',
        )}
      >
        <SlideUp>{t('aboutPage.intro.title')}</SlideUp>
      </h1>
      <p className="text-xl leading-normal tracking-[-0.4px] break-keep lg:leading-[1.4] lg:text-[clamp(1.5rem,2vw,2.375rem)] lg:tracking-[-0.76px]">
        <SlideUp delay={0.15}>{t('aboutPage.intro.lead')}</SlideUp>
      </p>
      <p className="text-[15px] leading-[1.6] tracking-[-0.15px] break-keep opacity-85 lg:text-2xl lg:tracking-[-0.24px]">
        <SlideUp delay={0.25}>{t('aboutPage.intro.body')}</SlideUp>
      </p>
      <Reveal delay={0.4}>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand border-brand hover:text-brand hover:bg-transparent flex h-[46px] items-center gap-2 rounded-lg border pr-4 pl-5 font-sans text-sm whitespace-nowrap text-white uppercase lg:text-lg transition-colors duration-200 motion-reduce:transition-none"
        >
          {t('aboutPage.intro.github')}
          <span className="grid size-6 place-items-center">
            <ArrowRightIcon className="h-[11px] w-[17px]" />
          </span>
        </a>
      </Reveal>
    </section>
  )
}
