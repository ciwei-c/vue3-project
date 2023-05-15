// webpack require.context 转为对象包装函数
export const requireContentObject = (r, exinclude) => {
  let contents = {};
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) == -1;
  });
  for (let p of paths) {
    let fn = r(p).default ? r(p).default : r(p);
    let k = p.match(/(\w+-?\w+).js$/)[1];
    contents[k] = fn;
  }
  return contents;
};

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }

    try {
      time = time && time.split("-").join("/");
    } catch (error) {
      //
    }
    date = new window.CompatibleDate(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function hideStrUseSign(str, start = 0, end, sign = "*") {
  if (!end) end = str.length;
  if (typeof start !== "number") return str;
  str = str
    .split("")
    .map((v, idx) => {
      if (idx >= start) {
        if (idx <= end) {
          return sign;
        } else {
          return v;
        }
      } else {
        return v;
      }
    })
    .join("");
  return str;
}

export function toFixed(num, unit, precision = 2) {
  if (num || num === 0) {
    if (typeof num === "string") num = Number(num);
    return num.toFixed(precision) + (unit || "");
  } else {
    return "";
  }
}

export function toHome() {
  window.location = window.location.pathname;
}

export function toLogin() {
  window.location = window.location.pathname + "#/login";
}

export function priceNumberFormat(num, precision = 2) {
  let format = [];
  if (!num) num = 0;
  num = Number(num);
  let isNegative = num < 0;
  if (isNegative) {
    num *= -1;
  }
  num = toFixed(num, "", precision);
  let [int, decimal] = num.split(".");
  int
    .split("")
    .reverse()
    .forEach((v, i) => {
      if (i % 3 === 0 && i !== 0) {
        format.push(",");
      }
      format.push(v);
    });
  return `${isNegative ? "-" : ""}${format.reverse().join("")}${
    decimal ? "." + decimal : ""
  }`;
}

export function download(data, strFileName, strMimeType) {
  var self = window,
    u = "application/octet-stream",
    m = strMimeType || u,
    x = data,
    D = document,
    a = D.createElement("a"),
    z = function (a) {
      return String(a);
    },
    B = self.Blob || self.MozBlob || self.WebKitBlob || z,
    BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
    fn = strFileName || "download",
    blob,
    b,
    fr;

  function d2b(u) {
    var p = u.split(/[:;,]/),
      t = p[1],
      dec = p[2] == "base64" ? atob : decodeURIComponent,
      bin = dec(p.pop()),
      mx = bin.length,
      i = 0,
      uia = new Uint8Array(mx);
    for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);
    return new B([uia], { type: t });
  }

  function saver(url, winMode) {
    if ("download" in a) {
      a.href = url;
      a.setAttribute("download", fn);
      a.innerHTML = "downloading...";
      D.body.appendChild(a);
      setTimeout(function () {
        a.click();
        D.body.removeChild(a);
        if (winMode === true) {
          setTimeout(function () {
            self.URL.revokeObjectURL(a.href);
          }, 250);
        }
      }, 66);
      return true;
    }
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    if (!winMode) {
      url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
    }

    f.src = url;
    setTimeout(function () {
      D.body.removeChild(f);
    }, 333);
  }
  if (String(this) === "true") {
    x = [x, m];
    m = x[0];
    x = x[1];
  }
  if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
    return navigator.msSaveBlob ? navigator.msSaveBlob(d2b(x), fn) : saver(x);
  }
  try {
    blob = x instanceof B ? x : new B([x], { type: m });
  } catch (y) {
    if (BB) {
      b = new BB();
      b.append([x]);
      blob = b.getBlob(m);
    }
  }
  if (navigator.msSaveBlob) {
    return navigator.msSaveBlob(blob, fn);
  }
  if (self.URL) {
    saver(self.URL.createObjectURL(blob), true);
  } else {
    if (typeof blob === "string" || blob.constructor === z) {
      try {
        return saver("data:" + m + ";base64," + self.btoa(blob));
      } catch (y) {
        return saver("data:" + m + "," + encodeURIComponent(blob));
      }
    }
    fr = new FileReader();
    fr.onload = function () {
      saver(this.result);
    };
    fr.readAsDataURL(blob);
  }
  return true;
}

export function getRangeDisplay(data, prop, precision, moneyFormat = true) {
  let v = "";
  const _ = (v, u, p) => {
    if (moneyFormat) {
      return priceNumberFormat(v, p);
    } else {
      return toFixed(v, u, p);
    }
  };
  if (data[prop] !== undefined) {
    v = `${data[prop]}`;
  } else {
    let from = data[`${prop}From`];
    let to = data[`${prop}To`];
    if (from === undefined && to === undefined) {
      v = "--";
    } else {
      if (from == undefined && to != undefined) {
        v = `${!precision ? to : _(to, "", precision)}以下`;
      } else if (from != undefined && to == undefined) {
        v = `${!precision ? from : _(from, "", precision)}以上`;
      } else {
        v = `${!precision ? from : _(from, "", precision)}-${
          !precision ? to : _(to, "", precision)
        }`;
      }
    }
  }
  return v;
}
