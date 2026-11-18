import { useTranslation } from 'react-i18next'

import SlideUp from '@/components/ui/SlideUp/SlideUp'

type Column = { title: string; items: { date: string; text: string }[] }

export default function EducationColumns() {
  const { t } = useTranslation()
  const columns = [
    t('aboutPage.more.education', { returnObjects: true }) as Column,
    t('aboutPage.more.awards', { returnObjects: true }) as Column,
  ]

  return (
    <section className="font-ko grid grid-cols-1 gap-12 px-5 pt-12 pb-[72px] lg:grid-cols-2 lg:gap-10 lg:px-[min(4vw,60px)] lg:pt-20 lg:pb-40">
      {columns.map((column, columnIndex) => (
        <div key={column.title} className="flex flex-col">
          <h2 className="pb-6 text-xl leading-normal font-medium tracking-[-0.4px] lg:leading-[1.4] lg:text-[40px] lg:tracking-[-0.8px]">
            <SlideUp delay={columnIndex * 0.1}>{column.title}</SlideUp>
          </h2>
          <ul>
            {column.items.map((item) => (
              <li
                key={item.date + item.text}
                className="border-brand flex gap-4 border-t py-[18px] lg:gap-6"
              >
                <span className="w-24 shrink-0 font-sans text-sm uppercase opacity-60 lg:w-[130px]">
                  {item.date}
                </span>
                <span className="min-w-0 flex-1 text-[13px] leading-normal font-medium lg:text-lg">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
