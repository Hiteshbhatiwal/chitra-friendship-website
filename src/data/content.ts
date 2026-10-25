/**
 * A Little World of Chitra 💌 - Central Content Manifest
 * All captions, letters, and text can be reviewed and edited here.
 */

export interface WebsiteContent {
  meta: {
    recipientName: string;
    websiteTitle: string;
    subheading: string;
  };
  welcome: {
    envelopeBadge: string;
    envelopeNote: string;
    openButtonText: string;
  };
  birthday: {
    heading: string;
    subheading: string;
    makeWishButton: string;
    wishMadeText: string;
  };
  friendshipIntro: {
    badge: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
  };
  apologyLetter: {
    heading: string;
    badge: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  funnyMoments: {
    heading: string;
    subheading: string;
    rollButtonText: string;
    randomQuotes: string[];
  };
  friendshipCards: Array<{
    id: string;
    icon: string;
    title: string;
    tagline: string;
    secretMessage: string;
  }>;
  giftBox: {
    heading: string;
    subheading: string;
    promptText: string;
    openedMessage: string;
  };
  closing: {
    heading: string;
    subheading: string;
    message: string;
    buttonBackToMemories: string;
  };
}

export const siteContent: WebsiteContent = {
  meta: {
    recipientName: "Chitra Sharma",
    websiteTitle: "A Little World of Chitra 💌",
    subheading: "A personal scrapbook of smiles, school chaos & genuine memories"
  },
  welcome: {
    envelopeBadge: "Private Delivery 📬",
    envelopeNote: "A tiny surprise made just for you, Chitra 💗",
    openButtonText: "Open Your Envelope ✨"
  },
  birthday: {
    heading: "Happy Belated Birthday, Chitra! 🎂✨",
    subheading: "Even though I'm a little late, every single wish is sent with 100% warmth and care.",
    makeWishButton: "Tap to Blow Out Candles 🕯️",
    wishMadeText: "May all your wishes come true! 💖🎉"
  },
  friendshipIntro: {
    badge: "Chapter One 📖",
    heading: "Our Crazy Little World 🌍💗",
    paragraph1: "School gave us endless classes, unfinished homework, and chaotic lunch breaks—but the best thing it ever gave was this friendship.",
    paragraph2: "Here is a tiny digital scrapbook keeping the laughter, memories, and inside jokes safe forever."
  },
  apologyLetter: {
    heading: "A Sincere Note from the Heart 💌",
    badge: "From Me to You 🌸",
    greeting: "Hey Chitra 💗,",
    paragraphs: [
      "I know this birthday wish is a little late, and I'm genuinely sorry I couldn't wish you on time.",
      "Even though I'm late, I didn't want to let the moment pass without making something special for you. So, I made this little corner of the internet just for you—a collection of memories, smiles, silly moments, and all the little things that make our friendship special.",
      "Thank you for being part of so many memories. I hope this little surprise makes you smile, because you deserve happiness, love, and lots of beautiful moments.",
      "I may have missed the perfect timing, but I still wanted you to know that you're appreciated. 💗",
      "Happy belated birthday, Chitra! 🎂💌"
    ],
    closing: "With lots of love,",
    signature: "Your friend 💗"
  },
  funnyMoments: {
    heading: "Certified Pagal-Panti Department 🤡💗",
    subheading: "School wouldn't have been half as fun without all the silly antics and unhinged laughing fits.",
    rollButtonText: "Ek aur pagal-panti 😂",
    randomQuotes: [
      "Remember trying not to burst out laughing in the middle of the quietest classroom silence? 🤫😂",
      "Sharing lunchboxes before the bell even rang like it was an undercover mission 🍱🕵️‍♀️",
      "The collective panic when the teacher asked: 'Who will present first?' 💀",
      "Saying 'I haven't studied anything at all' and then still passing with flying colours ✨",
      "Running through corridors like we were in an Olympic final just to catch our friends 🏃‍♀️💨",
      "Drawing silly doodles in the last pages of notebooks during the most serious lectures 🎨📓",
      "Making intense eye contact across the classroom and immediately losing all composure 😭👀",
      "Walking in slow motion after recess trying to delay going back to class by at least 2 minutes ⏳🚶‍♀️"
    ]
  },
  friendshipCards: [
    {
      id: "presence",
      icon: "🌷",
      title: "Your Presence",
      tagline: "Always lighting up the room",
      secretMessage: "You bring warmth, sincerity, and good energy wherever you go. School was so much brighter having you around! 🌟"
    },
    {
      id: "memories",
      icon: "📸",
      title: "Our Memories",
      tagline: "Every chapter counts",
      secretMessage: "From corridor gossip to exam cramming, every memory we made is a keepsake I'm grateful for. 💖"
    },
    {
      id: "bond",
      icon: "💗",
      title: "Our Friendship",
      tagline: "Unconditional & lasting",
      secretMessage: "No matter how much time passes or how late a wish might be, you will always be a genuinely cherished friend. 💖"
    }
  ],
  giftBox: {
    heading: "A Little Surprise for You 🎁",
    subheading: "Tied with ribbon and packed with warmth",
    promptText: "Tap the box to open your gift 🎀",
    openedMessage: "You are truly one of a kind, Chitra! Wishing you the happiest year ahead full of success, peace, and smiles! 🌸🎂"
  },
  closing: {
    heading: "Different People, One Crazy Bond! 💗",
    subheading: "Made with memories, a little chaos, and lots of care.",
    message: "Happy Belated Birthday, Chitra! Thank you for being such a wonderful person.",
    buttonBackToMemories: "Revisit Memories 📸"
  }
};
