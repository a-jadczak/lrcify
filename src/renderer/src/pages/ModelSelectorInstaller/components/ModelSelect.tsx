import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import ModelData from '@renderer/types/ModelData';

interface ModelSelectProps {
  modelsData: ModelData[] | undefined;
  setModel: (value: string) => void;
  isInstalling: boolean;
}

const ModelSelect = ({ modelsData, setModel, isInstalling }: ModelSelectProps) => {
  return (
    <>
      <Typography component="h2" variant="h4">
        Select Model
      </Typography>
      <Typography component="p" sx={{ color: 'text.secondary' }}>
        A larger model size usually means that the translation will take more time to complete.
        However, the benefit is that the results are generally more accurate. Bigger models can
        analyze more details and understand the context better, which leads to higher-quality
        translations.
      </Typography>
      <FormControl sx={{ marginTop: '1em', width: '100%' }}>
        <InputLabel id="model-label">Model</InputLabel>
        <Select
          onChange={(e: SelectChangeEvent<string>) => {
            setModel(e.target.value);
          }}
          labelId="model-label"
          label="Model"
          disabled={isInstalling}
          value=""
        >
          {modelsData?.map(({ name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ModelSelect;
