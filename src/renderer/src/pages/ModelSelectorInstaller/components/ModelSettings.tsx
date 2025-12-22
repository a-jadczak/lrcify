import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Tooltip,
  Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

const ModelSettings = ({ isCudaAvailable, languages }) => {
  const [language, setLanguage] = useState<string>('auto');
  const [device, setDevice] = useState<string>('cpu');
  const [beamSize, setBeamSize] = useState<number>(4);

  return (
    <>
      <Box
        sx={{
          mt: '1em',
          display: 'flex',
          width: '100%',
          justifyContent: 'end',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Typography component={'h3'} variant="h5">
            Translation settings
          </Typography>
        </Box>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="device-label" size="small">
            Device
          </InputLabel>
          <Select
            onChange={(e: SelectChangeEvent<string>) => {
              setDevice(e.target.value);
            }}
            labelId="device-label"
            label="Device"
            size="small"
            value={device}
          >
            <MenuItem value={'cpu'}>CPU</MenuItem>
            <MenuItem disabled={isCudaAvailable} value={'cuda'}>
              GPU (CUDA)
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="language-label" size="small">
            Languages
          </InputLabel>
          <Select
            onChange={(e: SelectChangeEvent<string>) => {
              setLanguage(e.target.value);
            }}
            labelId="language-label"
            label="Language"
            size="small"
            value={language}
          >
            <MenuItem value={'auto'} defaultChecked={true}>
              Auto
            </MenuItem>
            {languages.map(({ iso, name }) => (
              <MenuItem key={iso} value={iso}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl sx={{ display: 'flex', marginTop: '1em', width: '100%' }}>
        <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Beam size
          <Tooltip
            title={
              'Beam size is the number that tells the model how many words to check. Bigger numbers can give better results but take more time.'
            }
          >
            <InfoIcon fontSize="small" />
          </Tooltip>
        </Typography>
        <Slider
          aria-label="Beam size"
          defaultValue={beamSize}
          onChange={(_event, value) => {
            setBeamSize(value);
          }}
          valueLabelDisplay="auto"
          marks
          min={1}
          max={10}
        />
      </FormControl>
    </>
  );
};

export default ModelSettings;
