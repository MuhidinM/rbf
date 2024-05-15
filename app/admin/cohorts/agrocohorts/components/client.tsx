"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { CohortType } from "@/types/types";
import { useRouter } from "next/navigation";

interface CohortClientProps {
  data: CohortType[];
}

const CohortClient: React.FC<CohortClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex border-b pb-2 items-center justify-between">
        <Heading
          title={`Cohorts (${data.length})`}
          description="Manage cohorts from here"
        />
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => router.push(`/admin/cohorts/new`)}
          >
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      <DataTable
        searchKey="name"
        clickable={false}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default CohortClient;
