import { createTransformer } from 'babel-jest';
import TRANSFORM_OPTIONS from './constants/transform-options';

export default createTransformer(TRANSFORM_OPTIONS);
