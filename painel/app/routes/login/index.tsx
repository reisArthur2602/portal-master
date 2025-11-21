import { LoginForm } from '~/components/pages/login/login-form';
import type { Route } from './+types';

export function meta(_: Route.MetaArgs) {
    return [
        { title: 'Acesso à Plataforma' },
        { name: 'description', content: 'Faça login para acessar sua conta.' },
    ];
}

export default function LoginRoute() {
    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-sm w-full grid">
                <h2>Entrar</h2>
                <p className="lead">Acesse sua conta para continuar.</p>
                <LoginForm />
                <footer className="small text-muted-foreground text-center">
                    Ao continuar, você concorda com nossos{' '}
                    <span className="hover:underline cursor-pointer underline hover:text-primary transition-all duration-300">
                        Termos de Uso{' '}
                    </span>
                    e nossa{' '}
                    <span className="hover:underline cursor-pointer underline hover:text-primary">
                        Política de Privacidade.
                    </span>
                </footer>
            </div>
        </div>
    );
}
