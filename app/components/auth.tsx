import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import WechatIcon from "../icons/wechat.svg";
import { useEffect, useState } from "react";
// @ts-ignore
import cookie from "react-cookies";
import { randomString } from "../utils/index";

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const [userrndstr, setUserrndstr] = useState("");
  useEffect(() => {
    if (cookie.load("userrndstr")) {
      setUserrndstr(cookie.load("userrndstr"));
    } else {
      const _userrndstr = randomString(16) + new Date().getTime();
      cookie.save("userrndstr", _userrndstr, {
        expires: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000),
        path: "/",
      });
      setUserrndstr(_userrndstr);
    }
  }, []);

  const goHome = () => navigate(Path.Home);

  /**
   * 微信登录
   */
  const wechatLogin = () => {
    var isWechat = /MicroMessenger/i.test(navigator.userAgent);
    if (isWechat) {
      location.href =
        "http://" + window.location.hostname + "/s2.php?m=1&s=" + userrndstr;
    } else {
      // $("#mycontent").qrcode(
      //   "http://" + window.location.hostname + "/s2.php?s=" + userrndstr,
      // );
      // checkuserstatus();
    }
  };
  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      {/* <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div> */}
      <div className={styles["account-login"]}>
        <input
          className={styles["auth-input"]}
          type="text"
          // placeholder={Locale.Auth.InputEmail}
          value={access.accessCode}
          onChange={(e) => {
            access.updateCode(e.currentTarget.value);
          }}
        />
        <input
          className={styles["auth-input"]}
          type="text"
          // placeholder={Locale.Auth.InputPwd}
          value={access.accessCode}
          onChange={(e) => {
            access.updateCode(e.currentTarget.value);
          }}
        />
        <div className={styles["auth-actions"]}>
          <IconButton
            text={Locale.Auth.Confirm}
            type="primary"
            onClick={goHome}
          />
        </div>
      </div>
      <div className={styles["other-wrap"]}>
        <div className={styles["other-login"]}>
          <span>其他登录方式</span>
        </div>
        <WechatIcon className={styles.wechat} onClick={wechatLogin} />
      </div>

      <div className={styles["auth-actions"]}>
        {/* <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goHome}
        /> */}
        <IconButton text={Locale.Auth.Later} onClick={goHome} />
      </div>
    </div>
  );
}
