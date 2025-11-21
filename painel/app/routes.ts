import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    // Página de login
    index('routes/login/index.tsx'),

    route('dashboard', 'components/dashboard-layout.tsx', [
        index('routes/dashboard/index.tsx'),
        // route('exames', 'routes/dashboard/exames.tsx'),
        // route('pacientes', 'routes/dashboard/pacientes.tsx'),
        // route('config', 'routes/dashboard/config.tsx'),
    ]),
] satisfies RouteConfig;
