import { motion } from "framer-motion";
import { Users, Target, Heart } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600"
        >
          About Us
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
         We built Quizzy to make learning and playing quizzes exciting, engaging, and rewarding.
          Whether you’re here to test your knowledge, compete with friends, or prepare for exams, 
         our platform has something for everyone.
        </p>
      </section>

      {/* Mission / Values Section */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-16">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center"
        >
          <Users className="w-12 h-12 mx-auto text-blue-500" />
          <h2 className="mt-4 text-xl font-semibold">Our Team</h2>
          <p className="mt-2 text-gray-600">
            A group of dedicated professionals who love creating meaningful
            solutions. Join us to create meaningful experiences for the little things that matter.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center"
        >
          <Target className="w-12 h-12 mx-auto text-blue-500" />
          <h2 className="mt-4 text-xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-gray-600">
           🎯 To make learning interactive and enjoyable

🌍 To build a community of curious minds

🏆 To encourage healthy competition and self-improvement
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center"
        >
          <Heart className="w-12 h-12 mx-auto text-blue-500" />
          <h2 className="mt-4 text-xl font-semibold">Our Values</h2>
          <p className="mt-2 text-gray-600">
            Integrity, collaboration, and continuous learning.
          </p>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Want to work with us?
        </h2>
        <p className="mt-2 text-blue-100">
          Join us on our journey to create impact together.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-blue-100 transition">
          Contact Us
        </button>
      </section>
    </div>
  );
}
