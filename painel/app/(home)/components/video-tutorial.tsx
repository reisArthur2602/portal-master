export const VideoTutorial = () => {
    return (
        <section id="tutorial" className="py-8 md:py-16 duration-1000 opacity-100 translate-y-0">
            <div className="container mx-auto px-4 ">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Tutorial em vídeo
                    </h2>
                    <p className="text-lg text-muted-foreground font-normal">
                        Assista ao passo a passo completo de como acessar seus exames no Portal
                        Master
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/videos/tutorial.mp4" type="video/mp4" />
                    </video>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Dúvidas? Assista ao vídeo quantas vezes precisar ou entre em contato com
                            nosso suporte
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
