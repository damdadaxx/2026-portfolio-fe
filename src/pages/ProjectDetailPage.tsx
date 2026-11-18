import { useParams } from 'react-router-dom'

import KtestCaseStudy from '@/components/features/project/case-study/KtestCaseStudy'
import MovingCaseStudy from '@/components/features/project/case-study/MovingCaseStudy'

// 케이스 스터디가 있는 프로젝트만 등록한다. 없는 slug 는 빈 페이지로 둔다
const CASE_STUDIES: Record<string, React.ComponentType> = {
  moving: MovingCaseStudy,
  'k-test': KtestCaseStudy,
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const CaseStudy = slug ? CASE_STUDIES[slug] : undefined

  return CaseStudy ? <CaseStudy /> : <section className="min-h-[60vh]" />
}
