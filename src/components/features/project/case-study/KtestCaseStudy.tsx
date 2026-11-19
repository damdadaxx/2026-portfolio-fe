import problemProctor from '@/assets/images/case-study/k-test/problem-proctor.png'
import problemUpload from '@/assets/images/case-study/k-test/problem-upload.png'
import screenIdentity from '@/assets/images/case-study/k-test/screen-identity.png'
import screenReport from '@/assets/images/case-study/k-test/screen-report.png'
import screenSpeaking from '@/assets/images/case-study/k-test/screen-speaking.png'
import { PROJECTS } from '@/lib/constants/projects'

import CaseStudyPage from './CaseStudyPage'
import type { CaseStudyAssets } from './types'

const ASSETS: CaseStudyAssets = {
  videoId: 'qjli_cuHLkY',
  serviceUrl: PROJECTS.find((project) => project.slug === 'k-test')?.url ?? '#',
  githubFeUrl: 'https://github.com/damdadaxx/k-test-fe',
  screens: [
    { kind: 'image', src: screenIdentity },
    { kind: 'image', src: screenSpeaking },
    { kind: 'image', src: screenReport },
  ],
  screenAspect: '466/291',
  // 문제 해결 케이스 순서: 부정행위 감지, 실격 안내, 본인 인증 업로드, 음성 업로드
  problemCaptures: [problemProctor, undefined, problemUpload, undefined],
}

export default function KtestCaseStudy() {
  return <CaseStudyPage id="k-test" assets={ASSETS} />
}
