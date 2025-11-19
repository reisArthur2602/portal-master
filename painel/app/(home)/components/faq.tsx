import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'Perdi meu código de acesso, o que fazer?',
        answer: 'Entre em contato com nossa clínica através do WhatsApp ou e-mail informado na seção de suporte. Nossa equipe irá gerar um novo código de acesso para você em instantes.',
    },
    {
        question: 'Meu exame não aparece no portal, por quê?',
        answer: 'Os exames são disponibilizados no portal assim que ficam prontos. Se seu exame ainda não aparece, pode ser que ainda esteja em processamento. Caso tenha passado do prazo informado, entre em contato com nosso suporte.',
    },
    {
        question: 'Posso acessar exames antigos?',
        answer: 'Sim! Todos os exames realizados em nossa clínica ficam disponíveis no portal por tempo indeterminado. Basta fazer login com seu CPF e código de acesso para visualizar todo o histórico.',
    },
    {
        question: 'O portal funciona em celular?',
        answer: 'Sim! O Portal Master é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar seus exames de qualquer dispositivo com internet.',
    },
    {
        question: 'Meus dados estão seguros?',
        answer: 'Absolutamente! Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus exames e informações pessoais são armazenados com máxima segurança.',
    },
    {
        question: 'Como faço para baixar meus exames?',
        answer: 'Após fazer login no portal, você verá a lista de seus exames disponíveis. Basta clicar no exame desejado e usar o botão de download para salvar o PDF em seu dispositivo.',
    },
];

export const FAQ = () => {
    return (
        <section
            id="faq"
            className={`py-8 md:py-16 transition-all duration-1000 opacity-100 translate-y-0`}
        >
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Perguntas frequentes
                    </h2>
                    <p className="text-lg text-muted-foreground font-normal">
                        Tire suas dúvidas sobre o Portal Master Clínica
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};
