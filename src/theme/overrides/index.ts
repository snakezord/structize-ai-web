import { Theme } from '@mui/material/styles';
import merge from 'lodash/merge';
//
import Button from './Button';
import Accordion from './Accordion';
import Paper from './Paper';
import Chip from './Chip';
import TextField from './TextField';
import Select from './Select';
import Autocomplete from './Autocomplete';
import Tooltip from './Tooltip';
import Input from './Input';
import Fab from './Fab';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Button(theme),
    Accordion(theme),
    Paper(theme),
    Chip(theme),
    TextField(theme),
    Select(theme),
    Tooltip(theme),
    Input(theme),
    Autocomplete(theme),
    Fab(theme),
    Typography(theme)
    // Other here...
  );
}
