'use client'
import Image from "next/image";

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/DataGrid";
import { DataCharts } from "@/components/DataCharts";

export default function DashBoard() {

  const { onOpen } = useNewAccount()
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
