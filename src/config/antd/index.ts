import { Language } from '@/config/i18n';
import zhCN from 'antd/es/locale/zh_CN';
import { useMemo } from 'react';

const resource: Record<Language, typeof zhCN> = {
  'zh-CN': zhCN
};

export function useAntdLocales() {
  return useMemo(() => resource['zh-CN'], []);
}
