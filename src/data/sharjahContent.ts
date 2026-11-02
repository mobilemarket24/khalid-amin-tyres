// محتوای محلی یکتا برای صفحات شعبه‌ی شارجه.
// بر پایه‌ی واقعیت‌های شعبه: Industrial Area 4، ساعت کاری ۹ صبح تا ۱۱ شب،
// و مشتریانی که از سراسر شارجه، عجمان و بخشی از دبی و ابوظبی مراجعه می‌کنند.

export interface LocalHighlight {
  title: string;
  text: string;
}

export interface LocalContent {
  sectionTitle: string;
  intro: string[];
  highlights: LocalHighlight[];
  closing: string;
}

const CLOSING_WHATSAPP =
  "Send your tyre or rim size on WhatsApp before you set off and we will confirm what is in stock at the Sharjah branch, so you only drive over once.";

export const SHARJAH_CONTENT: Record<string, LocalContent> = {
  tyres: {
    sectionTitle: "Buying tyres at our Sharjah branch",
    intro: [
      "Our Sharjah branch sits in Industrial Area 4, which is why it ends up being the practical choice for a wide area rather than just the immediate neighbourhood. Drivers reach us from across Sharjah and from Ajman in a short run, and we regularly fit tyres for customers who drive over from Dubai — and occasionally from as far as Abu Dhabi — because the branch is easy to get in and out of without city-centre traffic.",
      "The branch is open from 9:00 in the morning until 11:00 at night, every day. That late closing matters more than it sounds: most tyre problems are noticed on the drive home, not at nine in the morning, and being open until 23:00 means you can deal with a worn or damaged tyre the same evening instead of taking time off work. Fitting and wheel balancing are both carried out here in branch, so a tyre change is finished in one visit.",
    ],
    highlights: [
      {
        title: "Open until 11 PM",
        text: "Come after work rather than taking time off — the Sharjah branch stays open until 23:00, seven days a week.",
      },
      {
        title: "Stock checked first",
        text: "Message us your size and we confirm it is physically in the Sharjah branch before you make the trip.",
      },
      {
        title: "Fitted in one visit",
        text: "Tyre fitting and wheel balancing are done on site, so you leave with the job completed.",
      },
    ],
    closing: CLOSING_WHATSAPP,
  },

  rims: {
    sectionTitle: "Rims and alloy wheels in Sharjah",
    intro: [
      "Rims are less forgiving than tyres, because a wheel that looks right can still be wrong for your car. Bolt pattern (PCD), offset and centre bore all have to match, and getting one of them wrong means the wheel either will not mount or will not sit true. For that reason we always start from the car rather than the wheel: tell us the make, model and year and we work back to the sizes that actually fit it.",
      "The Sharjah branch in Industrial Area 4 serves customers from across the emirate and from Ajman, and a good share of our rim work is for SUVs and 4x4s on 18 to 22-inch wheels — the Land Cruiser, Patrol and similar models that are common on UAE roads. If you are changing rims and tyres at the same time, we can handle both in a single visit, which saves fitting the old tyres onto new wheels and then changing them again later.",
    ],
    highlights: [
      {
        title: "Fitment checked first",
        text: "We confirm PCD, offset and centre bore against your car before anything is ordered or fitted.",
      },
      {
        title: "Rims and tyres together",
        text: "Change both in one visit instead of paying to mount tyres twice.",
      },
      {
        title: "SUV and 4x4 sizes",
        text: "Strong coverage of the 18 to 22-inch fitments used on the SUVs most common here.",
      },
    ],
    closing:
      "Send your car make, model and year on WhatsApp and we will tell you which rim sizes fit, what we have at the Sharjah branch, and the price.",
  },

  alignment: {
    sectionTitle: "Wheel alignment at the Sharjah branch",
    intro: [
      "Alignment goes out of specification gradually, and in the UAE it usually happens for ordinary reasons: a kerb taken slightly too fast, a deep expansion joint on a highway, or simply accumulated kilometres on long inter-emirate drives. The symptoms are easy to miss at first — the car pulls gently to one side, the steering wheel sits slightly off centre when you are driving straight, or one edge of a tyre wears noticeably faster than the rest.",
      "That last symptom is the expensive one. A car driven out of alignment can wear the shoulder of a tyre away long before the rest of the tread is finished, which means replacing tyres early for no other reason. We carry out alignment at the Sharjah branch in Industrial Area 4, and it is worth having it checked whenever you fit new tyres so the new set starts its life wearing evenly.",
    ],
    highlights: [
      {
        title: "Signs to watch for",
        text: "Pulling to one side, an off-centre steering wheel, or uneven wear on one tyre edge.",
      },
      {
        title: "Check with new tyres",
        text: "Having alignment checked at fitting time protects the tread life of the new set.",
      },
      {
        title: "Open late",
        text: "Until 23:00 daily, so an alignment check fits around a working day.",
      },
    ],
    closing:
      "Message us on WhatsApp with your car model and we will confirm timing and price for a wheel alignment at the Sharjah branch.",
  },

  balancing: {
    sectionTitle: "Wheel balancing in Sharjah",
    intro: [
      "Balancing and alignment are often confused, but they fix different problems. Alignment is about the angles the wheels sit at; balancing is about weight distribution around each wheel. If a wheel is even slightly heavier on one side, that imbalance turns into a vibration once the wheel is spinning fast — which is why the classic symptom is a shake through the steering wheel or the seat that appears at around 80 to 120 km/h and fades when you slow down.",
      "Left alone, an unbalanced wheel does more than annoy. The vibration works on suspension components and bearings, and it scallops the tread in patches so the tyre becomes noisy and wears out early. Wheel balancing is carried out at our Sharjah branch in Industrial Area 4 and is done as a matter of course whenever we fit new tyres, so a fresh set runs smoothly from the first drive.",
    ],
    highlights: [
      {
        title: "Vibration at speed",
        text: "A shake that appears around 80 to 120 km/h and settles when you slow down usually means imbalance.",
      },
      {
        title: "Not the same as alignment",
        text: "Balancing corrects wheel weight distribution; alignment corrects wheel angles. Many cars need both.",
      },
      {
        title: "Done with every fitting",
        text: "New tyres fitted at the Sharjah branch are balanced as part of the job.",
      },
    ],
    closing:
      "If you feel a vibration at highway speed, message us on WhatsApp and we will check the balance at the Sharjah branch.",
  },
};

export function getSharjahContent(key: string): LocalContent | null {
  return SHARJAH_CONTENT[key] ?? null;
}
