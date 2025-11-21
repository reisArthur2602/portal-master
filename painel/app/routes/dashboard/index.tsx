import type { Route } from './+types';

export function meta(_: Route.MetaArgs) {
    return [
        { title: 'Dashboard' },
        { name: 'description', content: 'Acesse informações gerais e relatórios do sistema.' },
    ];
}

export default function DashboardRoute() {
    return (
        <div className='p-6'>
            <h2>Bem-vindo ao Dashboard</h2>
        </div>
    );
}
