import { Theme } from '@mui/material/styles';
import merge from 'lodash/merge';

import Accordion from './Accordion';
import Autocomplete from './Autocomplete';
//
import Button from './Button';
import Chip from './Chip';
import Fab from './Fab';
import Input from './Input';
import Paper from './Paper';
import Select from './Select';
import TextField from './TextField';
import Tooltip from './Tooltip';
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
