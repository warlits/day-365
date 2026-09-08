export const memories = [

    {
        image: "assets/images/memories/dec-30-selfie.jpeg",
        title: "Birthday selfie!!!",
        date: "December 30, 2025",
        description: "That time na ginagawa mo ang lahat para di ako maOP sa mga bisita mo HAHA so sweet.",
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
        description: "my first carnations for youuu",
        rotation: "1.9deg"
    },

    {
        image: "assets/images/memories/groufiee.jpeg",
        title: "First pic with ur friendss",
        date: "December 30, 2025",
        description: "That time na super awkward ng mga galaw ko kasi nagkakahiyaan kami ng mga friends mo haha. hopefully soon maging close narin kami",
        rotation: "-0.9deg"
    },

    {
        image: "assets/images/memories/ai.jpeg",
        title: "Dreamy",
        date: "December 30, 2025",
        description: "Di ako fan ng AI content, pero this one - our future - this is nice",
        rotation: "0.9deg"
    },

    {
        image: "assets/images/memories/fave.jpg",
        title: "my favorite",
        date: "December 29, 2025",
        description: "Still my fave pic of us",
        rotation: "-1deg"
    },

    {
        image: "assets/images/memories/healing-inner-child.jpg",
        title: "My lucky charm",
        date: "November 11, 2025",
        description: "Ikaw talaga swerte ko e no, i love you",
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
        description: "hahahha hulee",
        rotation: "1.2deg"
    },

];

export const sortedMemories = [...memories].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
);