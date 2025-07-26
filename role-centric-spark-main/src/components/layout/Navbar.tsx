import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">
              RoleApp
            </h1>
            <div className="hidden md:flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {user.role === 'admin' ? 'System Administrator' : 
                 user.role === 'store_owner' ? 'Store Owner' : 'User'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="hidden sm:block text-sm font-medium text-foreground">
              {user.name}
            </span>
            {(user.role === 'user' || user.role === 'store_owner') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/update-password')}
                className="hidden md:flex"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};