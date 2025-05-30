import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Linkedin, FileText, Youtube, Mic, ArrowRight } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useLocation } from "wouter";
import productTalkImage from "@assets/image_1748589862049.png";

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
      description: "12 institutions including MIT Sloan & Stanford",
      link: "/thought-leadership",
      bgColor: "bg-purple-600",
      linkText: "View Speaking",
      isInternal: true
    }
  ];

  const insights = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Technocratic Podcast: From LEGO Mindstorm to AI Leadership",
      description: "Journey from designing LEGO's second-generation CPU at MIT to leading AI initiatives at PEAK6",
      category: "Podcast",
      link: "https://open.spotify.com/episode/62iubXuM2RB3Umftr8Ps4A"
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Speaking at MIT Sloan & Stanford",
      description: "Presenting AI strategy and implementation at top business schools and technology conferences",
      category: "Speaking",
      link: "/thought-leadership"
    },
    {
      image: productTalkImage,
      title: "Product Talk: Leveraging AI to Scale Businesses",
      description: "Sharing lessons from Microsoft and PEAK6 on AI-driven product development and automation",
      category: "Podcast",
      link: "https://goodpods.com/podcasts/product-talk-92934/ep-426-peak6-head-of-ai-on-leveraging-ai-to-scale-product-businesses-60359226"
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
            Thought Leadership & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Speaking at 12 prestigious institutions including MIT Sloan and Stanford, featured on industry podcasts, and sharing insights through weekly content
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
        
        {/* Featured Recognition & Media */}
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Recognition & Media</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <Card key={insight.title} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleLinkClick(insight.link, insight.link?.startsWith('/'))}>
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
                    {insight.category === 'Podcast' ? 'Listen' : 'View'} <ArrowRight className="ml-1 h-4 w-4" />
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
