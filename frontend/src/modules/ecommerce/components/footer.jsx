import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <footer className="relative bg-linear-to-br from-[#0e1b2a] via-[#0a1420] to-[#151f2e] text-gray-300 overflow-hidden">
      {/* Background Map Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('./images/ecom/mapfooter.png')`,
            filter: 'blur(2px)'
          }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#bb402a]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/home" className="inline-block group">
              <div className="relative">
                <img
                  src="./images/ecom/4steplogo.png"
                  alt="4step"
                  className="relative h-12 sm:h-14 mb-5 group-hover:scale-110"
                />
              </div>
            </Link>
            <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed max-w-xs">
              Result-oriented products designed to enhance every aspect of your
              daily life.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-gray-800 to-gray-900 text-white overflow-hidden group"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#E4405F] to-[#C13584] opacity-0 group-hover:opacity-100"></div>
                <FaInstagram className="relative text-lg group-hover:scale-125" />
              </a>
              <a
                href="#"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-gray-800 to-gray-900 text-white overflow-hidden group"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#1877F2] to-[#0d5dbf] opacity-0 group-hover:opacity-100"></div>
                <FaFacebookF className="relative text-lg group-hover:scale-125" />
              </a>
              <a
                href="#"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-gray-800 to-gray-900 text-white overflow-hidden group"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#1DA1F2] to-[#0d8bd9] opacity-0 group-hover:opacity-100"></div>
                <FaTwitter className="relative text-lg group-hover:scale-125" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">

              {/* Company */}
              <div className="group">
                <h4 className="text-white font-bold mb-5 text-sm sm:text-base tracking-wide">
                  Company
                </h4>
                <nav className="flex flex-col space-y-3 text-sm sm:text-base">
                  <Link
                    to="/home"
                    className="relative flex items-center gap-2 hover:text-white group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/allproduct"
                    className="relative flex items-center gap-2 hover:text-white group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/helpform"
                    className="relative flex items-center gap-2 hover:text-white group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Contact</span>
                  </Link>
                </nav>
              </div>

              {/* Products */}
              <div className="group">
                <h4 className="text-white font-bold mb-5 text-sm sm:text-base tracking-wide">
                  Products
                </h4>
                <nav className="flex flex-col space-y-3 text-sm sm:text-base">
                  {categories.map((item) => (
                    <span
                      key={item.id}
                      onClick={() => navigate(`/category/${item.id}`)}
                      className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                    >
                      <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                      <span>{item.name}</span>
                    </span>
                  ))}
                </nav>
              </div>

              {/* Customer Policies */}
              <div className="group">
                <h4 className="text-white font-bold mb-5 text-sm sm:text-base tracking-wide">
                  Customer Policies
                </h4>
                <nav className="flex flex-col space-y-3 text-sm sm:text-base">
                  <Link
                    to="/terms"
                    className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Terms & Conditions</span>
                  </Link>
                  <Link
                    to="/compliancepolicy"
                    className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Compliance Policy</span>
                  </Link>
                  <Link
                    to="/returnpolicy"
                    className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Return & Exchange Policy</span>
                  </Link>
                  <Link
                    to="/shippingpolicy"
                    className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Shipping & Delivery Policy</span>
                  </Link>
                  <Link
                    to="/sellerdisclaimer"
                    className="relative flex items-center gap-2 hover:text-white cursor-pointer group/link"
                  >
                    <FaChevronRight className="text-[#bb402a] text-xs group-hover/link:translate-x-1" />
                    <span>Unauthorized Seller Disclaimer</span>
                  </Link>
                </nav>
              </div>

              {/* Contact Us */}
              <div className="group">
                <h4 className="text-white font-bold mb-5 text-sm sm:text-base tracking-wide">
                  Contact Us
                </h4>

                <nav className="flex flex-col space-y-3 text-sm sm:text-base">
                  <div className="relative flex items-start gap-2 text-gray-400 group/link">
                    <FaMapMarkerAlt className="text-[#bb402a] text-xs mt-1 shrink-0" />
                    <span className="leading-relaxed">
                      <b className="text-white block mb-1">Fourstep Retail Limited</b>
                      1st Floor, Shop No.24, Divya Plaza, Nr. Kamlanager Lake, Ajwa Road, Vadodara-Gujarat - 390019
                    </span>
                  </div>

                  <a
                    href="mailto:support@4stepnetwork.com"
                    className="relative flex items-center gap-2 text-gray-400 hover:text-white group/link"
                  >
                    <FaEnvelope className="text-[#bb402a] text-xs shrink-0" />
                    <span>www.fourstepretail.com</span>
                  </a>
                </nav>
                <div className="mt-4">
              <p className="text-sm text-gray-400 font-semibold mb-2">Customer Support Number:</p>
              <a
                href="tel:+919726286000"
                className="flex items-center gap-2 text-white hover:text-[#bb402a] group"
              >
                <FaPhone className="text-[#bb402a] text-sm" />
                <span className="text-base font-bold">+91 97262 86000</span>
              </a>
            </div>
              </div>

            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative mt-10 sm:mt-12 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-16 h-0.5 "></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="hover:text-gray-300 group">
            © 2026 4step.{" "}
            <span className="inline-block">
              All rights reserved.
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link
              to="/privacypolicy"
              className="hover:text-white cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white cursor-pointer"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Wave at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#bb402a]/30 to-transparent"></div>
    </footer>
  );
}

export default Footer;