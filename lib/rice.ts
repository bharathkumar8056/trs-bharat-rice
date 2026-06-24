export type RiceSpec = { label: string; value: string }
export type RiceCategory = "Basmati" | "Non-Basmati"

export type Rice = {
  slug: string
  name: string
  category: RiceCategory
  tagline: string
  shortDescription: string
  description: string
  image: string
  features: string[]
  specifications: RiceSpec[]
  usage: string[]
  cookingTip?: string
}

export const riceVarieties: Rice[] = [
  {
    slug: "basmati-rice",
    name: "Basmati Rice",
    category: "Basmati",
    tagline: "The King of Aromatic Rice",
    shortDescription:
      "World-famous long-grain aromatic rice with elongating grains, a delicate floral fragrance, and a fluffy non-sticky texture when cooked.",
    description:
      "Basmati rice is the crown jewel of Indian rice — a long-grain aromatic variety grown in the cool foothills of the Himalayas across Punjab, Haryana, and parts of Uttar Pradesh. Each grain stretches to nearly twice its raw length when cooked, releasing its signature floral aroma from the naturally occurring compound 2-acetyl-1-pyrroline. Aged for 12–24 months before milling, our Basmati delivers the elegance, separation, and fragrance that the world's most demanding biryani houses, hospitality groups, and retail chains expect.",
    image: "/assets/rice/basmati-rice.jpg",
    features: ["Long Grain", "Aromatic", "Aged Premium", "Export Grade", "GI-Tagged"],
    specifications: [
      { label: "Grain Type", value: "Long Grain" },
      { label: "Average Length", value: "7.5 – 8.4 mm" },
      { label: "Color", value: "Creamy White" },
      { label: "Aroma", value: "Strong, Natural" },
      { label: "Aging", value: "12 – 24 months" },
      { label: "Moisture", value: "≤ 13%" },
      { label: "Broken Grains", value: "≤ 5%" },
      // { label: "Origin", value: "Punjab, Haryana, UP — North India" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP, jute & retail packs" },
    ],
    usage: [
      "Hyderabadi & Lucknowi Biryani",
      "Persian Polo & Tahdig",
      "Pulao, Jeera Rice & Jeweled Rice",
      "Middle Eastern Mandi, Kabsa, Majboos",
    ],
    cookingTip:
      "Rinse 2–3 times and soak for 20–30 minutes before cooking. Use a 1 : 1.75 rice-to-water ratio for fluffy, fully-elongated, separate grains.",
  },
  {
    slug: "1121-basmati-rice",
    name: "1121 Basmati Rice",
    category: "Basmati",
    tagline: "The World's Longest Grain Basmati",
    shortDescription:
      "An extra-long grain Basmati renowned worldwide for its record cooked length, exceptional elongation ratio and clean, separate, fluffy grains.",
    description:
      "Pusa 1121 — popularly known simply as 1121 Basmati — is the world's longest-grain Basmati variety, recognised by APEDA and exported in greater volume than any other Basmati line. Raw grains average 8.4 mm and elongate to over 20 mm when cooked, delivering an extraordinary 2.4× elongation with virtually no breakage. Its low amylose content keeps grains separate and fluffy, while a clean, mildly aromatic profile makes it the preferred choice for biryani houses, hospitality groups and premium retail brands across the Middle East, Europe and North America.",
    image: "/assets/rice/1121-basmati-rice.jpg",
    features: ["Extra-Long Grain", "High Elongation", "Aged Premium", "Export Grade"],
    specifications: [
      { label: "Grain Type", value: "Extra-Long Grain" },
      { label: "Average Length (Raw)", value: "8.30 – 8.40 mm" },
      { label: "Cooked Length", value: "Up to 20 mm" },
      { label: "Color", value: "Creamy White" },
      { label: "Aroma", value: "Mild, Natural" },
      { label: "Aging", value: "12 – 24 months" },
      { label: "Moisture", value: "≤ 13%" },
      { label: "Broken Grains", value: "≤ 2%" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP, jute & retail packs" },
    ],
    usage: [
      "Premium Hyderabadi & Lucknowi Biryani",
      "Gulf-style Mandi, Kabsa & Majboos",
      "High-end restaurant & hospitality programs",
      "Retail private-label Basmati brands",
    ],
    cookingTip:
      "Soak for 20–30 minutes and use a 1 : 1.75 rice-to-water ratio. The grains will elongate dramatically — keep the lid sealed during the final steam.",
  },
  {
    slug: "pusa-basmati-rice",
    name: "Pusa Basmati Rice",
    category: "Basmati",
    tagline: "Improved Aromatic Basmati",
    shortDescription:
      "An improved Basmati line bred by IARI Pusa — combining traditional aroma with longer, more uniform grains and consistent export-grade quality.",
    description:
      "Pusa Basmati was developed at the Indian Agricultural Research Institute (IARI), New Delhi, to retain the classic Basmati aroma while improving grain length, yield and uniformity. Grown across the GI-tagged Basmati belt of Punjab, Haryana, Uttarakhand and western UP, Pusa Basmati delivers slender, well-milled grains that elongate beautifully on cooking and carry the natural fragrance of 2-acetyl-1-pyrroline. It is one of the most widely traded Basmati lines in international markets, balancing premium quality with reliable year-round availability.",
    image: "/assets/rice/pusa-basmati-rice.webp",
    features: ["Long Grain", "Aromatic", "Uniform Milling", "Export Grade"],
    specifications: [
      { label: "Grain Type", value: "Long Grain" },
      { label: "Average Length (Raw)", value: "7.5 – 8.0 mm" },
      { label: "Color", value: "Creamy White" },
      { label: "Aroma", value: "Strong, Natural" },
      { label: "Aging", value: "12 – 18 months" },
      { label: "Moisture", value: "≤ 13%" },
      { label: "Broken Grains", value: "≤ 5%" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP, jute & retail packs" },
    ],
    usage: [
      "Classic Indian Biryani & Pulao",
      "Persian Polo & Tahdig",
      "Middle Eastern rice platters",
      "Retail premium Basmati ranges",
    ],
    cookingTip:
      "Rinse twice and soak for 20 minutes. Use a 1 : 1.75 rice-to-water ratio for fluffy, well-separated grains.",
  },
  {
    slug: "golden-sella-basmati-rice",
    name: "Golden Sella Basmati Rice",
    category: "Basmati",
    tagline: "Parboiled Golden-Hued Basmati",
    shortDescription:
      "Premium parboiled Basmati with a rich golden hue, firm non-sticky texture and outstanding shelf life — the workhorse of large-scale biryani kitchens.",
    description:
      "Golden Sella is Basmati paddy that has been steam-parboiled before milling, locking nutrients into the grain and giving it a distinctive amber-gold color. The parboiling process hardens the starch, so cooked grains stay firm, separate and unbroken — even after extended holding in commercial kitchens. This makes Golden Sella the preferred Basmati for high-volume biryani restaurants, catering operators, airline kitchens and institutional buyers across the Middle East, Iran, Iraq and West Africa. It also offers a longer shelf life and reduced breakage during transit, making it ideal for long-haul export programs.",
    image: "/assets/rice/golden-sella-basmati-rice.jpg",
    features: ["Parboiled", "Golden Hue", "Firm Texture", "Long Shelf Life"],
    specifications: [
      { label: "Grain Type", value: "Long Grain (Parboiled)" },
      { label: "Average Length (Raw)", value: "8.0 – 8.4 mm" },
      { label: "Color", value: "Golden Amber" },
      { label: "Aroma", value: "Mild, Natural" },
      { label: "Texture", value: "Firm, Non-Sticky" },
      { label: "Moisture", value: "≤ 12.5%" },
      { label: "Broken Grains", value: "≤ 2%" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP, jute & retail packs" },
    ],
    usage: [
      "Large-format Biryani houses & catering",
      "Gulf-style Kabsa, Mandi & Majboos",
      "Airline & institutional rice programs",
      "Long-haul export to Middle East & West Africa",
    ],
    cookingTip:
      "No soaking required. Rinse once and use a 1 : 2 rice-to-water ratio. Cooks in 18–20 minutes with perfectly separate grains.",
  },
  {
    slug: "steam-basmati-rice",
    name: "Steam Basmati Rice",
    category: "Basmati",
    tagline: "Steamed for Purity & Texture",
    shortDescription:
      "Basmati paddy gently steamed under pressure before milling — delivers a clean white grain with improved hardness, low breakage and excellent eating quality.",
    description:
      "Steam Basmati is produced by lightly steaming Basmati paddy at controlled pressure before husking and milling. Unlike full parboiling, this gentle steam process preserves the natural white color and aroma of Basmati while hardening the grain enough to dramatically reduce breakage during milling and transit. The result is a pristine creamy-white Basmati that elongates well, cooks fluffy and non-sticky, and holds its shape better than raw Basmati — making it a favorite for premium retail brands and quality-conscious foodservice operators.",
    image: "/assets/rice/steam-basmati-rice.jpg",
    features: ["Steamed", "Creamy White", "Low Breakage", "Premium Cook"],
    specifications: [
      { label: "Grain Type", value: "Long Grain (Steamed)" },
      { label: "Average Length (Raw)", value: "7.5 – 8.2 mm" },
      { label: "Color", value: "Creamy White" },
      { label: "Aroma", value: "Natural Basmati" },
      { label: "Texture", value: "Fluffy, Non-Sticky" },
      { label: "Moisture", value: "≤ 13%" },
      { label: "Broken Grains", value: "≤ 2%" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP, jute & retail packs" },
    ],
    usage: [
      "Premium retail Basmati packs",
      "Restaurant biryani & pulao programs",
      "Middle Eastern rice platters",
      "Export to EU, UK, US & Canada",
    ],
    cookingTip:
      "Soak for 15 minutes and use a 1 : 1.75 rice-to-water ratio. Steam-finishing the cooked rice for 5 minutes gives the best fluffy texture.",
  },
  {
    slug: "brown-basmati-rice",
    name: "Brown Basmati Rice",
    category: "Basmati",
    tagline: "Wholegrain Aromatic Basmati",
    shortDescription:
      "Unpolished wholegrain Basmati that retains the bran layer — naturally rich in fiber, minerals and a nutty aroma, with a lower glycemic index than white rice.",
    description:
      "Brown Basmati is traditional long-grain Basmati that has had only the inedible outer husk removed, leaving the nutrient-rich bran and germ layers intact. The result is a wholegrain rice that carries the signature Basmati elongation and aroma alongside a nutty flavor, slightly chewy bite and substantially higher fiber, magnesium, B-vitamin and antioxidant content than its polished counterpart. With a lower glycemic index, Brown Basmati is increasingly favored by health-conscious consumers, diabetic-friendly food programs and wellness-focused retail ranges across the US, EU, Canada and Australia.",
    image: "/assets/rice/brown-basmati-rice.webp",
    features: ["Wholegrain", "High Fiber", "Low GI", "Natural Aroma"],
    specifications: [
      { label: "Grain Type", value: "Long Grain (Unpolished)" },
      { label: "Average Length (Raw)", value: "7.5 – 8.2 mm" },
      { label: "Color", value: "Light Brown" },
      { label: "Aroma", value: "Nutty, Natural" },
      { label: "Texture", value: "Firm, Slightly Chewy" },
      { label: "Moisture", value: "≤ 13%" },
      { label: "Broken Grains", value: "≤ 5%" },
      { label: "Packaging", value: "1 / 5 / 10 / 25 kg health & retail packs" },
    ],
    usage: [
      "Health-focused everyday meals",
      "Wholegrain pulao & vegetable bowls",
      "Diabetic-friendly & wellness ranges",
      "Premium organic & natural-food retail",
    ],
    cookingTip:
      "Soak for 30–45 minutes and use a 1 : 2.25 rice-to-water ratio. Cooks in 30–35 minutes — let it rest for 10 minutes for the best texture.",
  },
  {
    slug: "ponni-rice",
    name: "Ponni Rice",
    category: "Non-Basmati",
    tagline: "Tamil Nadu's Everyday Favorite",
    shortDescription:
      "A popular medium-grain variety that cooks soft, is mildly sweet, and is famously easy to digest — the daily table rice of South India.",
    description:
      "Ponni rice was bred in the 1980s for the Cauvery delta of Tamil Nadu and quickly became the everyday rice of South Indian households. Its short-to-medium grains turn soft and slightly sticky when cooked, with a gentle natural sweetness and exceptional digestibility. Ponni Boiled (parboiled Ponni) is the most widely exported form, prized by Tamil and South Indian diaspora communities across the Middle East, Singapore, Malaysia, and the West for its authentic taste and consistent eating quality.",
    image: "/assets/rice/ponni-rice.jpg",
    features: ["Medium Grain", "Soft Cook", "Easy Digestion", "Parboiled Option"],
    specifications: [
      { label: "Grain Type", value: "Short-to-Medium" },
      { label: "Average Length", value: "4.5 – 5.5 mm" },
      { label: "Color", value: "White / Golden (Parboiled)" },
      { label: "Aroma", value: "Mild" },
      { label: "Texture", value: "Soft, Slightly Sticky" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 5%" },
      // { label: "Origin", value: "Tamil Nadu (Cauvery Delta)" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP & retail packs" },
    ],
    usage: [
      "Daily steamed rice with sambar, rasam & curd",
      "Idli, dosa & traditional South Indian breakfasts",
      "Tamil Nadu lunch thali & banana-leaf meals",
      "Bisi bele bath & curd-rice preparations",
    ],
    cookingTip:
      "Rinse twice and use a 1 : 2 rice-to-water ratio. Cooks fully in 12–15 minutes; let it rest for 5 minutes off heat for the best texture.",
  },
  {
    slug: "ir20-rice",
    name: "IR20 Rice",
    category: "Non-Basmati",
    tagline: "High-Yield South Indian Staple",
    shortDescription:
      "A high-yielding medium-slender grain variety celebrated for its consistent quality, reliable supply, and excellent everyday cooking properties.",
    description:
      "IR20 was developed at the International Rice Research Institute (IRRI) and became one of the heroes of India's Green Revolution. This semi-dwarf, high-yielding variety is grown widely across Tamil Nadu, Andhra Pradesh, and Karnataka. Its medium-slender grains cook firm yet soft, hold their shape well, and offer reliable consistency — making it a workhorse rice for institutional buyers, food-service operators, and bulk export programs alike.",
    image: "/assets/rice/ir20-rice.jpg",
    features: ["Medium Slender", "High Yield", "Pest Resistant", "Reliable Quality"],
    specifications: [
      { label: "Grain Type", value: "Medium Slender" },
      { label: "Average Length", value: "5.5 – 6.0 mm" },
      { label: "Color", value: "White" },
      { label: "Texture", value: "Firm, Non-Sticky" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 5%" },
      // { label: "Origin", value: "Tamil Nadu, Andhra Pradesh, Karnataka" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "25 / 50 kg PP bags & bulk export packs" },
    ],
    usage: [
      "Everyday steamed rice for households & canteens",
      "Pulao, lemon rice & tamarind rice",
      "Institutional & food-service catering",
      "Bulk distribution & retail private label",
    ],
    cookingTip:
      "Use a 1 : 2 rice-to-water ratio. A short 5-minute rest after cooking lets the grains firm up beautifully.",
  },
  {
    slug: "adt-43-rice",
    name: "ADT 43 Rice",
    category: "Non-Basmati",
    tagline: "Premium Short-Duration Variety",
    shortDescription:
      "A short-duration, fine-grain Tamil Nadu variety known for its delicate taste, soft cooked texture, and consistent eating quality.",
    description:
      "Released by the Tamil Nadu Rice Research Institute at Aduthurai (ADT), ADT 43 is a fine-grain, short-duration variety prized for its taste, soft cooked texture, and quick maturity. It is one of the most popular daily-use rices in Tamil Nadu, served in homes, hotels, and catering operations across the state. Its consistent grain length and excellent eating quality also make it a favorite for parboiled rice exports to Sri Lanka, the Gulf, and South-East Asia.",
    image: "/assets/rice/adt-43-rice.jpg",
    features: ["Fine Grain", "Short Duration", "Soft Cooking", "Daily Use"],
    specifications: [
      { label: "Grain Type", value: "Fine Short-Medium" },
      { label: "Average Length", value: "5.0 – 5.5 mm" },
      { label: "Color", value: "White / Golden (Parboiled)" },
      { label: "Texture", value: "Soft, Fluffy" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 5%" },
      // { label: "Origin", value: "Tamil Nadu (Aduthurai)" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP & retail packs" },
    ],
    usage: [
      "Tamil Nadu home meals — sambar, rasam, kuzhambu",
      "Hotel & catering daily steamed rice",
      "Curd rice & coconut rice preparations",
      "Parboiled export to Sri Lanka & the Gulf",
    ],
  },
  {
    slug: "matta-rice",
    name: "Matta Rice",
    category: "Non-Basmati",
    tagline: "Kerala's Iconic Red Parboiled",
    shortDescription:
      "Traditional Kerala red parboiled rice with a distinct earthy flavor, chewy bite, and excellent nutritional density — rich in fiber, iron and minerals.",
    description:
      "Palakkadan Matta is one of Kerala's most iconic indigenous rices — a coarse, ruby-hued parboiled grain with a characteristic earthy aroma and satisfying chewy bite. Its red bran layer is rich in fiber, magnesium, zinc and B-complex vitamins, giving Matta a glycemic index lower than that of polished white rice. GI-tagged to the Palakkad region of Kerala, where the volcanic soil and specific water sources shape its unique flavor, Matta is the cornerstone of Kerala cuisine and pairs beautifully with coconut-forward curries, beef ularthiyathu, puttu and idiyappam.",
    image: "/assets/rice/matta-rice.jpg",
    features: ["Red Parboiled", "GI-Tagged", "High Fiber", "Mineral Rich"],
    specifications: [
      { label: "Grain Type", value: "Short, Bold" },
      { label: "Color", value: "Reddish Brown" },
      { label: "Aroma", value: "Earthy, Distinctive" },
      { label: "Texture", value: "Firm, Chewy" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 10%" },
      // { label: "Origin", value: "Palakkad, Kerala (GI-Tagged)" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP bags & retail packs" },
    ],
    usage: [
      "Kerala fish curry meals & beef ularthiyathu",
      "Puttu, idiyappam & traditional breakfasts",
      "Kanji (rice porridge) — comfort food classic",
      "Health-focused premium retail & wellness ranges",
    ],
    cookingTip:
      "Pre-soak for 30 minutes and use a 1 : 3 rice-to-water ratio. Matta needs longer cooking (25–30 minutes) than white rice — keep the lid sealed.",
  },
  {
    slug: "vadi-matta-rice",
    name: "Vadi Matta Rice",
    category: "Non-Basmati",
    tagline: "Bold Short-Grain Kerala Matta",
    shortDescription:
      "A bold, short-grain variant of Matta rice — robust, hearty, and ideal for traditional Kerala kanji, puttu and everyday parboiled meals.",
    description:
      "Vadi Matta is the short-grain, bold-bodied cousin of the classic Palakkadan Matta. Its rounder, plumper grains cook hearty and chewy, with the same earthy aroma and red-bran goodness that make Matta rice so beloved in Kerala households. Particularly popular for kanji, puttu and steamed rice meals where a more substantial bite is preferred, Vadi Matta is also gaining traction in wellness-focused export markets that value its fiber, iron and lower glycemic profile.",
    image: "/assets/rice/vadi-matta-rice.png",
    features: ["Short Bold", "Red Parboiled", "Hearty Cook", "High Fiber"],
    specifications: [
      { label: "Grain Type", value: "Short Bold" },
      { label: "Color", value: "Reddish Brown" },
      { label: "Texture", value: "Hearty, Chewy" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 10%" },
      // { label: "Origin", value: "Kerala" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP bags & retail packs" },
    ],
    usage: [
      "Traditional Kerala kanji & puttu",
      "Steamed rice with coconut-based curries",
      "Wellness & health-focused retail packs",
      "Specialty South Indian restaurants abroad",
    ],
  },
  {
    slug: "white-matta-rice",
    name: "White Matta Rice",
    category: "Non-Basmati",
    tagline: "Polished Kerala Matta",
    shortDescription:
      "A polished version of Matta rice that retains its characteristic taste with a lighter color, softer texture, and quicker cooking time.",
    description:
      "White Matta is Palakkadan Matta with the outer red bran layer milled off, giving a lighter-hued grain that cooks softer and faster than its traditional ruby counterpart while still carrying the unmistakable Matta flavor profile. Popular with consumers who love the taste of Kerala rice but prefer a less assertive texture, White Matta is widely used in South Indian restaurants and households across the Gulf and South-East Asia.",
    image: "/assets/rice/white-matta-rice.jpg",
    features: ["Polished Matta", "Soft Cook", "Mild Flavor", "Quick Cooking"],
    specifications: [
      { label: "Grain Type", value: "Short, Bold" },
      { label: "Color", value: "Off-White / Cream" },
      { label: "Texture", value: "Soft, Mildly Chewy" },
      { label: "Moisture", value: "≤ 14%" },
      { label: "Broken Grains", value: "≤ 10%" },
      // { label: "Origin", value: "Kerala" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP bags & retail packs" },
    ],
    usage: [
      "Daily Kerala meals with mild curries",
      "Restaurant & catering steamed rice",
      "Curd rice & comfort food preparations",
      "Export retail packs for diaspora markets",
    ],
  },
  {
    slug: "sambha-rice",
    name: "Sambha Rice",
    category: "Non-Basmati",
    tagline: "Premium Medium-Grain Workhorse",
    shortDescription:
      "A premium medium-grain variety with excellent cooking quality \u2014 non-sticky, fluffy, and equally well-suited to biryanis and everyday meals.",
    description:
      "Sambha rice is grown during the longer 'Samba' cropping season (August\u2013January) in Tamil Nadu and Andhra Pradesh, giving it a fuller, harder grain than fast-grown summer varieties. The grains stay separate and fluffy when cooked, with a clean neutral taste that takes on the flavor of spices and stocks beautifully \u2014 making it the rice of choice for South Indian biryanis, ghee rice, and large-format catering. Available as both raw and parboiled (Sambha Boiled).",
    image: "/assets/rice/sambha-rice.jpg",
    features: ["Medium Grain", "Non-Sticky", "Biryani Grade", "Parboiled Option"],
    specifications: [
      { label: "Grain Type", value: "Medium" },
      { label: "Average Length", value: "5.5 \u2013 6.2 mm" },
      { label: "Color", value: "White / Golden (Parboiled)" },
      { label: "Texture", value: "Firm, Fluffy" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Tamil Nadu & Andhra Pradesh" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "25 / 50 kg PP bags & retail packs" },
    ],
    usage: [
      "Ambur, Dindigul & Chettinad biryani",
      "Ghee rice, tomato rice & coconut rice",
      "Catering & large-format institutional cooking",
      "Parboiled exports to the Middle East",
    ],
    cookingTip:
      "Soak for 15 minutes and use a 1 : 2 rice-to-water ratio. Add a teaspoon of oil or ghee to the cooking water for extra-fluffy, separate grains.",
  },
  {
    slug: "sona-masoori-rice",
    name: "Sona Masoori Rice",
    category: "Non-Basmati",
    tagline: "South India's Lightweight Aromatic",
    shortDescription:
      "Lightweight, mildly aromatic, medium-grain rice loved across South India \u2014 perfect for daily meals, biryanis and pulao alike.",
    description:
      "Sona Masoori is a cross-bred medium-grain variety from Karnataka and Andhra Pradesh that has become the most exported non-basmati rice in the world. The grains are lightweight, lightly aromatic, and cook into a soft, fluffy bed that absorbs flavors without overpowering them. It is the everyday rice of South Indian families both at home and across the global diaspora \u2014 from Bengaluru kitchens to Indian grocery shelves in California, Toronto, Dubai and Singapore.",
    image: "/assets/rice/sona-masoori-rice.jpg",
    features: ["Lightweight", "Mildly Aromatic", "Medium Grain", "Diaspora Favorite"],
    specifications: [
      { label: "Grain Type", value: "Medium Slender" },
      { label: "Average Length", value: "5.0 \u2013 5.8 mm" },
      { label: "Color", value: "White" },
      { label: "Aroma", value: "Mildly Aromatic" },
      { label: "Texture", value: "Soft, Lightly Fluffy" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Karnataka & Andhra Pradesh" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "5 / 10 / 25 / 50 kg PP & retail packs" },
    ],
    usage: [
      "Daily steamed rice with sambar, rasam & dal",
      "Bisi bele bath, pongal & lemon rice",
      "Light pulao & vegetable biryani",
      "Retail diaspora packs across the US, EU, Gulf & ASEAN",
    ],
    cookingTip:
      "Rinse twice, soak for 10\u201315 minutes, and use a 1 : 2 rice-to-water ratio. Cooks in 12 minutes for a soft, fluffy finish.",
  },
  {
    slug: "kurnool-sona-rice",
    name: "Kurnool Sona Rice",
    category: "Non-Basmati",
    tagline: "Fine Slender Grain from Andhra",
    shortDescription:
      "A fine slender-grain rice with delicate aroma sourced from the fertile Kurnool region \u2014 a premium daily-use option for discerning households.",
    description:
      "Kurnool Sona is grown along the Tungabhadra basin in the Kurnool district of Andhra Pradesh, where the alluvial soil and irrigation network produce slender, uniformly milled grains with a subtle natural aroma. Often considered a premium step up from generic Sona Masoori, Kurnool Sona is favored by quality-conscious households and specialty retailers for daily meals where grain elegance and clean taste matter.",
    image: "/assets/rice/kurnool-sona-rice.jpeg",
    features: ["Fine Slender", "Delicate Aroma", "Premium Daily Use", "Uniform Grade"],
    specifications: [
      { label: "Grain Type", value: "Fine Slender" },
      { label: "Average Length", value: "5.2 \u2013 6.0 mm" },
      { label: "Color", value: "White" },
      { label: "Aroma", value: "Delicate" },
      { label: "Texture", value: "Soft, Non-Sticky" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Kurnool, Andhra Pradesh" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP & retail packs" },
    ],
    usage: [
      "Everyday South Indian meals",
      "Vegetable pulao & light biryanis",
      "Premium retail & private-label brands",
      "Specialty grocery exports",
    ],
  },
  {
    slug: "kolam-rice",
    name: "Kolam Rice",
    category: "Non-Basmati",
    tagline: "Light, Quick-Cooking Daily Rice",
    shortDescription:
      "A short-grain rice with subtle flavor, light texture and quick cooking time \u2014 a daily favorite for family meals across Maharashtra and South India.",
    description:
      "Kolam is a short-to-medium grain rice widely grown across Maharashtra, Karnataka and Andhra Pradesh. Its grains are smaller and lighter than Sona Masoori, cooking quickly into a tender, slightly sticky finish that pairs naturally with dal, vegetable curries and pickles. Kolam is the unsung daily-meal hero of millions of Indian households \u2014 affordable, easy to digest, and forgiving in the kitchen.",
    image: "/assets/rice/kolam-rice.webp",
    features: ["Short Grain", "Quick Cooking", "Light & Soft", "Easy Digestion"],
    specifications: [
      { label: "Grain Type", value: "Short to Medium" },
      { label: "Average Length", value: "4.5 \u2013 5.2 mm" },
      { label: "Color", value: "White" },
      { label: "Texture", value: "Soft, Lightly Sticky" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Maharashtra, Karnataka & Andhra Pradesh" },
      // { label: "Min Order Quantity", value: "10 MT" },
      { label: "Packaging", value: "10 / 25 / 50 kg PP & retail packs" },
    ],
    usage: [
      "Daily steamed rice with dal & curries",
      "Khichdi, pongal & rice porridges",
      "Curd rice & tempered rice preparations",
      "Bulk & retail family-pack distribution",
    ],
  },
  {
    slug: "jeerakasala-rice",
    name: "Jeerakasala Rice",
    category: "Non-Basmati",
    tagline: "The Aromatic Cumin Rice of Wayanad",
    shortDescription:
      "A cumin-shaped, intensely aromatic short-grain rice traditionally used in Malabar biryanis and ghee rice for its rich fragrance and rich flavor.",
    description:
      "Jeerakasala \u2014 also known as Kaima or Khyma rice \u2014 is a small, cumin-seed-shaped aromatic rice indigenous to the Wayanad highlands of Kerala. Despite its tiny grain, it carries an intense natural aroma reminiscent of jeera (cumin), which has made it the signature rice of Malabar biryani, Thalassery biryani, ghee rice and Kerala-style neychoru. Cultivated in limited quantities by traditional farmers, Jeerakasala is a treasured specialty rice with strong demand among South Indian restaurants and the Kerala diaspora worldwide.",
    image: "/assets/rice/jeerakasala-rice.jpg",
    features: ["Short Aromatic", "Cumin-Shaped", "Specialty Rice", "Biryani Grade"],
    specifications: [
      { label: "Grain Type", value: "Short, Tiny" },
      { label: "Average Length", value: "3.5 \u2013 4.2 mm" },
      { label: "Color", value: "Cream / Pale Gold" },
      { label: "Aroma", value: "Strong, Distinctive (Cumin-like)" },
      { label: "Texture", value: "Tender, Fluffy" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Wayanad, Kerala" },
      // { label: "Min Order Quantity", value: "5 MT" },
      { label: "Packaging", value: "1 / 5 / 10 / 25 kg specialty & retail packs" },
    ],
    usage: [
      "Thalassery & Malabar Biryani",
      "Kerala Ghee Rice (Neychoru)",
      "Festive & wedding feast preparations",
      "Premium specialty retail packs",
    ],
    cookingTip:
      "Wash gently and use a 1 : 1.5 rice-to-water ratio. Saut\u00e9 in ghee with whole spices before adding water to bring out its full aroma.",
  },
  {
    slug: "gandhagi-rice",
    name: "Gandhagi Rice",
    category: "Non-Basmati",
    tagline: "Heritage Fragrant Rice",
    shortDescription:
      "A naturally fragrant traditional rice variety with a distinct aroma \u2014 treasured for festive cooking, ceremonial dishes and special-occasion meals.",
    description:
      "Gandhagi (literally 'the fragrant one') is a traditional aromatic rice variety grown in pockets of Andhra Pradesh and Karnataka by heritage farmers. Its grains release a sweet, sandalwood-like fragrance during cooking that has made it a treasured rice for temple offerings, festive meals and ceremonial cooking. With renewed consumer interest in heirloom and indigenous grains, Gandhagi is making a quiet comeback on premium retail shelves and in specialty culinary programs.",
    image: "/assets/rice/gandhagi-rice.webp",
    features: ["Heritage Variety", "Natural Aroma", "Festive Use", "Specialty Grain"],
    specifications: [
      { label: "Grain Type", value: "Short to Medium" },
      { label: "Color", value: "White / Cream" },
      { label: "Aroma", value: "Sweet, Natural" },
      { label: "Texture", value: "Soft, Fluffy" },
      { label: "Moisture", value: "\u2264 14%" },
      { label: "Broken Grains", value: "\u2264 5%" },
      // { label: "Origin", value: "Andhra Pradesh & Karnataka" },
      // { label: "Min Order Quantity", value: "5 MT" },
      { label: "Packaging", value: "1 / 5 / 10 / 25 kg specialty & retail packs" },
    ],
    usage: [
      "Temple & festive prasadam preparations",
      "Ghee rice & sweet pongal",
      "Specialty retail & heirloom-grain ranges",
      "Restaurant signature South Indian platters",
    ],
  },
]

export const basmatiVarieties = riceVarieties.filter((r) => r.category === "Basmati")
export const nonBasmatiVarieties = riceVarieties.filter((r) => r.category === "Non-Basmati")

export function getRiceBySlug(slug: string): Rice | undefined {
  return riceVarieties.find((r) => r.slug === slug)
}

export default riceVarieties
