import React from "react";

const sections = [
  { id: "intro", title: "Overview" },
  { id: "eligibility", title: "Eligibility & Process" },
  { id: "conditions", title: "Conditions & Shipping" },
  { id: "others", title: "Other Policies" },
];

function ReturnPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className="md:w-1/4 w-full">
          <div className="sticky top-24 bg-white border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">
              Return Policy
            </h2>
            <ul className="space-y-2 text-sm">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-3/4 w-full bg-white p-6 md:p-10 rounded-xl border">
          <h1 className="text-3xl font-bold mb-3">
            RETURN / EXCHANGE POLICY
          </h1>

          {/* INTRO */}
          <section id="intro" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">
            <p>
              This Return / Exchange Policy outlines the procedures and terms for returns and exchanges of products purchased from Fourstep Retail Limited. Please read this policy carefully before making a purchase. By engaging with our products and services, you agree to the terms outlined herein.
            </p>
          </section>

          {/* ELIGIBILITY + PROCESS */}
          <section id="eligibility" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Eligibility for Return / Exchanges:</b> We accept return / exchanges under the following circumstances:</p>

            <ul className="list-disc ml-5 space-y-1">
              <li>Defective or damaged products</li>
              <li>Incorrect products received</li>
              <li>Products not meeting quality expectations</li>
              <li>Only regular priced items may be refunded, sale items cannot be refunded.</li>
              <li>If the item in question was marked as a gift when purchased and shipped directly to you, you will receive a gift credit for the value of your return.</li>
            </ul>

            <p><b>Return / Exchange Period:</b> We offer return and / or exchange within the first 3 days of your receipt of product. If 3 days have passed since receipt of the product, you will not be offered a return and / or exchange of any kind.</p>

            <p><b>Return / Exchange Process:</b> To initiate a return / exchange, follow these steps:</p>

            <ul className="list-disc ml-5 space-y-1">
              <li>Contact our customer support team at www.fourstepretail.com or 9726286000.</li>
              <li>Provide your order number, product details, and reason for return / exchange.</li>
              <li>Our customer support team will guide you through the process and provide necessary instructions.</li>
            </ul>

          </section>

          {/* CONDITIONS */}
          <section id="conditions" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Return / Exchange Conditions:</b> In case of any dissatisfaction, manufacturing or packaging defect, Customers / Direct Sellers can return / exchange the product. The Customers / Direct Seller must contact the Direct Seller / Company from whom they had purchased the same, within 30 days from the date of receipt of the product. They have to give a reason and return the said products along with the original customer order receipt copy / invoice. In such cases, it is the Direct Seller’s obligation to satisfy the customer’s need for money refund or replacements of products. The Direct Seller can then return these products, with original Invoice to the Company. The Company will replace these products free of cost or if the Direct Seller does not want the same products, the Company will give a cash voucher (zero BV) of the same amount, which can be used by the Direct Seller within 30 days for purchasing products of their choice. Documents required for returning the products are mentioned below:</p>

            <ul className="list-disc ml-5">
              <li>Product Return Form</li>
              <li>Reason for return</li>
              <li>Copy of Invoice</li>
              <li>Products to be returned</li>
            </ul>

            <p>
              The product must be returned in its original packaging, along with all accessories and tags. The product must be unused and in the same condition as when received. This policy does not apply to products that have been intentionally damaged or misused. Proof of purchase (order confirmation) is required for processing returns / exchanges.
            </p>

            <p>
              The Return / Exchange Policy is designed to impose upon the sponsor and the Company – the obligation to ensure that the Customer / Direct Seller is buying products wisely.
            </p>

            <p><b>Return Shipping:</b> For defective, damaged, or incorrect products, company will arrange return shipping and cover associated costs. For products returned for reasons other than defects, the customer is responsible for return shipping costs.</p>

            <p><b>Inspection and Return / Exchange:</b> Once the returned product is received and inspected, we will process the return or exchange. Refunds will be issued using the original payment method. Please allow 20 days for the refund to reflect in your account.</p>

          </section>

          {/* OTHER */}
          <section id="others" className="scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Cooling Off Policy:</b> The Company provides a Cooling Off Policy to the Direct Sellers who wish to resign from their Direct Sellership within 03 Working days of their registration and return any Fourstep Product that are in good condition, useable, resaleable, restock-able, unopened, unaltered. In this case company shall provide a full refund for the products after deducting bonus paid (if any) and reversing the BV on the products (if any).</p>

            <p><b>Policy Updates:</b> We reserve the right to update this Return / Exchange Policy as needed. Any changes will be posted on our website, and the revised date will indicate the last update.</p>

            <p><b>Contact Information:</b> For any questions, concerns, or requests related to returns or exchanges, please contact our customer support team at www.fourstepretail.com or 9726286000.</p>

            <p>
              By engaging with Fourstep Retail Limited, products and services, you acknowledge and agree to the terms outlined in this Return Policy.
            </p>

            <p><b>Fourstep Retail Limited</b></p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;