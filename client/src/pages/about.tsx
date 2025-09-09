import { motion } from "framer-motion";
import yuyingPortrait from "@assets/YuyingChenWynn_10x12_300dpi.jpg";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { seoData } from "@/lib/seo-data";

export default function About() {
  useSEO({
    title: seoData.about.title,
    description: seoData.about.description,
    keywords: seoData.about.keywords,
    canonicalUrl: "https://wittinglyventures.com/about",
    structuredData: seoData.about.structuredData
  });

  const achievements = [
    { value: "87%", label: "GenAI Platform Adoption" },
    { value: "$30M+", label: "Annual Efficiency Savings" },
    { value: "$200M", label: "AI Investment Portfolio" },
    { value: "15+", label: "Years AI/ML Experience" }
  ];

  const experience = [
    {
      title: "Head of AI - PEAK6",
      period: "2023 - 2025",
      description: "Leading AI strategy across 6 companies in financial services, fintech, edtech, and entertainment. Built proprietary GenAI platform achieving 87% adoption and $6M+ first-year savings."
    },
    {
      title: "Managing Director - Wittingly Ventures", 
      period: "2021 - 2025",
      description: "AI, product strategy, and technology advisory. Increased AAA game revenue by $16M through ML-driven optimization."
    },
    {
      title: "Chief Product Officer - Barnes & Noble Education",
      period: "2021 - 2022", 
      description: "Led product and data strategy for billion-dollar EdTech provider. Increased registration rates by 24% and reduced fraud costs by 83%."
    },
    {
      title: "VP International Products - Age of Learning",
      period: "2018 - 2021",
      description: "Built first AI-native adaptive learning product, growing from 0 to $65M annual revenue with 7X revenue gains in Year 2."
    },
    {
      title: "VP of Product - EF Education",
      period: "2014 - 2018",
      description: "Sustained highest-ever revenue levels for 5 straight months YOY despite 20-year-old business,directing single largest technology transformation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="fade-in"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  I Turn AI Hype Into <span className="gradient-text">Business Reality</span>
                </h1>
                
                {/* Current Role & Impact */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Role & Impact</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Head of AI at PEAK6 (6 companies, $38B AUM). Built proprietary GenAI platform achieving 87% adoption 
                    with usage doubling quarterly. Led $200M AI investment strategy across multiple verticals.
                  </p>
                </div>
                
                {/* Career Highlights */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Career Highlights</h2>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• MIT education (ME & BS Computer Science)</li>
                    <li>• 20+ years in FinTech, EdTech, Big Tech</li>
                    <li>• Notable positions: Microsoft, Business Objects (SAP)</li>
                    <li>• Scaled ABCmouse China → $65M revenue, 7X growth in Year 2</li>
                  </ul>
                </div>
                
                {/* Key Achievements */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {achievements.map((achievement, index) => (
                    <motion.div 
                      key={achievement.label}
                      className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="text-2xl font-bold gradient-text">{achievement.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{achievement.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="fade-in"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src={yuyingPortrait}
                  alt="Yuying Chen-Wynn - AI Technology Executive"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </motion.div>
            </div>
            
            {/* Experience Timeline */}
            <motion.div 
              className="mt-20 fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Career Highlights</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div 
                    key={exp.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-4 h-4 gradient-bg rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.period}</p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Background */}
            <motion.div 
              className="mt-20 fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">AI Transformation Philosophy</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                  Generative AI is a fundamentally different technology than Classical AI. It not only creates new content that never existed before, but the natural language interface democratizes access to advanced AI capabilities. Not all AI are created equal.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                  <strong>AI Transformation in Enterprises:</strong> Leverage Generative AI to lower barriers of entry to data, technology, and capabilities. Implement in depth integration of Generative and Conversational AI with your company's data, proprietary knowledge, platforms, and classical AI models to achieve the largest impact and ROI. 
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                  The key question is not buy vs. build: It's how do I best protect my data and IP and does AI need to be a core competency to my business in order to be competitive.
                  
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  You have to upskill the implementors and the users at the same time to ensure success. This requires a whole new mindset.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}