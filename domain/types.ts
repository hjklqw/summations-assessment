export interface AbstractInvertedIndex {
  [key: string]: number[];
}

export interface DoiResponse {
  abstract_inverted_index: AbstractInvertedIndex | null;
}
