interface QueryProps {
    searchParams: Promise<{ cpf: string; codigo: string }>;
}

const QueryPage = async ({ searchParams }: QueryProps) => {
    const { cpf, codigo } = await searchParams;
    console.log(cpf, codigo);
    return (
        <div>
            <h1>Query Page</h1>
            <pre>{JSON.stringify(searchParams, null, 2)}</pre>
        </div>
    );
};

export default QueryPage;
