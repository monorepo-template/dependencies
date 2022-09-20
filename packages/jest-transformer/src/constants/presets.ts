import { PluginItem } from '@babel/core';
import PRESET_ENV from './preset-env';
import PRESET_REACT from './preset-react';
import PRESET_TYPESCRIPT from './preset-typescript';

const PRESETS: PluginItem[] = [PRESET_ENV, PRESET_REACT, PRESET_TYPESCRIPT];

export default PRESETS;
