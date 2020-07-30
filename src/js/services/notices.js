import { info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';


function noticeInfo() {
  info({
    title: 'Attention!!!',
    text: 'Too many matches found. Please enter a more specific query!',
    width: '300px',
    type: 'info',
    delay: 2000,
    remove: true,
    modal: true,
    overlayClose: true,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}

function noticeError() {
  error({
    title: 'Error!!!',
    text:
      'Unfortunately, no such country was found, try changing your search parameters!',
    width: '300px',
    type: 'error',
    delay: 2000,
    remove: true,
    modal: true,
    overlayClose: true,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}

function mySuccess() {
  success({
    title: 'Successfully!!!',
    text: 'We found what you were looking for!',
    width: '300px',
    type: 'success',
    delay: 2000,
  });
}

export { noticeInfo, noticeError, mySuccess };
