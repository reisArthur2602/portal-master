import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const NAVLINKS = [
    { label: 'Overview', to: '' },
    { label: 'Pacientes', to: 'pacientes' },
    { label: 'Exames', to: 'exames' },
    { label: 'Usuários', to: 'usuarios' },
];

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b bg-muted/10">
            <div className="max-w-6xl mx-auto w-full grid">
                {/* Logo */}
                <div className="flex items-center justify-between p-4 md:px-0">
                    <h3 className="font-heading text-xl">Portal Master</h3>
                    <div className="flex items-center gap-3">
                        Avatar
                        {/* Mobile toggle */}
                        <button
                            className="md:hidden text-muted-foreground"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>

                <nav className="hidden md:flex items-baseline gap-2">
                    {NAVLINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} end>
                            {({ isActive }) => (
                                <span
                                    className={cn(
                                        buttonVariants({
                                            variant: 'ghost',

                                            className: `
                                                rounded-none w-fit text-muted-foreground
                                                transition-all duration-200 hover:bg-transparent
                                                ${
                                                    isActive
                                                        ? 'text-primary border-b border-primary'
                                                        : 'hover:border-b hover:border-primary hover:text-primary '
                                                }
                                            `,
                                        })
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Mobile dropdown menu */}
            {open && (
                <nav className="md:hidden grid gap-1 border-t  ">
                    {NAVLINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} end onClick={() => setOpen(false)}>
                            {({ isActive }) => (
                                <span
                                    className={cn(
                                        buttonVariants({
                                            variant: 'ghost',

                                            className: `
                                                justify-start w-full text-muted-foreground p-6
                                                transition-all duration-200 hover:bg-transparent
                                                ${
                                                    isActive
                                                        ? 'text-primary border-primary '
                                                        : 'hover:text-primary hover:border-primary'
                                                }
                                            `,
                                        })
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
};
