import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Linkedin, FileText, Youtube, Mic, ArrowRight } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useLocation } from "wouter";

export default function ContentHubSection() {
  const [, setLocation] = useLocation();
  
  const contentPlatforms = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Professional insights and AI industry updates",
      link: EXTERNAL_LINKS.linkedin,
      bgColor: "bg-blue-600",
      linkText: "View Profile"
    },
    {
      icon: FileText,
      title: "GenAI Real Talk",
      description: "Weekly newsletter on generative AI trends",
      link: EXTERNAL_LINKS.substack,
      bgColor: "bg-orange-500",
      linkText: "Subscribe"
    },
    {
      icon: Youtube,
      title: "AI After Hours",
      description: "Podcast diving deep into AI strategy",
      link: EXTERNAL_LINKS.youtube,
      bgColor: "bg-red-600",
      linkText: "Watch"
    },
    {
      icon: Mic,
      title: "Speaking",
      description: "Conference talks and expert panels",
      link: "/contact",
      bgColor: "bg-purple-600",
      linkText: "Book Speaking",
      isInternal: true
    }
  ];

  const insights = [
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "AI in the Wild: Real Implementation Stories",
      description: "How PEAK6 achieved 87% GenAI adoption across 6 companies",
      category: "Case Study"
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Risk & Governance: Practical Frameworks",
      description: "AI risk frameworks for highly regulated industries",
      category: "Framework"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Executive Education: AI for Non-Technical Leaders",
      description: "Bridging the gap between AI hype and business reality",
      category: "Education"
    }
  ];

  const handleLinkClick = (link: string, isInternal?: boolean) => {
    if (isInternal) {
      setLocation(link);
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <section id="content" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Thought Leadership <span className="gradient-text">Content</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Access all my AI insights, speaking engagements, and educational content in one place
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contentPlatforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleLinkClick(platform.link, platform.isInternal)}>
                <CardHeader>
                  <div className={`w-12 h-12 ${platform.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <platform.icon className="text-white h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{platform.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{platform.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 flex items-center">
                    {platform.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Featured Insights */}
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Recent Insights</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <Card key={insight.title} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <img 
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="text-xs text-primary font-medium mb-2">{insight.category}</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{insight.description}</p>
                  <div className="text-primary font-semibold text-sm cursor-pointer hover:text-primary/80 transition-colors duration-200 flex items-center">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
