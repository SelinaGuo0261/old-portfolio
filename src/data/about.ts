/**
 * About page content. Edit text here; images live in src/assets/about/.
 */
import img_portrait from '@/assets/about/portrait.jpg';
import img_thiland1 from '@/assets/about/thiland1.jpg';
import img_birthday2 from '@/assets/about/birthday2.jpg';
import img_jellycat from '@/assets/about/jellycat.jpg';
import img_thiland2 from '@/assets/about/thiland2.jpg';
import img_thiland3 from '@/assets/about/thiland3.jpg';
import img_birthday1 from '@/assets/about/birthday1.jpg';
import img_tufting from '@/assets/about/tufting.jpg';
import img_miami1 from '@/assets/about/miami1.jpg';
import img_vex2017 from '@/assets/about/vex2017.png';
import img_vex2019 from '@/assets/about/vex2019.png';
import img_vex2 from '@/assets/about/vex2.png';
import img_brown from '@/assets/about/brown.png';
import img_cart from '@/assets/about/cart.png';
import img_hci from '@/assets/about/hci.png';
import img_ux1 from '@/assets/about/ux1.png';
import img_portalle from '@/assets/about/portalle.png';
import img_fliggywork from '@/assets/about/fliggywork.jpg';
import img_mit_pdd from '@/assets/about/mit-pdd.jpg';
import img_uw_hcde from '@/assets/about/uw-hcde.jpg';
import img_alibaba_intern from '@/assets/about/alibaba-intern.png';

import type { ImageMetadata } from 'astro';

export interface TimelineEntry {
  date: string;
  text: string;
  note?: string;
  image?: ImageMetadata;
}

export const about = {
  headline: "Xinyu Guo is a full-stack product designer based in Seattle, WA.",
  portrait: img_portrait,
  skills: ["#UX Design", "#Product Strategy", "#Design System"],
  resume: 'documents/Selina-Guo-Resume.pdf',
  bio: [
    "💯 I am an international student from 🏡Nanjing, China, and currently enroll in 🧙University of Washington for MS in Human Centered Design & Engineering. I will graduate at June, 2026.",
    "🎨 As a designer, I care deeply about how technology can be translated into a more humanistic language, and how we can better democratize design, creation, and collaboration through creative software.",
    "🧩 Combining my education in art and engineering, I am specialized in Design System, Data Vis, AI Solutions and Vibe Coding for large-scaled, complex systems.",
    "👁️ Moreover, my background in robotics and ⌨️CS also extends to front-end development and AI.  I have experience in the conceptual design of intelligent hardware and multi-modal interaction projects. One of my design \"ArthoGlove - Hand Pain Simulation\" has won 2nd Prize of 2024 China-US Young Maker Competition.",
    "🗺️ Aside from work, I love exploring 🏖️⛵🐠extreme sports, Art Toys, and metaverse in whatever ways I can.",
  ],
  intro: "Want to know more about me?\nScroll down to see my career life!",
  photos: [
    [img_thiland1, img_birthday2],
    [img_jellycat, img_thiland2, img_thiland3],
    [img_birthday1, img_tufting, img_miami1],
  ],
  storyTitle: "The Story of how I Become a User Experience Designer",
  storyLead: ["My dream journey was started by a group of friends with the same passion. ", "The story starts 9 years ago... Strap in."],
  timeline: [
    { date: "December 2017", text: "I was always telling people that Vex Robotics Competition was the source of my passion in design and technology. \n\nGirls can do engineering!", note: "Three years experience in high school club allow me to develop from a tyro to an all-around captain capable of design, construction, programming, and operation. I've devote all my spare time into robots.", image: img_vex2017 },
    { date: "December 12, 2019", text: "I always remember this day. I got the offer from RISD and the award of VEX Asia Chamiponship.", image: img_vex2019 },
    { date: "September 2020", text: "Become a RISD student. But COVID-19 stoped my aborad study. My freshman year was totally online! But luckly, it gave me extra opportunity to keep in contact with VEX Robotics.", note: "I went back to high-school teams to support younger members preparing new seasonal competitions. This is my way of giving back to the community, as I was once helped by selfless alumni and seniors as well.", image: img_vex2 },
    { date: "September 2021", text: "To be honest, I don't really like what I've learned this year. My heart still belongs to Computer Science. Thanks to Brown Univeristy that gives me opportunity to study coding.", image: img_brown },
    { date: "March 2022", text: "The final design studio course in my Sophomore year introduced User Experience Design, which I collaborated with Jessie and designed a smart shopping cart. I finally found something I like in Industrial Design Department.", image: img_cart },
    { date: "June 2022", text: "I explored more about UX Design and Interaction Design online. I started to know the term \"Human Computer Interaction\".", note: "I recognized that the Interaction Design program at Parsons that had admitted me was exactly what I wanted to study. And since CMU was my dream school, when I found the HCI program, I regret more that I did not do more to enhance my grades (CMU requires 24 for TOEFL speaking and I got 23). \n\nAs a result, I began the arduous journey of standardized exams again.", image: img_hci },
    { date: "September 2022", text: "Entering Junior year, I drived my academic focus to UIUX. I was trying to study more digital prototyping techniques as well as user-centered design. I was continuted programming at Brown and self-explored different kinds of technology and AI.", image: img_ux1 },
    { date: "February 2023", text: "Yifan Mei from UCI found me to do start-up. I finally got a chance to do toB UX design.", note: "Thought I am so not sure how much I can get from doing this (will recuriter seriously interested in failed startup projects?), I am passionate about it.", image: img_portalle },
    { date: "June 2023", text: "Join the Alibaba Fliggy Design group as a UX Designer of school recruitment of interns. Cooperated and designed for 4 different projects. All launched!\n\nFinally got official return offer at Oct, 2023.", image: img_fliggywork },
    { date: "February 2024", text: "Had a chance to join MIT Product Design Development course instructed by Prof. Steven D. Eppinger.", note: "I've worked with 5 students from MIT and another RISD designers, designing and prototyping Nimbus. It is a plant-health detector with gamified mobile app. And luckily, we won the final presentation. This is my first-ever chance to collaborate with engineers. I'd love to experience more.", image: img_mit_pdd },
    { date: "September 2024", text: "Become a graduate student major in Human Centered Design & Engineering at the University of Washington!", note: "I received an offer at UW HCDE after being turned down by other graduate programs in HCI. I'm eager to become a full-stack UX designer and learn more about human-computer interaction.", image: img_uw_hcde },
    { date: "June 2025", text: "Joined Alibaba International Group as a UX design intern. I was full engaged to participate in designing the international version of Taobao.", note: "Thanks for the wonderful team Studio Kio to provide the opportunity to allow me develop and deliver my skills in UIUX for such a large-based popular app.", image: img_alibaba_intern },
  ] satisfies TimelineEntry[],
};
