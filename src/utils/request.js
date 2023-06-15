import axios from "axios";
import { message } from "ant-design-vue";
import { getToken, removeToken } from "@/utils/auth";
import { toLogin } from "@/utils";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 * 2, // request timeout
});

let tokenExpired = false;

// request interceptor
service.interceptors.request.use(
  (request) => {
    // do something before request is sent
    // TODO token 续期
    let token = getToken() || {};
    if (token["Authorization-Token"] && token["Authorization"]) {
      request.headers["Authorization-Token"] =
        getToken()["Authorization-Token"];
      request.headers["Authorization"] = getToken()["Authorization"];
    }
    return request;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  (response) => {
    const res = response.data;
    if (!res) return res;
    if (res.code === "401") {
      if (tokenExpired) return;
      //eslint-disable-next-line
      message.error('登录过期，请重新登录');
      setTimeout(() => {
        removeToken();
        toLogin();
      }, 1500);
      if (!tokenExpired) tokenExpired = true;
    } else {
      tokenExpired = false;
      try {
        res.__header_response__ = response;
      } catch (error) {
        //
      }
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    //eslint-disable-next-line
    message.error(error.message, 5000);
    return Promise.reject(error);
  }
);

const hasKey = (v) => {
  if (v === 0) return true;
  return !!v;
};

const getRequestObj = (params) => {
  if (!params.url) {
    return { error: "请求失败，请求url为空！" };
  }
  if (Array.isArray(params.data)) {
    return {
      url: params.url,
      data: params.data,
    };
  }
  let url = params.url;
  let { ...data } = params.data;
  let matchList = url.match(/:([A-Za-z0-9_]*)+?/g);
  let error = "";
  if (matchList && matchList.length > 0) {
    matchList.forEach((query) => {
      let key = query.replace(":", "");
      if (data && hasKey(data[key])) {
        url = url.replace(query, data[key]);
        delete data[key];
      } else {
        error = `请求失败，请求参数${key}不存在！`;
      }
    });
    if (error) {
      return { error: error };
    }
  }
  return {
    url: url,
    data: data,
  };
};

const getRequest = (params) => {
  let requestObj = getRequestObj(params);
  if (requestObj.error) {
    return Promise.reject(requestObj.error);
  }
  return service({
    url: requestObj.url,
    method: "get",
    params: requestObj.data,
  });
};

const otherRequest = (params) => {
  let requestObj = getRequestObj(params);
  if (requestObj.error) {
    return Promise.reject(requestObj.error);
  }
  let data = {};
  if (params.responseType) data.responseType = params.responseType;
  if (params.type) data.type = params.type;
  let queryData = Object.assign(data, {
    url: requestObj.url,
    method: params.method,
    data: requestObj.data,
  });
  return service(queryData);
};
const upload = (params) => {
  if (!params.url) {
    return { error: "请求失败，请求url为空！" };
  }
  return service({
    url: params.url,
    method: params.method,
    data: params.data,
  });
};
const request = (params) => {
  if (params.upload) {
    return upload(params);
  }
  if (params.method === "get") {
    return getRequest(params);
  } else {
    return otherRequest(params);
  }
};

export default request;
