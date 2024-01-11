import { lusitana } from '@/app/ui/fonts';
import Settings from '@/app/ui/settings/settings';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div>
        <Settings />
      </div>
    </div>
  );
}
