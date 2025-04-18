import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, TruckIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 px-4 py-8 text-white md:px-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <TruckIcon className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">
                LocalFoodTruck<span className="text-blue-400">.au</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Connecting foodies with the best food trucks across Australia. Discover, enjoy, and support local food businesses.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 transition-colors hover:text-blue-400" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-blue-400" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-blue-400" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trucks" className="text-gray-400 transition-colors hover:text-blue-400">
                  Food Trucks
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 transition-colors hover:text-blue-400">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/cuisines" className="text-gray-400 transition-colors hover:text-blue-400">
                  Cuisines
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 transition-colors hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 transition-colors hover:text-blue-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Food Truck Owners */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">For Food Truck Owners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/owner/register" className="text-gray-400 transition-colors hover:text-blue-400">
                  Register Your Truck
                </Link>
              </li>
              <li>
                <Link href="/owner/login" className="text-gray-400 transition-colors hover:text-blue-400">
                  Owner Login
                </Link>
              </li>
              <li>
                <Link href="/owner/pricing" className="text-gray-400 transition-colors hover:text-blue-400">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/owner/resources" className="text-gray-400 transition-colors hover:text-blue-400">
                  Owner Resources
                </Link>
              </li>
              <li>
                <Link href="/owner/success-stories" className="text-gray-400 transition-colors hover:text-blue-400">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="mt-1 text-blue-400" />
                <span className="text-gray-400">
                  <a href="mailto:hello@localfoodtruck.au" className="hover:text-blue-400">
                    hello@localfoodtruck.au
                  </a>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="mt-1 text-blue-400" />
                <span className="text-gray-400">
                  <a href="tel:+61255550123" className="hover:text-blue-400">
                    +61 2 5555 0123
                  </a>
                </span>
              </li>
              <li className="mt-4">
                <h4 className="mb-2 font-medium">Working Hours</h4>
                <p className="text-sm text-gray-400">Mon-Fri: 9AM - 5PM AEST</p>
                <p className="text-sm text-gray-400">Weekend: Closed</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} LocalFoodTruck.au | All rights reserved
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-blue-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;