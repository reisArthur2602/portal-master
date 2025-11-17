import { getProfile } from '@/app/http/get-profile';

const CreateAccountPage = async () => {
    const user = await getProfile();

    return <div>CreateAccountPage </div>;
};

export default CreateAccountPage;
