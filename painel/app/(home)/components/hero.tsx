import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Hero = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center overflow-hidden  py-16 transition-all duration-1000 opacity-100 translate-y-0"
        >
            <div className="container mx-auto px-4 items-center">
                <div className="flex gap-8 py-20 lg:py-40 flex-col max-w-5xl mx-auto items-center justify-center">
                    <Badge variant="outline">✨ Acesso 100% seguro e protegido</Badge>

                    <div className="flex gap-6 flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-4xl tracking-tight text-center font-extrabold">
                            <span className="text-foreground">
                                Acesse seus exames online de forma
                            </span>
                            <span className="text-primary"> rápida</span>
                        </h1>

                        <p className="text-sm md:text-lg leading-relaxed tracking-normal max-w-2xl text-center">
                            Portal Master Clínica permite que você visualize e baixe seus resultados
                            de exames a qualquer hora, de qualquer lugar, com total segurança e
                            privacidade.
                        </p>
                        <Button size="lg" className="rounded-xl">
                            Acessar meus exames
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
