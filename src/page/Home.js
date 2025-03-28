import { useAuthProtection } from './Auth';

export default function Home()
{
    useAuthProtection();
    return (
        <div>
            <h1>Home</h1>

        </div>
    )
}