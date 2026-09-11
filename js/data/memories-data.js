export const memories = [

    {
        image: "assets/images/memories/dec-30-selfie.jpeg",
        title: "Birthday selfie!!!",
        date: "December 30, 2025",
        description: "naka peace sign kasi gusto pa ng graham",
        rotation: "-2.2deg"
    },

    {
        image: "assets/images/memories/dec-30-w-tita.jpeg",
        title: "Family pic?",
        date: "December 30, 2025",
        description: "nakangiti kayo kasi nakakatawa, nakangiti ako kasi kinakabahan",
        rotation: "1deg"
    },

    {
        image: "assets/images/memories/june-13.jpeg",
        title: "Sa mata ng lente ni Pau",
        date: "June 13, 2026",
        description: "Aminin, mas bagay ko bag mo",
        rotation: "-0.9deg"
    },

    {
        image: "assets/images/memories/first-flower.jpg",
        title: "First uwi!",
        date: "November 11, 2025",
        description: "after many days of waiting, finally our first reunion! ft. my first flowers for u",
        rotation: "1.9deg"
    },

    {
        image: "assets/images/memories/groufiee.jpeg",
        title: "First pic with ur ppl",
        date: "December 30, 2025",
        description: "ang awkward ko sa paligid nila pero im glad they made me feel like i belong",
        rotation: "-0.9deg"
    },

    {
        image: "assets/images/memories/ai.jpeg",
        title: "Dreamy",
        date: "December 30, 2025",
        description: "our future is beautiful",
        rotation: "0.9deg"
    },

    {
        image: "assets/images/memories/fave.jpg",
        title: "shopping!!",
        date: "December 29, 2025",
        description: "still my fave pic of us. look at how cure we are",
        rotation: "-1deg"
    },

    {
        image: "assets/images/memories/healing-inner-child.jpg",
        title: "My lucky charm",
        date: "November 11, 2025",
        description: "Ikaw talaga swerte ko e no. Eto lang naman sugal ko, payagan mo na ko pls. I love you",
        rotation: "0.9deg"
    },

    {
        image: "assets/images/memories/carnations.jpg",
        title: "As beautiful as you",
        date: "November 11, 2025",
        description: "these are as beautiful as you",
        rotation: "-0.7deg"
    },

    {
        image: "assets/images/memories/hule.jpg",
        title: "sapol",
        date: "March 5, 2026",
        description: "muntik na ko matumba tinawanan pa ko",
        rotation: "1.2deg"
    },
    
    {
        image: "assets/images/memories/first-see-you-later.jpeg",
        title: "not a goodbye",
        date: "October 3, 2025",
        description: "One of our most vulnerable moments.",
        rotation: ".9deg"
    },

    {
        image: "assets/images/memories/with-tita.jpg",
        title: "flowers for tita!",
        date: "December 30, 2025",
        description: "buti nalang di ako sinabon no, naligo naman ako e",
        rotation: "-1deg"
    },

    {
        image: "assets/images/memories/ulo-carme.jpg",
        title: "urban ligind",
        date: "October 2, 2025",
        description: "panorama fail: NOOOOOOO. CARMEEEEEE",
        rotation: "-2.2deg"
    },

    {
        image: "assets/images/memories/tokyo-tokyo.jpg",
        title: "culture shock",
        date: "November 23, 2025",
        description: "ganon pala sa tokyo, mabababa yung bubong",
        rotation: "-.2deg"
    },

    {
        image: "assets/images/memories/cake.jpeg",
        title: "ugh! ganda super!",
        date: "December 30, 2025",
        description: "ganda nung nasa harap, nasa likod patay gutom",
        rotation: "-1.2deg"
    },

    {
        image: "assets/images/memories/tom.jpg",
        title: "bestfriend",
        date: "December 30, 2025",
        description: "look how happy he is. he misses you too",
        rotation: "-.9deg"
    },

    {
        image: "assets/images/memories/may-31.jpg",
        title: "hindi sila tao, bagay sila",
        date: "May 31, 2026",
        description: "super ganda ng mga gift mo sakinnn",
        rotation: "2.2deg"
    },

    {
        image: "assets/images/timeline/magnum.jpg",
        title: "my first magnum",
        date: "October 2, 2025",
        description: "thank you sa libre mahayy kuuu",
        rotation: "1deg"
    },

    {
        image: "assets/images/memories/march-4.jpg",
        title: "halik ng reyna",
        date: "March 4, 2026",
        description: "sana pinansalo ko yung labi ko",
        rotation: "1deg"
    },

    {
        image: "assets/images/firsts/my-people.jpg",
        title: "With my ppl",
        date: "March 4, 2026",
        description: "Jollidate with these amazing ppl",
        rotation: "1deg"
    },
];

export const sortedMemories = [...memories].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
);