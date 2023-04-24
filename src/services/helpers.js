
export const generateRandomId = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  let id = '';

  const randomChars = chars + digits;
  for (let i = 0; i < Number(length); i++) {
    id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  let shuffledId = '';

  while (id.length > 0) {
    const randomIndex = Math.floor(Math.random() * id.length);
    shuffledId += id.charAt(randomIndex);
    id = id.substring(0, randomIndex) + id.substring(randomIndex + 1);
  }

  return shuffledId;
};


//To be used for creating a petition ID from the title of the petition, so it looks better in the URL
export const generatePetitionId = (title) => {
  const words = title.trim().split(' ');
  const firstFiveWords = words.slice(0, 5);
  const customId = `${firstFiveWords.join('-')}${generateRandomId(5)}`;
  return customId;
};

export const formattedDate = (timestamp) => {
  return timestamp.toLocaleString('bg-BG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}