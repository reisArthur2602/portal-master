import { FloatingWhatsApp } from '@/components/floating-whatsapp';

import { CTA } from './components/cta';
import { FAQ } from './components/faq';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-its-works';
import { VideoTutorial } from './components/video-tutorial';

const App = () => {
    return (
        <div className="min-h-screen ">
            <Header />
            <Hero />
            <HowItWorks />
            <VideoTutorial />
            <FAQ />
            <CTA />
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default App;
