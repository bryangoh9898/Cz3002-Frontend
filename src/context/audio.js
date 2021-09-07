import UIfx from 'uifx';
import correctAudio from '../sfx/correct.mp3';
import wrongAudio from '../sfx/wrong.mp3';
import submitAudio from '../sfx/submit.ogg';
import timeAudio from '../sfx/click1.ogg';
import React from 'react';

let volume = 1;
const correct = new UIfx(correctAudio);
const wrong = new UIfx(wrongAudio);
const time = new UIfx(timeAudio);
const submit = new UIfx(submitAudio);

export const audManager = {volume,correct,wrong,submit,time};
export const AudioContext = React.createContext();