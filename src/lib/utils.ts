export const createId = () => `${Date.now()}-${Math.floor(Math.random() * 999)}`;

export const cleanContentString = (content: string): string => {
	return content.trim();
};
