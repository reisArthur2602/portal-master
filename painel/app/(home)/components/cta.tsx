import { cn } from '@/lib/utils';
import { ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => {
    return (
        <section className="py-8 md:py-16 transition-all duration-1000 opacity-100 translate-y-0">
            <div className="container mx-auto px-4">
                <div
                    className={cn(
                        'max-w-5xl py-16 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center rounded-2xl p-10 text-white shadow-2xl'
                    )}
                    style={{ background: 'var(--gradient-cta)' }}
                >
                    <div className="flex items-center gap-2 px-3 py-1">
                        <div className="flex items-center -space-x-2">
                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                                <ShieldCheck className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <p className="font-medium text-white">
                            Mais de 6 mil pacientes confiam no Portal Master
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xl mt-5 bg-linear-to-r from-white to-secondary/50 text-transparent bg-clip-text">
                        Pronto para acessar seus exames?
                    </h1>

                    <p className="text-white/90 text-lg mt-4 max-w-2xl font-normal">
                        Entre agora no Portal Master e visualize seus resultados de forma rápida,
                        segura e conveniente. Seu CPF + código de acesso é tudo que você precisa.
                    </p>

                    <Link
                        href="/to"
                        className="px-8 py-3 text-primary bg-white hover:bg-white/90 transition-all rounded-full uppercase text-sm font-semibold mt-8 hover:shadow-xl"
                    >
                        Consultar meus exames
                    </Link>
                </div>
                ;
            </div>
        </section>
    );
};
