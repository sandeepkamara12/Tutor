import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ContentArea from "./common/ContentArea"
import Button from "./ui/Button";

const LearningPath = () => {
    const steps = [
        {
            title: "Your route to",
            highlight: "real conversations",
            tag: "Alphabet",
            points: [
                "All 33 letters",
                "Reading & handwriting",
                "Spot common words",
            ],
            desc: "No guesswork, no overwhelm. Just one clear step at a time, from your first letter to your first conversation.",
            study: "#lesson-alphabet",
            video: "https://www.youtube.com/",
        },
        {
            title: "Learn and master the",
            highlight: "cyrillic alphabet",
            tag: "Alphabet",
            points: [
                "All 33 letters",
                "Reading & handwriting",
                "Spot common words",
            ],
            desc: "Get comfortable with all 33 letters and read your first Russian words in days. Practice printed and handwritten forms, and spot familiar words.",
            study: "#lesson-alphabet",
            video: "https://www.youtube.com/",
        },
        {
            title: "Learn and master",
            highlight: "pronunciation & sounds",
            tag: "Pronunciation",
            points: [
                "Master hard & soft sounds, word stress, and tricky letters.",
            ],
            desc: "Sound natural from the start. Learn hard and soft consonants, vowel reduction, word stress, and the sounds English speakers find hardest.",
            study: "#lesson-pronunciation",
            video: "https://www.youtube.com/",
        },
        {
            title: "Build your everyday",
            highlight: "russian vocabulary",
            tag: "Vocabulary",
            points: [
                "Topic-based words",
                "Flashcards & audio",
                "Spaced repetition",
            ],
            desc: "Learn the words you'll actually use, grouped by topic: greetings, numbers, family, food, and travel, reinforced with spaced-repetition review.",
            study: "#lesson-vocabulary",
            video: "https://www.youtube.com/",
        },
        {
            title: "Master the basic of",
            highlight: "russian grammar",
            tag: "Grammar",
            points: [
                "Master noun gender, plurals, and tenses, then move through the six cases one at a time.",
            ],
            desc: "Grammar explained in plain language, with examples before rules. Noun gender, verb tenses, and the six cases, one step at a time.",
            study: "#lesson-grammar",
            video: "https://www.youtube.com/",
        },
        {
            title: "Train your listening with",
            highlight: "native audio",
            tag: "Listening",
            points: [
                "Train your ear with native audio and full transcripts for every lesson.",
            ],
            desc: "Get used to how Russian really sounds at natural speed, with slow dialogues, transcripts, and native speaker recordings.",
            study: "#lesson-listening",
            video: "https://www.youtube.com/",
        },
        {
            title: "Sharpen listening with",
            highlight: "real conversations",
            tag: "Listening",
            points: [
                "Train your ear with native audio and full transcripts for every lesson.",
            ],
            desc: "Get used to how Russian really sounds at natural speed, with slow dialogues, transcripts, and native speaker recordings.",
            study: "#lesson-listening",
            video: "https://www.youtube.com/",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStep = steps[activeIndex];

    // ---- mobile (below 640px): the top panel follows the scroll instead of the click ----
    const panelRef = useRef(null); // the sticky panel
    const mobileSteps = useRef([]); // one element per step in the mobile list
    const [panelMin, setPanelMin] = useState(0); // tallest the panel has been, so it never changes height while scrolling

    useLayoutEffect(() => {
        if (!panelRef.current || !window.matchMedia("(max-width: 639px)").matches) return;
        const h = panelRef.current.offsetHeight;
        setPanelMin((m) => (h > m ? h : m));
    }, [activeIndex]);

    useEffect(() => {
        const mobile = window.matchMedia("(max-width: 639px)");
        let frame = 0;

        const update = () => {
            frame = 0;
            if (!mobile.matches || !panelRef.current) return;
            // the line just below the sticky panel (header 64px + panel height)
            const line = panelRef.current.getBoundingClientRect().bottom;
            let current = 0; // 0 = intro text, before the first step reaches the line
            mobileSteps.current.forEach((el, i) => {
                if (el && el.getBoundingClientRect().top <= line + 1) current = i + 1;
            });
            setActiveIndex(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <section
            id="learning-path"
            className="w-full flex flex-col relative overflow-clip bg-gray-50"
        >
            <div className="custom-container flex flex-col lg:flex-row relative z-40 h-full items-center sm:py-12 lg:py-20">

                <div
                    ref={panelRef}
                    style={{ "--panel-min": `${panelMin}px` }}
                    className="max-sm:min-h-(--panel-min) max-sm:sticky max-sm:top-16 max-sm:z-30 max-sm:bg-gray-50 py-12 sm:py-0 flex flex-col items-center lg:items-start gap-3 lg:gap-6 text-center lg:text-start w-full lg:w-2/5 lg:pe-6 justify-end"
                >
                    <p
                        id="active-num"
                        className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm"
                    >{activeIndex === 0
                        ? "Learning path"
                        : `Step ${String(activeIndex).padStart(2, "0")}`}</p>
                    <h1 id="active-title" className="heading">{activeStep.title}
                        <span className="block text-russian-red">
                            {activeStep.highlight}
                        </span></h1>
                    <p id="active-desc" className="">
                        {activeStep.desc}
                    </p>
                    <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                        <Button color="blue" label={'Start Learning Free'} href="#" />
                        <Button color="red" label={'What students say'} href="#" />
                    </div>
                </div>
                <div className="w-full lg:w-3/5 lg:ps-6 pt-10 lg:pt-0" id="timeline-scroll">
                    {/* below sm (640px): everything centred, each content followed by a circle and a vertical bar.
                    No click here: the sticky panel above changes while you scroll */}
                    <div className="flex flex-col items-center sm:hidden">
                        {steps.slice(1).map((step, index, list) => {
                            const stepIndex = index + 1;
                            const isActive = activeIndex === stepIndex;
                            return (
                                <div
                                    key={step.tag + stepIndex}
                                    ref={(el) => (mobileSteps.current[index] = el)}
                                    className="group flex flex-col items-center text-center"
                                >
                                    <div className="py-1.5 text-center">
                                        <p className="text-lg font-bold text-russian-red">
                                            {String(stepIndex).padStart(2, "0")}
                                        </p>
                                        <p className={`text-base font-bold text-russian-dark-blue group-hover:text-russian-red transition-all duration-500 ${isActive && 'text-russian-red'}`}>
                                            {step.tag}
                                        </p>
                                        <p className="mt-1">{step.points.join(", ")}</p>
                                    </div>

                                    {index !== list.length - 1 && (
                                        <>
                                            <span
                                                aria-hidden="true"
                                                className="relative z-20 mt-2 flex size-4 items-center justify-center rounded-full bg-russian-dark-blue"
                                            >
                                                <span className={`size-2 group-hover:bg-russian-red transition-all duration-500 rounded-full ${isActive ? "bg-russian-red" : "bg-white"}`} />
                                            </span>
                                            <div className="h-12 border-l-2 border-dashed border-russian-red" />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* below lg: 6 columns, row 1 = content above the bar, row 2 = bar + dots, row 3 = content below the bar */}
                    <div className="relative grid max-sm:hidden grid-cols-6 gap-y-3 lg:grid-cols-[1fr_28px_1fr] lg:gap-y-0 lg:gap-x-6" id="timeline">

                        {/* vertical dashed line (lg and up) */}
                        <div className="absolute bottom-2 left-1/2 top-2 z-10 hidden -translate-x-1/2 border-l-2 border-dashed border-russian-red lg:block" />

                        {/* horizontal dashed line (below lg) */}
                        <div className="z-10 col-span-6 col-start-1 row-start-2 mx-[8.3333%] self-center border-t-2 border-dashed border-russian-red lg:hidden" />

                        {steps.slice(1).map((step, index, list) => {
                            const stepIndex = index + 1;
                            const isRight = index % 2 === 1;
                            const isActive = activeIndex === stepIndex;

                            // below lg: first text starts at the left edge, last text ends at the right edge,
                            // the others are centred on their dot (each text may be 2 columns wide)
                            const width =
                                index === 0
                                    ? "max-lg:w-[160%] max-lg:text-center"
                                    : index === list.length - 1
                                        ? "max-lg:w-[160%] max-lg:-ml-[60%] max-lg:text-center"
                                        : "max-lg:w-[160%] max-lg:-ml-[30%] max-lg:text-center";
                            const column = "max-lg:[grid-column-start:var(--col)]";

                            const content = (
                                <>
                                    <p className="text-lg font-bold text-russian-red">
                                        {String(stepIndex).padStart(2, "0")}
                                    </p>

                                    <p className={`text-base font-bold text-russian-dark-blue group-hover:text-russian-red transition-all duration-500 ${isActive && 'text-russian-red'}`}>
                                        {step.tag}
                                    </p>

                                    <p className="mt-1">
                                        {step.points.join(", ")}
                                    </p>
                                </>
                            );

                            return (
                                <div
                                    key={step.tag + stepIndex}
                                    style={{ "--col": index + 1 }}
                                    className={`step-row group contents ${isActive ? "active" : ""}`}
                                >
                                    {/* Left side (above the bar below lg) */}
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(stepIndex)}
                                        className={`step-content cursor-pointer py-1.5 ${isRight
                                                ? "lg:invisible lg:order-none hidden lg:flex"
                                                : `block max-lg:row-start-1 max-lg:self-end ${column} ${width} lg:w-full lg:text-right`
                                            }`}
                                        aria-pressed={isActive}
                                    >
                                        {isRight ? null : content}
                                    </button>

                                    {/* Timeline dot */}
                                    <div className={`flex items-center justify-center py-1.5 max-lg:row-start-2 ${column}`}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(stepIndex)}
                                            aria-label={`Show step ${stepIndex}`}
                                            aria-pressed={isActive}
                                            className="relative z-20 flex size-4 items-center justify-center rounded-full bg-russian-dark-blue"
                                        >
                                            <span
                                                className={`size-2 group-hover:bg-russian-red transition-all duration-500 rounded-full ${isActive
                                                        ? "bg-russian-red"
                                                        : "bg-white"
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Right side (below the bar below lg) */}
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(stepIndex)}
                                        className={`step-content cursor-pointer py-1.5 lg:order-none ${!isRight
                                                ? "lg:invisible hidden lg:flex"
                                                : `block max-lg:row-start-3 max-lg:self-start ${column} ${width} lg:w-full lg:text-left`
                                            }`}
                                        aria-pressed={isActive}
                                    >
                                        {isRight ? content : null}
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LearningPath