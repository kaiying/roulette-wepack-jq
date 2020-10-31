import { forEach, split, pipe, map, zipObj, splitAt, mergeAll } from 'ramda';
import MemberService from '@/src/service/member-service';
import RouletteService from '@/src/service/roulette-service';
import {systemError, userNotLoggedIn} from '@/src/constant/message';
import {exceptionType} from "@/src/constant/exception";
import dateFormat from '@/src/helper/date';
import {NotLoggedInErrorType, UserNotLoggedInException} from "@/src/exception/user-not-logged-in-exception";
import {step} from '@/src/constant/step';
import {eventConfig} from '@/src/config';

import '@/src/third-party/jquery-rotate';


/** Global Params **/
let activity = '';

/** 處理使用者 token exception */
const processUserException = exception => {
  if (exception.type === exceptionType.userNoLogin) return Promise.reject({
    ...new UserNotLoggedInException(NotLoggedInErrorType.lostToken),
    response: {
      status: 401,
      message: userNotLoggedIn,
    }
  });
  return Promise.reject(exception);
}

/**
 * 取會員資料
 * @return {Promise<boolean|*>}
 */
const getUser = async () => {
  try {
    const service = new MemberService();
    return await service.getMember();
  } catch (exception) {
    return processUserException(exception);
  }
};

/** 取中獎資料 */
const getRewards = async () => {
  try {
    const service = new RouletteService(activity);
    return await service.getRewards();
  } catch (exception) {
    return processUserException(exception);
  }
};

const renderRewardRows = (rewords) => {
  const className = 'reward-rows';
  $(`.${className}`).remove(); // append 會一直往下加，要把前面的刪掉。
  forEach((reword) => {
    const date = $('<td></td>').text(dateFormat(reword.date));
    const name = $('<td></td>').text(reword.name);
    const row = $('<tr></tr>').addClass(className).append(date).append(name);
    $('#rewords').append(row);
  }, rewords);
};

// 顯示訊息
const showModal = (text, type = step.none) => {
  $('#modal-message').text(text);
  $('#roulette-close').data('step', type);
  $('#roulette-modal').modal({
    escapeClose: false,
    clickClose: false,
    showClose: false,
    fadeDuration: 100,
  });
};

/** [主flow] 呼叫 API 中獎紀錄 */
// ps.進頁取資料，取不到頂多不顯示，不需要特別處理 catch
const renderRewards = () =>  getUser().then(getRewards).then(renderRewardRows).catch(error => console.log(error));

/** [主flow] 呼叫後端抽獎 API */
const enterRoulette = async () => {
  try {
    const service = new RouletteService(activity);
    return await service.enterRoulette();
  } catch (exception) {
    return processUserException(exception);
  }
};

/** 觸發抽獎事件 */
const rotateImage = (data) => {
  const wheel = $('#rotate');
  wheel.stopRotate();
  wheel.rotate({
    angle: 0,
    animateTo: data.angle + 1800,
    duration: 8000,
    callback() {
      showModal(data.message, step.rotate);
    },
  });
}
const rotateErrorHandler = error => {
  // 未登入導去登入
  if (error?.response?.status === 401) {
    window.location = `${process.env.EC_BASE_URL}${process.env.EC_LOGIN_PATH}?event=${activity}`;
    return false;
  }
  // 統一秀錯誤訊息
  showModal(response.data.message || systemError, step.none);
}

const clickEvent = (e) => {
  getUser()
    .then(getRewards)
    .then(enterRoulette)
    .then(rotateImage)
    .catch(rotateErrorHandler);
};

const grepUrlParams = urlSearch => split('?', urlSearch)[1];

const getWindowParams = pipe(
  grepUrlParams,
  queryString => split('&', queryString),
  map(x => pipe(split('='), splitAt(1))(x)),
  map(x => zipObj(...x)),
  x => mergeAll(...x),
);

// TEST PARAMS http://localhost:5657/?activity=ROULETTE2020&test=2?fsfs44222
const initial = () => {
  const params = getWindowParams(window.location.search);
  // todo: 未來可以做取活動先。
  if (params?.activity !== eventConfig.activity) {
    window.location = `${process.env.EC_BASE_URL}`;
    return;
  }
  activity = params.activity;
}

// 取會員抽獎資料
$(document).ready(() => {
  initial();
  renderRewards();
  $('.lottery_btn').click(clickEvent);

  $('#roulette-close').click(function () {
    // close modal
    $.modal.close();

    // type === rotate 需要重取中獎資料
    if ($(this).data('step') !== step.rotate) return;
    renderRewards();
  })
});
