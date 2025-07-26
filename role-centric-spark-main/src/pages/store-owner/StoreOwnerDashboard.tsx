import { useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsCard } from "@/components/layout/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";
import { mockStores, mockRatings, mockUsers } from "@/utils/mockData";
import { useAuth } from "@/components/auth/AuthContext";

export const StoreOwnerDashboard: React.FC = () => {
  const { user } = useAuth();

  const storeData = useMemo(() => {
    const store = mockStores.find(s => s.ownerId === user?.id);
    if (!store) return null;

    const storeRatings = mockRatings.filter(r => r.storeId === store.id);
    const ratingDetails = storeRatings.map(rating => {
      const ratingUser = mockUsers.find(u => u.id === rating.userId);
      return {
        ...rating,
        userName: ratingUser?.name || "Unknown User"
      };
    });

    return {
      store,
      ratings: ratingDetails,
      avgRating: store.avgRating,
      totalRatings: storeRatings.length
    };
  }, [user?.id]);

  if (!storeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-elegant">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">No Store Found</h2>
              <p className="text-muted-foreground">
                You don't have a store associated with your account.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {storeData.store.name}
          </h1>
          <p className="text-muted-foreground">
            Store analytics and customer feedback overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Average Rating"
            value={storeData.avgRating.toFixed(1)}
            icon={Star}
            description="Out of 5 stars"
          />
          <StatsCard
            title="Total Reviews"
            value={storeData.totalRatings}
            icon={Users}
            description="Customer ratings"
          />
          <StatsCard
            title="Rating Trend"
            value={storeData.avgRating >= 4 ? "Excellent" : storeData.avgRating >= 3 ? "Good" : "Needs Improvement"}
            icon={TrendingUp}
            description="Performance indicator"
          />
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Customer Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            {storeData.ratings.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeData.ratings.map((rating) => (
                      <TableRow key={rating.id}>
                        <TableCell className="font-medium">
                          {rating.userName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {renderStars(rating.rating)}
                            </div>
                            <Badge variant="secondary">
                              {rating.rating}/5
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Ratings Yet
                </h3>
                <p className="text-muted-foreground">
                  Your store hasn't received any customer ratings yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};