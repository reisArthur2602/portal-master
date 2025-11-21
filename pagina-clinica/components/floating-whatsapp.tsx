'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent('Olá! Preciso de ajuda para acessar meus exames.');

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white border-0  hover:animate-none hover:scale-110 transition-all duration-300 p-0 flex items-center justify-center"
            aria-label="Fale conosco no WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />
        </Button>
    );
};
