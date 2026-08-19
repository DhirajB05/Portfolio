import { userImages } from '../data/images';

export const getDailyDecoration = (): string => {
  const day = new Date().getDay();
  const map: Record<number, string> = {
    0: userImages.decorations.soulLeavingBody,
    1: userImages.decorations.cyberKatana,
    2: userImages.decorations.candlelightDark,
    3: userImages.decorations.cyberKatana,
    4: userImages.decorations.candlelightDark,
    5: userImages.decorations.shy,
    6: userImages.decorations.blossomBurst,
  };
  return map[day] || userImages.decorations.cyberKatana;
};
