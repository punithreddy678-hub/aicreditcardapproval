import { motion } from 'framer-motion';
import {
  Briefcase,
  UserCheck,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

const scenarios = [
  {
    id: 1,
    title: 'Automated Credit Card Application Screening',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    description: 'Financial institutions receive thousands of credit card applications daily. Manual review is time-consuming and inconsistent. Our ML system automates the initial screening process, instantly classifying applications as likely approved or rejected.',
    workflow: [
      'Application submitted through web portal',
      'ML model analyzes applicant data',
      'Instant prediction generated (Approved/Rejected)',
      'High-confidence approvals fast-tracked',
      'Borderline cases flagged for manual review',
      'Results stored for audit trail'
    ],
    benefits: [
      'Reduce processing time from days to seconds',
      'Consistent evaluation criteria',
      'Handle 10x the application volume',
      'Free staff for complex cases',
      'Improved customer experience'
    ],
    metrics: [
      { label: 'Time Saved', value: '85%', icon: Clock },
      { label: 'Cost Reduction', value: '60%', icon: DollarSign },
      { label: 'Accuracy', value: '96%', icon: Target }
    ]
  },
  {
    id: 2,
    title: 'High-Risk Applicant Identification',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    description: 'Early identification of high-risk applicants helps prevent defaults and financial losses. Our ML model analyzes multiple risk factors simultaneously, identifying patterns that human reviewers might miss.',
    workflow: [
      'Applicant data collected',
      'Risk factors analyzed (debts, defaults, inquiries)',
      'Risk score calculated',
      'Compared against historical patterns',
      'High-risk applications flagged',
      'Alert sent to risk management team'
    ],
    benefits: [
      'Early detection of potential defaulters',
      'Reduce credit losses significantly',
      'Set appropriate credit limits',
      'Proactive risk mitigation',
      'Data-driven risk assessment'
    ],
    metrics: [
      { label: 'Default Prevention', value: '40%', icon: Shield },
      { label: 'Risk Detection', value: '92%', icon: AlertTriangle },
      { label: 'False Positives', value: '8%', icon: Target }
    ]
  },
  {
    id: 3,
    title: 'Bank Analyst Decision Support',
    icon: BarChart3,
    color: 'from-purple-500 to-indigo-600',
    description: 'Credit analysts need tools to make informed decisions quickly. Our system provides detailed analysis, risk factors, and recommendations to support human decision-making, not replace it.',
    workflow: [
      'Analyst receives application',
      'System generates prediction with confidence',
      'Risk factors highlighted',
      'Comparison with similar profiles',
      'Recommended decision provided',
      'Analyst makes final call with justification'
    ],
    benefits: [
      'Augment human expertise',
      'Reduce cognitive load on analysts',
      'Consistent recommendations',
      'Historical case comparison',
      'Audit trail for compliance'
    ],
    metrics: [
      { label: 'Decision Speed', value: '3x', icon: Zap },
      { label: 'Analyst Confidence', value: '+45%', icon: TrendingUp },
      { label: 'Appeals Reduced', value: '30%', icon: CheckCircle2 }
    ]
  },
  {
    id: 4,
    title: 'Customer Self-Service Eligibility Check',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    description: 'Potential customers want to know their approval chances before formally applying. Our self-service portal allows them to check eligibility instantly without impacting their credit score.',
    workflow: [
      'Customer visits website',
      'Enters basic financial information',
      'System generates instant prediction',
      'Personalized recommendations provided',
      'Option to proceed with application',
      'Pre-filled application generated'
    ],
    benefits: [
      '24/7 availability for customers',
      'No impact on credit score',
      'Reduce unsuccessful applications',
      'Improve customer engagement',
      'Higher quality applications'
    ],
    metrics: [
      { label: 'Customer Satisfaction', value: '92%', icon: Users },
      { label: 'Conversion Rate', value: '+35%', icon: TrendingUp },
      { label: 'Application Quality', value: '+50%', icon: Target }
    ]
  }
];

export default function ScenariosPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Use Cases</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Real-World <span className="gradient-text">Scenarios</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore how our AI-powered credit card approval prediction system
            can transform banking operations across different use cases.
          </p>
        </motion.div>

        {/* Scenarios */}
        <div className="space-y-12">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${scenario.color} p-6 md:p-8 text-white`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-xl bg-white/20">
                        <Icon className="w-10 h-10" />
                      </div>
                      <div>
                        <span className="text-white/60 text-sm">Scenario {scenario.id}</span>
                        <h2 className="text-2xl md:text-3xl font-bold">{scenario.title}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      {scenario.metrics.map((metric) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={metric.label} className="text-center">
                            <p className="text-2xl md:text-3xl font-bold">{metric.value}</p>
                            <p className="text-xs text-white/70 flex items-center">
                              <MetricIcon className="w-3 h-3 mr-1" />
                              {metric.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    {scenario.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Workflow */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <ArrowRight className="w-5 h-5 mr-2 text-blue-500" />
                        Workflow
                      </h3>
                      <div className="relative">
                        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700" />
                        <ul className="space-y-3">
                          {scenario.workflow.map((step, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start space-x-4 relative z-10"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                                {i + 1}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 pt-1.5">{step}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                        Benefits
                      </h3>
                      <div className="space-y-3">
                        {scenario.benefits.map((benefit, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Implement in Your Organization?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our ML-powered credit card approval system can be customized and deployed
            for your specific requirements. Contact us to discuss integration options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/predict"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold"
            >
              <span>Try Live Demo</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
