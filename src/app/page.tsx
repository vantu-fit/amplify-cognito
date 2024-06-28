"use client"
import ConfigureAmplifyClientSide from '@/utils/config-amplify-client-side';
import '@aws-amplify/ui-react/styles.css';

export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConfigureAmplifyClientSide />
    </main>
  );
}
