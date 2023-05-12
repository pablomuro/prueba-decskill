import * as yup from 'yup';

import { INVALID_ID_MSG, INVALID_TEXT_MSG } from './constants';

const ID_SCHEMA = yup.number().required().positive().integer();

const TEXT_SCHEMA = yup.string().required().trim();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateId = (id: any): void => {
  try {
    ID_SCHEMA.validateSync(id);
  } catch (error) {
    throw Error(INVALID_ID_MSG);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateText = (text: any): void => {
  try {
    TEXT_SCHEMA.validateSync(text);
  } catch (error) {
    throw Error(INVALID_TEXT_MSG);
  }
};
