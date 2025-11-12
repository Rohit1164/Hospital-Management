import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Hospital Management</h2>
          <p className="text-sm mt-2 text-gray-400">
            Providing professional healthcare services with ease.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Appointments</li>
            <li>Find Doctor</li>
            <li>Support</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Connect with us</h3>
          <div className="flex gap-4 mt-2">
            <Facebook className="cursor-pointer hover:text-blue-400" />
            <Instagram className="cursor-pointer hover:text-pink-400" />
            <Twitter className="cursor-pointer hover:text-blue-400" />
            <Github className="cursor-pointer hover:text-gray-200" />
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Hospital Management System. All Rights
        Reserved.
      </div>
    </footer>
  );
}
