import Image from 'next/image';
import { LoginForm } from './login-form';

const LoginPage = async () => {
    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
            <aside className="flex items-center justify-center p-6">
                <div className="w-full max-w-md space-y-10">
                    <header className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Bem-vindo de volta 👋
                        </h1>
                        <p className="text-muted-foreground">Acesse sua conta para continuar.</p>
                    </header>

                    <LoginForm />
                </div>
            </aside>

            <aside className="relative hidden md:block">
                <Image
                    src="/banner-hero.png"
                    alt="Banner de login"
                    fill
                    className="object-cover"
                    priority
                />
            </aside>
        </div>
    );
};

export default LoginPage;
