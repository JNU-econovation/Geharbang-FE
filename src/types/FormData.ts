import { File } from "./File";

declare global {
  interface FormData {
    append(name: string, value: string | Blob | File, fileName?: string): void;
  }
}
export { };

