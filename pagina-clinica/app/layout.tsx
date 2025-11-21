import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const fontSans = Urbanist({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Portal Master | Acesse seus Exames e Resultados',
    description:
        'Visualize e acompanhe seus exames com facilidade. Portal Master oferece acesso rápido, seguro e intuitivo aos seus resultados médicos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className={`${fontSans.variable} font-sans antialiased`}>{children}</body>
        </html>
    );
}
