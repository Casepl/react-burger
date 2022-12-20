import { createAction } from '@reduxjs/toolkit';

export const tabSwitch = createAction<string, 'tabSwitch/switch'>('tabSwitch/switch');
