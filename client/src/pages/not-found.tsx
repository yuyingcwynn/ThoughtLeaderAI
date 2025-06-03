import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="gradient-bg text-white font-semibold"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
