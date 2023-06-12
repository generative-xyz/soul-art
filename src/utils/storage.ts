/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import store from "store2";

export const LOCALSTORAGE_CONFIG = {
  SHIPPING_INFO_DATA: "SHIPPING_INFO_DATA",
  CHECKOUT_SUCCESS: "CHECKOUT_SUCCESS",
  eppUser: "__epp_u",
  user: "__u_id",
  userEmail: "__u_email",
  referralCode: "__epp_referral_code",
  b2bWelcomePopup: "B2B_WELCOME_POPUP",
  eppDiscountPercent: "__epp_discount",
  pageAddToCart: "__page_add_to_cart",
  historyUserInSite: "__history_user_in_site",
  externalId: "__external_id__fbcm",
  dataDetectIp: "__dataDetectIp__fbcm",
  dataDetectIpMonthLimit: "__dataDetectIp_monthLimit__fbcm",
  referralInviteCode: "__epp_invite_code",
  eppIsNotShowTooltipLogin: "__epp_is_not_show_login_tooltip",
  isNewEppUser: "__epp_new_user",
  BF_NEXT_URL: "BF_NEXT_URL",
  inputWorkingEmail: "__input_working_email",
  sessionFirstPage: "__session_first_page",
  sessionEppContactTooltip: "__session_epp_contact_tooltip",
  recentlyUsageFilter: "__recently_usage_filter",
};

export const storageUtil =
  typeof window === "undefined"
    ? store
    : {
        set(name: string, value: any): void {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        get(name: string): any {
          try {
            const value = localStorage.getItem(name);
            if (value) {
              return JSON.parse(value);
            }
            return false;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("storageUtil get", error);
            return false;
          }
        },
        remove(name: string): void {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        clear(): void {
          try {
            localStorage.clear();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        session: {
          set(name: string, value: any): void {
            try {
              sessionStorage.setItem(name, JSON.stringify(value));
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(error);
            }
          },
          get(name: string): any {
            try {
              const value = sessionStorage.getItem(name);
              if (value) {
                return JSON.parse(value);
              }
              return false;
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error("storageUtil get", error);
              return false;
            }
          },
        },
      };
export const setWithExpiry = (key: string, value: any, ttl: number): void => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
export const getWithExpiry = (key: string): any => {
  let itemStr;
  try {
    itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("getWithExpiry", error);
    return null;
  }
};
