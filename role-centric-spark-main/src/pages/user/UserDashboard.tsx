import { Navbar } from "@/components/layout/Navbar";
import { StoreExplorer } from "./StoreExplorer";

export const UserDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Store Explorer
          </h1>
          <p className="text-muted-foreground">
            Discover stores and share your experiences through ratings
          </p>
        </div>

        <StoreExplorer />
      </div>
    </div>
  );
};