import { FeatureSteps } from './feature-steps';

const features = [
    {
        step: 'Passo 1',
        title: 'Localize seu código',
        content: 'Encontre o código de acesso único enviado junto com seus exames',
        image: '/step1.jpg',
    },
    {
        step: 'Passo 2',
        title: 'Informe CPF + Código',
        content: 'Digite seu CPF e o código de acesso na tela de login do portal',
        image: '/step2.jpg',
    },
    {
        step: 'Passo 3',
        title: 'Visualize seus exames',
        content: 'Acesse, visualize e baixe seus resultados em formato PDF',
        image: '/step3.jpg',
    },
    {
        step: 'Passo 4',
        title: 'Guarde com segurança',
        content: 'Mantenha seus exames salvos em local seguro para futuras consultas',
        image: '/step3.jpg',
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="como-funciona"
            className="py-8 md:py-16 transition-all duration-1000 opacity-100 translate-y-0"
        >
            <div className="container mx-auto px-4">
                <FeatureSteps features={features} title="Como funciona?" autoPlayInterval={4000} />
            </div>
        </section>
    );
};
