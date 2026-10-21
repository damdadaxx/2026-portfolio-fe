import About from '@/components/features/landing/About/About'
import Contact from '@/components/features/landing/Contact/Contact'
import Hero from '@/components/features/landing/Hero/Hero'
import Projects from '@/components/features/landing/Projects/Projects'
import Skills from '@/components/features/landing/Skills/Skills'
import Header from '@/components/ui/Header/Header'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
