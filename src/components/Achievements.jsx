import Button from "./ui/Button"

const Achievements = () => {
    const achievements = [
        {
            id: 1,
            title: "First Steps",
            description: "Complete your first lesson",
        },
        {
            id: 2,
            title: "Cyrillic Reader",
            description: "Learn all 33 letters",
        },
        {
            id: 3,
            title: "7-Day Streak",
            description: "Study 7 days in a row",
        },
        {
            id: 4,
            title: "Word Collector",
            description: "Learn 100 words",
        },
        {
            id: 5,
            title: "Quiz Master",
            description: "Score 100% on 10 quizzes",
        },
        {
            id: 6,
            title: "First Conversation",
            description: "Finish your first dialogue",
        },
    ];

    const stats = [
        { id: 1, value: "12", label: "Day Streak" },
        { id: 2, value: "148+", label: "Words Learned" },
        { id: 3, value: "20+", label: "Lessons Completed" },
        { id: 4, value: "24+", label: "Quizzes Completed" },
        { id: 5, value: "6h 30m", label: "Time Studied" },
        { id: 6, value: "86%", label: "Quiz Accuracy" },
    ];

    const progressItems = [
        { id: 1, title: "Alphabet", progress: 100, color: "bg-russian-dark-blue" },
        { id: 2, title: "Pronunciation", progress: 60, color: "bg-russian-dark-blue" },
        { id: 3, title: "Vocabulary", progress: 25, color: "bg-russian-red" },
        { id: 4, title: "Grammar", progress: 40, color: "bg-russian-red" },
    ];

    return (
        <section
            id="progress_achievements"
            className="z-40 relative w-full relative overflow-hidden flex items-center bg-gray-50"
        >
            <div className="custom-container relative z-40 py-16 lg:py-24">

                <div className="flex flex-col items-center lg:items-start xl:w-2/5 gap-6 text-center lg:text-start">
                    <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Progress &
                        Achievements
                    </p>
                    <h1 className="heading">See how far <span className="text-russian-red">you've come</span></h1>
                    <p>Track your progress, build a daily habit, and celebrate every milestone. Small steps every day lead to big
                        results.</p>
                    <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                        <Button color="blue" label="Create a free account" href="#" />
                        <Button color="red" label="See the learning path" href="#" />
                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center lg:gap-3 justify-center lg:justify-start flex-col lg:flex-row">
                            <p className="font-bold text-lg text-russian-dark-blue">Achievement Badges</p>
                            <span className="text-sm font-medium text-gray-500">6 of 6 earned</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center lg:text-start max-sm:[&>*:nth-child(odd)]:text-end max-sm:[&>*:nth-child(even)]:text-start">
                            {achievements.map((item, index) => {
                                const total = achievements.length;
                                const lastInRow = (columns) => (index + 1) % columns === 0 || index === total - 1;

                                return (
                                    <div
                                        key={item.id}
                                        className={`flex flex-col border-r border-dashed border-gray-300 pr-4 ${lastInRow(2) ? "max-sm:border-r-0" : ""
                                            } ${lastInRow(3) ? "sm:max-lg:border-r-0" : ""} ${lastInRow(6) ? "lg:border-r-0" : ""}`}
                                    >
                                        <p className="font-bold text-russian-dark-blue">{item.title}</p>

                                        <p className="lg:text-sm">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center lg:gap-3 justify-center lg:justify-start flex-col lg:flex-row">
                            <p className="font-bold text-lg text-russian-dark-blue">Your Activities</p>
                            <span className="text-sm font-medium text-gray-500">Last 30 days</span>
                        </div>

                        <div className="grid grid-cols-1 sd:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center sd:max-sm:[&>*:nth-child(odd)]:text-end sd:max-sm:[&>*:nth-child(even)]:text-start lg:text-start">
                            {stats.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`flex flex-col ${index !== stats.length - 1
                                        ? "border-b pb-4 sd:border-b-0 sd:border-r border-dashed border-gray-300 sd:pr-4"
                                        : "sd:pr-4"
                                        } ${index === 1 || index === 3
                                            ? "min-sd:max-sm:border-r-0"
                                            : ""
                                        } ${index === 2
                                            ? "min-sm:max-lg:border-r-0"
                                            : ""
                                        }`}
                                >
                                    <p className="font-bold lg:text-xl text-russian-dark-blue">
                                        {item.value}
                                    </p>

                                    <p className="lg:text-sm">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-10">
                    <div className="flex items-center gap-3">
                        <p className="font-bold text-lg text-russian-dark-blue">Your Progress</p>
                        <span className="text-sm font-bold text-russian-red">Level 1</span>
                    </div>

                    <div className="grid xxs:grid-cols-2 lg:grid-cols-4 gap-4">
                        {progressItems.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between lg:text-sm font-semibold text-russian-dark-blue mb-1.5">
                                    <span>
                                        {item.id}. {item.title}
                                    </span>
                                    <span>{item.progress}%</span>
                                </div>

                                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Achievements
