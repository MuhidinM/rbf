"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";
import {
  LayoutDashboard,
  LineChart,
  Speech,
  Wallet,
  Weight,
} from "lucide-react";
import Fainc from "./components/Fainc";
import Ftainc from "./components/Ftainc";
import Ftaninc from "./components/Ftaninc";
import Weight1 from "./components/weight";
import Asset from "./components/asset";
import Literacy from "./components/literacy";
import Behavior from "./components/behavior";
import Experience from "./components/experience";

const AgroSettingsPage: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <Heading
          title={`Settings`}
          description="Manage all metrics from here"
        />
        <Separator className="my-2" />
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="flex items-center justify-start mb-4">
          <TabsTrigger value="summary" className="py-1">
            <LayoutDashboard className="w-5 h-5 mr-2" /> Summary
          </TabsTrigger>
          <TabsTrigger value="weight" className="py-1">
            <Weight className="w-5 h-5 mr-2" /> Weight
          </TabsTrigger>
          <TabsTrigger value="account" className="py-1">
            <Wallet className="w-5 h-5 mr-2" /> Account
          </TabsTrigger>
          <TabsTrigger value="fa" className="py-1">
            <LineChart className="w-5 h-5 mr-2" /> Farmer Business Growth
          </TabsTrigger>
          <TabsTrigger value="social" className="py-1">
            <Speech className="w-5 h-5 mr-2" /> Social Capital
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="summary"></TabsContent>
        <TabsContent value="weight">
          <Weight1 />
        </TabsContent>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="fa">
          <Fainc />
          <Ftainc />
          <Ftaninc />
          <Asset />
        </TabsContent>
        <TabsContent value="social">
          <Literacy />
          <Behavior />
          <Experience />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgroSettingsPage;
