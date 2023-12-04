const translate = "Translate the text below to {{target}}.\n\n{{source}}";

const metadata = `consider the following interface:\nexport interface ProcessedMetadata {\nname: string; // his full name\nage: number; // his age or zero\ndescription: string; // short description\ngender: string; // male (m) or female (f)\nheadline: string | null; // current position or null\nexperience: string | null; // short description of professional experience or null\neducation: string | null; // short description of educational experience or null\nskills: string[]; // skill array\nother: string | null; // other relevant information\n}. Based on the text below, create a json corresponding to the given interface.\n\n{{source}}`;

export default { extract: { metadata }, lang: { translate } };
