/** 번역 파일(`caseStudy.<id>`)에 들어 있는 케이스 스터디 본문 */
export type CaseStudyContent = {
  chips: string[]
  title: string
  oneLiner: string[]
  stats: { label: string; value: string; sub: string }[]
  stack: string[]
  links: { service: string; githubFe: string; githubBe: string }
  /** 영상이 없을 때 대표 화면 자리에 보여 줄 문구 */
  hero?: string
  sections: Record<'intro' | 'scope' | 'problems' | 'retro', string> & {
    performance?: string
  }
  intro: { body: string; screens: string[] }
  scope: ColumnBlock[]
  problemLabels: [string, string, string, string]
  problems: {
    tags: string[]
    title: string
    problem: string
    cause: string
    fix: string
    result: string
    /** 케이스 아래에 붙는 캡처 이미지의 설명. 이미지는 assets.problemCaptures 의 같은 순서 */
    capture?: string
  }[]
  /** 성능 측정이 없는 프로젝트는 비워 둔다 */
  performance?: {
    lead: string
    head: string[]
    rows: string[][]
    conditions: { title: string; rows: { label: string; value: string }[] }
    note: string
    captures: Record<'before' | 'after' | 'desktop' | 'mobile' | 'score', string>
    captionScores: { desktop: [number, number]; mobile: [number, number] }
  }
  retro: ColumnBlock[]
  next: { slug: string; name: string; desc: string }
}

/** 제목 + 항목 목록 또는 문단으로 이루어진 열 하나 */
export type ColumnBlock = { title: string; items?: string[]; paragraphs?: string[] }

/** 서비스 소개의 대표 화면. overlay 는 뒷배경 위에 작은 화면을 겹쳐 보여 준다 */
export type ServiceScreen =
  { kind: 'image'; src: string } | { kind: 'overlay'; backdrop: string; overlay: string }

export type PerformanceImages = Record<
  'desktopBefore' | 'desktopAfter' | 'mobileBefore' | 'mobileAfter',
  string
>

/** 번역하지 않는 프로젝트별 자료: 영상, 링크, 이미지 */
export type CaseStudyAssets = {
  /** 없으면 영상 대신 자리 표시를 보여 준다 */
  videoId?: string
  serviceUrl: string
  githubFeUrl?: string
  githubBeUrl?: string
  screens: ServiceScreen[]
  /** 서비스 소개 화면의 가로/세로 비율 */
  screenAspect: string
  /** 문제 해결 케이스별 캡처 이미지. 없는 케이스는 비워 둔다 */
  problemCaptures?: (string | undefined)[]
  performance?: PerformanceImages
}
