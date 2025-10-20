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
        // scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => { return `  We live in a country where ${scrollToNumber(26.7, 5, positionRefNodes.intro)} million people live without access to clean water devoid of toxins.` },
        fontSize: 30,
        fillColor: "#14122cff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        // scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    },
    {
        type: "text",
        content: () => { return `  Yet we've built hundreds of datacenters to support the Artificial Intelligence boom. Due to "commercial sensitivity," the true quantities of resources these centers consume is subject only to guesswork. But global estimates suggest that around half the yearly water withdrawl of the United Kingdom could be put towards cooling AI datacenters by the year 2027.` },
        fontSize: 30,
        fillColor: "#14122cff",
        yPos: auto,
        height: auto,
        credits: 2,
        leftMargin: 100,
        bottomMargin: 100,
        // scrollLockInterval: [positionRefNodes.intro - 100, positionRefNodes.intro * 2]
    }, {
        type: "text",
        content: () => { return "" },
        fontSize: 2,
        fillColor: "#25292bff",
        yPos: auto,
        debug: true,
        height: auto,
        leftMargin: 100,

        ref: "endResources"
    },
    // current political analysis
    {
        type: "text",
        content: () => textObjs.power_1,
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: () => { return posRefs.scrst + 5 },
        height: auto,
        leftMargin: 100,
        bottomMargin: 5,
        scrollLockInterval() { return [posRefs.endResources - 100, posRefs.endResources + 300] }
    }, {
        type: "text",
        content: () => textObjs.power_2,
        fontSize: 30,
        fillColor: "#25292bff",
        yPos() {
            let a = posRefs.scrst + 403 + 50 + distributeText(textObjs.power_1, screenData.width - 200).length * this.fontSize
            return a
        },
        height: auto,
        leftMargin: 100,
        scrollLockInterval() { let a = distributeText(textObjs.power_1, screenData.width - 200).length * this.fontSize; return [posRefs.endResources + 300 + a, posRefs.endResources + 750] }
    }, {
        type: "text",
        content: () => "Part two - Energy",
        fontSize: 60,
        fillColor: "#006600ff",
        yPos: () => { return posRefs.endResources - 50 },
        height: auto,
        leftMargin: 100,
        bottomMargin: 30,
        scrollLockInterval: () => { return [posRefs.endResources - 100, posRefs.endResources + 750] }
    }, {
        type: "animObj",
        src: "screenshot",
        xEqn: (screenData.width / 2) - (811 / 2),
        height: 403,
        width: 811,
        yPos: () => { return posRefs.endResources + 50 },
        ref: "scrst",
        scrollLockInterval: () => { return [posRefs.endResources - 100, posRefs.endResources + 750] }
    },
    {
        type: "rect",
        fillColor: screenData.fills.highligter,
        height: 20,
        xEqn: () => { return (screenData.width / 2) - (811 / 2) + 655 },
        yPos: () => { return posRefs.endResources + 65 },
        width: () => { return Math.min(Math.max(scrollDistance - posRefs.endResources + 300, 0), 90) },
        scrollLockInterval: () => { return [posRefs.endResources - 100, posRefs.endResources + 750] }
    },
    {
        type: "rect",
        fillColor: screenData.fills.highligter,
        height: 20,
        xEqn: () => { return (screenData.width / 2) - (811 / 2) + 15 },
        yPos: () => { return posRefs.endResources + 95 },
        width: () => { return Math.min(Math.max(scrollDistance - posRefs.endResources + 200, 0), 645) },
        scrollLockInterval: () => { return [posRefs.endResources - 100, posRefs.endResources + 750] }
    },
    // RESOURCES
    {
        type: "text",
        content: () => "Part three - Resources",
        fontSize: 60,
        fillColor: "#25292bff",
        yPos: () => { return posRefs.scrst + 1000 + distributeText(textObjs.power_1).length * 30 + distributeText(textObjs.power_2).length * 30 + distributeText(textObjs.power_1).length * 30 },
        height: auto,
        leftMargin: 100,
        bottomMargin: 30,
        ref: "resStart"
    }, {
        type: "text",
        content: () => "The production individual phone or laptop, bought once by an individual every few years results in a fairly low amount of resource extraction, resulting in little impact on how many resources are reaped from the earth and refined in unethical practices created from centuries of colonialism.",
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
    }, {
        type: "animObj",
        src: "phone",
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        debug: true,
        scale: () => { return Math.min(1, Math.max(0.05, (posRefs.resStart - scrollDistance) / screenData.height)) },
    }, {
        type: "text",
        content: () => { return "But what about ten?" },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
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

        scale: () => {
            return Math.min(1, Math.max(0.05, (posRefs.resStart - scrollDistance) / screenData.height))
        },
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

        scale: () => {
            return Math.min(1, Math.max(0.05, (posRefs.resStart - scrollDistance) / screenData.height))
        },
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
    }, {
        type: "imgArr",
        src: "phone",
        arrWidth: ((screenData.width - 200) / (.025 * 500)),
        arrHeight: 1000 / ((screenData.width - 200) / (.025 * 500)),
        arrSpacing: 100,
        ySpacing: 100,
        xEqn: 100,
        height: 681,
        width: 400,
        yPos: auto,
        debug: true,
        scale: () => { return Math.min(1, Math.max(0.025, (posRefs.resStart + 100 - scrollDistance) / screenData.height)) },
    }, {
        type: "text",
        content: () => { return "  That's the kind of number that shapes an industry. And 30,000 is only a 2023 estimate of the number of GPUs (Graphics Processing Units - a component critical to training and running AI models) that the company NVIDIA would sell to OpenAI (just one company!) for an earlier version of ChatGPT. (Just one of their products! Image and video generation take a world more of processing power.)" },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
    }, {
        type: "text",
        content: () => { return "  That's much closer to the beginning of the AI boom. The number of chips and computing units manufactured has skyrocketed past it, to the point where NVIDIA has become one of the world's highest-valued companies, in the trillions of dollars, at times surpassing both Apple and Microsoft." },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
    }, {
        type: "text",
        content: () => { return "  Along with the disastrous outcome of an increase in mining of heavy metals, the state of landfills (especially those holding hazardous waste) in the united states disproportionately impacts people of color and other minority groups. A substantial increase in E-waste as GPU clusters die will correlate with an increase in corporate waste and toxins dumped into these locations." },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 10,
    }, {
        type: "text",
        content: () => { return "  Although in its direct actions, the generative AI market does not produce novel forms of environmental injustice, the impacts of its growth are widespread, exacerbating preexisting harms and, dangerously, damaging our incentives to address those harms." },
        fontSize: 30,
        fillColor: "#25292bff",
        yPos: auto,
        height: auto,
        leftMargin: 100,
        bottomMargin: 100,
    }, {
        type: "text",
        content: "Part 4 - Social impacts",
        fontSize: 60,
        fillColor: "#a75600ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: "  How easy is it to make something up?",
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: "  If you wanted to, how easy would it be to write an essay casting skepticism on the fact that climate change is real, or that claims there 'isn't enough evidence' to link racial segregation with poor health outcomes?",
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: "  Not hard. Perhaps. But how long would this take? How many hours or days would it take to write many of those articles, scattered across multiple websites, citing each other (or other, made up sources) for an air of authenticity?",
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: `  How easy would it be to make an average person read every single one of those essays and, with only a cursory glance at their content, think "well, that looks like a decently-thought out essay"?`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: `  Now imagine that that work could be done with a few keystrokes, and propogated across the internet with only a minimal need for a human to look over it?`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        bottomMargin: 20,
        height: auto,
    }, {
        type: "text",
        content: `  That's a first threat of Artificial Intelligence - its confidence, its ease of use, its ubiquity. How easy is it now for malicious actors to spread this sort of content? Far, far easier in the past.`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: `  But the second threat is far more insidious.`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: `  What's the first thing you need to address global, existential problems like Climate Change and Climate Justice? You need resources, yes. You need information and a platform and something to amplify your voice. But before all of that you need people.`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        height: auto,
    }, {
        type: "text",
        content: `  People with the ability to problem-solve and think critically. Lots of them.`,
        fontSize: 30,
        fillColor: "#3b2610ff",
        yPos: auto,
        leftMargin: 100,
        bottomMargin: 20,
        height: auto,
    }, {
        type: "text",
        content: () => { return ` So what ${scrollDistance - posRefs.sWdWd > -400 ? "CAN" : "do"} we do` },
        fontSize: 30,
        fillColor: "#291d0fff",
        yPos: auto,
        leftMargin: 100,
        bottomMargin: 20,
        height: auto,
        ref: "sWdWd"
    }, {
        type: "text",
        content: ` If those people`,
        fontSize: 30,
        fillColor: "#7e6e5aff",
        yPos: auto,
        leftMargin: 100,
        bottomMargin: 20,
        height: auto,
    }, {
        type: "text",
        content: ` Become few and far between?`,
        fontSize: 30,
        fillColor: "#b9aea4ff",
        yPos: auto,
        leftMargin: 100, bottomMargin: 20,
        height: auto,
    }, {
        type: "rect",
        xEqn: 107,
        yPos: () => { return posRefs.sWdWd - 20 },
        fillColor: "#291d0fff",
        width: () => {
            let a = render.measureText(` So what ${posRefs.sWdWd - scrollDistance > -400 ? "can" : "do"} we do`).width
            return Math.min(Math.max(a - (posRefs.sWdWd - scrollDistance - screenData.height / 2) / 2, 0), a)
        },
        height: 5,
    }
]
let textObjs = {
    power_1: "This increase in water usage coincides with a rise in investment in fossil fuels and lowering of regulatory power in the United States' federal government. Trump's Executive Order 14241 specifically mentions “Emerging technologies” as an impetus for domestic energy production (“including coal”). This is no coincidence. The power consumption requirements of AI datacenters at scale have outpaced the rate of growth in sustainable energy. This has slowed the green energy transition, keeping coal plants open as power needs balloon. The order also specifies how coal can be used 'in any weather condition' - no unimportant point: AI datacenters are subject to near-constant demand, substantially increasing their power draw. It is also no coincidence that many companies have reported increases in their net emissions and begun to roll back their once-lofty climate goals. It is these goals that would restrict their access to the explosive growth and profits in the lucrative generative AI market.",
    power_2: "This will increase the environmental burden on margianalized communities, furthering the impact of fossil fuels  the people who can least afford it."
}