import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** SPA 라우트가 바뀔 때마다 GA page_view 를 보낸다 (index.html 의 config 는 send_page_view: false) */
export function usePageView() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
}
