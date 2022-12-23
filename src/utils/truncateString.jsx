export const truncateString = (input) => (input.length > 5 ? `${input.substring(0, 5)}...${input.substr(input.length - 5)}` : input);
