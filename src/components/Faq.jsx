
import { useState } from "react";
import Button from "./ui/Button";
import { motion } from "motion/react";
import { animationTop } from '../constants';

const faqData = [
    {
        question: "Do I need to know any Russian or English?",
        answers: [
            "No. We start from zero and every lesson is explained in Hindi.",
            "You only need to be able to read Hindi. English is helpful but not required.",
        ],
    },
    {
        question: "How long does it take to learn the Cyrillic alphabet?",
        answers: [
            "Most students read all 33 letters within one to two weeks, with about 20 minutes of practice a day.",
            "Many letters look or sound like ones you already know, which makes it faster.",
        ],
    },
    {
        question: "Is Russian very difficult for Hindi speakers?",
        answers: [
            "Less than you might think. Russian has sounds, such as the rolled r and soft and hard consonants, that feel familiar from Hindi.",
            "Words are read as they are written, and I explain the grammar with Hindi examples.",
        ],
    },
    {
        question: "Are the lessons and study material free?",
        answers: [
            "You can start for free. The alphabet lessons, sample quizzes and free study material are open to everyone.",
        ],
    },
    {
        question: "How much time should I study every day?",
        answers: [
            "Ten to twenty minutes every day works better than two hours once a week.",
            "Short, regular practice is what makes new words stay.",
        ],
    },
    //   {
    //     question: "How long until I can hold a basic conversation?",
    //     answers: [
    //       "With regular practice, most students can introduce themselves and manage simple everyday phrases in about two to three months.",
    //     ],
    //   },
    //   {
    //     question: "Will I get a certificate?",
    //     answers: [
    //       "Yes, you receive a certificate when you complete a course.",
    //     ],
    //   },
    //   {
    //     question: "Can I learn Russian for study, work or travel?",
    //     answers: [
    //       "Yes. The lessons cover everyday phrases for travel, study and work.",
    //       "Many students use Russian for studying in Russia or for jobs that involve Russian-speaking countries.",
    //     ],
    //   },
    //   {
    //     question: "How can I ask my doubts?",
    //     answers: [
    //       "Use the contact form, WhatsApp or Instagram.",
    //       "I reply personally, usually within one to two working days.",
    //     ],
    //   },
    //   {
    //     question: "Can I learn on my phone?",
    //     answers: [
    //       "Yes. The website works on any phone, tablet or computer, so you can learn wherever you are.",
    //     ],
    //   },
];

const Faq = () => {
    // Keep the second FAQ open initially, matching your original template.
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index
        );
    };

    return (
        <section
            id="faq"
            className="z-40 relative py-16 lg:py-24 bg-gray-50"
        >
            <div className="custom-container relative z-40">

                {/* Section heading */}
                <div className="flex flex-col lg:w-1/2 mx-auto gap-6 items-center text-center mb-10">
                    <motion.p
                      {...animationTop}
                     className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">
                        FAQS
                    </motion.p>

                    <motion.h1 
                      {...animationTop}
                                transition={{
                                    ...animationTop.transition,
                                    delay: 0.05,
                                }}
                    className="heading">
                        Questions{" "}
                        <span className="text-russian-red">students</span> ask
                    </motion.h1>

                    <motion.p
                      {...animationTop}
                                transition={{
                                    ...animationTop.transition,
                                    delay: 0.1,
                                }}
                    >
                        Quick answers about learning Russian in Hindi. If you
                        can’t find yours here, write to me and I will reply
                        personally.
                    </motion.p>
                </div>

                {/* FAQ list */}
                <div
                    id="faq-list"
                    className="flex flex-col gap-3 max-w-3xl mx-auto"
                >
                    {faqData.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const answerId = `faq-${index + 1}`;

                        return (
                            <motion.div
                              {...animationTop}
                                transition={{
                                    ...animationTop.transition,
                                    delay: 0.15 + index * 0.05,
                                }}
                                key={faq.question}
                                data-open={isOpen}
                                className={`${0.15 + index * 0.05} group rounded border border-transparent bg-gray-200/70 transition-all duration-300 data-[open=true]:bg-white data-[open=true]:border data-[open=true]:border-gray-200/70`}
                            >
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex items-center gap-3 ps-4 pe-2 py-2 text-left cursor-pointer focus:outline-hidden"
                                >
                                    {/* Question */}
                                    <span className="grow font-bold text-russian-dark-blue leading-5">
                                        {faq.question}
                                    </span>

                                    {/* Toggle icon */}
                                    <span className="size-8 shrink-0 flex items-center justify-center rounded bg-russian-dark-blue text-white text-xs transition-all duration-300 group-hover:bg-russian-red group-data-[open=true]:bg-white group-data-[open=true]:text-gray-400 group-data-[open=true]:border group-data-[open=true]:border-gray-200/70">
                                        <i className="fa-solid fa-plus group-data-[open=true]:rotate-45" aria-hidden="true"></i>
                                    </span>
                                </button>

                                {/* Answer */}
                                <div
                                    id={answerId}
                                    className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                    aria-hidden={!isOpen}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-3 flex flex-col">
                                            {faq.answers.map((answer, answerIndex) => (
                                                <p
                                                    key={answerIndex}
                                                    className="text-gray-600"
                                                >
                                                    {answer}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Contact link */}
                <motion.div
                  {...animationTop}
                                transition={{
                                    ...animationTop.transition,
                                    delay: 0.4,
                                }}
                 className="flex flex-col items-center gap-3 mt-10 text-center">
                    <p>Have any other questions?</p>
                    <Button color="blue" label="Conact Me" href="#enquiry" />
                </motion.div>

            </div>
        </section>
    );
};

export default Faq;