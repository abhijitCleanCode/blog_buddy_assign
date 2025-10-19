import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";

const Home = () => {
  return (
    <>
      <HeroSection
        title="Step Into World of Imagination"
        description="Original story and serialize fiction - where mystery, love and magic interwine. Welcome to the world of Imagination."
      />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default Home;
