import { motion } from "framer-motion";
import yuyingPortrait from "@assets/YuyingChenWynn_10x12_300dpi.jpg";


export default function AboutSection() {
  const achievements = [
    { value: "87%", label: "GenAI Platform Adoption" },
    { value: "$10M+", label: "Annual Efficiency Savings" },
    { value: "$200M", label: "AI Investment Portfolio" },
    { value: "15+", label: "Years AI/ML Experience" }
  ];

  const experience = [
    {
      title: "Head of AI - PEAK6",
      period: "2023 - Present",
      description: "Leading AI strategy across 6 companies with $38B AUM. Built proprietary GenAI platform achieving 87% adoption and $6M+ first-year savings."
    },
    {
      title: "Managing Director - Wittingly Ventures", 
      period: "2021 - 2024",
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
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="fade-in"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Most AI Initiatives Fail. <span className="gradient-text">Mine Don't.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Problem 1</h3>
                <p className="text-sm text-red-700 dark:text-red-300">85% of AI projects never make it to production</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Problem 2</h3>
                <p className="text-sm text-red-700 dark:text-red-300">Companies waste millions on AI hype without strategy</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Problem 3</h3>
                <p className="text-sm text-red-700 dark:text-red-300">Internal teams lack the expertise to scale AI safely</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I bridge the gap between AI possibility and business reality with proven frameworks, hands-on implementation, and measurable results. 
              $200M in AI investments, and $500M in valuation increase. My expertise spans generative AI platforms, 
              AI risk governance, and enterprise transformation.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              With 15+ years building AI/ML products and 20+ years in FinTech, EdTech, and Big Tech, 
              I combine deep technical knowledge with strategic leadership to create breakthrough AI adoption.
            </p>
            
            {/* Key Achievements */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={achievement.label}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Leadership Journey</h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.title}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-4 h-4 gradient-bg rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                  <p className="text-primary font-medium">{exp.period}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div 
          className="mt-20 fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Trusted by Industry Leaders</h4>
          <div className="grid grid-cols-5 gap-8 items-center justify-items-center opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">PEAK6</div>
                <div className="text-xs text-gray-500">and portfolio of companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">Tencent</div>
                <div className="text-xs text-gray-500">Partnership</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">Barnes & Noble</div>
                <div className="text-xs text-gray-500">Education</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">Age of Learning</div>
                <div className="text-xs text-gray-500">ABCmouse</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">EF Education</div>
                <div className="text-xs text-gray-500">Global</div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
