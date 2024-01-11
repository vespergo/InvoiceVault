import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Login',
  };
export default function LoginPage() {
  return (
<main className="flex flex-col items-center justify-center h-screen">
    <div className="mb-8"> 
        <AcmeLogo />
    </div>
    <div>
        <LoginForm />
    </div>
</main>

  );
}