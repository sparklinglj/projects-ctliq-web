import { TypeValue } from '@/types';
import { message } from '@/utils/notice';
import { ProFieldValueEnumType } from '@ant-design/pro-components';
import { SortOrder } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';

interface TransformPaginationOption {
  current?: number;
  pageSize?: number;
}
/** antd-pro-table 分页参数格式化 */
export function transformPagination({ current, pageSize }: TransformPaginationOption) {
  return {
    current: current || 1,
    size: pageSize || 10,
  };
}

const ORDER_ENUM = {
  descend: 'DESC',
  ascend: 'ASC',
};

export function transformSort(sort: { [key: string]: SortOrder }) {
  const orders = Object.entries(sort).map(([key, value]) => {
    if (!value) return {};
    return {
      column: key,
      asc: ORDER_ENUM[value] === ORDER_ENUM.ascend,
    };
  });

  return {
    orders,
  };
}

export function transformDateRange(range: Dayjs[] = []) {
  if (range?.[0] && range?.[1]) {
    return {
      startTime: range[0]?.format('YYYY-MM-DDT00:00:00.000Z'),
      endTime: range[1]?.format('YYYY-MM-DDT23:59:59.000Z'),
    };
  }
  return {};
}

export function date2Range(date: Dayjs) {
  if (date) {
    return {
      startTime: date?.format('YYYY-MM-DDT00:00:00.000Z'),
      endTime: date?.format('YYYY-MM-DDT23:59:59.000Z'),
    };
  }
  return {};
}

/** 复制文字 */
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.navigator.clipboard?.writeText === 'function') {
        window.navigator.clipboard.writeText(text).then(resolve).catch(reject);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.select();
        document.execCommand('Copy');
        resolve(true);
      }
    } catch (e) {
      message.error('复制失败');
      reject(e);
    }
  });
};

export function downloadFile(url: string, name?: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name || url.split('/').reverse()[0];
  a.target = '_blank';
  a.click();
  a.remove();
}

export function isJson(value: string) {
  try {
    const obj = JSON.parse(value);
    if (typeof obj === 'object' && !!obj) {
      return obj;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/** 计算冗余数 */
export function redundancyCount(len: number) {
  if (len <= 4) {
    return 1;
  }
  if (len > 4 && len <= 9) {
    return 2;
  }
  if (len > 9 && len <= 14) {
    return 3;
  }
  return 4;
}

/** 合并 className */
export function cls(...classList: (string | undefined | boolean)[]) {
  return classList.filter((i) => !!i).join(' ');
}

interface ConstValue {
  value: string | number;
  label: string;
  color?: string;
  [key: string]: any;
}

/** 翻转枚举常量，将 value 作为 key */
export function transConstValue<T extends Record<string, ConstValue> = Record<string, ConstValue>>(
  values: T,
) {
  const v: Record<string | number, ConstValue> = {};
  Object.values(values).forEach((item) => {
    v[item.value] = {
      ...item,
    };
  });
  return v as Record<TypeValue<typeof values>['value'], TypeValue<typeof values>>;
}

export function enumMap2Options(values: Record<string, any>) {
  return Object.entries(values).map(([value, item]) => {
    return {
      ...item,
      value,
      label: item.label,
    };
  });
}

export function options2ValueEnum(values: Record<string, ConstValue>) {
  const res: ProFieldValueEnumType = {};
  Object.values(values).forEach((item) => {
    res[item.value] = {
      status: item.color,
      text: item.label,
    };
  });

  return res;
}

/** options 转 optionsGroup */
export function arrayGroupBy(arr: { value: string | number; label: string; type: string }[]) {
  const res: { label: string; options: { label: string; value: string | number }[] }[] = [];
  arr.forEach((item) => {
    const group = res.find((i) => i.label === item.type);
    if (group) {
      group.options.push(item);
    } else {
      res.push({
        label: item.type,
        options: [{ label: item.label, value: item.value }],
      });
    }
  });
  return res;
}

function createUuid() {
  let n = 0;
  return () => {
    n += 1;
    return n + '';
  };
}
export const uuid = createUuid();

/** file 转 base64 */
export function file2base64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const buffer = fileReader.result as ArrayBuffer;
      resolve(buffer);
    };
    fileReader.onerror = reject;
  });
}
