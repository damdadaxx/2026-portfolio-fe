import About from '@/components/features/landing/About/About'
import Contact from '@/components/features/landing/Contact/Contact'
import Hero from '@/components/features/landing/Hero/Hero'
import Projects from '@/components/features/landing/Projects/Projects'
import Skills from '@/components/features/landing/Skills/Skills'
import Footer from '@/components/ui/Footer/Footer'
import Header from '@/components/ui/Header/Header'

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-17.5 lg:pt-25">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
