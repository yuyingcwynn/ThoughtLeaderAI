import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, FileText } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import notOldBoxesImage from "@assets/NotOldBoxes.jpg";
import customAppImage from "@assets/CustomApp.jpg";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast';
  image: string;
  link: string;
  publishDate?: string;
}

export default function ThoughtLeadership() {
  const featuredContent: ContentItem[] = [
    {
      id: "stop-forcing-ai-old-boxes",
      title: "Stop Forcing AI Into Old Boxes",
      description: "Four Directions for Real Value Creation with Generative AI [Director's Cut] - Breaking free from traditional thinking to unlock AI's true potential",
      type: "article",
      image: notOldBoxesImage,
      link: "https://open.substack.com/pub/yuying/p/stop-forcing-ai-into-old-boxes?r=2h7nta&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
      publishDate: "Recent"
    },
    {
      id: "chatbots-to-custom-software",
      title: "From Chatbots to Custom Software: The Real AI Revolution in Enterprise",
      description: "Moving beyond simple chatbots to create truly transformative AI applications that drive business value and competitive advantage",
      type: "article",
      image: customAppImage,
      link: "https://open.substack.com/pub/yuying/p/from-chatbots-to-custom-software?r=2h7nta&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
      publishDate: "Recent"
    }
  ];

  const contentTypes = {
    article: { icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
    video: { icon: Play, color: "text-red-600", bgColor: "bg-red-50" },
    podcast: { icon: Play, color: "text-purple-600", bgColor: "bg-purple-50" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Thought Leadership & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge perspectives on AI transformation, strategic implementation, and the future of enterprise technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Content
            </h2>
          </motion.div>

          {featuredContent.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Featured content will be added here as you provide the images and links.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredContent.map((content, index) => {
                const TypeIcon = contentTypes[content.type as keyof typeof contentTypes]?.icon || FileText;
                const typeColor = contentTypes[content.type as keyof typeof contentTypes]?.color || "text-gray-600";
                const typeBgColor = contentTypes[content.type as keyof typeof contentTypes]?.bgColor || "bg-gray-50";

                return (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={content.image} 
                          alt={content.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className={`absolute top-4 left-4 ${typeBgColor} dark:bg-gray-700 px-3 py-1 rounded-full flex items-center space-x-2`}>
                          <TypeIcon className={`h-4 w-4 ${typeColor} dark:text-white`} />
                          <span className={`text-sm font-medium ${typeColor} dark:text-white capitalize`}>
                            {content.type}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {content.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                          {content.description}
                        </p>
                        
                        {content.publishDate && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {content.publishDate}
                          </p>
                        )}

                        <Button 
                          onClick={() => window.open(content.link, '_blank')}
                          className="w-full gradient-bg text-white hover:shadow-lg transition-all duration-200"
                        >
                          {content.type === 'video' || content.type === 'podcast' ? 'Watch' : 'Read'} Full Content
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Content Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Follow My Latest Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest AI trends, strategies, and industry insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    GenAI Real Talk Newsletter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Weekly insights on AI implementation, strategy, and real-world applications
                  </p>
                  <Button 
                    onClick={() => window.open('https://yuying.substack.com', '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    Subscribe
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Play className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    AI After Hours Podcast
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Deep dives into AI strategy, implementation challenges, and industry trends
                  </p>
                  <Button 
                    onClick={() => window.open('https://youtube.com/@aiafterhours', '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    Listen
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ExternalLink className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    LinkedIn Insights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Daily thoughts on AI transformation, leadership, and strategic insights
                  </p>
                  <Button 
                    onClick={() => window.open('https://linkedin.com/in/yuyingchenwynn', '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    Follow
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}