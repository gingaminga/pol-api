import { AuthService } from "@services/auth.service";
import SocialGoogle from "@utils/social/google";
import SocialKakao from "@utils/social/kakao";
import SocialNaver from "@utils/social/naver";

describe(`[Auth service] getURL method test :)`, () => {
  const authService = new AuthService();

  it(`should be return kakao url.`, () => {
    // given
    const type = "kakao";
    const kakaoURL = SocialKakao.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toBe(kakaoURL);
  });

  it(`should be return naver url.`, () => {
    // given
    const type = "naver";
    const naverURL = SocialNaver.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toEqual(naverURL);
  });

  it(`should be return google url.`, () => {
    // given
    const type = "google";
    const googleURL = SocialGoogle.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toEqual(googleURL);
  });
});