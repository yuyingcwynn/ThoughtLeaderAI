import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, RotateCcw, User, Building2 } from "lucide-react";

export default function AIReadiness() {
  const [currentQuiz, setCurrentQuiz] = useState<'selection' | 'personal' | 'enterprise'>('selection');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personalRatings, setPersonalRatings] = useState<Record<string, number>>({});
  const [enterpriseAnswers, setEnterpriseAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const personalQuestions = [
    {
      id: "capability",
      category: "Technology Capability",
      question: "What is the state of Generative AI technology capability in 2025?",
      description: "As of 2025, key highlights include:",
      bullets: [
        "Multimodal models (text, image, video, audio)",
        "AI agents and autonomous systems", 
        "On-device AI and edge computing",
        "Real-time AI applications",
        "Domain-specific foundation models"
      ],
      context: "Rate your knowledge for each area (0-5): 0 = zero knowledge, 5 = I know it and keep up to date"
    },
    {
      id: "usecases",
      category: "Core Use Cases", 
      question: "What are the core use cases mature enough to deploy Generative AI on right now in 2025?",
      description: "Current top production-ready use cases:",
      bullets: [
        "Content generation and creative automation",
        "Code generation and development assistance",
        "Data analysis and insight extraction", 
        "Customer service and conversational AI",
        "Process automation and workflow optimization"
      ],
      context: "Rate your knowledge for each use case (0-5): 0 = don't know any use case, 5 = know all the best ones and keep up to date"
    },
    {
      id: "risk",
      category: "Legal and Risk",
      question: "What is the current legal and risk landscape for Generative AI in 2025?",
      description: "Top areas of concern:",
      bullets: [
        "AI regulations and compliance requirements",
        "Intellectual property and copyright issues",
        "Data privacy and security concerns",
        "Bias and fairness in AI systems", 
        "Liability and accountability frameworks"
      ],
      context: "Rate your knowledge for each area (0-5): 0 = zero knowledge, 5 = I know it and keep up to date"
    },
    {
      id: "disruption",
      category: "Disruptions",
      question: "What areas are or will quickly be at risk for total disruption from Generative AI?",
      description: "Key disruption areas:",
      bullets: [
        "Content creation and media industries",
        "Software development and IT services", 
        "Financial Service and FinTech",
        "Education and training sectors",
        "Healthcare and scientific research"
      ],
      context: "Rate your awareness for each area (0-5): 0 = not aware of any disruption, 5 = understand business model and industry disruption with timeline"
    },
    {
      id: "skills",
      category: "AI Skills",
      question: "What is your current level of hands-on AI skills and implementation experience?",
      description: "AI skills progression from basic usage to advanced development:",
      bullets: [
        "Using chatbots (ChatGPT, Claude) for basic questions and tasks",
        "Prompt engineering and advanced conversational AI techniques",
        "Integrating AI APIs into existing applications and workflows",
        "Building custom AI applications and automated systems",
        "Fine-tuning models and advanced AI development"
      ],
      context: "Rate your skill level for each area (0-5): 0 = not at all, 5 = mastery and keeping up to date"
    }
  ];

  const enterpriseQuestions = [
    {
      category: "Leadership Awareness & Communication",
      question: "How well does leadership communicate AI importance and organizational goals?",
      options: [
        "No leadership communication about AI importance or strategic goals",
        "Minimal AI awareness with occasional mentions in leadership communications", 
        "Regular leadership communication about AI strategy with clear organizational goals",
        "Comprehensive AI communication strategy with detailed plans and success metrics",
        "Continuous AI-focused leadership communication with adaptive strategic planning"
      ]
    },
    {
      category: "Employee Engagement & Interest",
      question: "How effectively does your organization channel employee interest and engagement in AI?",
      options: [
        "No formal channels for employee AI engagement or feedback",
        "Basic mechanisms for employees to express AI interest with limited follow-up",
        "Structured channels for AI engagement with regular measurement of interest levels", 
        "Comprehensive employee engagement programs with clear pathways for AI involvement",
        "Sophisticated AI engagement ecosystem with multiple channels and continuous feedback loops"
      ]
    },
    {
      category: "Learning & Discovery Opportunities", 
      question: "What learning resources and exploration opportunities does your organization provide for AI?",
      options: [
        "No dedicated AI learning resources or exploration opportunities available",
        "Limited AI learning materials with minimal structured exploration time",
        "Organized AI learning programs with dedicated time for exploration and experimentation",
        "Comprehensive AI education platform with extensive resources and innovation time",
        "World-class AI learning ecosystem with cutting-edge resources and research opportunities"
      ]
    },
    {
      category: "Internal Tools & Capabilities",
      question: "How advanced are your organization's internal AI tools and technical capabilities?", 
      options: [
        "No internal AI tools or technical capabilities; complete reliance on external solutions",
        "Basic AI tools with limited internal technical capability for customization",
        "Developed internal AI capabilities with custom tools and moderate technical expertise",
        "Advanced internal AI platform with sophisticated tools and strong technical teams",
        "Industry-leading internal AI capabilities with proprietary tools and exceptional technical expertise"
      ]
    },
    {
      category: "Process & Governance Framework",
      question: "How mature are your AI governance processes and organizational frameworks?",
      options: [
        "No formal AI governance processes or organizational frameworks in place",
        "Basic AI policies with minimal process structure and limited governance oversight",
        "Established AI governance framework with documented processes and regular oversight",
        "Comprehensive AI governance with mature processes and integrated organizational frameworks", 
        "Sophisticated AI governance ecosystem with adaptive processes and continuous optimization"
      ]
    },
    {
      category: "Business Outcomes & Value Delivery",
      question: "What level of measurable business value has your organization achieved through AI?",
      options: [
        "No measurable business outcomes or value delivery from AI initiatives",
        "Limited business impact with unclear value proposition and minimal ROI measurement",
        "Demonstrable business value with documented outcomes and positive ROI",
        "Significant business transformation with substantial value creation and competitive advantages",
        "Industry-leading business outcomes with AI-driven market leadership and innovation"
      ]
    },
    {
      category: "Organizational Culture & Adoption",
      question: "How pervasive is AI adoption and cultural integration across your organization?",
      options: [
        "Minimal AI adoption with significant cultural resistance and limited organizational buy-in",
        "Growing AI interest with pockets of adoption but inconsistent cultural integration",
        "Widespread AI adoption with positive cultural shift and systematic integration",
        "AI-first organizational culture with comprehensive adoption and cross-functional collaboration",
        "AI-native organizational DNA with continuous innovation and cultural leadership"
      ]
    },
    {
      category: "Operational Excellence & Scaling",
      question: "How effectively does your organization operationalize and scale AI initiatives?",
      options: [
        "No systematic approach to AI operationalization; ad-hoc implementation without scaling plans",
        "Basic operational processes with limited scaling capability and minimal standardization",
        "Structured AI operations with systematic scaling approaches and operational guidelines",
        "Advanced operational excellence with sophisticated scaling frameworks and automation",
        "World-class AI operations with seamless scaling, continuous optimization, and operational leadership"
      ]
    }
  ];

  const getPersonalScore = () => {
    return Object.values(personalRatings).reduce((sum, rating) => sum + rating, 0);
  };

  const getEnterpriseScore = () => {
    return enterpriseAnswers.reduce((sum, answer) => sum + answer, 0);
  };

  const getTotalBullets = () => {
    return personalQuestions.reduce((total, q) => total + q.bullets.length, 0);
  };

  const getPersonalReadinessLevel = (score: number) => {
    const maxScore = getTotalBullets() * 5;
    const percentage = (score / maxScore) * 100;
    
    if (percentage <= 20) return { level: "Beginner", color: "bg-red-500", description: "Limited AI awareness - Focus on basic education" };
    if (percentage <= 40) return { level: "Developing", color: "bg-orange-500", description: "Growing understanding - Continue learning" };
    if (percentage <= 60) return { level: "Proficient", color: "bg-yellow-500", description: "Good foundation - Ready for implementation" };
    if (percentage <= 80) return { level: "Advanced", color: "bg-blue-500", description: "Strong expertise - Leadership potential" };
    return { level: "Expert", color: "bg-green-500", description: "Comprehensive mastery - Thought leader" };
  };

  const getEnterpriseMaturityLevel = (score: number) => {
    if (score <= 8) return { level: "Exploring", color: "bg-red-500", description: "Early AI exploration phase" };
    if (score <= 16) return { level: "Developing", color: "bg-orange-500", description: "Building foundational AI capabilities" };
    if (score <= 24) return { level: "Scaling", color: "bg-yellow-500", description: "Systematic AI deployment and integration" };
    if (score <= 32) return { level: "Leading", color: "bg-blue-500", description: "AI-driven transformation and innovation" };
    return { level: "AI-Native", color: "bg-green-500", description: "Industry-leading AI-first organization" };
  };

  const getDetailedEnterpriseAssessment = () => {
    const answers = enterpriseAnswers;
    const score = getEnterpriseScore();
    const maturityLevel = getEnterpriseMaturityLevel(score);
    
    // Analyze weakest areas (lowest scores)
    const categoryScores = answers.map((answer, index) => ({
      category: enterpriseQuestions[index].category,
      score: answer || 0,
      index
    })).sort((a, b) => a.score - b.score);
    
    const weakestAreas = categoryScores.slice(0, 3);
    const strongestAreas = categoryScores.slice(-2);

    // Generate specific struggles based on lowest scoring areas
    const generateStruggles = () => {
      const struggles = [];
      
      if (answers[0] <= 2) { // Leadership Awareness & Communication
        struggles.push("Leadership lacks clear AI vision and communication strategy, creating uncertainty about organizational direction and priorities.");
      }
      
      if (answers[1] <= 2) { // Employee Engagement & Interest
        struggles.push("Limited employee engagement mechanisms result in missed opportunities to harness internal AI enthusiasm and expertise.");
      }
      
      if (answers[2] <= 2) { // Learning & Discovery Opportunities
        struggles.push("Insufficient learning resources and exploration time prevent employees from developing necessary AI skills and discovering valuable use cases.");
      }
      
      if (answers[3] <= 2) { // Internal Tools & Capabilities
        struggles.push("Heavy reliance on external solutions without internal AI capabilities limits customization and creates vendor dependencies.");
      }
      
      if (answers[4] <= 2) { // Process & Governance Framework
        struggles.push("Lack of formal AI governance processes creates compliance risks and inconsistent implementation across the organization.");
      }
      
      if (answers[5] <= 2) { // Business Outcomes & Value Delivery
        struggles.push("Difficulty demonstrating clear business value from AI initiatives undermines stakeholder confidence and future investment.");
      }
      
      if (answers[6] <= 2) { // Organizational Culture & Adoption
        struggles.push("Cultural resistance to AI adoption slows implementation and prevents organization-wide transformation.");
      }
      
      if (answers[7] <= 2) { // Operational Excellence & Scaling
        struggles.push("Ad-hoc implementation approaches without systematic scaling frameworks limit AI's organizational impact.");
      }

      return struggles.length > 0 ? struggles : ["General challenges with AI strategy alignment and organizational readiness."];
    };

    // Generate specific recommendations based on maturity level and weak areas
    const generateRecommendations = () => {
      const recommendations = [];
      
      if (score <= 8) { // Exploring phase
        recommendations.push("Establish executive sponsorship and develop a clear AI vision statement with measurable goals.");
        recommendations.push("Conduct organization-wide AI literacy training to build foundational understanding.");
        recommendations.push("Start with low-risk pilot projects in non-critical business areas to build confidence.");
        recommendations.push("Create cross-functional AI working groups to explore potential use cases.");
      } else if (score <= 16) { // Developing phase
        recommendations.push("Implement structured channels for employee AI engagement and feedback collection.");
        recommendations.push("Develop comprehensive learning programs with dedicated time for AI exploration.");
        recommendations.push("Establish basic AI governance policies and risk assessment frameworks.");
        recommendations.push("Document and scale successful pilot projects across similar use cases.");
      } else if (score <= 24) { // Scaling phase
        recommendations.push("Build internal AI capabilities and reduce dependency on external vendors.");
        recommendations.push("Implement advanced AI governance with regular audits and compliance monitoring.");
        recommendations.push("Create centers of excellence to drive best practices across business units.");
        recommendations.push("Develop systematic approaches for measuring and communicating business value.");
      } else if (score <= 32) { // Leading phase
        recommendations.push("Focus on operational excellence with automated deployment and monitoring systems.");
        recommendations.push("Develop proprietary AI capabilities that create competitive advantages.");
        recommendations.push("Establish thought leadership through industry participation and knowledge sharing.");
        recommendations.push("Create AI-first culture with embedded innovation processes.");
      } else { // AI-Native phase
        recommendations.push("Drive industry standards and best practices through leadership initiatives.");
        recommendations.push("Continuously evolve AI capabilities with cutting-edge research and development.");
        recommendations.push("Mentor other organizations and contribute to the broader AI ecosystem.");
        recommendations.push("Maintain competitive advantage through continuous innovation and adaptation.");
      }

      // Add specific recommendations based on weakest areas
      weakestAreas.forEach(area => {
        if (area.index === 0 && area.score <= 2) {
          recommendations.push("Priority: Develop executive AI communication strategy with regular organizational updates.");
        }
        if (area.index === 1 && area.score <= 2) {
          recommendations.push("Priority: Implement employee AI suggestion programs and innovation challenges.");
        }
        if (area.index === 2 && area.score <= 2) {
          recommendations.push("Priority: Allocate dedicated time and budget for AI learning and experimentation.");
        }
        if (area.index === 3 && area.score <= 2) {
          recommendations.push("Priority: Invest in internal AI talent acquisition and capability development.");
        }
      });

      return recommendations;
    };

    return {
      maturityLevel: maturityLevel.level,
      currentStruggles: generateStruggles(),
      recommendations: generateRecommendations(),
      weakestAreas: weakestAreas.map(area => area.category),
      strongestAreas: strongestAreas.map(area => area.category)
    };
  };

  const handlePersonalRating = (bulletId: string, rating: number) => {
    setPersonalRatings(prev => ({
      ...prev,
      [bulletId]: rating
    }));
  };

  const handleEnterpriseAnswer = (answerIndex: number) => {
    const newAnswers = [...enterpriseAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setEnterpriseAnswers(newAnswers);

    if (currentQuestion < enterpriseQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setPersonalRatings({});
    setEnterpriseAnswers([]);
    setShowResults(false);
  };

  const goToQuizSelection = () => {
    setCurrentQuiz('selection');
    resetQuiz();
  };

  const canProceedToResults = () => {
    if (currentQuiz === 'personal') {
      const totalBullets = getTotalBullets();
      return Object.keys(personalRatings).length === totalBullets;
    }
    return false;
  };

  const renderQuizSelection = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI Readiness <span className="gradient-text">Assessment</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Evaluate your AI readiness with our comprehensive assessment tools
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                onClick={() => setCurrentQuiz('personal')}>
            <CardHeader className="text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <User className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personal AI Readiness</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Rate your knowledge across key AI areas using a 0-5 scale for each technology, use case, risk factor, and disruption area
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full gradient-bg text-white font-semibold py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Personal Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                onClick={() => setCurrentQuiz('enterprise')}>
            <CardHeader className="text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise AI Maturity</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Evaluate your organization's AI maturity across strategy, infrastructure, capabilities, and culture
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full gradient-bg text-white font-semibold py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Enterprise Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const renderPersonalQuiz = () => {
    const currentQuestionData = personalQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / personalQuestions.length) * 100;
    
    // Check if all bullets in current question are rated
    const currentQuestionBullets = currentQuestionData.bullets.map((_, index) => 
      `${currentQuestionData.id}-${index}`
    );
    const currentQuestionCompleted = currentQuestionBullets.every(bulletId => 
      personalRatings[bulletId] !== undefined
    );

    const canGoNext = currentQuestionCompleted && currentQuestion < personalQuestions.length - 1;
    const canGoBack = currentQuestion > 0;
    const canViewResults = currentQuestionCompleted && currentQuestion === personalQuestions.length - 1;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={goToQuizSelection}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Selection
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {personalQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="p-8 text-center">
              <Badge variant="secondary" className="mb-4 text-xs mx-auto w-fit">
                {currentQuestionData.category}
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentQuestionData.question}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentQuestionData.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {currentQuestionData.context}
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8">
                {currentQuestionData.bullets.map((bullet, bulletIndex) => {
                  const bulletId = `${currentQuestionData.id}-${bulletIndex}`;
                  const currentRating = personalRatings[bulletId];
                  
                  return (
                    <div key={bulletIndex} className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                        {bullet}
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm text-gray-500 text-right w-32">
                          {currentQuestionData.id === 'disruption' 
                            ? 'not aware of any disruption' 
                            : currentQuestionData.id === 'usecases'
                            ? 'don\'t know any use cases'
                            : currentQuestionData.id === 'skills'
                            ? 'not at all'
                            : 'zero knowledge'}
                        </span>
                        <div className="flex space-x-2">
                          {[0, 1, 2, 3, 4, 5].map(rating => (
                            <Button
                              key={rating}
                              variant={currentRating === rating ? "default" : "outline"}
                              size="sm"
                              className={`w-12 h-12 rounded-full ${
                                currentRating === rating 
                                  ? "bg-primary text-white" 
                                  : "hover:bg-primary/10"
                              }`}
                              onClick={() => handlePersonalRating(bulletId, rating)}
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 text-left w-32">
                          {currentQuestionData.id === 'disruption' 
                            ? 'understand business model and industry disruption with timeline' 
                            : currentQuestionData.id === 'usecases'
                            ? 'know all the best ones and keep up to date'
                            : currentQuestionData.id === 'skills'
                            ? 'mastery and keeping up to date'
                            : 'I know it and keep up to date'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={!canGoBack}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="flex space-x-4">
                  {canGoNext && (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="gradient-bg text-white flex items-center"
                    >
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  {canViewResults && (
                    <Button
                      onClick={() => setShowResults(true)}
                      className="gradient-bg text-white flex items-center"
                    >
                      View My Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  const renderEnterpriseQuiz = () => {
    const question = enterpriseQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / enterpriseQuestions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={goToQuizSelection}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Selection
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {enterpriseQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="text-center p-8">
              <Badge variant="secondary" className="mb-4 text-xs">
                {question.category}
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {question.question}
              </h2>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto min-h-[60px] hover:bg-primary/5 hover:border-primary transition-all duration-200"
                    onClick={() => handleEnterpriseAnswer(index)}
                  >
                    <div className="flex items-center w-full">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-4 flex-shrink-0">
                        {index}
                      </span>
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  const renderResults = () => {
    const isPersonal = currentQuiz === 'personal';
    const score = isPersonal ? getPersonalScore() : getEnterpriseScore();
    const maxScore = isPersonal ? getTotalBullets() * 5 : 40;
    const readiness = isPersonal ? getPersonalReadinessLevel(score) : getEnterpriseMaturityLevel(score);
    const percentage = Math.round((score / maxScore) * 100);

    if (isPersonal) {
      // Personal AI Readiness Results - keep original format
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-xl">
              <CardHeader className="text-center p-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Your AI Readiness Results
                </h1>
                
                {/* Score Visualization */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${percentage * 2.51} 251`}
                      className="text-primary transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">{score}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">/ {maxScore}</div>
                    </div>
                  </div>
                </div>

                <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg ${readiness.color}`}>
                  {readiness.level}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                  {readiness.description}
                </p>
              </CardHeader>

              <CardContent className="p-12 pt-0">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={resetQuiz}
                    variant="outline"
                    className="flex items-center"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake Assessment
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="gradient-bg text-white"
                  >
                    Get Expert Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    // Enterprise AI Maturity Results with maturity framework visualization
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise AI Maturity Assessment
            </h1>
            <div className="text-6xl font-bold text-primary mb-4">{score}/{maxScore}</div>
            <div className={`inline-block px-8 py-4 rounded-full text-white font-bold text-xl ${readiness.color}`}>
              {readiness.level}
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
              {readiness.description}
            </p>
          </div>

          {/* Organizational AI Maturity Board */}
          <Card className="bg-white dark:bg-gray-800 shadow-xl mb-12">
            <CardHeader className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Organizational AI Maturity Board
              </h2>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative overflow-x-auto">
                {/* Maturity Phases Flow */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                  {[
                    { 
                      phase: "Awareness", 
                      color: "bg-red-500", 
                      min: 0, 
                      max: 8,
                      goals: ["Increase importance", "Communicate goals", "Communicate plans", "Check for understanding"],
                      activities: "Leadership communication and initial awareness building",
                      people: "Senior leadership and executive sponsors"
                    },
                    { 
                      phase: "Interest", 
                      color: "bg-orange-500", 
                      min: 9, 
                      max: 16,
                      goals: ["Channel for people to engage", "Channel for people to raise their hand", "Ability to measure interest"],
                      activities: "Employee engagement programs and interest measurement",
                      people: "Early adopters and AI champions"
                    },
                    { 
                      phase: "Discover", 
                      color: "bg-yellow-500", 
                      min: 17, 
                      max: 24,
                      goals: ["Learning opportunities and resources", "Space for opportunities", "Environment for exploration", "Criteria for evaluation and prioritization"],
                      activities: "Learning programs and use case discovery",
                      people: "Cross-functional exploration teams"
                    },
                    { 
                      phase: "Build", 
                      color: "bg-blue-500", 
                      min: 25, 
                      max: 32,
                      goals: ["Internal tools", "Internal capability", "External facing deliverability"],
                      activities: "Tool development and capability building",
                      people: "Technical teams and subject matter experts"
                    },
                    { 
                      phase: "Scale", 
                      color: "bg-green-500", 
                      min: 33, 
                      max: 40,
                      goals: ["Policy and guidelines", "Tool rationalization/adoption", "Process", "Governance", "Operationalizing"],
                      activities: "Enterprise scaling and operational excellence",
                      people: "Organization-wide AI integration"
                    }
                  ].map((phase, index) => {
                    const isCurrent = score >= phase.min && score <= phase.max;
                    const isCompleted = score > phase.max;
                    
                    return (
                      <div key={phase.phase} className="flex flex-col items-center">
                        {/* Phase Circle */}
                        <div className={`w-16 h-16 rounded-full ${phase.color} ${
                          isCurrent 
                            ? 'ring-4 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-800 scale-110' 
                            : isCompleted ? 'opacity-80' : 'opacity-40'
                        } flex items-center justify-center mb-3 transition-all duration-300`}>
                          <span className="text-white font-bold text-sm">
                            {isCurrent ? '●' : isCompleted ? '✓' : index + 1}
                          </span>
                        </div>
                        
                        {/* Phase Name */}
                        <div className={`text-center mb-3 ${
                          isCurrent ? 'text-primary font-bold' : 'text-gray-600'
                        }`}>
                          <div className="font-bold text-base">{phase.phase}</div>
                          <div className="text-xs">({phase.min}-{phase.max} pts)</div>
                        </div>

                        {/* Goals */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-2 w-full min-h-[120px] flex flex-col">
                          <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1">Goals</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                            {phase.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="text-xs leading-tight">
                                • {goal}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Activities */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-2 w-full min-h-[60px] flex flex-col">
                          <h4 className="font-semibold text-xs text-blue-900 dark:text-blue-300 mb-1">Activities</h4>
                          <p className="text-xs text-blue-700 dark:text-blue-400 leading-tight">{phase.activities}</p>
                        </div>

                        {/* People */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 w-full min-h-[50px] flex flex-col">
                          <h4 className="font-semibold text-xs text-purple-900 dark:text-purple-300 mb-1">People</h4>
                          <p className="text-xs text-purple-700 dark:text-purple-400 leading-tight">{phase.people}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Assessment Summary */}
                <div className="space-y-6">
                  {(() => {
                    const assessment = getDetailedEnterpriseAssessment();
                    return (
                      <>
                        {/* Current Maturity Overview */}
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
                          <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">
                            Current Maturity: {assessment.maturityLevel}
                          </h3>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                            Score: {score}/40 points
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {readiness.description}
                          </p>
                        </div>

                        {/* Current Struggles */}
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                          <h4 className="font-bold text-lg text-red-900 dark:text-red-300 mb-4 flex items-center">
                            <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-3">!</span>
                            Current Implementation Challenges
                          </h4>
                          <ul className="space-y-3">
                            {assessment.currentStruggles.map((struggle, index) => (
                              <li key={index} className="text-red-800 dark:text-red-200 flex items-start">
                                <span className="text-red-500 mr-2 mt-1">•</span>
                                <span className="leading-relaxed">{struggle}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                          <h4 className="font-bold text-lg text-green-900 dark:text-green-300 mb-4 flex items-center">
                            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>
                            Strategic Recommendations
                          </h4>
                          <ul className="space-y-3">
                            {assessment.recommendations.map((recommendation, index) => (
                              <li key={index} className="text-green-800 dark:text-green-200 flex items-start">
                                <span className="text-green-500 mr-2 mt-1">•</span>
                                <span className="leading-relaxed">{recommendation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Areas of Focus */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                            <h4 className="font-bold text-lg text-orange-900 dark:text-orange-300 mb-3">
                              Priority Areas for Improvement
                            </h4>
                            <ul className="space-y-2">
                              {assessment.weakestAreas.slice(0, 3).map((area, index) => (
                                <li key={index} className="text-orange-800 dark:text-orange-200 text-sm">
                                  • {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                            <h4 className="font-bold text-lg text-blue-900 dark:text-blue-300 mb-3">
                              Current Strengths
                            </h4>
                            <ul className="space-y-2">
                              {assessment.strongestAreas.map((area, index) => (
                                <li key={index} className="text-blue-800 dark:text-blue-200 text-sm">
                                  • {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {enterpriseQuestions.map((question, index) => (
              <motion.div
                key={question.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {enterpriseAnswers[index] || 0}/5
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {question.category}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={resetQuiz}
              variant="outline"
              className="flex items-center"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Assessment
            </Button>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="gradient-bg text-white"
            >
              Get Expert Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {currentQuiz === 'selection' && renderQuizSelection()}
        {currentQuiz === 'personal' && !showResults && renderPersonalQuiz()}
        {currentQuiz === 'enterprise' && !showResults && renderEnterpriseQuiz()}
        {showResults && renderResults()}
      </div>
      <Footer />
    </div>
  );
}