export interface SemesterType {
  semester: number;
  spi: number | null;
  subjects: Array<string>;
  credits: Array<number>;
}
