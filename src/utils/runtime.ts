import {browser} from "webextension-polyfill-ts";

export const MessageOpenOptions = 'oo';

export const openOptionsFromBackground: () => void = () =>
  browser.runtime.openOptionsPage().then();


export const openOptionsFromContent: () => void = () =>
  browser.runtime.sendMessage(MessageOpenOptions).then();

