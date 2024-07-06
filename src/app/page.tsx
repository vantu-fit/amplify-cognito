"use client"
import { Button } from '@/components/ui/button';
import ConfigureAmplifyClientSide from '@/utils/config-amplify-client-side';
import '@aws-amplify/ui-react/styles.css';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConfigureAmplifyClientSide />
      <Button onClick={redirect('/auth')}>Login / Register</Button>
    </main>
  );
}
