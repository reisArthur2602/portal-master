import { FloatingWhatsApp } from '@/components/floating-whatsapp';

import { CTA } from './cta';
import { FAQ } from './faq';
import { Footer } from './footer';
import { Header } from './header';
import { Hero } from './hero';
import { HowItWorks } from './how-its-works';
import { VideoTutorial } from './video-tutorial';

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
