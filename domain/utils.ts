import { AbstractInvertedIndex } from "./types";

const tagReplacementMap: { [key: string]: string } = {
  "<italic>": "<i>",
  "</italic>": "</i>",
  "<bold>": "<b>",
  "</bold>": "</b>",
};

/** Turns the given `abstractInvertedIndex` into one ordered string. */
export function parseAbstract(abstractInvertedIndex: AbstractInvertedIndex) {
  const entries = Object.entries(abstractInvertedIndex);
  const resultBuffer = new Array<string>(entries.length);
  entries.forEach(([word, indices]) =>
    indices.forEach((i) => (resultBuffer[i] = word))
  );
  let resultString = resultBuffer.join(" ");
  Object.entries(tagReplacementMap).forEach(
    ([oldTag, properTag]) =>
      (resultString = resultString.replaceAll(oldTag, properTag))
  );
  return resultString;
}
