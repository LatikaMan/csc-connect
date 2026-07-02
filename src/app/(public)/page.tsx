import HeroSection from '@/components/home/HeroSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServicesGrid from '@/components/home/ServicesGrid'
import StatsSection from '@/components/home/StatsSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesGrid />
      </main>
      <Footer />
    </>
  )
}