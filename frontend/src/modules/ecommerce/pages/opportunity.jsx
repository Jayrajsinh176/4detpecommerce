import React from "react";
import {
    ShoppingBag,
    Users,
    Trophy,
    Star,
    UserPlus,
    List,
    BookOpen,
    Target,
    Home,
    MessageSquare,
    CheckCircle,
    Info,
    ArrowRight,
    LogIn,
    Sparkles,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const steps = [
    { num: 1, label: "Get a sponsor or mentor", icon: UserPlus },
    { num: 2, label: "Choose your package", icon: List },
    { num: 3, label: "Access training materials", icon: BookOpen },
    { num: 4, label: "Start building your future", icon: Target },
];

const earnings = [
    {
        icon: ShoppingBag,
        title: "Retail profits",
        desc: "Earn direct profits on every product sale with competitive margins designed for your success.",
    },
    {
        icon: Users,
        title: "Team commissions",
        desc: "Build your network and earn commissions from your team's performance and achievements.",
    },
    {
        icon: Trophy,
        title: "Bonuses & rewards",
        desc: "Unlock special bonuses and exclusive rewards as you reach new milestones and targets.",
    },
    {
        icon: Star,
        title: "Leadership incentives",
        desc: "Advance to leadership positions and enjoy premium incentives, recognition, and benefits.",
    },
];

const paths = [
    {
        icon: MessageSquare,
        title: "Product Promoter",
        desc: "Share premium products with others and earn commissions. Perfect for those who love networking and building relationships.",
        benefits: ["Flexible schedule", "Unlimited earnings", "Team support"],
        createHref: "/member/signup",
        loginHref: "/member/signin",
    },
    {
        icon: Home,
        title: "Authorized Branch",
        desc: "Operate your own retail outlet and become a business owner. Ideal for entrepreneurs ready to manage their own store.",
        benefits: ["Own your business", "Exclusive territory", "Full training"],
        createHref: "/",
        loginHref: "/",
    },
];

/* ─── Tiny helpers ─────────────────────────────────────── */

function OrangeText({ children }) {
    return <span className="text-orange-700">{children}</span>;
}

function BlueText({ children }) {
    return <span className="text-blue-800">{children}</span>;
}

function OrangeDivider({ center = false }) {
    return (
        <div
            className={`mt-3 mb-6 h-[3px] w-12 rounded-full bg-orange-400${center ? " mx-auto" : ""
                }`}
        />
    );
}


/* ─── Hero ──────────────────────────────────────────────── */

// function Hero() {
//     return (
//         <section className="pt-10 pb-20 bg-white">
//             <div className="max-w-6xl mx-auto px-6 text-center">
//                 <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6 max-w-3xl mx-auto">
//                     Build a business you&apos;re{" "}
//                     <span className="relative inline-block">
//                         <OrangeText>proud of</OrangeText>
//                         <span className="absolute left-0 -bottom-1 w-full h-[4px] bg-orange-200 rounded-full -z-10" />
//                     </span>
//                 </h1>
//                 <p className="text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto mb-10">
//                     Join thousands of members already earning with Fourstep&apos;s proven health &amp;
//                     beauty business model — flexible, rewarding, and 100% yours.
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-3">
//                     <a
//                         href="/member/signup"
//                         className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-7 py-3.5 rounded-xl text-[15px] transition-colors no-underline"
//                     >
//                         Start as Promoter <ArrowRight className="w-4 h-4" />
//                     </a>
//                     <a
//                         href="/"
//                         className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl text-[15px] transition-colors no-underline"
//                     >
//                         Open a Branch <Home className="w-4 h-4" />
//                     </a>
//                 </div>
//             </div>
//         </section>
//     );
// }

/* ─── Opportunity section ───────────────────────────────── */

function OpportunitySection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

                {/* Illustration card */}
                <div className="relative">
                 <img
                src="/images/compnayprofile.png"
                alt="Company Profile"
                className="w-full rounded-2xl shadow-lg mb-5 object-cover"
              /> 
                </div>

                {/* Copy */}
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        Are you ready to{" "}
                        <OrangeText>live your dreams?</OrangeText>
                    </h2>
                    <OrangeDivider />
                    <p className="text-gray-500 text-[15px] leading-7 mb-4">
                        Fourstep Retail Ltd. makes it possible. We offer you the chance to{" "}
                        <strong className="text-gray-800 font-semibold">own your business</strong> and
                        secure your financial future with a powerful, proven marketing plan designed for
                        real people with real ambitions.
                    </p>
                    <p className="text-gray-500 text-[15px] leading-7 mb-4">
                        With the right tools, guidance, and community, your journey to success starts
                        here and now.
                    </p>
                    <p className="text-gray-500 text-[15px] leading-7">
                        Our exclusive health and beauty products, paired with a proven business
                        opportunity, give you everything you need for a{" "}
                        <strong className="text-gray-800 font-semibold">
                            healthier, wealthier, and more independent life
                        </strong>
                        . You&apos;ll earn simply by sharing this dream with others.
                    </p>
                </div>

            </div>
        </section>
    );
}



