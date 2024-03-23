/* eslint-disable no-unused-vars */
// ----------------------------------------------------------------------

declare module '@mui/system' {
  interface Shape {
    borderRadiusXsm: number | string;
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
    borderRadiusLg: number | string;
    borderRadiusXlg: number | string;
  }
}

const shape = {
  borderRadiusXsm: 2,
  borderRadiusSm: 4,
  borderRadius: 8,
  borderRadiusMd: 12,
  borderRadiusLg: 16,
  borderRadiusXlg: 18,
};

export default shape;
