import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
} from "lucide-react";

const HelpPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["getting-started"])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const faqItems = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">
              What is tablet weaving?
            </h4>
            <p className="text-sm text-neutral-600">
              Tablet weaving is an ancient technique for creating narrow bands
              of fabric using tablets (cards) with holes. Threads are threaded
              through the holes and the tablets are turned to create patterns.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">
              How to use this editor
            </h4>
            <ol className="text-sm text-neutral-600 list-decimal list-inside space-y-1">
              <li>Select a thread color from the palette</li>
              <li>Click on holes in the pattern grid to assign colors</li>
              <li>Use the control panel to adjust pattern settings</li>
              <li>Save or export your pattern when complete</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "pattern-design",
      title: "Pattern Design",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">
              Designing patterns
            </h4>
            <p className="text-sm text-neutral-600">
              Start with simple geometric patterns and gradually work up to more
              complex designs. Consider the threading direction and how colors
              will interact when woven.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">
              Color theory for weaving
            </h4>
            <p className="text-sm text-neutral-600">
              High contrast colors create bold patterns, while similar colors
              create subtle effects. Consider how colors will blend when threads
              twist during weaving.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "weaving-techniques",
      title: "Weaving Techniques",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">Basic weaving</h4>
            <p className="text-sm text-neutral-600">
              Turn tablets forward or backward in sequence. The direction
              determines the pattern. Practice with simple patterns before
              attempting complex designs.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">
              Tension control
            </h4>
            <p className="text-sm text-neutral-600">
              Maintain even tension across all threads. Uneven tension can cause
              pattern distortion and inconsistent weaving width.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">Common issues</h4>
            <ul className="text-sm text-neutral-600 list-disc list-inside space-y-1">
              <li>Pattern not matching design - check threading order</li>
              <li>Uneven edges - adjust tension and tablet spacing</li>
              <li>Twisted threads - ensure proper threading direction</li>
              <li>Pattern too loose/tight - adjust weft tension</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Help Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">
              Help & Documentation
            </h2>
            <p className="text-sm text-neutral-600">
              Learn tablet weaving and master the editor
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-outline btn-sm">
              <MessageCircle size={16} className="mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Help Content */}
      <div className="flex-1 overflow-auto bg-neutral-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Quick Start */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
              <BookOpen size={20} className="mr-2" />
              Quick Start Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  For Beginners
                </h4>
                <ol className="text-sm text-neutral-600 space-y-1">
                  <li>1. Start with a simple 4-tablet pattern</li>
                  <li>2. Use only 2 colors initially</li>
                  <li>3. Practice basic forward/backward turns</li>
                  <li>4. Gradually increase complexity</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  For Experienced Weavers
                </h4>
                <ol className="text-sm text-neutral-600 space-y-1">
                  <li>1. Import existing patterns</li>
                  <li>2. Modify and customize designs</li>
                  <li>3. Create complex multi-color patterns</li>
                  <li>4. Share patterns with community</li>
                </ol>
              </div>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="card">
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                  {expandedSections.has(item.id) ? (
                    <ChevronDown size={20} className="text-neutral-500" />
                  ) : (
                    <ChevronRight size={20} className="text-neutral-500" />
                  )}
                </button>
                {expandedSections.has(item.id) && (
                  <div className="px-4 pb-4">{item.content}</div>
                )}
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <Video size={32} className="text-primary-500 mx-auto mb-2" />
              <h4 className="font-medium text-neutral-800 mb-1">
                Video Tutorials
              </h4>
              <p className="text-sm text-neutral-600 mb-3">
                Watch step-by-step weaving tutorials
              </p>
              <button className="btn btn-outline btn-sm">Watch Videos</button>
            </div>
            <div className="card p-4 text-center">
              <BookOpen size={32} className="text-primary-500 mx-auto mb-2" />
              <h4 className="font-medium text-neutral-800 mb-1">
                Pattern Library
              </h4>
              <p className="text-sm text-neutral-600 mb-3">
                Browse hundreds of free patterns
              </p>
              <button className="btn btn-outline btn-sm">
                Browse Patterns
              </button>
            </div>
            <div className="card p-4 text-center">
              <MessageCircle
                size={32}
                className="text-primary-500 mx-auto mb-2"
              />
              <h4 className="font-medium text-neutral-800 mb-1">
                Community Forum
              </h4>
              <p className="text-sm text-neutral-600 mb-3">
                Connect with other weavers
              </p>
              <button className="btn btn-outline btn-sm">Join Forum</button>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Need More Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  Contact Support
                </h4>
                <p className="text-sm text-neutral-600 mb-3">
                  Can't find what you're looking for? Our support team is here
                  to help.
                </p>
                <button className="btn btn-primary btn-sm">
                  <Mail size={16} className="mr-2" />
                  Contact Support
                </button>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  Feature Requests
                </h4>
                <p className="text-sm text-neutral-600 mb-3">
                  Have an idea for improving the editor? We'd love to hear from
                  you.
                </p>
                <button className="btn btn-outline btn-sm">
                  Suggest Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
