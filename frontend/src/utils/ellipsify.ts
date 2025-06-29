export const ellipsify = (word: string, length = 12) => {
  if (word.length > length) {
    return (
      word.substring(0, length / 2) + "..." + word.substring(word.length - length / 2)
    );
  } else {
    return word;
  }
};
