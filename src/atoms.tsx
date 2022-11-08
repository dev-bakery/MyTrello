import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface ITodo {
  text: string;
  id: number;
}
interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To do": [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
})

export const isLightAtom = atom({
  key: 'isLight',
  default: true,
})