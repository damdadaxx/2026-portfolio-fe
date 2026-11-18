import chatBackdrop from '@/assets/images/case-study/moving/chat-backdrop.png'
import chatScreen from '@/assets/images/case-study/moving/chat-screen.png'
import lhDesktopAfter from '@/assets/images/case-study/moving/lh-desktop-after.png'
import lhDesktopBefore from '@/assets/images/case-study/moving/lh-desktop-before.png'
import lhMobileAfter from '@/assets/images/case-study/moving/lh-mobile-after.png'
import lhMobileBefore from '@/assets/images/case-study/moving/lh-mobile-before.png'
import screenRequest from '@/assets/images/case-study/moving/screen-request.png'
import screenSend from '@/assets/images/case-study/moving/screen-send.png'
import { PROJECTS } from '@/lib/constants/projects'

import CaseStudyPage from './CaseStudyPage'
import type { CaseStudyAssets } from './types'

const ASSETS: CaseStudyAssets = {
  videoId: 'gVe8OGmJXug',
  serviceUrl: PROJECTS.find((project) => project.slug === 'moving')?.url ?? '#',
  screens: [
    { kind: 'image', src: screenRequest },
    { kind: 'image', src: screenSend },
    { kind: 'overlay', backdrop: chatBackdrop, overlay: chatScreen },
  ],
  screenAspect: '466/262',
  performance: {
    desktopBefore: lhDesktopBefore,
    desktopAfter: lhDesktopAfter,
    mobileBefore: lhMobileBefore,
    mobileAfter: lhMobileAfter,
  },
}

export default function MovingCaseStudy() {
  return <CaseStudyPage id="moving" assets={ASSETS} />
}
