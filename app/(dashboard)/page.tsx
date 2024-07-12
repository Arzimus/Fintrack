'use client'
import Image from "next/image";

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";

export default function Home() {

  const { onOpen } = useNewAccount()
  return (
    <div>
      <Button onClick={onOpen}>accounts</Button>
      <h1>DashBoard page</h1>
    </div>
  );
}
