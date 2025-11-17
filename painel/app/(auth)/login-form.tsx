'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRoundIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { authenticatedUser } from '../http/authenticated-user';

const schema = z.object({
    email: z.string('Campo obrigatório').email('Formato de email inválido'),
    password: z.string('Campo obrigatório').min(3, 'A senha deve conter no mínimo 3 caracteres'),
});

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = form.handleSubmit(async (data: z.infer<typeof schema>) => {
        authenticatedUser(data);
    });
    
    const loading = form.formState.isSubmitting;
    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        disabled={loading}
                                        type="email"
                                        placeholder="email@email.com"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        <MailIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput
                                        type="password"
                                        placeholder="******"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        <KeyRoundIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={loading}>
                    {loading ? (
                        <>
                            {' '}
                            <Spinner />
                            Carregando...
                        </>
                    ) : (
                        'Acessar Painel'
                    )}
                </Button>
            </form>
        </Form>
    );
};
