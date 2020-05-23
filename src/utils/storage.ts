import { browser, Storage } from "webextension-polyfill-ts";
import { FeatureStatusList } from "../../features";

export interface CommentItem {
  text: string;
  active: boolean;
}

interface ConfigInterface {
  commentList: CommentItem[];

  // 功能名称 => 是否开启
  featureStatus: FeatureStatusList;
}

const EMPTY_CONFIG: ConfigInterface = {
  commentList: [],
  featureStatus: {}
};

export const saveConfig: (
  patch: Storage.StorageAreaSetItemsType
) => Promise<void> = patch => browser.storage.sync.set(patch);

export const getStorage: () => Promise<{ [s: string]: any }> = async () =>
  browser.storage.sync.get(EMPTY_CONFIG);

export const getConfig: () => Promise<ConfigInterface> = async () =>
  (await getStorage()) as ConfigInterface;
