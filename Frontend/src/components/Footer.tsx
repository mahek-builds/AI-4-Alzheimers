import { Brain, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl gradient-primary">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AI for Alzheimer's</span>
            </div>
            <p className="text-background/70 max-w-sm">
              AI-powered Alzheimer's detection system using advanced deep learning
              to analyze MRI brain scans for early diagnosis and intervention.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#upload"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Upload Scan
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-4 w-4" />
                <span>support@ai4alzheimers.com</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                <span>Medical Research Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © 2024 AI for Alzheimer's. All rights reserved.
            </p>
            <p className="text-xs text-background/40 max-w-md text-center md:text-right">
              Disclaimer: This tool is for educational purposes only and should not
              replace professional medical diagnosis. Always consult with a
              healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
