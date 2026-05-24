export type Rice = {
  slug: string
  name: string
  description: string
  image: string
  origin?: string
  minOrder?: string
}

export type RiceState = {
  state: string
  description: string
  varieties: Rice[]
}

export const basmati: Rice = {
  slug: "basmati-rice",
  name: "Basmati Rice",
  description:
    "World-famous long-grain aromatic rice known for its fragrance, fluffy texture, and elongated grains. Aged for premium quality.",
  image: "/assets/rice/basmati-rice.jpg",
  origin: "India (Pan-India)",
  minOrder: "10 MT",
}

export const riceByState: RiceState[] = [
  {
    state: "Tamil Nadu",
    description:
      "Tamil Nadu is renowned for traditional short to medium grain rice varieties, prized for their taste, easy digestibility, and suitability for South Indian cuisine.",
    varieties: [
      {
        slug: "ponni-rice",
        name: "Ponni Rice",
        description:
          "A popular medium-grain variety, soft when cooked and easy to digest. Widely consumed across Tamil Nadu and exported globally.",
        image: "/assets/rice/ponni-rice.jpg",
        origin: "Tamil Nadu",
        minOrder: "10 MT",
      },
      {
        slug: "ir20-rice",
        name: "IR20 Rice",
        description:
          "A high-yielding medium-slender grain variety known for its consistent quality and excellent cooking properties.",
        image: "/assets/rice/ir20-rice.jpg",
        origin: "Tamil Nadu",
        minOrder: "10 MT",
      },
      {
        slug: "adt-43-rice",
        name: "ADT 43 Rice",
        description:
          "A premium short-duration variety with fine grains. Highly preferred for daily consumption due to its taste and texture.",
        image: "/assets/rice/adt-43-rice.jpg",
        origin: "Tamil Nadu",
        minOrder: "10 MT",
      },
    ],
  },
  {
    state: "Kerala",
    description:
      "Kerala specializes in red parboiled rice varieties (Matta rice) that are nutrient-rich, robust in flavor, and form the staple of Kerala cuisine.",
    varieties: [
      {
        slug: "matta-rice",
        name: "Matta Rice",
        description:
          "Traditional Kerala red parboiled rice with a distinct earthy flavor and high nutritional value. Rich in fiber and minerals.",
        image: "/assets/rice/matta-rice.jpg",
        origin: "Kerala (Palakkad)",
        minOrder: "10 MT",
      },
      {
        slug: "vadi-matta-rice",
        name: "Vadi Matta Rice",
        description:
          "A bold, short-grain variant of Matta rice — robust, hearty, and ideal for traditional Kerala dishes like kanji and puttu.",
        image: "/assets/rice/vadi-matta-rice.png",
        origin: "Kerala",
        minOrder: "10 MT",
      },
      {
        slug: "white-matta-rice",
        name: "White Matta Rice",
        description:
          "Polished version of Matta rice retaining its characteristic taste but with a lighter color and softer texture.",
        image: "/assets/rice/white-matta-rice.jpg",
        origin: "Kerala",
        minOrder: "10 MT",
      },
    ],
  },
  {
    state: "Karnataka",
    description:
      "Karnataka produces some of India's finest aromatic and medium-grain rice varieties, well-known for their cooking quality and aroma.",
    varieties: [
      {
        slug: "sambha-rice",
        name: "Sambha Rice",
        description:
          "A premium medium-grain variety with excellent cooking qualities. Non-sticky and ideal for biryanis and everyday meals.",
        image: "/assets/rice/sambha-rice.jpg",
        origin: "Karnataka",
        minOrder: "10 MT",
      },
      {
        slug: "sona-masoori-rice",
        name: "Sona Masoori Rice",
        description:
          "Lightweight, aromatic, medium-grain rice widely loved across South India. Perfect for daily meals, biryanis, and pulao.",
        image: "/assets/rice/sona-masoori-rice.jpg",
        origin: "Karnataka & Andhra Pradesh",
        minOrder: "10 MT",
      },
      {
        slug: "kurnool-sona-rice",
        name: "Kurnool Sona Rice",
        description:
          "A fine slender-grain variety with a delicate aroma, sourced from the fertile Kurnool region. Premium daily-use rice.",
        image: "/assets/rice/kurnool-sona-rice.jpeg",
        origin: "Karnataka",
        minOrder: "10 MT",
      },
    ],
  },
  {
    state: "Andhra Pradesh",
    description:
      "Andhra Pradesh is one of India's largest rice-producing states, famous for fine-grain varieties with excellent aroma and taste.",
    varieties: [
      {
        slug: "kolam-rice",
        name: "Kolam Rice",
        description:
          "A short-grain rice with subtle flavor, light texture, and quick cooking. Highly preferred for everyday family meals.",
        image: "/assets/rice/kolam-rice.webp",
        origin: "Andhra Pradesh",
        minOrder: "10 MT",
      },
      {
        slug: "jeerakasala-rice",
        name: "Jeerakasala Rice",
        description:
          "Cumin-shaped aromatic short-grain rice, traditionally used in biryanis and ghee rice for its rich fragrance.",
        image: "/assets/rice/jeerakasala-rice.jpg",
        origin: "Andhra Pradesh",
        minOrder: "10 MT",
      },
      {
        slug: "gandhagi-rice",
        name: "Gandhagi Rice",
        description:
          "A naturally fragrant traditional rice variety with a distinct aroma. Treasured for festive cooking and special dishes.",
        image: "/assets/rice/gandhagi-rice.webp",
        origin: "Andhra Pradesh",
        minOrder: "10 MT",
      },
    ],
  },
]

export default riceByState
