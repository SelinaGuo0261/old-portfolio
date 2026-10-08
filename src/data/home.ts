/** Home page copy. Project lists come from src/content/projects. */
import kudos1 from '@/assets/site/kudos-1.jpg';
import kudos2 from '@/assets/site/kudos-2.jpg';
import kudos3 from '@/assets/site/kudos-3.jpg';

export const home = {
  greeting: 'Hey there, this is',
  /** Names the hero types out, and the colour for each. */
  typed: [
    { word: 'XINYU GUO', color: '#befe00' },
    { word: 'SELINA', color: '#b984fd' },
  ],
  intro: '3 projects are under construction from internships and start-ups; More to come!',
  kudos: [
    { quote: "Selina is a creative problem-solver. She consistently approaches design challenges with innovative solutions that not only meet project goals but also push the boundaries of what’s possible. She has an incredible eye for detail, which make our product young, fresh, and professional.", name: "XILU", role: "LESIGN LEAD @ FLIGGY DESIGN", photo: kudos1 },
    { quote: "Selina has a growth mindset that is truly admirable. She’s always open to feedback and continuously seeks out opportunities to refine her skills and expand her knowledge. This dedication to improvement is inspiring. She'll be an excellent full stack ux designer soon.", name: "LANJUE", role: "LESIGN LEAD @ XIAOHONGSHU COMMERCIALIZATION", photo: kudos2 },
    { quote: "Selina has a remarkable ability to lead through collaboration. She brings the team together, fosters open communication, and ensures that every voice is heard, which leads to stronger, more cohesive designs.", name: "YIFAN MEI", role: "CEO @ PROTALLE", photo: kudos3 },
  ],
  cta: {
    lines: ['Helping those who', 'use tech to make the', 'world a better place'],
    text: "Let's build products with a desire to create more social impact.",
    button: 'Learn More About Me',
  },
};
