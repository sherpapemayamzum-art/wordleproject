
export const WORDS = [
  'apple','brave','crane','drink','eagle','flame','grape','house','input','joker',
  'knife','lemon','mango','night','ocean','pilot','queen','river','stone','tiger',
  'unity','vivid','water','xenon','yacht','zebra','beach','cloud','dance','field',
  'ghost','heart','ivory','jelly','light','music','nurse','olive','piano','quiet',
  'robot','snake','train','urban','voice','world','pride','smile','tower','bread',
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}