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
import Language from 'src/types/Language';
import ModelConfig from '../types/ModelConfig';
import Device from 'src/types/Device';

interface ModelSettingsProps {
  modelConfig: ModelConfig;
  setModelConfig: React.Dispatch<React.SetStateAction<ModelConfig>>;
  isCudaAvailable?: boolean;
  languages: Language[];
}

const ModelSettings = ({
  modelConfig,
  setModelConfig,
  isCudaAvailable,
  languages
}: ModelSettingsProps) => {
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
              setModelConfig((prev: ModelConfig) => ({
                ...prev,
                device: e.target.value as Device
              }));
            }}
            labelId="device-label"
            label="Device"
            size="small"
            value={modelConfig.device}
          >
            <MenuItem value={'cpu'}>CPU</MenuItem>
            <MenuItem disabled={!isCudaAvailable} value={'cuda'}>
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
              setModelConfig((prev) => ({ ...prev, languageISO: e.target.value }));
            }}
            labelId="language-label"
            label="Language"
            size="small"
            value={modelConfig.languageISO}
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
          defaultValue={modelConfig.beamSize}
          onChange={(_event, value) => {
            setModelConfig((prev) => ({ ...prev, beamSize: value }));
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
