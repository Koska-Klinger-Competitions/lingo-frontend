import dayjs from "dayjs";
import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { DateString } from "~/utils/dateString";
import { toDateString } from "~/utils/dateString";

const isActiveDay = (streak: number, day: dayjs.Dayjs): boolean => {
    const today = dayjs().startOf('day')
    const diffDays = day.diff(today) / 86400000
    if (diffDays > 0) return false
    return -diffDays < streak
};

export type StreakSlice = {
  streak: number;
  totalXp: number;
  isActiveDay: (day: dayjs.Dayjs) => boolean;
  setStreak: (num: number) => void;
  setTotalXp: (num: number) => void;
};

export const createStreakSlice: BoundStateCreator<StreakSlice> = (
  set,
  get
) => ({
  streak: 0,
  totalXp: 1,
  isActiveDay: (day: dayjs.Dayjs) => isActiveDay(get().streak, day),
  setStreak: (num: number) => set({ streak: num }),
  setTotalXp: (num: number) => set({ totalXp: num }),
});
