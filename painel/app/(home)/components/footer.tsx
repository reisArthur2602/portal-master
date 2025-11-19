import { Shield } from 'lucide-react';

export const Footer = () => {
    return (
        <footer
            className={`border-t border-border/30 transition-all duration-1000 opacity-100 translate-y-0`}
        >
            <div className="container mx-auto px-4 py-20 flex flex-col 8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <div>
                        <h3 className="font-bold text-xl text-foreground mb-3">Portal Master</h3>
                        <p className="text-muted-foreground text-sm font-normal">
                            Acesso seguro e rápido aos seus exames online, disponível 24/7.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base text-foreground mb-3">
                            Links Úteis
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground font-normal">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Como funciona
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Perguntas frequentes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Suporte
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base text-foreground mb-3">
                            Informações Legais
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground font-normal">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Termos de Uso
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <span>Conforme LGPD</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
