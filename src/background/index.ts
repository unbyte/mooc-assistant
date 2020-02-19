import {browser} from "webextension-polyfill-ts";
import {MessageOpenOptions, openOptionsFromBackground} from "../utils/runtime";

browser.runtime.onMessage.addListener(message => {
  if (message === MessageOpenOptions)
    openOptionsFromBackground();
});
