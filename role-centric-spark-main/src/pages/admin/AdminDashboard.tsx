import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsCard } from "@/components/layout/StatsCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Store, Star, Plus } from "lucide-react";
import { mockUsers, mockStores, mockRatings } from "@/utils/mockData";
import { UserManagement } from "./UserManagement";
import { StoreManagement } from "./StoreManagement";
import { AddUserForm } from "./AddUserForm";
import { AddStoreForm } from "./AddStoreForm";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);

  const totalUsers = mockUsers.length;
  const totalStores = mockStores.length;
  const totalRatings = mockRatings.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            System Administration
          </h1>
          <p className="text-muted-foreground">
            Manage users, stores, and monitor platform activity
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="stores">Store Management</TabsTrigger>
            <TabsTrigger value="forms">Add New</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                description="Active platform users"
              />
              <StatsCard
                title="Total Stores"
                value={totalStores}
                icon={Store}
                description="Registered stores"
              />
              <StatsCard
                title="Total Ratings"
                value={totalRatings}
                icon={Star}
                description="Customer reviews"
              />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="stores">
            <StoreManagement />
          </TabsContent>

          <TabsContent value="forms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New User</h3>
                  <Button
                    onClick={() => setShowAddUser(!showAddUser)}
                    variant={showAddUser ? "secondary" : "default"}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {showAddUser ? "Hide Form" : "Show Form"}
                  </Button>
                </div>
                {showAddUser && <AddUserForm />}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New Store</h3>
                  <Button
                    onClick={() => setShowAddStore(!showAddStore)}
                    variant={showAddStore ? "secondary" : "default"}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {showAddStore ? "Hide Form" : "Show Form"}
                  </Button>
                </div>
                {showAddStore && <AddStoreForm />}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};