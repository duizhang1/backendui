import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import type {RequestConfig} from "@@/plugin-request/request";
import errorHandler from "@/util/requestUtils/errorHandle";
import {getCurrentAdmin} from "@/services/ant-design-pro/admin";
import {authHeaderInterceptor} from "@/util/requestUtils/authHeadInceptor";
import {getUserPermission} from "@/services/ant-design-pro/permission";

const isDev = process.env.NODE_ENV === 'test';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * 运行时会最先运行这个方法，我们可以在这里进行一些初始化的操作
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any>;
  permissionList?: any;
}> {
  const fetchUserInfo = async () => {
    try {
      const result = await getCurrentAdmin();
      return result.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchUserPermission = async () => {
    try{
      const result = await getUserPermission();
      return result.data;
    } catch (error) {

    }
  }
  const token = localStorage.getItem('token');
  if (token != null && token.length > 0){
    const currentUser = await fetchUserInfo();
    if (history.location.pathname === loginPath){
      history.push('/welcome')
    }
    const permissionList = await fetchUserPermission();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
      permissionList
    };
  } else {
    if (history.location.pathname !== loginPath){
      history.push(loginPath)
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// 配置一些基础配置
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  credentials: 'include',
  errorHandler,
  // 自定义端口规范
  requestInterceptors: [authHeaderInterceptor],
  errorConfig: {
    adaptor: res => {
      return {
        success: res.code == '200',
        data: res.data,
        errorCode: res.code,
        errorMessage: res.message,
      };
    },
  },
  middlewares: [],
}