/* ─── Earnings section ──────────────────────────────────── */

function EarningsSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        What do <BlueText>I earn?</BlueText>
                    </h2>
                    <div className="mt-3 mb-6 h-[3px] w-12 rounded-full bg-orange-400 mx-auto" />
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto">
                        Four ways to earn unlimited income with Fourstep Retail Ltd. A powerful,
                        proven financial rewards system developed for dreamers, doers, and everyday
                        achievers.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {earnings.map(({ icon: Icon, title, desc }, i) => (
                        <div
                            key={title}
                            className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${i % 2 === 0 ? "bg-blue-50" : "bg-orange-50"
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 ${i % 2 === 0 ? "text-blue-600" : "text-orange-500"
                                        }`}
                                />
                            </div>
                            <h4 className="text-[15px] font-semibold text-gray-900 mb-2">{title}</h4>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
}

/* ─── CTA / paths section ───────────────────────────────── */

function CtaSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        Choose your path to <OrangeText>success</OrangeText>
                    </h2>
                    <div className="mt-3 mb-6 h-[3px] w-12 rounded-full bg-orange-400 mx-auto" />
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto">
                        Two powerful paths to financial freedom. Choose the one that aligns with your
                        goals and start building your success story today.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {paths.map(({ icon: Icon, title, desc, benefits, createHref, loginHref }, i) => (
                        <div
                            key={title}
                            className={`rounded-3xl p-9 border flex flex-col ${i === 0
                                    ? "bg-gray-800 border-gray-800"
                                    : "bg-orange-700 border-orange-700"
                                }`}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                                <Icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-[22px] font-bold text-white mb-2">{title}</h3>
                            <p className="text-white/75 text-[14px] leading-relaxed mb-6">{desc}</p>

                            <ul className="space-y-2.5 mb-8">
                                {benefits.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-center gap-2.5 text-[13px] text-white/90"
                                    >
                                        <CheckCircle className="w-4 h-4 text-white/70 shrink-0" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-3 mt-auto">
                                <a
                                    href={createHref}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-5 py-2.5 text-[13px] font-semibold hover:bg-gray-50 transition-colors no-underline"
                                >
                                    Create account <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                                <a
                                    href={loginHref}
                                    className="inline-flex items-center gap-2 border border-white/40 text-white rounded-xl px-5 py-2.5 text-[13px] font-medium hover:bg-white/15 transition-colors no-underline"
                                >
                                    <LogIn className="w-3.5 h-3.5" /> Login
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

/* ─── Root ──────────────────────────────────────────────── */

export default function OpportunityPage() {
    return (
        <div className="overflow-x-hidden font-sans antialiased">
            <main>
                {/* <Hero /> */}
                <OpportunitySection />

                <EarningsSection />
                <CtaSection />
            </main>
        </div>
    );
}
