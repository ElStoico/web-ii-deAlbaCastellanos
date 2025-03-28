import { useAuthProtection } from './Auth';

export default function Contact()
{
    useAuthProtection()
    return (
        <div>
            <h1>Contact</h1>
        </div>
    )
}