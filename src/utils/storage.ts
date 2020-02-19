import { browser, Storage } from "webextension-polyfill-ts";

export interface CommentItem {
  text: string;
  active: boolean;
}

export type BeautifyItem = string;

interface ConfigInterface {
  commentList: CommentItem[];
  beautifyList: BeautifyItem[];
}

const EMPTY_CONFIG: ConfigInterface = {
  commentList: [],
  beautifyList: []
};

export const saveConfig: (
  config: Storage.StorageAreaSetItemsType
) => Promise<void> = config =>
  browser.storage.sync.set({
    config
  });

export const getStorage: () => Promise<{ [s: string]: any }> = async () =>
  browser.storage.sync.get("config");

export const extractConfig: (storage: any) => ConfigInterface = storage =>
  storage.config && storage.config.commentList && storage.config.beautifyList
    ? storage.config
    : EMPTY_CONFIG;
