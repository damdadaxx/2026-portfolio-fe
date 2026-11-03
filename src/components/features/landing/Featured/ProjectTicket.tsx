import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import projectKtest from '@/assets/images/project-ktest.png'
import projectMoving from '@/assets/images/project-moving.png'
import ticketLine from '@/assets/icons/ticket-line.svg'
import ticketNotch from '@/assets/icons/ticket-notch.svg'

const TICKET_IMAGE: Record<string, string> = {
  moving: projectMoving,
  'k-test': projectKtest,
}

export type TicketItem = {
  id: string
  name: string
  meta: string
  desc: string
  stack: string
  stats: { value: string; label: string }[]
}

export default function ProjectTicket({ item }: { item: TicketItem }) {
  const { t } = useTranslation()

  return (
    <article className="font-ko text-brand flex w-full flex-col">
      <div className="bg-cream flex flex-col gap-3.5 rounded-t-3xl p-7">
        <img
          src={TICKET_IMAGE[item.id]}
          alt={t('featured.imageLabel', { name: item.name })}
          className="aspect-[1200/630] w-full rounded-lg object-cover"
        />
        <p className="text-[13px] leading-normal font-medium opacity-80 lg:text-[14px]">{item.meta}</p>
        <p className="text-[28px] leading-[1.3] tracking-[-0.56px] lg:text-[40px] lg:tracking-[-0.8px]">{item.name}</p>
        <p className="text-[15px] leading-[1.6] tracking-[-0.15px] break-keep lg:text-lg lg:tracking-[-0.18px]">{item.desc}</p>
        <p className="font-sans text-xs uppercase opacity-70 lg:text-[14px] lg:tracking-[1.12px]">{item.stack}</p>
      </div>

      <div className="bg-cream relative flex h-6 items-center overflow-hidden px-[26px]">
        <img src={ticketLine} alt="" className="h-[1.5px] w-full" />
        <img src={ticketNotch} alt="" className="absolute top-0 -left-3 size-6" />
        <img src={ticketNotch} alt="" className="absolute top-0 -right-3 size-6" />
      </div>

      <div className="bg-cream flex flex-col gap-[18px] rounded-b-3xl p-7">
        <p className="font-sans text-[14px] tracking-[1.12px] uppercase">{t('featured.keyResults')}</p>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
          {item.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between gap-3 lg:min-w-0 lg:flex-1 lg:flex-col lg:items-start lg:justify-start lg:gap-1"
            >
              <p className="shrink-0 text-[15px] leading-[1.6] tracking-[-0.15px] lg:text-2xl lg:tracking-[-0.24px]">
                {stat.value}
              </p>
              <p className="text-right text-[13px] leading-normal font-medium break-keep opacity-75 lg:text-left lg:text-[14px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <Link
          to={`/project/${item.id}`}
          className="bg-brand w-full cursor-pointer rounded-[10px] px-5 py-[18px] text-center font-sans text-lg text-white lg:text-xl"
        >
          {t('featured.caseStudy')}
        </Link>
      </div>
    </article>
  )
}
