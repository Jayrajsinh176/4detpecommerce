import React from "react";

const sections = [
  { id: "intro", title: "Overview" },
  { id: "legal", title: "Legal Compliance" },
  { id: "seller", title: "Direct Seller Compliance" },
  { id: "conduct", title: "Code & Enforcement" },
];

function CompliancePolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className="md:w-1/4 w-full">
          <div className="sticky top-24 border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">
              Compliance Policy
            </h2>
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

          <h1 className="text-3xl font-bold mb-6">
            Compliance Policy
          </h1>

          {/* OVERVIEW */}
          <section id="intro" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">
            <p>
              This Compliance Policy outlines the legal standards, ethical practices, and operational guidelines followed by the Company to ensure transparent, lawful, and responsible business conduct. The Company is committed to maintaining compliance with all applicable laws, regulations, and industry standards in India.
            </p>

            <p>
              All stakeholders including employees, Direct Sellers, partners, and customers are expected to adhere to this policy while engaging with the Company’s products, services, and business opportunities.
            </p>
          </section>

          {/* LEGAL */}
          <section id="legal" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">
            <p><b>Legal Compliance:</b></p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                The Company operates in accordance with the Consumer Protection Act and applicable e-commerce laws in India.
              </li>
              <li>
                The business complies with the Direct Selling Rules, 2021 issued by the Government of India.
              </li>
              <li>
                All products offered are compliant with applicable safety, labeling, and quality regulations.
              </li>
              <li>
                Proper tax compliance including GST registration, invoicing, and reporting is maintained.
              </li>
              <li>
                Customer data is handled in accordance with applicable data protection and privacy laws.
              </li>
            </ul>
          </section>

          {/* DIRECT SELLER */}
          <section id="seller" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Direct Seller Compliance:</b></p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                Direct Sellers must comply with all company policies, terms and conditions, and applicable laws.
              </li>
              <li>
                No Direct Seller shall promote or participate in any pyramid scheme or money circulation scheme.
              </li>
              <li>
                Income claims must be realistic, transparent, and not misleading.
              </li>
              <li>
                Direct Sellers must not make false representations about product benefits or business opportunities.
              </li>
              <li>
                All marketing, advertising, and promotional activities must be ethical and lawful.
              </li>
              <li>
                Direct Sellers must respect consumer rights and provide accurate product information.
              </li>
              <li>
                Unauthorized use of company brand name, logo, or intellectual property is strictly prohibited.
              </li>
            </ul>

          </section>

          {/* CODE + ENFORCEMENT */}
          <section id="conduct" className="scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Code of Conduct:</b></p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                All individuals must act with honesty, integrity, and professionalism in all dealings.
              </li>
              <li>
                Any form of fraud, misrepresentation, or unethical conduct is strictly prohibited.
              </li>
              <li>
                Confidential business information must be protected and not disclosed without authorization.
              </li>
              <li>
                Harassment, discrimination, or abusive behavior will not be tolerated.
              </li>
            </ul>

            <p><b>Monitoring & Enforcement:</b></p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                The Company reserves the right to monitor activities of Direct Sellers and stakeholders to ensure compliance.
              </li>
              <li>
                Any violation of this policy may result in suspension or termination of association with the Company.
              </li>
              <li>
                Legal action may be taken in case of serious violations or unlawful activities.
              </li>
            </ul>

            <p><b>Policy Updates:</b></p>

            <p>
              The Company reserves the right to modify or update this Compliance Policy at any time. Updated versions will be published on the website and will take effect immediately upon posting.
            </p>

            <p>
              By engaging with the Company, you acknowledge that you have read, understood, and agreed to comply with this policy.
            </p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default CompliancePolicy;