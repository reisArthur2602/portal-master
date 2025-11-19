'use client';

import z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatCPF } from '@/lib/format-cpf';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    cpf: z
        .string()
        .trim()
        .min(11, 'CPF deve ter 11 dígitos')
        .max(14, 'CPF inválido')
        .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido'),
    codigo: z
        .string()
        .trim()
        .min(6, 'Código deve ter no mínimo 6 caracteres')
        .max(50, 'Código muito longo'),
});

export const SearchExamForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: '',
            codigo: '',
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('Redirecionando para o portal...', values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4  p-6 rounded-xl border border-primary/10  w-full"
            >
                <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-semibold">CPF</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="000.000.000-00"
                                    {...field}
                                    onChange={(e) => {
                                        const formatted = formatCPF(e.target.value);
                                        field.onChange(formatted);
                                    }}
                                    maxLength={14}
                                    className="h-12"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="codigo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                                Código do Exame
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite o código de acesso"
                                    {...field}
                                    maxLength={50}
                                    className="h-12"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="lg" className="w-full text-base h-12">
                    <Search className="size-5" />
                    Consultar Exame
                </Button>
            </form>
        </Form>
    );
};
