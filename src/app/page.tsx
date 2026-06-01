import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import FeaturedGemstones from '@/app/components/FeaturedGemstones';
import Categories from '@/app/components/Categories';
import AboutUs from '@/app/components/AboutUs';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import Testimonials from '@/app/components/Testimonials';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/app/components/Footer';
import ScrollReveal from '@/app/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollReveal>
        <FeaturedGemstones />
        <Categories />
        <AboutUs />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </ScrollReveal>
      <Footer />
    </>
  );
}
