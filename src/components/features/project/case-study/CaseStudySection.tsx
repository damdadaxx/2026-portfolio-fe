import SlideUp from '@/components/ui/SlideUp/SlideUp'

/** 번호 + 이름이 왼쪽에, 내용이 오른쪽에 놓이는 케이스 스터디 공통 구역 */
export default function CaseStudySection({
  no,
  label,
  children,
}: {
  no: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="px-5 pt-20 lg:px-[min(4vw,60px)] lg:pt-[120px]">
      <div className="border-brand flex flex-col gap-6 border-t pt-8 lg:flex-row lg:gap-0 lg:pt-10">
        <div className="flex shrink-0 flex-col gap-2 lg:w-[min(19vw,360px)]">
          <p className="font-display text-[42px] leading-[44px]">
            <SlideUp>{no}</SlideUp>
          </p>
          <p className="font-ko text-lg leading-normal font-medium">
            <SlideUp delay={0.08}>{label}</SlideUp>
          </p>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  )
}
