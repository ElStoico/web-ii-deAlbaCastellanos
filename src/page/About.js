import { useAuthProtection } from './Auth';

export default function About()
{
    useAuthProtection();
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}