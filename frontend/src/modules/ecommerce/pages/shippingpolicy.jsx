import React from "react";

const sections = [
  { id: "intro", title: "Overview" },
  { id: "pickup", title: "Pickup & Delivery" },
  { id: "charges", title: "Charges & Shipping" },
  { id: "delivery", title: "Delivery & Law" },
];

function ShippingPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className="md:w-1/4 w-full">
          <div className="sticky top-24 border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">
              Shipping & Delivery
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
            SHIPPING POLICY
          </h1>

          {/* INTRO */}
          <section id="intro" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">
            <p>
              Orders may be placed online on website of M/s Fourstep Retail Limited (Hereinafter referred to as “Fourstep”) at www.fourstepretail.com or picked up from Fourstep’s office and / or from any of the franchisee outlet. Details are given below:
            </p>
          </section>

          {/* PICKUP + HOME DELIVERY */}
          <section id="pickup" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">

            <p><b>PICKUP FROM OFFICE OR FRANCHISEE OUTLET:</b></p>

            <p>
              Pickup orders can be placed at any of the outlet. Payment options for Pickup Orders can be Cash, Demand Draft, Credit Card and Debit Card.
            </p>

            <p>Pickup hours for all Outlets are:</p>

            <ul className="list-disc pl-5">
              <li>Monday to Friday 10:00 a.m. – 06:00 p.m.</li>
              <li>Saturday 10:00 a.m. – 01:30 p.m.</li>
              <li>Sunday (Closed)</li>
            </ul>

            <p>
              Please refer to website: www.fourstepretail.com or for any latest updates and future information.
            </p>

            <p><b>HOME DELIVERY</b></p>

            <p>
              Home Delivery orders can be placed for providing easy access & convenience on website: www.fourstepretail.com or by placing the order at office / franchisee office.
            </p>

            <p><b>Payment:</b></p>

            <p>Payment mode options for these orders can be:</p>

            <ul className="list-disc pl-5">
              <li>Orders placed at Office: Cash, Debit Card or Credit Card, Other Online Payments through Wallets</li>
              <li>Online orders: Credit Card, Debit Card, Net Banking or Account Transfers through RTGS, NEFT or IMPS, Other Online Payments through Wallets</li>
            </ul>

          </section>

          {/* CHARGES */}
          <section id="charges" className="mb-8 scroll-mt-28 text-gray-600 space-y-4">

            <p><b>Charges for Home Delivery Orders:</b></p>

            <p>
              Please note that delivery charges are determined at checkout and constitute the final fees for delivering goods to the customer or Direct Seller. We maintain standard delivery charges for most addresses.
            </p>

            <p><b>For shipping within India:</b></p>

            <ul className="list-disc pl-5">
              <li>A flat rate of Rs. 80.00/- applies to all orders below Rs. 1000.00/-</li>
              <li>Orders between Rs. 1000.00/- to Rs. 4999.00/- incur a charge of Rs. 140.00/-</li>
              <li>Orders between Rs. 5000.00/- to Rs. 9999.00/- incur a charge of Rs. 180.00/-</li>
              <li>Orders above Rs. 10000.00/- are subject to a delivery charge of Rs. 220.00/-</li>
            </ul>

            <p>
              Please note that delivery charges will be added to the purchase amount and collected accordingly.
            </p>

          </section>

          {/* DELIVERY + LAW */}
          <section id="delivery" className="scroll-mt-28 text-gray-600 space-y-4">

            <p>
              The shipments are in perfect condition when the carrier takes possession of the same. By signing “received” on the delivery note, the recipient(s) acknowledges that the order was received in satisfactory condition. Do not sign in the event of damages or product shortages. Hidden damages discovered after the carrier has left and all other discrepancies must be notified within twenty-four (24) hours of receipt of shipment. Failure to notify Fourstep for any shipping discrepancy or damage within twenty-four (24) hours of receipt of the shipment will cancel Customer / Direct Seller(s) right to request a correction and shall be considered deemed acceptance of the products.
            </p>

            <p>
              Orders placed are typically shipped the very next business day. Orders placed on Saturday after 2.30 pm will be shipped on the following Monday. Delivery time will vary according to the location of Customer / Direct Seller(s). The average time for delivery is between 2 – 7 days. Delivery of products may not happen on Sundays or on major holidays as per the policy of the delivery partner.
            </p>

            <p><b>Delivery of the Product</b></p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                There are various delivery models for delivery of purchased product to the Customers / Direct Sellers, as decided by Fourstep. The risk of any damage, loss, or deterioration of the Products during the course or delivery or during transit shall be on M/s Fourstep Retail Limited and not on the Customer / Direct Seller. Fourstep represents and warrants that the products being delivered are not faulty and are exactly those products which are listed and advertised on the website and purchased by the Customer / Direct Seller and meet all descriptions and specifications as provided on the Website: www.4stepnetwork.com.
              </li>

              <li>
                Customer / Direct Seller shipping address; pin code will be verified with the database of website before they proceed to pay for their purchase. In the event order is not serviceable by logistic service providers or the delivery address is not located in an area that is covered under the order confirmation form, Customers / Direct Sellers may provide an alternate shipping address on which the Product can be delivered by the logistics service provider.
              </li>

              <li>
                Please note that there is no guaranteed dispatch time and any information about the dispatch should not be relied upon as such. Therefore, time is not the essence of the bi-partite contract between the Customers / Direct Sellers and Fourstep for purchase and sale of product on or through the Website: www.fourstepretail.com or however, the product shall not be delivered to the Customer / Direct Seller unless he / she makes the full and final payment for Fourstep.
              </li>

              <li>
                Customer / Direct Seller shall be bound to take delivery of the Products purchased by him / her that are said to be in a deliverable state. Where Customer / Direct Seller neglects or refuses to accept the delivery of the Products ordered by him / her, the Customer / Direct Seller may be liable to Fourstep for such non-acceptance. Fourstep at its own discretion may call up the Customer / Direct Seller to evaluate the reason of non-acceptance of the product. The decision of Direct Seller would be final and binding on whether to redeliver or process refund as per the refund policy.
              </li>

              <li>
                The title in the products and other rights and interest in the products shall directly pass on to the Customer / Direct Seller from Fourstep upon delivery of such Product and upon full payment of price of the Product. Upon delivery, the Customer / Direct Seller are deemed to have accepted the Products. The risk of loss shall pass on to the Customer / Direct Seller upon delivery of Product.
              </li>

              <li>
                Before accepting delivery of any Product, the Customer / Direct Seller shall reasonably ensure that the Product’s packaging is not damaged or tampered.
              </li>
            </ul>

            <p><b>Governing Law</b></p>

            <p>
              Any dispute(s) between Customer / Direct Seller or its nominee(s) and Fourstep, arising from this Policy, shall be referred to the sole arbitrator (appointed by Fourstep) and same shall be adjudicated by such Arbitrator as per provisions of Arbitration Conciliation Act, 1996. However, all proceedings shall come within the jurisdiction of District Courts in Vadodara (Gujarat, India) only and such arbitration proceedings shall be held in district courts of Vadodara (Gujarat, India) only. The final decision of the Arbitrator would be binding upon both the parties. Any breach of this covenant by the Customer / Direct Seller will make him liable for damages and legal costs to the Fourstep.
            </p>

          </section>

        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;