import { MessageType, ChromeMessage } from '../types';

console.log('LeetCode Helper service worker started');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, sendResponse) => {
  console.log('Message received:', message.type);
  
  return true;
});

chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked');
});