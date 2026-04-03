import React from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "business", title: "Business Overview" },
  { id: "additional", title: "Additional Disclaimers" },
  { id: "product", title: "Product Disclaimer" },
  { id: "contact", title: "Contact" },
];

function DisclaimerPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className="md:w-1/4 w-full">
          <div className="sticky top-24 border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Disclaimer</h2>
            <ul className="space-y-2 text-sm">
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-600 hover:text-black">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-3/4 w-full p-6 md:p-10 border rounded-xl">

          <h1 className="text-3xl font-bold mb-3">Disclaimer</h1>

          {/* INTRO */}
          <section id="intro" className="mb-8 scroll-mt-28">
            <p className="text-gray-600">
              Welcome to Fourstep Retail Limited (hereby referred to as “Fourstep” or “we”), a Direct Selling Company committed to providing quality products and offering product selling business opportunities to Direct Sellers. Here are some key points to understand about our business:
            </p>
          </section>

          {/* FULL BUSINESS CONTENT */}
          <section id="business" className="mb-8 scroll-mt-28">
            <ul className="list-disc pl-5 space-y-4 text-gray-600">

              <li>
                <b>No Investment Activity:</b> When you purchase products from Fourstep, you're solely purchasing products. There are no investment activities involved.
              </li>

              <li>
                <b>Compliance and Integrity:</b> Fourstep operates in full compliance with the rules Notified by the Government of India regarding Direct Selling.
              </li>

              <li>
                <b>Not a Get-Rich-Quick Scheme:</b> We do not promote or offer any get-rich-quick schemes. Our focus is on selling quality products and providing genuine business opportunities.
              </li>

              <li>
                <b>Becoming a Direct Seller:</b> Becoming a Direct Seller with Fourstep is straightforward. You simply need to familiarize yourself with our products, business plan, policies, and terms & conditions. There are no registration, enrolment, or membership fees involved. However, every Direct Seller is required to sign a contract agreeing to abide by the terms and conditions of the company, including Fourstep’s <b>Code of Ethics and Rules of Conduct</b>.
              </li>

              <li>
                <b>Income Generation:</b> Purchasing products from Fourstep does not guarantee any income. To earn income through our Product Selling Business Opportunity, you must become a Direct Seller and comply with the necessary regulations. Your income will depend solely on the sales you and your team generate, requiring effort and time investment.
              </li>

              <li>
                <b>Sales-Based Income:</b> There are no agent roles, salaried jobs, or employment opportunities for Direct Sellers. All incomes are based on Product sales.
              </li>

              <li>
                <b>No Compulsion:</b> There is no compulsion for anyone to become a Direct Seller or to purchase Fourstep products.
              </li>

              <li>
                <b>Unique ID Provision:</b> Fourstep provides Direct Sellers with a unique ID number and password free of charge upon fulfilling the company's terms and conditions. They can earn income solely by selling Fourstep products and become eligible for incomes based on business volume as per company terms and conditions/Remuneration System, subject to change without prior notice.
              </li>

              <li>
                <b>Medical Advice Disclaimer:</b> Information provided on our website, official social media platforms, or other mediums is not a substitute for professional medical advice. Always consult your physician or qualified health professional for medical concerns.
              </li>

              <li>
                <b>Intellectual Property Rights:</b> The content available on the Fourstep website and its associated platforms is protected by intellectual property rights owned by Fourstep or lawfully used under license. Unauthorized listing, promotion, or sale of our products on external websites or platforms is strictly prohibited. Fourstep does not guarantee the authenticity, safety, or quality of products purchased through unauthorized channels and shall not be liable for any refunds, returns, or claims arising from such purchases.
              </li>

            </ul>
          </section>

          {/* ADDITIONAL DISCLAIMERS */}
          <section id="additional" className="mb-8 scroll-mt-28">
            <ul className="list-disc pl-5 space-y-4 text-gray-600">

              <li>
                <b>Termination Policy:</b> Fourstep reserves the right to terminate Direct Sellers found not adhering to the company’s policies, code of conduct, and terms and conditions without prior notice.
              </li>

              <li>
                <b>General Information Disclaimer:</b> While we strive to provide accurate and up-to-date information, Fourstep does not take responsibility for any false promises, representations, or commitments made by Direct Sellers. We are not liable for any loss or damage arising from the use of our website or products.
              </li>

            </ul>
          </section>

          {/* PRODUCT DISCLAIMER */}
          <section id="product" className="mb-8 scroll-mt-28">
            <p className="text-gray-600 mb-4">
              <b>Product Disclaimer:</b> At Fourstep, we want to ensure that our customers have a clear understanding of our products and their intended use. Please read the following disclaimer regarding our products:
            </p>

            <ul className="list-disc pl-8 space-y-3 text-gray-600">
              <li>
                <b>Intended Use:</b> The information provided about our products on our website is intended for educational purposes only. Our products are designed to contribute to overall well-being and support holistic balance in the body and immunity levels. However, they are not intended to prevent, diagnose, treat, or cure any disease.
              </li>

              <li>
                <b>Supplements:</b> Our products are supplements meant to add value to your life. They should be used as part of a healthy lifestyle and should not be considered a substitute for professional medical advice. We are not medical professionals or researchers, and we cannot prescribe treatments or cures for specific diseases.
              </li>

              <li>
                <b>Consultation:</b> It's important to consult with your doctor or qualified healthcare provider about your health conditions and any concerns you may have.
              </li>

              <li>
                <b>Excessive Use:</b> Using any product excessively can lead to potential health problems. It's essential to follow recommended dosage guidelines and use our supplements responsibly.
              </li>
            </ul>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-28">
            <p className="text-gray-600">
              Thank you for choosing Fourstep. Should you have any further inquiries, please feel free to contact us.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default DisclaimerPolicy;