import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Calendar, Linkedin, Youtube, FileText } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: ""
    }
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. I'll get back to you soon!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactInquiry) => {
    submitInquiry.mutate(data);
  };

  const handleCalendarBooking = () => {
    // Placeholder for calendar integration
    toast({
      title: "Calendar Booking",
      description: "Calendar booking integration would be implemented here",
    });
  };

  const socialLinks = [
    { icon: Linkedin, url: EXTERNAL_LINKS.linkedin, bg: "bg-blue-600", hover: "hover:bg-blue-700" },
    { icon: Youtube, url: EXTERNAL_LINKS.youtube, bg: "bg-red-600", hover: "hover:bg-red-700" },
    { icon: FileText, url: EXTERNAL_LINKS.substack, bg: "bg-orange-500", hover: "hover:bg-orange-600" }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Transform Your <span className="gradient-text">AI Strategy</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to accelerate your AI transformation? Get in touch to discuss how we can drive measurable impact for your organization.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Send a Message</h3>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="serviceInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dial-an-ai-expert">Dial-an-AI-Expert</SelectItem>
                              <SelectItem value="fractional-caio">Fractional Chief AI Officer</SelectItem>
                              <SelectItem value="genai-hackathon">GenAI Hackathon</SelectItem>
                              <SelectItem value="speaking">Speaking Engagement</SelectItem>
                              <SelectItem value="general">General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4} 
                              placeholder="Tell me about your AI transformation goals..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                      disabled={submitInquiry.isPending}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {submitInquiry.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Connect</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <a href="mailto:yuyingcwynn@gmail.com" 
                     className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200">
                    <Mail className="h-5 w-5" />
                    <span>yuyingcwynn@gmail.com</span>
                  </a>
                  <a href="tel:415-910-2971" 
                     className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200">
                    <Phone className="h-5 w-5" />
                    <span>415.910.2971</span>
                  </a>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-5 w-5" />
                    <span>Greater Los Angeles Area</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Social Media</h3>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-12 h-12 ${social.bg} rounded-lg flex items-center justify-center text-white ${social.hover} transition-colors duration-200`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Calendar Booking CTA */}
            <Card className="gradient-bg text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                <p className="mb-6 opacity-90">Book a consultation session to discuss your AI transformation needs.</p>
                <Button 
                  onClick={handleCalendarBooking}
                  className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
