import { isEmptyValue } from '@/src/helper/data-process';
import { NotLoggedInErrorType, UserNotLoggedInException } from '@/src/exception/user-not-logged-in-exception';
import apiRoulette from '@/src/api/roulette';
import { getCookie } from '@/src/helper/cookie';
import cookieName from '@/src/constant/cookie';
import { eventConfig } from '@/src/config';

// 捲出度數，誤差值是為了讓指標不要在正中間。
const randomNumber = (n, m) => Math.floor(Math.random() * (m - n + 1) + n);
const randomRange = [-1, 1];
const difference = (i) => randomNumber(0, i / 2 - 1) * randomRange[randomNumber(0, 1)];

// 度數間隔 360 / count = @間隔度數
const interval = (count) => 360 / count;

// 計算本次呈現的角度 ( * -1 是因為輪盤順時鐘轉 )
const angle = (count, reword) => interval(count) * reword * -1 + difference(interval(count));

export default class RouletteService {
  constructor(activity) {
    this.activity = activity;
    this.token = getCookie(cookieName.memberToken);
    if (isEmptyValue(this.token)) throw new UserNotLoggedInException(NotLoggedInErrorType.lostToken);
    if (isEmptyValue(this.token)) throw new Error('new RouletteService lost activity');
  }

  async getRewards() {
    return apiRoulette.fetchRewards(this.token, this.activity).then(({ data }) => data);
  }

  async enterRoulette() {
    return apiRoulette
      .enter(this.token, {
        activity: this.activity,
      })
      .then(({ data }) => {
        return {
          angle: angle(eventConfig.total, eventConfig.valueMapping[data.value]),
          interval: interval(eventConfig.total),
          name: data.name,
          message: data.message,
        };
      });
  }
}
