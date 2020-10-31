import { getCookie } from '@/src/helper/cookie';
import fetchMember from '@/src/api/member';
import cookieName from '@/src/constant/cookie';
import { isEmptyValue } from '@/src/helper/data-process';
import { NotLoggedInErrorType, UserNotLoggedInException } from '@/src/exception/user-not-logged-in-exception';

export default class MemberService {
  constructor() {
    this.token = getCookie(cookieName.memberToken);
    if (isEmptyValue(this.token)) throw new UserNotLoggedInException(NotLoggedInErrorType.lostToken);
  }

  async getMember() {
    return fetchMember(this.token).then(({ data }) => data);
  }
}
