// Hindi FAQ translations - Complete
// Combined from part1 and part2
// Tailored for the Indian market

import faqPart1 from './hi-part1.js';
import faqPart2 from './hi-part2.js';

// Merge categories and FAQs from both parts
const combinedFAQ = {
  categories: {
    ...faqPart1.categories,
    ...faqPart2.categories
  },
  faqs: {
    ...faqPart1.faqs,
    ...faqPart2.faqs
  }
};

export default combinedFAQ;
