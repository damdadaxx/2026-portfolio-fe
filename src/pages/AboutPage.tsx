import AboutIntro from '@/components/features/about/AboutIntro'
import CareerLog from '@/components/features/about/CareerLog'
import CommitStrip from '@/components/features/about/CommitStrip'
import EducationColumns from '@/components/features/about/EducationColumns'
import SkillsList from '@/components/features/about/SkillsList'
import Contact from '@/components/features/landing/Contact/Contact'

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <CommitStrip />
      <CareerLog />
      <SkillsList />
      <EducationColumns />
      <Contact />
    </>
  )
}
