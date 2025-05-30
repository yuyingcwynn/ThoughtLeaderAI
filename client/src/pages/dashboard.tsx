import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Plus, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface UserBalance {
  totalHours: number;
  usedHours: number;
  availableHours: number;
}

interface UserSession {
  id: number;
  hoursUsed: number;
  sessionDate: string;
  status: string;
  calendlyEventId?: string;
}

interface Consultation {
  id: number;
  packageType: string;
  packageHours: number;
  amount: number;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from URL params (from booking flow)
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Fetch user balance
  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ['/api/user/balance', userEmail],
    enabled: !!userEmail,
  });

  // Fetch user sessions
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/user/sessions', userEmail],
    enabled: !!userEmail,
  });

  // Fetch user consultations (purchase history)
  const { data: consultations, isLoading: consultationsLoading } = useQuery({
    queryKey: ['/api/user/consultations', userEmail],
    enabled: !!userEmail,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'no-show': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold mb-6">Access Required</h1>
              <p className="text-xl text-gray-600 mb-8">
                Please complete a booking to access your dashboard.
              </p>
              <Button onClick={() => setLocation("/checkout")}>
                Book AI Expert Session
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Your AI Expert <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Manage your consultation hours and session history
              </p>
            </motion.div>

            {/* Balance Overview */}
            <motion.div
              className="grid lg:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Hours Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {balanceLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  ) : balance ? (
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">
                        {balance.availableHours}h
                      </div>
                      <p className="text-sm text-gray-600">
                        {balance.usedHours}h used of {balance.totalHours}h total
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-gray-400 mb-2">0h</div>
                      <p className="text-sm text-gray-600">No hours purchased</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setLocation("/checkout")}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Buy More Hours
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const baseUrl = balance?.availableHours && balance.availableHours >= 0.5 
                        ? 'https://calendly.com/yuyingcwynn/ai-discussion'
                        : 'https://calendly.com/yuyingcwynn/ai-expertise';
                      window.open(`${baseUrl}?prefill_email=${encodeURIComponent(userEmail)}`, '_blank');
                    }}
                    className="w-full"
                    disabled={!balance || balance.availableHours <= 0}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-sm">{userEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sessions Completed</label>
                      <p className="text-sm">
                        {sessions?.filter((s: UserSession) => s.status === 'completed').length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Session History */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  {sessionsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : sessions && sessions.length > 0 ? (
                    <div className="space-y-4">
                      {sessions.slice(0, 5).map((session: UserSession) => (
                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(session.status)}
                            <div>
                              <p className="font-medium">{session.hoursUsed}h session</p>
                              <p className="text-sm text-gray-500">
                                {new Date(session.sessionDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No sessions yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                  {consultationsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : consultations && consultations.length > 0 ? (
                    <div className="space-y-4">
                      {consultations.slice(0, 5).map((consultation: Consultation) => (
                        <div key={consultation.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{consultation.packageType} Package</p>
                            <p className="text-sm text-gray-500">
                              {consultation.packageHours}h • ${(consultation.amount / 100).toFixed(0)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(consultation.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(consultation.status)}>
                            {consultation.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No purchases yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}