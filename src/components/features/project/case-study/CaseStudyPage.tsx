import { useTranslation } from 'react-i18next'

import ColumnBlocks from './ColumnBlocks'
import CaseStudyIntro from './CaseStudyIntro'
import CaseStudySection from './CaseStudySection'
import NextProject from './NextProject'
import PerformanceReport from './PerformanceReport'
import ProblemCases from './ProblemCases'
import ServiceOverview from './ServiceOverview'
import type { CaseStudyAssets, CaseStudyContent } from './types'
import VideoHero from './VideoHero'

/**
 * 케이스 스터디 페이지의 공통 틀.
 * 본문은 번역 파일 `caseStudy.<id>`, 영상·링크·이미지는 `assets` 에서 가져온다.
 * 성능 측정은 `performance` 본문과 이미지가 모두 있을 때만 그려지고, 구역 번호는 그려진 순서대로 매긴다.
 */
export default function CaseStudyPage({
  id,
  assets,
}: {
  id: string
  assets: CaseStudyAssets
}) {
  const { t } = useTranslation()
  const content = t(`caseStudy.${id}`, { returnObjects: true }) as CaseStudyContent
  const { sections } = content

  const blocks: { label: string; node: React.ReactNode }[] = [
    {
      label: sections.intro,
      node: (
        <ServiceOverview
          body={content.intro.body}
          labels={content.intro.screens}
          screens={assets.screens}
          aspect={assets.screenAspect}
        />
      ),
    },
    { label: sections.scope, node: <ColumnBlocks columns={content.scope} /> },
    {
      label: sections.problems,
      node: (
        <ProblemCases
          cases={content.problems}
          labels={content.problemLabels}
          captures={assets.problemCaptures}
        />
      ),
    },
  ]
  if (content.performance && assets.performance && sections.performance) {
    blocks.push({
      label: sections.performance,
      node: (
        <PerformanceReport data={content.performance} captures={assets.performance} />
      ),
    })
  }
  blocks.push({ label: sections.retro, node: <ColumnBlocks columns={content.retro} /> })

  return (
    <>
      <CaseStudyIntro
        content={content}
        serviceUrl={assets.serviceUrl}
        githubFeUrl={assets.githubFeUrl}
        githubBeUrl={assets.githubBeUrl}
      />
      <VideoHero
        videoId={assets.videoId}
        title={content.title}
        placeholder={content.hero}
      />

      {blocks.map((block, index) => (
        <CaseStudySection
          key={block.label}
          no={String(index + 1).padStart(2, '0')}
          label={block.label}
        >
          {block.node}
        </CaseStudySection>
      ))}

      <NextProject next={content.next} />
    </>
  )
}
