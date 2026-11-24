import { useSelector } from 'react-redux';
import { AppState } from '../store/reducer';
import { messages } from './messages';

export const useLocale = () => useSelector((state: AppState) => state.locale);

export const useT = () => messages[useLocale()];
