import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, FileText } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { seoData } from "@/lib/seo-data";
import notOldBoxesImage from "@assets/NotOldBoxes.jpg";
import customAppImage from "@assets/CustomApp.jpg";
import aiGovImage from "@assets/AiGov.jpg";
import archetypesImage from "@assets/archtypes.png";
import aiGovFrameworkImage from "@assets/AIGovFramework.png";
import aiAfterHoursImage from "@assets/AIAH - Ep16 - April - Episode - Thumbnail.png";
import aldrichLogo from "@assets/image_1748587792420.png";
import retrainLogo from "@assets/image_1748588175311.png";
import beelieveLogo from "@assets/image_1748588236796.png";
import nyTechWeekLogo from "@assets/image_1748588288028.png";
import mitSloanLogo from "@assets/image_1748588335252.png";
import kelloggLogo from "@assets/image_1748588359680.png";
import uclaLogo from "@assets/image_1748588397492.png";
import stanfordLogo from "@assets/image_1748588439370.png";
import womenTechLogo from "@assets/image_1748588658310.png";
import chiefLogo from "@assets/image_1748588729954.png";
import sectionLogo from "@assets/image_1748588872411.png";
import intelligentAutomationLogo from "@assets/image_1748588955811.png";

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
    },
    {
      id: "ai-governance-reality-check",
      title: "AI Governance Reality Check",
      description: "Example assessments and lessons learned - Practical insights from implementing AI governance frameworks in regulated industries",
      type: "article",
      image: aiGovImage,
      link: "https://open.substack.com/pub/yuying/p/ai-governance-reality-check?r=2h7nta&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
      publishDate: "Recent"
    },
    {
      id: "thriving-age-ai-archetypes",
      title: "Thriving in the Age of AI: Four Archetypes for a New Era",
      description: "Identifying the four key professional archetypes that will define success in an AI-driven workplace and how to position yourself for the future",
      type: "article",
      image: archetypesImage,
      link: "https://www.linkedin.com/pulse/thriving-age-ai-four-archetypes-new-era-yuying-chen-wynn-tnb1c/?trackingId=9G49XmhNSW6htWijDbVt9w%3D%3D",
      publishDate: "Recent"
    },
    {
      id: "practical-ai-governance-framework",
      title: "A Practical AI Governance Framework",
      description: "A comprehensive framework for implementing AI governance in enterprise environments, with actionable steps for compliance and risk management",
      type: "article",
      image: aiGovFrameworkImage,
      link: "https://www.linkedin.com/pulse/practical-ai-governance-framework-yuying-chen-wynn-iedlc/?trackingId=O4%2FEzzcFRl6yuNTU2L6X6A%3D%3D",
      publishDate: "Recent"
    },
    {
      id: "ai-after-hours-april-2025",
      title: "AI After Hours - Episode 16: April 2025",
      description: "Deep dive into the latest AI trends and enterprise applications, featuring insights on practical AI implementation strategies",
      type: "video",
      image: aiAfterHoursImage,
      link: "https://youtu.be/zBFunc6zF6s?si=uhHtkFM4SgKRCqNK",
      publishDate: "April 2025"
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
                    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={content.image} 
                          alt={content.title}
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                            content.link.includes('substack.com') ? 'h-64' : 'h-48'
                          }`}
                          style={{
                            objectPosition: content.link.includes('substack.com') ? 'center top' : 'center center'
                          }}
                        />
                        <div className={`absolute top-4 left-4 ${typeBgColor} dark:bg-gray-700 px-3 py-1 rounded-full flex items-center space-x-2`}>
                          <TypeIcon className={`h-4 w-4 ${typeColor} dark:text-white`} />
                          <span className={`text-sm font-medium ${typeColor} dark:text-white capitalize`}>
                            {content.type}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            {content.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {content.description}
                          </p>
                          
                          {content.publishDate && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                              {content.publishDate}
                            </p>
                          )}
                        </div>

                        <Button 
                          onClick={() => window.open(content.link, '_blank')}
                          className="w-full gradient-bg text-white hover:shadow-lg transition-all duration-200 mt-auto"
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

      {/* Speaking Engagements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Speaking Engagements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Sharing AI insights across industry conferences and prestigious academic institutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={nyTechWeekLogo} alt="NY Tech Week" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">NY Tech Week</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI Product Strategy</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={stanfordLogo} alt="Stanford Continuing Studies" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Stanford Continuing Studies</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI Leadership Development</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={mitSloanLogo} alt="MIT Sloan School of Management" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">MIT Sloan School of Management</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">MBA Program Speaker</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={kelloggLogo} alt="Northwestern Kellogg School of Management" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Northwestern Kellogg School of Management</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">MBA Program Speaker</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={uclaLogo} alt="UCLA Anderson School of Management" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">UCLA Anderson School of Management</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">MBA Program Speaker</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={womenTechLogo} alt="Women in Tech Global Conference" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Women in Tech Global Conference</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Presenter</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={chiefLogo} alt="Chief" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Chief</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Executive Leadership Network</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={sectionLogo} alt="Section" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Section</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Guest Presenter</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={aldrichLogo} alt="Aldrich Capital Partners" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Aldrich Capital Partners</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Technology Summit</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={retrainLogo} alt="retrain.ai" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">retrain.ai</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Responsible AI Conference</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={beelieveLogo} alt="Beelieve" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Beelieve</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI Executives Roundtable</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
                <img src={intelligentAutomationLogo} alt="Intelligent Automation North America" className="h-8 w-auto" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Intelligent Automation Conference</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Presenter</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Podcast Appearances */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Industry Podcast Appearances
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Sharing insights on AI innovation, product leadership, and technology transformation across leading industry podcasts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">🎧</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technocratic Podcast</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Yuying shares her journey from designing LEGO Mindstorm's second-generation CPU at MIT to leading AI initiatives at PEAK6. 
                The conversation delves into AI adoption, its impact on product management, and the pace of AI innovation.
              </p>
              <a 
                href="https://open.spotify.com/episode/62iubXuM2RB3Umftr8Ps4A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Listen on Spotify →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">🧠</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Women In Product – Path to CPO</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Yuying discusses her unique journey to becoming the Chief Product Officer at Barnes & Noble Education. 
                She emphasizes the value of being an "out-of-the-box" candidate in product leadership.
              </p>
              <a 
                href="https://womenpm.org/podcast/episode-46-yuying-chen-wynn-chief-product-officer-barnes-noble-education-inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Episode 46: Yuying Chen-Wynn →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">🌐</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Talk</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Yuying talks about leveraging AI to scale product businesses, sharing lessons from her experience at Microsoft and PEAK6. 
                She discusses the importance of timing in product development and the role of AI in automating content creation.
              </p>
              <a 
                href="https://goodpods.com/podcasts/product-talk-92934/ep-426-peak6-head-of-ai-on-leveraging-ai-to-scale-product-businesses-60359226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                EP 426: Leveraging AI to Scale Product Businesses →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">🎓</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Broken Education Podcast</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Yuying discusses the role of AI in education and its potential to transform the sector. 
                The conversation highlights the challenges and opportunities in integrating AI into educational tools and platforms.
              </p>
              <a 
                href="https://goodpods.com/podcasts/product-talk-92934/ep-426-peak6-head-of-ai-on-leveraging-ai-to-scale-product-businesses-60359226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Yuying Chen-Wynn on Broken Education →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}