const translate =
  "Translate the following text into the language represented by the code '{{target}}'.\n\n{{source}}";

const metadata = `consider the following interface:\nexport interface ProcessedMetadata {\nname: string; // his full name\nage: number; // his age or zero\ndescription: string; // short description\ngender: string; // male (m) or female (f)\nheadline: string | null; // current position or null\nexperience: string | null; // short description of professional experience or null\neducation: string | null; // short description of educational experience or null\nskills: string[]; // skill array\nother: string | null; // other relevant information\n}. Based on the text below, create a json corresponding to the given interface.\n\n{{source}}`;

const bestCandidate =
  "Sort {{3}} candidates based on their skills in descending order of suitability for the following vacancy:{{description}}\nJSON:{{resumes}}\nNOTE: Don't argue just return the JSON, I repeat: Don't argue just return the JSON";

export default { extract: { metadata, bestCandidate }, lang: { translate } };

// const prompt = `consider:\n${JSON.stringify(skills)}\n## Sr. Software Engineer at Echo: Join a Collaborative Team & Build Scalable Solutions!\n**Grow your career at Echo in Chicago!** Our Sr. Software Engineer collaborates with Agile teams to design, develop, and deploy full-stack solutions using cutting-edge tech like .Net, React, Python, and AWS. You'll contribute to robust cloud-based solutions that empower millions.\n**Highlights:**\n* Collaborative, learning-focused environment\n* Impactful work: architecting scalable solutions\n* Diverse tech stack: .Net, React, Python, AWS & more\n* Cloud expertise: experience with AWS, GCP, or Azure\n* Agile practices: 2+ years of experience\n\n**Ready to grow with Echo? Apply today!**\njust return the array with the best candidates (based on the given array) in descending order. Don't argue anything just return the array`;
