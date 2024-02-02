import app from "@app";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import SocialGoogle from "@utils/social/google";
import SocialKakao from "@utils/social/kakao";
import SocialNaver from "@utils/social/naver";
import request from "supertest";

const path = "/api/social/url";

describe(`GET ${path} API test :)`, () => {
  const type = "";
  const params = {
    type,
  };

  beforeEach(() => {
    params.type = "";
  });

  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app).get(path);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when date parameter is not social type`, async () => {
      // given
      params.type = "blabla";

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    it(`should respond kakao social callback url.`, async () => {
      // given
      params.type = "kakao";
      const kakaoURL = SocialKakao.getCallbackURL();

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.url).toEqual(kakaoURL);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should respond naver social callback url.`, async () => {
      // given
      params.type = "naver";
      const kakaoURL = SocialNaver.getCallbackURL();

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.url).toEqual(kakaoURL);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should respond google social callback url.`, async () => {
      // given
      params.type = "google";
      const kakaoURL = SocialGoogle.getCallbackURL();

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.url).toEqual(kakaoURL);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
