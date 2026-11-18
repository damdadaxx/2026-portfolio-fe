import SlideUp from '@/components/ui/SlideUp/SlideUp'

import BrowserFrame from './BrowserFrame'
import Reveal from '@/components/ui/Reveal/Reveal'
import type { ServiceScreen } from './types'

type ServiceOverviewProps = {
  body: string
  labels: string[]
  screens: ServiceScreen[]
  /** 화면 영역 비율 (가로/세로). 프로젝트마다 캡처 비율이 다르다 */
  aspect: string
}

/** 서비스 소개 문단과, 브라우저 틀에 담긴 대표 화면 3개 */
export default function ServiceOverview({
  body,
  labels,
  screens,
  aspect,
}: ServiceOverviewProps) {
  return (
    <div className="flex flex-col gap-10">
      <p className="font-ko text-xl leading-[1.6] tracking-[-0.2px] break-keep lg:text-2xl lg:tracking-[-0.24px]">
        <SlideUp>{body}</SlideUp>
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {labels.map((label, index) => {
          const screen = screens[index]

          return (
            <Reveal key={label} delay={index * 0.12} className="min-w-0">
              <figure className="flex flex-col gap-3">
                <BrowserFrame>
                  <div
                    style={{ aspectRatio: aspect }}
                    className="relative w-full overflow-hidden bg-[#f7f7f7]"
                  >
                    {screen.kind === 'image' ? (
                      <img
                        src={screen.src}
                        alt=""
                        className="absolute inset-0 size-full object-cover object-top"
                      />
                    ) : (
                      <>
                        <img
                          src={screen.backdrop}
                          alt=""
                          className="absolute top-0 left-0 h-[291.6%] w-full object-cover"
                        />
                        <img
                          src={screen.overlay}
                          alt=""
                          className="absolute top-[1.5%] left-[57.7%] h-[96.9%] w-[38.2%] object-cover"
                        />
                      </>
                    )}
                  </div>
                </BrowserFrame>
                <figcaption className="font-ko text-sm leading-normal font-medium opacity-75">
                  {label}
                </figcaption>
              </figure>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
