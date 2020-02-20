import { browser, Storage } from "webextension-polyfill-ts";

export interface CommentItem {
  text: string;
  active: boolean;
}

interface ConfigInterface {
  commentList: CommentItem[];
}

const EMPTY_CONFIG: ConfigInterface = {
  commentList: [],
};

export const saveConfig: (
  config: Storage.StorageAreaSetItemsType
) => Promise<void> = config =>
  browser.storage.sync.set({
    config
  });

export const getStorage: () => Promise<{ [s: string]: any }> = async () =>
  browser.storage.sync.get({config: EMPTY_CONFIG});


export const getConfig: () => Promise<ConfigInterface> = async ()=>
  (await getStorage()).config;
