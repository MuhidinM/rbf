"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { AgroCohortType } from "@/types/types";
import { useRouter } from "next/navigation";

interface CohortProps {
  data: AgroCohortType[];
}

const CohortClient: React.FC<CohortProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between pb-2 border-b">
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
            <Plus className="w-4 h-4" />
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
