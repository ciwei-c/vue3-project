// api 文件以统一格式 export function xxx 输出
import { requireContentObject } from '@/utils';
const api = requireContentObject(require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js']);

export default api;
