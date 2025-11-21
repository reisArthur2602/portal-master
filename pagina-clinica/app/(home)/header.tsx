'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Lock, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Tutorial', href: '#tutorial' },
    { label: 'FAQ', href: '#faq' },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-xl  border-b border-primary/10'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Logo />
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                    {/* Desktop CTA */}
                    <div className="hidden lg:block">
                        <Button size="default">
                            <Lock className="w-4 h-4" />
                            Acessar Exames
                        </Button>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden py-4 border-t border-primary/10 animate-in slide-in-from-top-2 duration-300"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                        }}
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}

                            <Button className="w-full">Acessar Exames</Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
