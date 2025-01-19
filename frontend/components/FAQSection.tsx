'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is this platform about?',
      answer: 'This platform is designed to connect developers and showcase projects from around the world.'
    },
    {
      question: 'How can I join?',
      answer: 'You can join by clicking the "Login with GitHub" button in the top right corner of the page.'
    },
    {
      question: 'Is it free to use?',
      answer: 'Yes, our basic features are free to use. We also offer premium plans for advanced features.'
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach our support team by emailing support@example.com or through the contact form on our website.'
    }
  ]

  return (
    <section id="faq" className="py-12">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 bg-gray-700">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection

