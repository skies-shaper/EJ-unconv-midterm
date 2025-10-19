function scrollToNumber(num, clamp, yPos) {
    return Math.min(num, num - ((yPos - scrollDistance) / yPos) * num).toString().substring(0, clamp).padEnd(clamp, 0)
}
let renderDataAdditions = [
    //Introduction
    {
        type: "text",
        content: () => { return `Part one - Water` },
        fontSize: 60,
        fillColor: "#2169b6ff",
        yPos: positionRefNodes["intro"],
        height: auto,
        leftMargin: 100,
        bottomMargin: 30,
        scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => { return `  We live in a country where ${scrollToNumber(26.7, 5, positionRefNodes.intro)} million people live without access to clean water devoid of toxins.` },
        fontSize: 30,
        fillColor: "#14122cff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => { return `  Yet we have built hundreds of datacenters to support the Artificial Intelligence boom. Due to "commercial sensitivity," the true quantities of resources these centers consume is subject only to guesswork. But global estimates suggest that around half the yearly water withdrawl of the United Kingdom could be put towards cooling AI datacenters by the year 2027.` },
        fontSize: 30,
        fillColor: "#14122cff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 100,
        scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => "Part two - Energy",
        fontSize: 60,
        fillColor: "#006600ff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 30,
        // scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => "Part three - Resources",
        fontSize: 60,
        fillColor: "#25292bff",
        yPos: positionRefNodes.Eorder,
        height: auto,
        leftMargin: 100,
        bottomMargin: 30,
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => "The production individual phone or laptop, bought once by an individual every few years results in a fairly low amount of resource extraction, resulting in little impact on how many resources are reaped from the earth and refined in unethical practices created from centuries of colonialism.",
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "animObj",
        src: "phone",
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        debug: true,
        scale: () => { return Math.min(1, Math.max(0.05, (positionRefNodes.Eorder - scrollDistance) / screenData.height)) },
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => { return "But what about ten?" },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "imgArr",
        src: "phone",
        arrWidth: 10,
        arrHeight: 1,
        arrSpacing: 100,
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        ySpacing: 0,

        debug: true,
        scale: () => { return Math.min(1, Math.max(0.05, (positionRefNodes.Eorder - scrollDistance) / screenData.height)) },
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => { return "Or one hundred?" },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,

        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "imgArr",
        src: "phone",
        arrWidth: 25,
        arrHeight: 4,
        arrSpacing: 100,
        ySpacing: 100,
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        debug: true,
        scale: () => { return Math.min(1, Math.max(0.05, (positionRefNodes.Eorder - scrollDistance) / screenData.height)) },
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => { return "Or thirty thousand?" },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,

        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "imgArr",
        src: "phone",
        arrWidth: 100,
        arrHeight: 300,
        arrSpacing: 100,
        ySpacing: 100,
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        debug: true,
        scale: () => { return Math.min(1, Math.max(0.025, (positionRefNodes.Eorder + 100 - scrollDistance) / screenData.height)) },
        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => { return "  That's the kind of number that shapes an industry. And 30,000 is a 2023 estimate of the number of GPUs (Graphics Processing Units - a component critical to training and running AI models) that the company NVIDIA would sell to OpenAI for ChatGPT." },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,

        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }, {
        type: "text",
        content: () => { return "  That's much closer to the beginning of the AI boom. The number of chips and computing units manufactured has skyrocketed past it, to the point where NVIDIA has become one of the world's highest-valued companies, in the trillions of dollars, at times surpassing both Apple and Microsoft." },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,

        // scrollLockInterval: [positionRefNodes.Eorder - 50, positionRefNodes.Eorder + (2 * screenData.width)]
    }
    //current political analysis
    // {
    //     type: "animObj",
    //     src: "screenshot",
    //     xEqn: (screenData.width / 2) - (811 / 2),
    //     height: 403,
    //     width: 811,
    //     yPos: positionRefNodes.Eorder,
    //     scrollLockInterval: [positionRefNodes.Eorder - 100, positionRefNodes.Eorder + (2 * screenData.height)]
    // },
    // {
    //     type: "rect",
    //     fillColor: screenData.fills.highligter,
    //     height: 20,
    //     xEqn: () => { return (screenData.width / 2) - (811 / 2) + 655 },
    //     yPos: positionRefNodes.Eorder + 20,
    //     width: () => { return Math.min(Math.max(scrollDistance - positionRefNodes.Eorder + 300, 0), 90) },
    //     scrollLockInterval: [positionRefNodes.Eorder - 100, positionRefNodes.Eorder + (2 * screenData.height)]
    // },
    // {
    //     type: "rect",
    //     fillColor: screenData.fills.highligter,
    //     height: 20,
    //     xEqn: () => { return (screenData.width / 2) - (811 / 2) + 15 },
    //     yPos: positionRefNodes.Eorder + 45,
    //     width: () => { return Math.min(Math.max(scrollDistance - positionRefNodes.Eorder + 350, 0), 645) },
    //     scrollLockInterval: [positionRefNodes.Eorder - 100, positionRefNodes.Eorder + (2 * screenData.height)]
    // }
]
