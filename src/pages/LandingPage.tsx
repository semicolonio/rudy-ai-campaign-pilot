import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, BarChart3, Search, Target, Globe, TrendingUp, Smartphone, Bot, ChevronDown, Shield, Users, Clock, CheckCircle, Phone, Check, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import apiClient from '@/lib/axios';

const LandingPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    account_spent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Remove redirect for logged-in users - landing page should always be accessible

  // Handle direct Google login
  const handleLogin = async () => {
    try {
      const response = await apiClient.get('/auth/login/google');
      const data = response.data;
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await apiClient.post('/waiting-list', formData);
      setSubmitMessage('Thank you! Your early access request has been submitted. We\'ll invite you to try Rudy as soon as possible.');
      setFormData({
        name: '',
        email: '',
        company: '',
        account_spent: ''
      });
    } catch (error: any) {
      if (error.response?.data?.detail) {
        setSubmitMessage(error.response.data.detail);
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="py-4 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/rudys-logo.png" alt="Rudys.AI Logo" className="h-8 md:h-10" />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</Link>
          <a href="#upcoming" onClick={(e) => handleSmoothScroll(e, 'upcoming')} className="text-gray-700 hover:text-blue-600 transition-colors">Roadmap</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <Link to="/campaigns" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Go to App
            </Link>
          ) : (
            <button onClick={handleLogin} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Login
            </button>
          )}
          <a href="#waitlist" onClick={(e) => handleSmoothScroll(e, 'waitlist')}>
            <Button className="btn-hero">Request Early Access</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Create and Manage Google Search Campaigns in Languages You Don't Speak
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10">
                Rudy scales your Google Search campaigns internationally by doing local keyword research, selecting high-converting terms, and launching campaigns in just a few clicks.
              </p>
              <a href="#waitlist" onClick={(e) => handleSmoothScroll(e, 'waitlist')}>
                <Button className="btn-hero">
                  Request Early Access
                </Button>
              </a>
            </div>
            <div className="animate-fade-in">
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="text-gray-600 font-medium">Video Demo – Rudy in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Rudy Section */}
      <div id="features" className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Meet Rudy – your personal Google Ads expert.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center mb-16">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
              <img src="/rudy-profile.png" alt="Rudy" className="w-full h-full object-cover" />
            </div>
            <p className="text-xl text-gray-600 max-w-lg text-center md:text-left">
              Rudy is different. He creates and manages Google Search campaigns the way we believe a true specialist should.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="feature-card">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-6">
                <MessageSquare className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rudy starts with a tightly focused campaign, just like he would if it were his own money. If it proves efficient, only then does he scale.</h3>
              <p className="text-gray-600">Rudy starts with a tightly focused campaign, just like he would if it were his own money. If it proves efficient, only then does he scale.</p>
            </div>
            <div className="feature-card">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-6">
                <Search className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Campaigns in Any Language</h3>
              <p className="text-gray-600">Rudy does local keyword research in the native language and suggests only relevant terms with search volume. He writes responsive ads in the local style and your tone of voice — and shows you exactly what's being said.</p>
            </div>
            <div className="feature-card">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-6">
                <Target className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Soon: Fully Local Management</h3>
              <p className="text-gray-600">Rudy will soon manage your local campaigns too. He'll review search terms and exclude anything irrelevant — just like a senior specialist would.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Examples Section */}
      <div className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Practical Examples</h2>
          
          {/* First Example: Text Left, Video Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Mastering Keyword Research with Rudy</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Curious how fast Rudy can deliver a solid keyword strategy? In this video, we show how a user requests keyword research for the car rental industry in the Netherlands. Watch how Rudy delivers relevant keywords and instantly refines the list based on conversational commands — saving hours of manual work.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600 font-medium">Live Demo – Keyword Research with Rudys.AI</p>
              </div>
            </div>
          </div>

          {/* Second Example: Video Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center order-2 lg:order-1">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600 font-medium">Live Demo – Google Search Campaign Setup with Rudys.AI</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Turning Keywords into Campaigns</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                This video demonstrates how easy it is to launch a Google Search campaign once your keyword list is ready. See Rudy create ad groups, write custom ads, and adjust headlines — all through chat. No complex menus, no guesswork — just clear, fast execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Coming Next Section */}
      <div id="upcoming" className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Upcoming Features</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Rudy is evolving fast. Here's what's next:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-1 w-24 bg-blue-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Smart Keyword Expansion</h3>
              <p className="text-gray-600">Rudy analyzes your top-performing keywords and search terms to find out what works. Based on that, he runs additional research to expand your account with new high-converting keywords.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-1 w-24 bg-blue-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Search Term Analysis</h3>
              <p className="text-gray-600">Rudy reviews your search terms to exclude irrelevant traffic and add valuable new ones to your account.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="h-1 w-24 bg-blue-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Full Campaign Optimization & Management</h3>
              <p className="text-gray-600">Rudy will proactively suggest ways to improve your campaigns for better results — and will soon be able to apply those changes directly. Imagine managing your entire account through a conversation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Built for clarity Section */}
      <div id="about" className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/team-google-ads.jpg" 
                  alt="Our team working on Google Ads" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for marketers. Powered by intelligence.</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Rudys.AI was founded by a senior digital marketer and an AI engineer who shared one goal: make Google Ads radically easier and more effective. We believe in smart automation that puts humans in control — so you can spend less time managing ads and more time growing your business.
              </p>
              <div className="flex justify-center md:justify-start">
                <a href="#waitlist" onClick={(e) => handleSmoothScroll(e, 'waitlist')}>
                  <Button className="btn-hero">
                    Request Early Access
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA / Waitlist Form Section */}
      <div id="waitlist" className="section-padding bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Request Early Access</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Rudy is currently in beta. Request early access to be among the first to experience intelligent Google Ads management.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-xl mx-auto">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Your email address" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              <div>
                <Input 
                  type="text" 
                  name="company" 
                  placeholder="Your company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              <div>
                <Input 
                  type="text" 
                  name="account_spent" 
                  placeholder="Account spent" 
                  value={formData.account_spent}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              {submitMessage && (
                <div className={`p-3 rounded-md text-center ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage}
                </div>
              )}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-hero py-6 text-lg disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Early Access'}
                </Button>
              </div>
            </form>
          </div>
          <p className="text-md text-gray-600 mt-6 max-w-2xl mx-auto">
            To test Rudy across different scenarios, we're selecting a mix of company types and account sizes. Your estimated ad spend helps us build this balanced beta group. Access may vary based on this selection.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">How is Rudy different from traditional Google Ads tools?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Unlike dashboards with endless menus, Rudy understands natural language. You simply tell him what you need, and he handles everything from keyword research to campaign creation in a conversational flow.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">Can I build campaigns directly after keyword research?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes. Once your keyword list is ready, Rudy guides you through building a complete Search campaign — no separate tools required.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">Do I need to know how to write ads?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Not at all. Rudy writes ads based on your website, brand voice, and USPs. You can review and edit anything by chatting with him.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">How fast is keyword research with Rudy?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Usually within minutes, even for complex or geo-targeted research.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">Is my data secure?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Absolutely. We use secure Google Ads APIs and adhere to strict privacy standards.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#upcoming" onClick={(e) => handleSmoothScroll(e, 'upcoming')} className="hover:text-blue-400 transition-colors">Roadmap</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-blue-400 transition-colors">About</a>
              <a href="#waitlist" onClick={(e) => handleSmoothScroll(e, 'waitlist')} className="hover:text-blue-400 transition-colors">Request Early Access</a>
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="hover:text-blue-400 transition-colors">FAQ</a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Rudys.AI. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="mailto:hello@rudys.ai" className="text-gray-400 hover:text-white transition-colors">Contact: hello@rudys.ai</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;